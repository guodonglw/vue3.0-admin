function hasPermission(route, role) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.indexOf(role) !== -1
  } else {
    return true
  }
}

// 该处的role为登录角色，可根据实际需要进行动态生成
export const generateRoutes = function(asyncRoutes:Array<any>, role:string): Array<any> {
  const res:Array<any> = []
  asyncRoutes.forEach(item => {
    const mid = {...item}
    if (hasPermission(mid, role)) {
      if (mid.children) {
        mid.children = generateRoutes(mid.children, role)  // 对子路由进行递归，防止遗漏（同时该部分支持多级子路由的递归生成）
      }
      res.push(mid)
    }
  })
  return res
}