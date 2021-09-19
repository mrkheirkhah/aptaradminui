module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      symlinks: false,
    },
  },
  devServer: {
    https: false,
    port: process.env.VUE_APP_ENV_APPLICATION_DEPLOY_PORT,
  },
  transpileDependencies: ["@coreui/utils", "@coreui/vue"],
};
