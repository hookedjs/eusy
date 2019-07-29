// import {Asset,Font} from "expo";
import {Asset} from 'expo-asset';
import * as Font from 'expo-font'

export const cacheAssets = Asset.loadAsync;
export const cacheFonts = Font.loadAsync;
