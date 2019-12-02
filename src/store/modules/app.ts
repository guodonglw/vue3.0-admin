const app = {
  state: {
    rememberPass: true
  },

  mutations: {
    UPDATE_REMEMBERPASS: (state: Object, isRemember: boolean): void => {
      state['rememberPass'] = isRemember
    }
  },

  actions: {
    UpdateRememberPass: (ctx: any, isRemember: boolean): void => {
      ctx.commit('UPDATE_REMEMBERPASS', isRemember)
    }
  }
}

export default app;