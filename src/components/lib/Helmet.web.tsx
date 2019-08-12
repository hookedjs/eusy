import React from 'react';
import { Helmet as HelmetCore } from 'react-helmet';
import { AppName, AppDescription } from '../../config/App.config';

export class Helmet extends React.Component<{
  title?: string;
  description?: string;
}> {
  componentDidMount() {
    // Delete strange extra meta description that must be added by React or something
    const e = document.querySelector('meta[name=description]:not([data-react-helmet=true])');
    if (e) e.parentNode.removeChild(e);
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
        <meta property="og:image" content={window.location.origin + '/preview.png'} />
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
