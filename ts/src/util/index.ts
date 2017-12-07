// 获取地址栏参数
export const GetQueryString = (name: string) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return r[2]
  }
  return null
}

export const checkDateIsBetween = (
  _currentDate: number,
  dateList: Array<string>
): boolean => {
  let startDateArray: any = dateList[0].split('-')
  let endDateArray: any = dateList[1].split('-')
  let startSecond: number = new Date(
    startDateArray[0] - 0,
    startDateArray[1] - 1,
    startDateArray[2]
  ).getTime()
  let endSecond: number = new Date(
    endDateArray[0] - 0,
    endDateArray[1] - 1,
    endDateArray[2]
  ).getTime()
  if (_currentDate >= startSecond && _currentDate <= endSecond) {
    return true
  }
  return false
}
