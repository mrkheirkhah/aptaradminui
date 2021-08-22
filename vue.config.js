module.exports = {
  lintOnSave: false,
  publicPath: "/ui/",
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      symlinks: false,
    },
  },
  devServer: {
    https: false,
  },
  transpileDependencies: ["@coreui/utils", "@coreui/vue"],
};
