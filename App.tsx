/**
 * Tips:
 * - You should use non-functional components for higher level stuff, b/c fc's tend to break hot reload
 * - Use the assets features on this page to load fonts and stuff
 */
import { hot } from 'react-hot-loader';
import React from 'react';
import { Platform, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { Routes } from './src/config/Routes';
import { AppLoadingRoute } from './src/components/screens/AppLoading.route';
import { loadFonts } from './src/lib/AssetLoading';
import { SidebarSection } from './src/components/sections/Sidebar.section';
import { Router } from './src/components/lib/Routing';
import { Helmet } from './src/components/lib/Helmet';

import { Theme } from './src/config/Theme';

interface state {
  isReady: boolean;
}

class App extends React.PureComponent<any, state> {
  constructor(props) {
    super(props);
    this.state = { isReady: false };
  }

  static async _loadAssetsAsync() {
    const fontAssets = loadFonts({
      // "Somefont": require('./font/somefont.ttf')
    });
    await Promise.all([fontAssets]);
  }

  render() {
    return (
      <ThemeProvider theme={Theme}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Helmet />
          {this.state.isReady ? (
            <Router>
              <SidebarSection>
                <Routes />
              </SidebarSection>
            </Router>
          ) : (
            <AppLoadingRoute
              startAsync={App._loadAssetsAsync}
              onFinish={() => this.setState({ isReady: true })}
            />
          )}
        </View>
      </ThemeProvider>
    );
  }
}

let HotApp = App;
if (Platform.OS === 'web') HotApp = hot(module)(App);
export default HotApp;
