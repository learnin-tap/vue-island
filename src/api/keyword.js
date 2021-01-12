import { HTTP } from '../utils/http-p'

class KeywordModel extends HTTP {
  key = 'q'
  maxLength = 10
  // 获取历史搜索记录
  getHistory() {
    const words = localStorage.getItem(this.key)
    if (!words) return []
    return JSON.parse(words)
  }
  // 获取热搜关键字
  getHot() {
    return this.ask('book/hot_keyword')
  }
  // 添加历史搜索记录
  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    if (!has) {
      // 限制最多十条搜索记录，使用队列来保持最近十条搜索记录的迭代
      const length = words.length
      if (length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      try {
        localStorage.setItem(this.key, JSON.stringify(words))
      } catch (error) {
        console.log('无法设置搜索记录缓存', error)
      }
    }
  }
}

export { KeywordModel }
