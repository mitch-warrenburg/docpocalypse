import {
  Editor,
  Error,
  ImportResolver,
  InfoMessage,
  Preview,
  PrismTheme,
  Provider,
} from '@docpocalypse/code-live';
import { css as dcss } from 'astroturf';
import cn from 'classnames';
import React, { useState } from 'react';

import { DEFAULT_SHOW_CODE, DEFAULT_SHOW_IMPORTS } from '../config';
import syntaxTheme from '../syntax-theme';

const styles = dcss`
  @component LiveCode {
    margin: theme(margin.5) theme(margin.-4) theme(margin.8);
    border-radius: theme(borderRadius.default);
    background-color: theme(colors.gray.100);
    border: 1px solid theme(colors.gray.300);

    & .title {
      @apply font-medium bg-gray-300 px-5 py-3 font-mono text-sm leading-tight rounded-t;
    }

    & .content {
      @apply px-5 py-6 rounded-b;
    }

    & .preview {
      @apply pb-6;
    }

    & .info {
      font-size: theme(fontSize.sm);
    }

    & .editor {
      @apply bg-gray-100 rounded-b font-mono;

      white-space: pre-wrap;

      textarea {
        outline: none;
      }

      & :global(.token-line-error) {
       background-color: rgb(229, 62, 62, .4)
      }
    }

    & .show-code {
      @apply px-5 py-2 font-mono;

      float: right;
    }
  }
`;

export interface Props<TScope extends {} = {}> {
  code: string;

  /** A descriptive string to title the code block */
  title?: string;

  /**
   * A `prism-react-renderer` style theme. Generally the best way to set is
   * via shadowing `@docpocalypse/gatsby-theme/src/syntax-theme`
   *
   * see: [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer) for theme formats
   * @defaultValue OceanicNext
   */
  theme?: PrismTheme;

  /**
   * The scope is an object whose values are made available to the code. Provide
   * a scope to make helpers, functions, and components globally accessible to example code.
   *
   * **Can also be configured as part of the theme options: `exampleCodeScope`**
   *
   * @type TScope = {}
   */
  scope: TScope;

  /** A CSS class */
  className?: string;

  /** A CSS class passed to the code title component */
  titleClassName?: string;
  /** A CSS class passed to the code container wraping Preview and Editor */
  contentClassName?: string;
  /** A CSS class passed to the code Editor component */
  editorClassName?: string;
  /** A CSS class passed to the code Preview component */
  previewClassName?: string;

  /**
   * Creates a react component using the code text as it's body. This allows
   * using top level hooks in your example without having to create and return your
   * own component. Cannot be used with `render()` in the example.
   *
   * ```jsx
   * import Button from './Button'
   *
   * const [active, setActive] = useState()
   *
   * <Button active={active} onClick={() => setActive(true)}/>
   * ```
   */
  renderAsComponent?: boolean;

  /**
   * Provides the values for any imports used in code examples. `resolveImports` is
   * a function returning a Promise mapping import requests to the module content.
   *
   * **Docpocalypse provides this mapping automatically in the context of an example file**
   */
  resolveImports?: ImportResolver;

  /* The syntax language for the Code example, passed to Prism for tokenizing the code text */
  language?: string;

  /** Default value for whether example code is visible or only the rendered preview */
  showCode?: boolean | 'collapsible';
  /**
   * Determines whether imports are shown in the editor.
   * Imports can't be changed in the browser, so showing them is for
   * illustrative purposes only */
  showImports?: boolean;

  lineNumbers?: boolean;
}

function StyledInfoMessage(props) {
  return (
    <InfoMessage {...props} className={cn(props.className, styles.info)} />
  );
}

/**
 * @public
 */
export default function LiveCode({
  code,
  scope,
  className,
  titleClassName,
  contentClassName,
  editorClassName,
  previewClassName,
  resolveImports,
  language,
  title,
  lineNumbers,
  theme = syntaxTheme,
  showCode = DEFAULT_SHOW_CODE,
  showImports = DEFAULT_SHOW_IMPORTS,
  renderAsComponent = false,
}: Props) {
  const canCollapse = showCode === 'collapsible';
  const [expanded, setExpanded] = useState(showCode === true);

  return (
    <Provider
      scope={scope}
      code={code}
      language={language}
      theme={theme}
      showImports={showImports}
      renderAsComponent={renderAsComponent}
      resolveImports={resolveImports}
    >
      <div className={cn(className, styles.LiveCode)}>
        {title && (
          <div className={cn(titleClassName, styles.title)}>{title}</div>
        )}

        <div className={cn(contentClassName, styles.content)}>
          <Preview className={cn(previewClassName, styles.preview)} />

          {expanded && (
            <div className={cn(editorClassName, styles.editor)}>
              {showCode && (
                <Editor
                  infoComponent={StyledInfoMessage}
                  lineNumbers={lineNumbers}
                />
              )}
            </div>
          )}
          <Error className={styles.error} />
        </div>
        {!expanded && canCollapse && (
          <button
            type="button"
            className={styles.showCode}
            onClick={() => setExpanded(prev => !prev)}
          >
            {'</show code>'}
          </button>
        )}
      </div>
    </Provider>
  );
}
