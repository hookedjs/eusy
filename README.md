Customizations vs. Standard Expo App


Depends on expo-cli

## TODO:

- ~~Research universal frameworks and decide if building a custom boilerplate is worthwhite (done). I tried [re-start](https://github.com/react-everywhere/re-start), [Razzle](https://github.com/jaredpalmer/razzle/tree/master/examples/with-react-native-web), [Rewired](https://github.com/react-native-elements/react-native-elements-app), and many more github projects. Conclusion: none of them fully solved the need for ease of use and completeness. The closest was expo 33 examples, which this boilerplate is built on.~~  
- ~~Install expo 33 with merged examples typescript and react-native-web (done)~~
- ~~Install react-hot-loader for web so we can hot reload on web (done)~~
- ~~Install react-native-ui-kitten ui kit for rapid dev and stress testing the bundling. (done)~~
- ~~Universal Font file Loading (done). Based on [Rewired](https://github.com/react-native-elements/react-native-elements-app)
- ~~Universal Routing with react-router 4 (done)~~
- ~~Implement a static server for production~~
- SEO with Helmet (todo)
- Resolve missing favicon and manifest in index.html 
- Implement testing (todo)


## Long-Term Goals

- Upgrade babel-preset-expo when it gets fixed. Might bring HMR to web without need for customization.
- SSR: I've Tried Razzle and doing custom, but it's really hard. Also, limited gains since bundle is currently 104kb brotli zipped. 
- Code Splitting - I've tried but they all seem to break HMR and/or Typesafety, so we don't use them. Tried React.Lazy, @loadable/component, react-loadable

## Decisions:

- Routing: react-router seems to be the only router library that works well with both native and web. Considered react-navigation

 

 
