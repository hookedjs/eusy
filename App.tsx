import React, {useState} from 'react';
import {mapping, light as lightTheme} from '@eva-design/eva';
import {ApplicationProvider} from 'react-native-ui-kitten';
import {Router, Route, Switch, Stack} from './src/helpers/Routing';
import {cacheAssets, cacheFonts} from "./src/helpers/AssetsCaching";
import {AppLoading} from "./src/components/AppLoading";
import {Sleep} from "./src/helpers/Sleep";

import {Header} from "./src/components/Header";

// TODO: Consider an overlay component. See https://github.com/jmurzy/react-router-native
// TODO: Lazy loading
import Home from "./src/Home";
import InnerPage from "./src/InnerPage";
import Error from "./src/Error";
import {Footer} from "./src/components/Footer";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const loadAssetsAsync = async () => {
    const imageAssets = cacheAssets([
      // require("../assets/images/bg_screen1.jpg"),
    ]);

    const fontAssets = cacheFonts({
      // "FontAwesome": require("@expo/vector-icons/fonts/FontAwesome.ttf"),
      // "Ionicons": require("@expo/vector-icons/fonts/Ionicons.ttf"),
      // "Entypo": require("@expo/vector-icons/fonts/Entypo.ttf"),
      // "SimpleLineIcons": require("@expo/vector-icons/fonts/SimpleLineIcons.ttf"),
      // "MaterialIcons": require("@expo/vector-icons/fonts/MaterialIcons.ttf"),
      // //TODO: What's wrong with MaterialCommunityIcons ???
      // "MaterialCommunityIcons": require("@expo/vector-icons/fonts/MaterialCommunityIcons.ttf"),
    });

    await Promise.all([imageAssets, fontAssets]);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setIsReady(true)}
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
