/**
 * Mobile doesn't support hover events
 * Ref: https://reactjs.org/docs/render-props.html
 */
import React from 'react';

export const HoverObserver = ({ children }) => <>{children({ isHovering: false })}</>;
