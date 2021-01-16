export const classicBeh = {
  props: {
    img: String,
    content: String,
    display: Boolean,
  },
}

export const pagination = {
  data() {
    return {
      dataArray: [],
      total: null,
      noneResult: false,
      loading: false,
    }
  },
  methods: {
    // 更新数据
    setMoreData(dataArray) {
      const tempArray = this.dataArray.concat(dataArray)
      this.dataArray = tempArray
    },
    getCurrentStart() {
      return this.dataArray.length
    },
    // 数据总量
    setTotal(total) {
      this.total = total
      if (total === 0) {
        this.noneResult = true
      }
    },
    // 还有更多数据
    hasMore() {
      if (this.dataArray.length >= this.total) return false
      return true
    },
    // 初始化所有搜索书籍的相关属性
    initialize() {
      this.dataArray = []
      this.noneResult = false
      this.loading = false
      this.total = null
    },
    // 判断是否上锁
    isLocked() {
      return this.loading ? true : false
    },
    // 已上锁
    locked() {
      this.loading = true
    },
    // 未上锁
    unLocked() {
      this.loading = false
    },
  },
}
