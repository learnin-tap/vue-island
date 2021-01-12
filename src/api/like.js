import { HTTP } from '../utils/http.js'

class LikeModel extends HTTP {
  like(behavior, artID, category) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.ask({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category,
      },
      success: (data) => {
        console.log(data)
      },
    })
  }

  getClassicLikeStatus(artID, category, sCallback) {
    this.ask({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback,
    })
  }
}

export { LikeModel }
