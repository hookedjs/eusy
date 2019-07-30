Customizations vs. Standard Expo App

- Install react-hot-loader for web
- Implement code splitting with loadable-components
- Install SSR (todo)
- Implement testing (todo)
- Universal Font file Loading
- Universal Routing with react-router 4
- SEO with Helmet (todo)
- UI-Kitten UI Kit

Depends on expo-cli

TODO:

- Upgrade babel-preset-expo when it gets fixed. Might bring HMR to web without need for customization.


Decisions:

Code Splitting - They all seem to break HMR and/or Typesafety, so we don't use them. Tried React.Lazy, @loadable/component, react-loadable 

 
