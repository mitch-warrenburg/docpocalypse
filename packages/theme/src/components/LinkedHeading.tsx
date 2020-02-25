import { css as dcss } from 'astroturf';
import cn from 'classnames';
import React from 'react';
import Anchor from './Anchor';
import { HeadingLevel } from './Heading';
import Heading from './OutlineHeading';

const styles = dcss`
  @component LinkedHeading {
    position: relative;
    scroll-margin: theme('height.navbar');

    & .anchor:focus,
    &:hover .anchor {
      text-decoration: none;
      opacity: 0.5;
    }

    & .anchor {
      font-size: 90%;
      position: absolute;
      padding-top: 0.1em;
      padding-left: 0.5rem;
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
  children?: React.ReactNode;
}
console.log(styles);
function LinkedHeading({ h, id, className, children }: LinkHeadingProps) {
  return (
    <Heading
      h={h}
      id={id}
      title={children}
      className={cn(className, styles.LinkedHeading)}
    >
      {children}
      <a href={`#${id}`} aria-hidden className={styles.anchor}>
        <span aria-hidden>#</span>
      </a>
    </Heading>
  );
}

export default LinkedHeading;
