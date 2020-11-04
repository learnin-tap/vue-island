import request from "./request";

const tips = {
  1: "抱歉，出现了一个错误",
  1005: "appkey无效，请前往www.7yue.pro申请",
  3000: "期刊不存在",
};

class HTTP {
  ask(params) {
    // console.log(params);
    // 如果用户不传method，给默认method
    if (!params.method) {
      params.method = "GET";
    }
    request({
      url: process.env.VUE_APP_BASE_API + "v1/" + params.url,
      method: params.method,
      data: params.data,
    })
      .then((res) => {
        let code = res.status.toString(); //将返回Number型的状态码转为String型
        if (code.startsWith("2")) {
          // 首先判断params.success是不是空，为空则不执行
          params.success && params.success(res.data);
        } else {
          let error_code = res.data.error_code;
          this._show_error(error_code);
        }
      })
      .catch(() => {
        this._show_error(1);
      });
  }

  _show_error(error_code) {
    if (!error_code) {
      //如果没有对应错误，则给一个默认错误提示
      error_code = 1;
    }
    const tip = tips[error_code];
    console.log(tip ? tip : tips[1]);
  }
}

export { HTTP };
