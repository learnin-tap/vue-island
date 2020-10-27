import { HTTP } from "../utils/http";
const http = new HTTP();

class ClassicModel extends HTTP {
  getLatest(sCallback) {
    http.ask({
      url: "classic/latest",
      // method可以不写，默认是get
      success: (res) => {
        sCallback(res);
        this._setLatestIndex(res.index); //缓存最新期刊的index值
        let key = this._getkey(res.index);
        localStorage.setItem(key, res);
      },
    });
  }

  // 将获得上一期和获得下一期的期刊内容两部分合并
  getClassic(index, nextOrPrevious, sCallback) {
    // 将key写入缓存
    let key =
      nextOrPrevious == "next"
        ? this._getkey(index + 1)
        : this._getkey(index - 1);
    let classic = localStorage.getItem(key);
    if (!classic) {
      this.ask({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          localStorage.setItem(this._getkey(res.index), res);
          sCallback(res);
        },
      });
    } else {
      sCallback(classic);
    }
  }

  isFirst(index) {
    return index === 1 ? true : false;
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return latestIndex === index ? true : false;
  }

  getMyFavor(success) {
    const params = {
      url: "classic/favor",
      success: success,
    };
    this.ask(params);
  }

  _setLatestIndex(index) {
    localStorage.setItem("latest", index);
  }

  _getLatestIndex() {
    const index = localStorage.getItem("latest");
    return index;
  }

  _getkey(index) {
    let key = "classic-" + index;
    return key;
  }
}

export { ClassicModel };
