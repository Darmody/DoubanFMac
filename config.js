const config = {
  development: {
    electronStorageKey: 'DOUBAN_DEVELOPMENT',
    window: {
      width: 1024,
      height: 728,
    }
  },
  production: {
    electronStorageKey: 'DOUBAN_PRODUCTION',
    window: {
      width: 475,
      height: 700,
    }
  },
  test: {
    electronStorageKey: 'DOUBAN_TEST',
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
