import { css as dcss } from 'astroturf';
import React from 'react';
import DocumentOutline from './DocumentOutline';
import Link from './Link';
import Navbar from './Navbar';
import SideNavigation from './SideNavigation';

export interface Props {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** @public */
function PageLayout({ children, className, style }: Props) {
  return (
    <div
      className={className}
      style={style}
      css={dcss`
        @apply min-h-screen flex flex-col
      `}
    >
      <Navbar />
      <div
        css={dcss`
          @apply grid grid-cols-12;
        `}
      >
        <SideNavigation
          css={dcss`
            @apply col-span-12;

            @screen md { @apply col-span-3 };
            @screen xl { @apply col-span-2 };
          `}
        />
        <DocumentOutline
          css={dcss`
            @apply hidden;
            order: 2;
            @screen xl { @apply col-span-2 block };
          `}
        />
        <main
          css={dcss`
            @apply col-span-12 px-10;

            order: 1;

            @screen md { @apply col-span-9 };
            @screen xl { @apply col-span-8 };
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default PageLayout;
