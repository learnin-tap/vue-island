import request from "./request";
const tips = {
  1: "抱歉，出现了一个错误",
  1005: "appkey无效，请申请appkey",
  3000: "期刊不存在",
};

class HTTP {
  //不传方法则默认get
  ask(url, method = "GET", data = {}) {
    return new Promise((resolve, reject) => {
      this._ask(url, resolve, reject, method, data);
    });
  }

  _ask(url, resolve, reject, method = "get", data = {}) {
    request({
      url: process.env.VUE_APP_BASE_API + "v1/" + url,
      method,
      data,
    })
      .then((res) => {
        const code = res.status.toString(); //将返回的Number型状态码转为String型
        if (code.startsWith("2")) {
          resolve(res.data);
        } else {
          reject();
          const error_code = res.data.error_code;
          this._show_error(error_code);
        }
      })
      .catch(() => {
        this._show_error(1); //给默认错误
      });
  }

  _show_error(error_code) {
    //没有对应错误则给默认错误
    if (!error_code) error_code = 1;
    const tip = tips[error_code];
    // 弹框加载tip错误，先留这儿
    console.log("报错", tip ? tip : tip[1]);
  }
}

export { HTTP };
