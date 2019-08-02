/**
 * Tips:
 * - You should use non-functional components for higher level stuff, b/c fc's tend to break hot reload
 * - Use the assets features on this page to load fonts and stuff
 */
import { hot } from 'react-hot-loader';
import React from 'react';
import { Platform } from 'react-native';
import { light as lightTheme, mapping } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { AppRoutes } from './src/Config';
import { AppLoadingRoute } from './src/components/routes/AppLoading.route';
import { loadFonts } from './src/lib/AssetLoading';
import { SidebarSection } from './src/components/sections/Sidebar.section';
import { Router } from './src/components/lib/Routing';
import { Helmet } from './src/components/lib/Helmet';
// import Feather from './src/assets/Feather.ttf';
// import Ionicons from '@expo/vector-icons/src/vendor/react-native-vector-icons/Fonts/Ionicons.ttf';

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
      // "Feather": require('./font/somefont.ttf')
    });
    await Promise.all([fontAssets]);
  }

  render() {
    return (
      <>
        <Helmet />
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          {this.state.isReady || true ? (
            <Router>
              <SidebarSection>
                <AppRoutes />
              </SidebarSection>
            </Router>
          ) : (
            <AppLoadingRoute
              startAsync={App._loadAssetsAsync}
              onFinish={() => this.setState({ isReady: true })}
            />
          )}
        </ApplicationProvider>
      </>
    );
  }
}

let HotApp = App;
if (Platform.OS === 'web') HotApp = hot(module)(App);
export default HotApp;
