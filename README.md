# EUSY: Expo Universal Starter

<div style="text-align:center"><img src="https://raw.githubusercontent.com/hookedjs/eusy/master/src/assets/img/logo-icon.png" alt="eusy" width="200"/></div>

A low-config, low-bloat, moderately opinionated starter/boilerplate for a universal web+mobile app built upon the managed Expo-CLI workflow. It comes with and demonstrates many commonly used UX patterns. All that with exceptional hot-reload support and < 150kb bundle.  

For this app, universal means the app works on every device that Expo supports: Web, IOS, and Android.

This app is also the bases of the frontend of our full-stack starter, [HookedJS](https://github.com/hookedjs/hookedjs). Hence, the logo for EUSY is a simpler version of HookedJS.

## Demos
- [Web](https://eusy.briandombrowski.now.sh/)
- [Native](https://expo.io/@bdombro/eusy)

## What's included

- An optimized [Expo-CLI](https://docs.expo.io/versions/v34.0.0/workflow/expo-cli/) managed workflow easy developing and testing web and native
  - Highly functional, easy to extend development and production environments, including hot-moodule reloading for native AND web. Hot re-loading is delicate with react-native, and expo doesn't support hot reloading on web out of the box.
  - Easy and fully-automated development, sharing, publishing and notification features
  - Web Bundle analytics with [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer), to hunt down bloated dependencies
  - Support .web.tsx and .native.tsx files, for easy platform specific overrides
  - Support for [styled-jsx](https://www.npmjs.com/package/styled-jsx) in .web.tsx files, for exceptional CSS-in-JSS
- Unified routing api extending [react-router](https://www.npmjs.com/package/react-router), and additional helpers for easy, declarative, animated routing.
- Universal UI Kit: [react-native-elements](https://www.npmjs.com/package/react-router). UI-Kitten works too, if you prefer.
  - Enhanced for even easier theming 
- SEO thanks to [React Helmet](https://www.npmjs.com/package/react-helmet)
- Package Patches that fix some critical show-stopping bugs and enable better universal support, managed with [patch-package](https://www.npmjs.com/package/patch-package)
- Advanced Dot Environmental (.env) File Management and Support
- Typescript + TSLint + Prettier + Special TSLint sauce, using mostly default settings. Strict mode coming soon.
- [Hooks](https://reactjs.org/docs/hooks-intro.html) - Fully supported and preferred
- [MOBX](https://www.npmjs.com/package/mobx) - Popular, easy, distributed sharable app and component state
- Automated SVG to TSX file Conversion
- Automated index.tsx generation, thanks to [create-ts-index](https://www.npmjs.com/package/create-ts-index)
- Git hooks clean code, run tests and block broken commits, thanks to [Husky](https://www.npmjs.com/package/husky) and [Lint-staged](https://www.npmjs.com/package/lint-staged)
- Includes a production-grade web server, built on [Express](https://www.npmjs.com/package/express) 
- [Jest](https://www.npmjs.com/package/jest) The most popular JS testing framework - coming soon
- Continuous Integration and Deployment thanks to [Zeit's Now Service](https://zeit.co/now)


## What's with the name?

EUSY = An acronym of "Expo Universal Starter" with a 'Y' on the end. It's intentionally misspelled 'easy', so it's a play on words.


## TODO:

- Submit to Apple Store
- Implement form validation
- Fix typescript violations
- Extend react-router-native-stack to allow for horizontal animation-direction control.
- Extend react-router-native-stack to treat sidebar like header and footer wrt animations
- Implement testing (todo)
- Extend react-router-native-stack to work on react-native-web


## Long-Term Goals

- Find or Dev a tool to generate sitemap.xml files
- Support for Internet Explorer. Consider using core-js.
- Resolve bug that explodes bundle size: https://github.com/expo/expo-cli/issues/919
- SSR:
  - ref: https://github.com/necolas/react-native-web/blob/master/docs/guides/server-side-rendering.md
  - feature request: https://github.com/expo/web-examples/issues/18
  - I think it may be possible, but cannot explore further until the expo production bundler is fixed
  - If SSR is impossible, upgrade to use prerender.io service
- Code Splitting - I've tried but they all seem to break HMR, Typesafety and/or SSR, so we don't use them. Tried React.Lazy, @loadable/component, react-loadable
 
 
## Tips

- How to open dev tools on simulator: CMD+D for menu in ios Sim, CMD+M for menu in android sim, shake on real devices.


## Get Started

First, ensure you have the system dependencies:

- Latest XCode on OSX
- Build tools on linux


## Publishing IOS

You can easily publish to Expo using `npx expo:publish`. To publish to Apple, there are many steps. I recommend you do the following:

1. First publish your app to expo
1. Ensure you have an Apple developer subscription
1. Update app.json with your apps metadata if you haven't
1. Follow the [expo instructions](https://docs.expo.io/versions/v34.0.0/distribution/building-standalone-apps/) to bundle and deploy


Tips:

1. Application Loader is included with XCode. To open, simple search for it using CMD+Space
1. To more easily manage your App Store metadata, you should consider [fastlane deliver](https://blog.expo.io/manage-app-store-metadata-in-expo-with-fastlane-deliver-1c00e06b73bf)  

- 


## Publishing Android

You can easily publish to Expo using `npx expo:publish`. To publish to Google, there are many steps. I recommend you do the following:

1. First publish your app to expo
1. `npx expo build:android`
1. More coming soon
