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
        if ((name === 'admin' && pass === 'admin') || (name === 'editor' && pass === 'editor')) {
          resolve ([200, {code: 0, msg: '成功', result: {}}])
        } else {
          resolve ([200, {code: 1, msg: '账号/密码错误', result: {}}])
        }
      })
    })

    // 获取账号列表
    mock.onGet('/admin').reply(config => {
      let { page, id } = config.params
      let mockAdmins = _Admins.filter(admin => {
        if (id) {
          return admin['id'] == id ? true : false
        } else {
          return true
        }
      })

      let total = mockAdmins.length
      mockAdmins = total <=1 ? mockAdmins : mockAdmins.filter((u, index) => index < 15*page && index >= 15*(page - 1))
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

    // 新增账号
    mock.onPost('/admin').reply(config => {
      let newVal = JSON.parse(config.data);
      let newAdmin = newVal['params']
      newAdmin['addr'] = newAdmin['addr'] || '未知'
      newAdmin['id'] = _Admins[_Admins.length - 1].id + 1
      _Admins.push(newAdmin)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: '新增成功',
            result: {}
          }])
        }, 500)
      })
    })

    // 修改账号
    mock.onPut('/admin').reply(config => {
      let newVal = JSON.parse(config.data)
      let updateVal = newVal['params']
      _Admins.some(u => {
        if (u.id === updateVal.id) {
          u.name = updateVal.name
          u.email = updateVal.email
          return true
        }
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: '修改成功',
            result: {}
          }])
        }, 500)
      })
    })

    // 删除账号
    mock.onDelete('/admin').reply(config => {
      let val = config['params']
      let { id } = val
      _Admins = _Admins.filter(u => u.id !== id)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: '删除成功',
            result: {}
          }])
        }, 500)
      })
    })

  }
}