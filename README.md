# EUSY: Expo Universal Starter

<p align="center"><img src="https://raw.githubusercontent.com/hookedjs/eusy/master/src/assets/img/logo-icon.png" alt="eusy" width="200"/></p>

A low-config, low-bloat, moderately opinionated starter/boilerplate for a universal web+mobile app built upon the managed Expo-CLI workflow. It comes with and demonstrates many commonly used UX patterns. All that with exceptional hot-reload support and < 150kb bundle.  

For this app, universal means the app works on every device that Expo supports: Web, IOS, and Android.

This app is also the bases of the frontend of our full-stack starter, [HookedJS](https://github.com/hookedjs/hookedjs). Hence, the logo for EUSY is a simpler version of HookedJS.

#### Demos
- [Web](https://eusy.briandombrowski.now.sh/)
- [Native](https://expo.io/@bdombro/eusy)

#### Roadmap

See Project: https://github.com/orgs/hookedjs/projects/1

## Features

- [x] An optimized [Expo-CLI](https://docs.expo.io/versions/v34.0.0/workflow/expo-cli/) managed workflow easy developing and testing web and native
  - Highly functional, easy to extend development and production environments, including hot-moodule reloading for native AND web. Hot re-loading is delicate with react-native, and expo doesn't support hot reloading on web out of the box.
  - Easy and fully-automated development, sharing, publishing and notification features
  - Web Bundle analytics with [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer), to hunt down bloated dependencies
  - Support .web.tsx and .native.tsx files, for easy platform specific overrides
  - Support for [styled-jsx](https://www.npmjs.com/package/styled-jsx) in .web.tsx files, for exceptional CSS-in-JSS
- [x] Unified routing api extending [react-router](https://www.npmjs.com/package/react-router)
  - New unimodules: TextLink for links inside of Text elements
  - Native-style Animated transitions with [react-router-native-stack](https://www.npmjs.com/package/react-router-native-stack). 
    - We forked it to add unimodule support
    - Note: Animations don't currently work on Web during development, but do in Production. See [Issue 3](https://github.com/hookedjs/eusy/issues/3).
- [x] Universal UI Kit: [react-native-elements](https://www.npmjs.com/package/react-router). Enhanced for even easier theming. 
- [x] SEO thanks to [React Helmet](https://www.npmjs.com/package/react-helmet)
- [x] Package Patches that fix some critical show-stopping bugs and enable better universal support, managed with [patch-package](https://www.npmjs.com/package/patch-package)
- [x] Advanced Dot Environmental (.env) File Management and Support
- [x] Typescript + TSLint + Prettier + Special TSLint sauce, using mostly default settings.
- [x] [Hooks](https://reactjs.org/docs/hooks-intro.html) - Fully supported and preferred
- [x] [MOBX](https://www.npmjs.com/package/mobx) - Popular, easy, distributed sharable app and component state
- [x] Automated SVG to TSX file Conversion
- [x] Git hooks that clean code, run tests and block broken commits, thanks to [Husky](https://www.npmjs.com/package/husky) and [Lint-staged](https://www.npmjs.com/package/lint-staged)
- [x] Includes a production-grade web server, built on [Express](https://www.npmjs.com/package/express) 
- [x] Continuous Integration and Deployment thanks to [Zeit's Now Service](https://zeit.co/now)
- [ ] [Jest](https://www.npmjs.com/package/jest) The most popular JS testing framework


## What's with the name?

EUSY = An acronym of "Expo Universal Starter" with a 'Y' on the end. It's intentionally misspelled 'easy', so it's a play on words.


## Get Started

First, ensure you have the system dependencies. As of now, MacOS is required in order to develop IOS apps. Also, this boilerplate will likely not work on Windows.

1. [Install homebrew](https://brew.sh/)
1. [Install nvm](https://github.com/nvm-sh/nvm#install--update-script)
1. [Install Docker](https://docs.docker.com/docker-for-mac/install/)
1. Install Xcode from the App Store and open it to accept the user agreement.
1. Follow [the official React Native instructions](https://facebook.github.io/react-native/docs/getting-started.html) to configure your machine for IOS and Android using the "React Native CLI Quickstart" tab, NOT the "Expo CLI Quickstart" tab.
 
Then, install more dependencies

```
brew install gnu-sed
brew install postgres
brew install node
brew install watchman
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8
nvm install 10
nvm use 10
npm i -g typescript@3.4.5 yarn
yarn
```

Now, you can run the development server and build the app.

To run the development service run `npx expo start`. After that, you can launch web, IOS or Android using the prompts.

Tips:

- You can't start the Android simulator from the expo-cli. Instead, you have to start it first using Android Studio. Then, expo-cli can find it.
- If the IOS emulator isn't running when you start it from expo, you may see an non-critical error. 
- How to open dev tools on simulator: CMD+D for menu in ios Sim, CMD+M for menu in android sim, shake on real devices.


## Publishing IOS

You can easily publish to Expo using `npx expo:publish`. To publish to Apple, there are many steps. I recommend you do the following:

1. First publish your app to expo
1. Ensure you have an Apple developer subscription
1. Update app.json with your apps metadata if you haven't
1. Follow the [expo instructions](https://docs.expo.io/versions/v34.0.0/distribution/building-standalone-apps/) to bundle and deploy


Tips:

- Application Loader is included with XCode. To open, simple search for it using CMD+Space
- To more easily manage your App Store metadata, you should consider [fastlane deliver](https://blog.expo.io/manage-app-store-metadata-in-expo-with-fastlane-deliver-1c00e06b73bf)   


## Publishing Android

You can easily publish to Expo using `npx expo:publish`. To publish to Google, there are many steps. I recommend you do the following:

1. First publish your app to expo
1. Ensure you have an Google Store developer account?
1. Update app.json with your apps metadata if you haven't
1. Follow the [expo instructions](https://docs.expo.io/versions/v34.0.0/distribution/building-standalone-apps/) to bundle and deploy
1. More coming soon
