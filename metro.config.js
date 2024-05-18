const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    resolver: {
        assetExts: ['gpx', 'png'], // Add 'gpx' to the list of asset extensions
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
