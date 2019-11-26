import service from '../util/request'

const qs = require('qs')
const baseUrl = 'https://5dd3847e6625890014a6e6ae.mockapi.io/api/vue3/'

export default  {
  login: async (params: Object) => {
    return await service.get(`${baseUrl}login`, {params}).then(res => res).catch(err => err)
  },

  getAdminList: async (params: any) => {
    let url: string
    if (params.id) {
      url = `${baseUrl}users/${params.id}`
    } else {
      url = `${baseUrl}users`
    }
    return await service.get(url).then(res => res).catch(err => err)
  }
}