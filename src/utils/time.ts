/**
 * 获取不同的时间段 早上，中午，下午，晚上
 * @returns
 */
export function getTime() {
  let message = ''
  const hours = new Date().getHours()
  if (hours <= 9) {
    message = '早上'
  } else if (hours <= 12) {
    message = '中午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
