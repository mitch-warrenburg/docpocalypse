import { css as dcss } from 'astroturf';
import cn from 'classnames';
import React from 'react';

import { HeadingLevel } from './Heading';
import Heading from './OutlineHeading';

const styles = dcss`
  @component LinkedHeading {
    position: relative;
    scroll-margin: calc(theme('height.navbar') + theme('margin.4'));

    & .anchor:focus,
    &:hover .anchor {
      text-decoration: none;
      opacity: 0.5;
    }

    & .anchor {
      // font-size: 90%;
      position: absolute;
      padding-top: 0.1em;
      padding-left: 0.5em;
      padding-right: theme(padding.2);
      right: calc(100%);
      opacity: 0;
    }

    & .wrapper {
      position: relative;
      display: inline-block;
      padding-right: 1em;
    }
  }
`;

interface LinkHeadingProps {
  h: HeadingLevel;
  id: string;
  className?: string;

  title?: React.ReactNode;
  children?: React.ReactNode;
}

function LinkedHeading({
  h,
  id,
  className,
  children,
  title,
}: LinkHeadingProps) {
  return (
    <Heading
      h={h}
      id={id}
      title={title ?? children}
      className={cn(className, styles.LinkedHeading)}
    >
      <a href={`#${id}`} aria-hidden className={styles.anchor}>
        <span aria-hidden>#</span>
      </a>
      {children}
    </Heading>
  );
}

export default LinkedHeading;
