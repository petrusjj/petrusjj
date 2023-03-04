const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = async function (env, argv) {
  const currentConfiguration = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.

  const newConfiguration = {
    ...currentConfiguration,
    plugins: [
      ...currentConfiguration.plugins,
      // 1. Make the wasm file available to the build system
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/canvaskit-wasm/bin/full/canvaskit.wasm",
          },
        ],
      }),
      // 2. Polyfill fs and path module from node
      new NodePolyfillPlugin(),
    ],
    externals: {
      ...currentConfiguration.externals,
    },
    resolve: {
      ...currentConfiguration.resolve,
      fallback: {
        fs: false,
        os: false,
        path: false,
      },
    },
  };

  return newConfiguration;
};
