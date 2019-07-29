import {
  NativeRouter as Router,
  Link,
  Route,
  Redirect,
  Switch,
  withRouter
} from "react-router-native";
import Stack from 'react-router-native-stack';

/*
 * Remove Platform specific exports :/
 */

export { Link, Route, Redirect, Router, Switch, Stack, withRouter };
