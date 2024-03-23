'use strict';

module.exports = {
  // https://www.eggjs.org/zh-CN/intro/egg-and-koa#%E6%89%A9%E5%B1%95
  get isIOS() {
    const iosReg = /iphone|ipad|ipod/i;
    return iosReg.test(this.get('user-agent'));
  },
};
