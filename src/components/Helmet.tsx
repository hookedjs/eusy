/**
 * Helmet does not apply for mobile.
 */
import React from 'react';

export class Helmet extends React.PureComponent<{
  title?: string;
  description?: string;
}> {
  render() {
    return <></>;
  }
}
