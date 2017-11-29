// 获取地址栏参数
export const GetQueryString = (name: string) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return r[2]
  }
  return null
}