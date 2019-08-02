// import {Asset,Font} from "expo";
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

/**
 * Prefetch images
 * Example Arg: [require("../assets/images/bg_screen1.jpg")]
 */
export const loadImages = Asset.loadAsync;

/**
 * Add CDN CSS and JS Files to virtual dom
 * Not currently support for native.
 */
export const loadCsss = (urls: string[]) => Promise.resolve(null);
export const loadJss = (urls: string[]) => Promise.resolve(null);

/**
 * Add fonts to virtual dom
 * Example Arg: {"FontAwesome": require("@expo/vector-icons/fonts/FontAwesome.ttf")}
 */
export const loadFonts = Font.loadAsync;
