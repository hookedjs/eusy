/**
 * This is the main entry-point into the app, which is determined by expo.cli.
 * Tips:
 * - You should use non-functional components for higher level stuff, b/c fc's tend to break hot reload
 * - Use the assets features on this page to load fonts and stuff
 */
import { hot } from 'react-hot-loader';
import React from 'react';
import { Platform, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { RoutesConfig } from './src/config/Routes.config';
import { AppLoadingScreen } from './src/components/screens/AppLoading.screen';
import { loadFonts } from './src/lib/AssetLoading';
import { SidebarSection } from './src/components/sections/Sidebar.section';
import { Router } from './src/components/lib/Routing';

import { Theme } from './src/config/Theme.config';
import { GlobalState } from './src/GlobalState';
import { Observer } from 'mobx-react-lite';

interface state {
  assetsLoaded: boolean;
}

class App extends React.PureComponent<any, state> {
  constructor(props) {
    super(props);
    this.state = {
      assetsLoaded: false
    };
  }

  static _loadAssets = async () => {
    const fontAssets = loadFonts({
      // "Somefont": require('./font/somefont.ttf')
    });
    await Promise.all([fontAssets]);
  };

  render() {
    return (
      <ThemeProvider theme={Theme}>
        <View style={{ flex: 1, width: '100%', overflow: 'hidden' }}>
          <Observer>
            {() => (
              <>
                {this.state.assetsLoaded && GlobalState.isHydrated ? (
                  <Router>
                    <SidebarSection>
                      <RoutesConfig />
                    </SidebarSection>
                  </Router>
                ) : (
                  <AppLoadingScreen
                    startAsync={App._loadAssets}
                    onFinish={() => this.setState({ assetsLoaded: true })}
                  />
                )}
              </>
            )}
          </Observer>
        </View>
      </ThemeProvider>
    );
  }
}

let HotApp = App;
if (Platform.OS === 'web') HotApp = hot(module)(App);
export default HotApp;
