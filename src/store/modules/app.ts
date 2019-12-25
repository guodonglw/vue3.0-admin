const app = {
  namespaced: true,
  state: {
    rememberPass: true,  // 是否记住密码
    isFold: false,  // 侧边导航栏是否折叠
    percentage: 30,  // VuexRelated部分进度条百分比
    routerPaths: ""  // 记录路由历史相关
  },

  mutations: {
    // 记住密码相关功能
    UPDATE_REMEMBERPASS: (state: Object, isRemember: boolean): void => {
      state['rememberPass'] = isRemember
    },
    // 侧边导航栏折叠相关功能
    UPDATE_ISFOLD: (state: Object, isFold: boolean) : void => {
      state['isFold'] = isFold
    },
    // vuex部分演示百分比相关功能
    INCREASE_PRECENTAGE: (state: Object, percentage: number): void => {
      state['percentage'] += percentage
      state['percentage'] = state['percentage'] > 100 ? 100 : state['percentage']
    },
    DECREASE_PERCENTAGE: (state: Object, percentage: number): void => {
      state['percentage'] -= percentage
      state['percentage'] = state['percentage'] < 0 ? 0 : state['percentage']
    },
    SET_PERCENTAGE: (state: Object, percentage: number) :void => {
      if (percentage < 0) {
        percentage = 0
      } else if (percentage > 100) {
        percentage = 100
      }
      state['percentage'] = percentage
    },
    // 和路由历史相关
    ADD_ROUTER: (state: Object, path: object): void => {
      let routerPaths = state["routerPaths"]
      if (routerPaths) {
        let reg = new RegExp(JSON.stringify(path))
        state["routerPaths"] = reg.test(routerPaths) ? routerPaths : routerPaths + '_' + JSON.stringify(path)
      } else {
        state["routerPaths"] = JSON.stringify(path)
      }   
    },
    REMOVE_ROUTER: (state: Object, path: object):void => {
      let originPaths = state["routerPaths"]
      let delPath = JSON.stringify(path)
      let reg = new RegExp(delPath + '_')
      if (!reg.test(originPaths)) {
        reg = new RegExp('_' + delPath)
      }
      state["routerPaths"] = originPaths.replace(reg, "")
    },
    RESET_ROUTER: (state: Object): void => {
      state["routerPaths"] = ''
    }
  },

  actions: {
    UpdateRememberPass: (ctx: any, isRemember: boolean): void => {
      ctx.commit('UPDATE_REMEMBERPASS', isRemember)
    },

    UpdateIsFold: (ctx: any, isFold: boolean): void => {
      ctx.commit('UPDATE_ISFOLD', isFold)
    },

    IncreasePercentage: (ctx: any, percentage: number) => {
      ctx.commit('INCREASE_PRECENTAGE', percentage)
    },

    DecreasePercentage: (ctx: any, percentage: number) => {
      ctx.commit('DECREASE_PERCENTAGE', percentage)
    },

    SetPercentage: (ctx: any, percentage: number) => {
      ctx.commit('SET_PERCENTAGE', percentage)
    },

    AddRouter: (ctx: any, path: object) => {
      ctx.commit('ADD_ROUTER', path)
    },

    RemoveRouter: (ctx: any, path: object) => {
      ctx.commit('REMOVE_ROUTER', path)
    },

    ResetRouter: (ctx: any) => {
      ctx.commit('RESET_ROUTER')
    }
  }
}

export default app;