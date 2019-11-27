import Mock from "mockjs";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Admins } from './data/admin'
import { _ } from "core-js";

let _Admins = Admins

export default {
  bootstrap() {
    let mock = new MockAdapter(axios)

    mock.onGet('/success').reply(200, {
      msg: 'success'
    })

    mock.onGet('/error').reply(500, {
      msg: 'failure'
    })

    // 登录
    mock.onGet('/login').reply(config => {
      let { name, pass } = config.params
      return new Promise((resolve, reject) => {
        if (name === 'admin' && pass === 'admin') {
          resolve ([200, {code: 0, msg: '成功', result: {}}])
        } else {
          resolve ([200, {code: 1, msg: '账号/密码错误', result: {}}])
        }
      })
    })

    // 获取用户列表
    mock.onGet('/admin').reply(config => {
      let { page, id } = config.params
      console.log(id)
      let mockAdmins = _Admins.filter(admin => {
        console.log(admin)
        if (id && admin.id.indexOf(id) == -1) return false;
        return true
      })
      console.log(mockAdmins)

      let total = mockAdmins.length
      mockAdmins = mockAdmins.filter((u, index) => index < 15*page && index >= 15*(page - 1))

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success',
            result: {
              total,
              admins: mockAdmins
            }
          }])
        })
      })
    })
  }
}