const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = mergeConfig(defaultConfig, {
  /* your config */
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer/react-native',
    ),
    unstable_allowRequireContext: true,
  },
  resolver: {
    sourceExts: [...sourceExts, 'svg'],
    assetExts: assetExts.filter(ext => ext !== 'svg'),
  },
});

module.exports = withNativeWind(config, {
  input: './src/styles/tailwind.css',
  inlineRem: 16,
});
