const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#329d9c',
              // '@layout-sider-background': '#21506f',
              '@layout-header-background': '#21506f',
              '@border-radius-base': '5px',
              '@select-item-selected-bg': '#428bca',
              '@select-item-selected-color': '#fff',
              '@select-item-active-bg': '#f5f5f5',
              '@descriptions-title-margin-bottom': '10px',
              '@form-item-margin-bottom': '8px',
              '@table-header-bg': '#21506f',
              '@table-header-color': '#ffffff',
              '@font-size-base': '13px',
              '@border-color-base': '#b6b6b6',
              '@modal-header-bg': '#dbe3e8'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
