import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      netflixintro: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement,
        { letter: string }
      >;
    }
  }
}
