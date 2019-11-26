export const timeout = function(ms = 10000) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      reject('timeout')
    }, ms)
  })
}