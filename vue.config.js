const proxies = require('./proxy.config');
const proxyConf = {};

proxies.forEach(proxy => {
  const {
    server,
    prefix
  } = proxy;

  proxyConf[prefix] = {
    target: server,
    changeOrigin: true
  };

});

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: proxyConf,
    open: true
  }
};
