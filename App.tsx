import React, {useState} from 'react';
import {Linking} from "expo";
import {mapping, light as lightTheme} from '@eva-design/eva';
import {ApplicationProvider} from 'react-native-ui-kitten';
import {cacheAssets, cacheFonts} from "./src/helpers/AssetsCaching";
import {AppLoading} from "./src/components/AppLoading";
import {Sleep} from "./src/helpers/Sleep";
import {createAppContainer, createStackNavigator} from "react-navigation";

import {Header} from "./src/components/Header";

// TODO: Consider an overlay component. See https://github.com/jmurzy/react-router-native
// TODO: Lazy loading
import Home from "./src/Home";
import InnerPage from "./src/InnerPage";
import Error from "./src/Error";
import {Footer} from "./src/components/Footer";

const prefix = Linking.makeUrl('/');
const AppNavigator = () => {
  const Container = createAppContainer(createStackNavigator({
    Home: {
      screen: Home,
      path: ''
    },
    Page: {
      screen: InnerPage,
      path: 'page'
    }
  }));
  return <Container uriPrefix={prefix}/>;
};

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
      <AppNavigator/>
    </ApplicationProvider>
  );
}
