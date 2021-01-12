import { HTTP } from '../utils/http-p'

class BookModel extends HTTP {
  getHotList() {
    return this.ask('book/hot_list')
  }

  search(start, q) {
    return this.ask(`book/search?summary=0&q=${q}&start=${start}`)
  }

  getBookCount() {
    return this.ask('book//favor/count')
  }

  getDetail(bid) {
    return this.ask(`book/${bid}/detail`)
  }

  getLikeStatus(bid) {
    return this.ask(`book/${bid}/favor`)
  }

  getComments(bid) {
    return this.ask(`book/${bid}/short_comment`)
  }

  postComments(bid, comment) {
    return this.ask(`book/add/short_comment`, 'POST', {
      book_id: bid,
      content: comment,
    })
  }
}

export { BookModel }
