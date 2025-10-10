import getAssetsContext from '@/assets/icons-loader.ts';
import { useMemo } from 'react';
import type { ImageProps, ImageSourcePropType } from 'react-native';
import { Image } from 'react-native';
import * as z from 'zod';

type Properties = {
  /** 图片扩展名，默认png */
  readonly extension?: string;
  /** 相对于assets/images下的路径 */
  readonly path: string;
} & Omit<ImageProps, 'source'>;

const images = getAssetsContext('images');

function AssetsImage({ extension = 'png', path, ...props }: Properties) {
  const image = useMemo(() => {
    const getDefaultSource = () =>
      z.custom<ImageSourcePropType>().parse(images(`./${path}.${extension}`));

    try {
      return getDefaultSource();
    } catch (error) {
      console.error(`Couldn't load the image: ${path}`, error);
      return undefined;
    }
  }, [path, extension]);

  return image && <Image source={image} {...props} />;
}

export default AssetsImage;
