/**
 * Helmet does not apply for mobile.
 */
import React from 'react';
import { GlobalState } from '../../GlobalState';

export class Helmet extends React.PureComponent<{
  title?: string;
  description?: string;
}> {
  render() {
    GlobalState.currentPageTitle = this.props.title;
    return <></>;
  }
}
