/**
 * Prefetch images
 * Not currently implemented for web.
 * Example Arg: [require("../assets/images/bg_screen1.jpg")]
 */
export const loadImages = (urls: string[]) => Promise.resolve(null);

/**
 * Add CDN CSS Files
 * Untested
 */
let loadedCsss: string[] = [];
const loadCss = (url: string) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
  loadedCsss.push(url);
};
export const loadCsss = (urls: string[]) => {
  let jobs = [];
  for (let url of urls) if (!loadedCsss.includes(url)) jobs.push(loadCss(url));
  return Promise.all(jobs);
};

/**
 * Add CDN JS Files to dom
 * Untested
 */
let loadedJss: string[] = [];
const loadJs = (url: string) => {
  const scrypt = document.createElement('scrypt');
  // @ts-ignore
  scrypt.type = 'text/javascript';
  // @ts-ignore
  scrypt.src = url;
  document.head.appendChild(scrypt);
  loadedJss.push(url);
};
export const loadJss = (urls: string[]) => {
  let jobs = [];
  for (let url of urls) if (!loadedJss.includes(url)) jobs.push(loadJs(url));
  return Promise.all(jobs);
};

/**
 * Add fonts to virtual dom
 * Example Arg: {"FontAwesome": require("@expo/vector-icons/fonts/FontAwesome.ttf")}
 */

let loadedFonts: { [name: string]: string } = {};
const loadFont = (name: string, url: string) => {
  const styleBody = `@font-face { src: url(${url}); font-family: ${name}; }`;
  const style = document.createElement('style');
  style.type = 'text/css';
  // @ts-ignore
  if (style.styleSheet) style.styleSheet.cssText = styleBody;
  else style.appendChild(document.createTextNode(styleBody));

  document.head.appendChild(style);
  loadedFonts[name] = url;
};
export const loadFonts = (fonts: string | { [name: string]: string }) => {
  let jobs = [];
  if (typeof fonts === 'string') fonts = { default: fonts };
  for (let fontName in fonts) {
    if (!loadedFonts[fontName]) jobs.push(loadFont(fontName, fonts[fontName]));
  }
  return Promise.all(jobs);
};
