/**
 * @description 时间戳转字符串
 * @function formatTime
 * @returns {string} 根据fmt格式返回对应格式化后的日期字符串
 * @param {number} timestamp - 时间戳
 * @param {string} [fmt = 'yyyy-MM-dd'] - 想要获取格式化后日期字符串的模板
 * @author liukun <919590347@qq.com>
 * @example
 * import { formatTime } from '@wont/utils'
 * // yyyy-MM-dd
 * formatTime(1603809694212)  // returns '2020-10-27'
 * // yyyy/MM/dd
 * formatTime(1603809694212, 'yyyy/MM/dd')  // returns '2020/10/27'
 * // yyyy-MM-dd hh:mm:ss
 * formatTime(1603809694212, 'yyyy-MM-dd hh:mm:ss')  // returns '2020-10-27 22:41:34'
 * // yyyy-MM-dd h:m:s
 * formatTime(1603809694212, 'yyyy-MM-dd h:m:s')  // returns '2020-10-27 22:41:34'
 */

export function formatTime(timestamp: number, fmt = 'yyyy-MM-dd'): string {
    const date = new Date(timestamp)
    let result = fmt
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        result = result.replace(
            RegExp.$1,
            date
                .getFullYear()
                .toString()
                .substr(4 - RegExp.$1.length),
        )
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(result)) {
            result = result.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? o[k]
                    : `00${o[k]}`.substr(`${o[k]}`.length),
            )
        }
    }
    return result
}
