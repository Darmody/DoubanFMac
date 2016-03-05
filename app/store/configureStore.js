module.exports = require(`./configureStore.${process.env.NODE_ENV || 'development'}`);
