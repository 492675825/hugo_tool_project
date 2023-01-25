import request from '@/utils/request'

export default {
  getdata() {
    return request({
      url: 'http://127.0.0.1:8000/goldData/getDataFromWeb',
      method: 'get'
    })
  }
}
