// import axios from "axios";

const PackageJson = require("../package.json");
const AppJson = require("../app.json").expo;

// Const variables
console.dir(AppJson);
export const AppName = AppJson.name;
export const AppDescription = AppJson.description;
const Logo = "/static/logo.svg";
export {Logo, Logo as LogoWhite};
export const CookieConsentIsEagerlyAccepted = true;
export const IpgeolocationioKey = "b411927ec4954792905331b2dee8cb7b";

// Calculated variables

export const Version = PackageJson.version;
export const GetEnv = () =>
  window.location.hostname.includes("hookedjs.org") && "production"
  || window.location.hostname.includes("stage.hookedjs.org") && "staging"
  || "dev";

export const ApiUrl = "/graphql";
// export const Api = axios.create({baseURL: ApiUrl, timeout: 10000});

export const GetMixpanelId = () => GetEnv() === "production"
  ? ""
  : "";

export const GetGoogleTagManagerTag = () => GetEnv() === "production"
  ? `(function(w,d,s,l,i)(...GTM-XXXXXXX');`
  : `(function(w,d,s,l,i)(...GTM-XXXXXXX');`;

