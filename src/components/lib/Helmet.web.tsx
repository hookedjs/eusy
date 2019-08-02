import React from 'react';
import { Helmet as HelmetCore } from 'react-helmet';
import { AppName, AppDescription } from '../../Config';

export class Helmet extends React.Component<{
  title?: string;
  description?: string;
}> {
  componentDidMount() {
    let originalDescriptionElements = document.querySelectorAll('meta[name=description]');
    originalDescriptionElements.forEach(e => {
      // @ts-ignore: ignore html.dataset being unknown
      if (!e.dataset) throw new Error('Helmet: html.dataset is not available in this browser.');
      // @ts-ignore: ignore html.dataset being unknown
      else if (!e.dataset.reactHelmet) e.parentNode.removeChild(e);
    });
  }

  render() {
    // const url = `${config.baseUrl}${location.pathname}${location.search}${location.hash}`;
    const { title, description } = this.props;

    return (
      <HelmetCore>
        <title>
          {AppName}
          {title ? ` | ${title}` : ''}
        </title>
        <meta name="description" content={description ? description : AppDescription} />
        <link rel="canonical" href={window.location.href} />
      </HelmetCore>
    );
  }
}

// Stateless has issues with render infinite loop. Use PureComponent instead
// Ref: https://github.com/facebook/react/issues/5677
// export const HelmetDefault = ({title}: {title?: string}) => {
//   // const url = `${config.baseUrl}${location.pathname}${location.search}${location.hash}`;
//   return (
//     <Helmet>
//       <title>
//         {Config.appName}
//         {title ? ` | ${title}` : ""}
//       </title>
//       <link rel="canonical" href={window.location.href}/>
//     </Helmet>
//   );
// };
