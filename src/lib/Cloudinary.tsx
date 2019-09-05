import { CloudinaryApiKey, CloudinaryCloudName } from '../config/App.config';
import { Platform } from 'react-native';

class CloudinaryClass {
  cloudName = CloudinaryCloudName;
  apiKey = CloudinaryApiKey;
  // api_secret = 'a676b67565c6767a6767d676xxxxxxxx';

  // Docs: https://cloudinary.com/documentation/image_transformations#delivering_optimized_and_responsive_media_assets
  url(
    public_id: string,
    options: {
      type?: 'fetch'; // default 'upload'. Fetch says to use the public_id as an external url and fetch it
      width?: number;
      height?: number;
      crop?:
        | 'scale'
        | 'fit'
        | 'mfit'
        | 'fill'
        | 'lfill'
        | 'limit'
        | 'pad'
        | 'lpad'
        | 'mpad'
        | 'crop'
        | 'thumb'
        | 'imagga_crop'
        | 'imagga_scale';
      fetchFormat?: 'auto' | 'png' | 'jpg' | 'webp' | 'jpeg-xr'; // file type conversion. default = same as orig, but we are setting default to auto
      gravity?: 'face'; // gravitate to face for cropping
    }
  ) {
    let urlOptions = [];
    if (options.width) urlOptions.push(`w_${options.width}`);
    if (options.height) urlOptions.push(`h_${options.height}`);
    if (options.crop) urlOptions.push(`c_${options.crop}`);
    if (options.fetchFormat) urlOptions.push(`f_${options.fetchFormat}`);
    else urlOptions.push(`f_auto`);
    if (options.gravity) urlOptions.push(`g_${options.gravity}`);

    let url = 'https://res.cloudinary.com';

    if (Platform.OS === 'web' && window.location.protocol === 'http:') url.replace('https', 'http');

    if (options.type === 'fetch')
      url += `/${this.cloudName}/image/fetch/${urlOptions}/${public_id}`;
    else url += `/${this.cloudName}/image/upload/${urlOptions}/${public_id}`;

    return url;
  }
}
export const Cloudinary = new CloudinaryClass();
