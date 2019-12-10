const app = {
  state: {
    rememberPass: true,  // 是否记住密码
    isFold: false,  // 侧边导航栏是否折叠
    percentage: 30  // VuexRelated部分进度条百分比
  },

  mutations: {
    UPDATE_REMEMBERPASS: (state: Object, isRemember: boolean): void => {
      state['rememberPass'] = isRemember
    },
    UPDATE_ISFOLD: (state: Object, isFold: boolean) : void => {
      state['isFold'] = isFold
    },
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
    }
  }
}

export default app;