/**
 * Tips:
 * - You should use non-functional components for higher level stuff, b/c fc's tend to break hot reload
 * - Use the assets features on this page to load fonts and stuff
 */
import React from 'react';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {ApplicationProvider} from 'react-native-ui-kitten';
import {Router, Route, Stack} from './src/helpers/Routing';
import {cacheAssets, cacheFonts} from "./src/helpers/AssetsCaching";
import {AppLoading} from "./src/components/AppLoading";

import {Header} from "./src/components/Header";

// TODO: Consider an overlay component. See https://github.com/jmurzy/react-router-native
// TODO: Lazy loading
import Home from "./src/Home";
import InnerPage from "./src/InnerPage";
import Error from "./src/Error";
import {Footer} from "./src/components/Footer";

interface state {
  isReady: boolean
}

export default class AppClassComponent extends React.PureComponent<any, state> {
  constructor(props) {
    super(props);
    this.state = {isReady: false};
  }

  async _loadAssetsAsync () {
    const imageAssets = cacheAssets([
      // require("../assets/images/bg_screen1.jpg"),
    ]);

    const fontAssets = cacheFonts({
      // "FontAwesome": require("@expo/vector-icons/fonts/FontAwesome.ttf"),
    });

    await Promise.all([imageAssets, fontAssets]);
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({isReady: true})}
        />
      );
    }

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={lightTheme}
      >
        <Router>
          <Stack>
            <Route path="/" exact component={Home} headerComponent={Header} footerComponent={Footer}/>
            <Route path="/page" component={InnerPage} headerComponent={Header} footerComponent={Footer}/>
            <Route component={Error}/>
          </Stack>
        </Router>
      </ApplicationProvider>
    );
  }
}
