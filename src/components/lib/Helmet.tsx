/**
 * Helmet does not apply for mobile.
 */
import React from 'react';
import { RoutingState } from '../../state/Routing.state';

export class Helmet extends React.PureComponent<{
  title?: string;
  description?: string;
}> {
  render() {
    RoutingState.pageTitle = this.props.title;
    RoutingState.pageDescription = this.props.description;
    return <></>;
  }
}
