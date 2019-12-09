const app = {
  state: {
    rememberPass: true,
    isFold: false
  },

  mutations: {
    UPDATE_REMEMBERPASS: (state: Object, isRemember: boolean): void => {
      state['rememberPass'] = isRemember
    },
    UPDATE_ISFOLD: (state: Object, isFold: boolean) : void => {
      state['isFold'] = isFold
    }
  },

  actions: {
    UpdateRememberPass: (ctx: any, isRemember: boolean): void => {
      ctx.commit('UPDATE_REMEMBERPASS', isRemember)
    },

    UpdateIsFold: (ctx: any, isFold: boolean): void => {
      ctx.commit('UPDATE_ISFOLD', isFold)
    }
  }
}

export default app;