const config = {
  development: {
    electronStorageKey: 'DOUBAN_DEVELOPMENT',
    persistAuthKey: 'doubanfmac_development',
    window: {
      width: 1024,
      height: 728,
      resizable: true,
    },
    url: 'src/app.html'
  },
  production: {
    electronStorageKey: 'DOUBAN_PRODUCTION',
    persistAuthKey: 'doubanfmac_production',
    window: {
      width: 372,
      height: 644,
      resizable: false,
    },
    url: 'dist/app.html'
  },
  test: {
    electronStorageKey: 'DOUBAN_TEST',
    persistAuthKey: 'doubanfmac_test',
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
