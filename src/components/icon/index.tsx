import getIconsContext from '@/assets/icons-loader.ts';
import type { FC, ReactElement } from 'react';
import { useMemo } from 'react';
import type { SvgProps } from 'react-native-svg';
import * as z from 'zod';

type Properties = {
  /** 相对于assets/icons下的路径 */
  readonly path: string;
} & SvgProps;

const icons = getIconsContext('icons');
const EXTENSION = 'svg';
const SIZE = 24;

function Icon({ height = SIZE, path, width = SIZE, ...props }: Properties) {
  const iconProperties = { ...props, height, width };
  const SvgIcon = useMemo(() => {
    try {
      const getDefaultSource = () =>
        z
          .object({
            default: z.custom<FC<SvgProps>>(() =>
              z.custom<ReactElement<SvgProps>>(),
            ),
          })
          .parse(icons(`./${path}.${EXTENSION}`)).default;

      return getDefaultSource();
    } catch (error) {
      console.error(`Couldn't load the icon: ${path}.${EXTENSION}`, error);
      throw error;
    }
  }, [path]);

  return <SvgIcon {...iconProperties} />;
}

export default Icon;
