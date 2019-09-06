import React from 'react';
import { Avatar as RNEAvatar, AvatarProps } from 'react-native-elements';
import { ImageURISource } from 'react-native';

export const Avatar = ({ title, source, ...rest }: AvatarProps) => {
  source = source as ImageURISource;
  if (source && source.uri) return <RNEAvatar source={source} {...rest} />;
  else return <RNEAvatar title={title} {...rest} />;
};
