/* eslint-disable strict */
const BAR = Symbol('Application#bar');

module.exports = {
  log(param) {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    console.log('/extend -> /applicationjs', param);
  },
  get bar() {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    if (!this[BAR]) {
      // 实际情况肯定更复杂
      this[BAR] =
        this.config.news.serverUrl + '?limit=' + this.config.news.limit;
    }
    return this[BAR];
  },
};
