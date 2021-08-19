module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      symlinks: false,
    },
  },
  devServer: {
    https: true,
  },
  transpileDependencies: ["@coreui/utils", "@coreui/vue"],
};
