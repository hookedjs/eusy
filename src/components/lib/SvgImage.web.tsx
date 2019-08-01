/**
 * This helper does a lot of magic with SVGs to make them style-able.
 * It was a major pain.
 *
 */
import React from 'react';
import ReactSVG from 'react-svg';

export const SvgImage = ({
  source,
  width,
  height,
  fill
}: {
  source: string;
  width: number | string;
  height: number | string;
  fill?: string;
}) => {
  return (
    <div>
      <ReactSVG
        src={source}
        beforeInjection={svg => {
          svg.setAttribute('width', `${width}`);
          svg.setAttribute('height', `${height}`);
        }}
        afterInjection={(error, svg) => {
          if (error) {
            console.error(error);
            return;
          }
        }}
        // evalScripts="always"
        style={{ width, height }}
      />

      <style jsx>{`
        div :global(*) {
          ${fill && `fill: ${fill};`}
        }
      `}</style>
    </div>
  );
};
