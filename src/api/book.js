import { HTTP } from "../utils/http-p";

class BookModel extends HTTP {
  getHotList() {
    return this.ask("book/hot_list");
  }

  search(start, q) {
    return this.ask(`book/search?summary=0&q=${q}&start=${start}`);
  }

  getBookCount() {
    return this.ask("book/favor_count");
  }

  getDetail(isbn) {
    return this.ask(`book/detail/${isbn}`);
  }

  getLikeStatus(bid) {
    return this.ask(`book/favor/${bid}`);
  }

  getComments(bid) {
    return this.ask(`book/short_comment/${bid}`);
  }

  postComments(bid, comment) {
    return this.ask(`book/add/short_comment`, "POST", {
      book_id: bid,
      content: comment,
    });
  }
}

export { BookModel };
