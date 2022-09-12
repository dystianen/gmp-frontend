const withAntdLess = require('next-plugin-antd-less');
const antdVariables = require('./styles/antd_variables');

module.exports = withAntdLess({

  modifyVars: antdVariables,

  lessVarsFilePath: './styles/variables.less',

  lessVarsFilePathAppendToEndOfContent: false,

  cssLoaderOptions: {},

  webpack(config) {
    return config;
  },

  reactStrictMode: true,
});
