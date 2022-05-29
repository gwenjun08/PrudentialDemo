export function getWeekDay(num) {
    if(num == 2) {
        return '一'
    } else if(num == 3) {
        return '二'
    } else if(num == 4) {
        return '三'
    } else if(num == 5) {
        return '四'
    } else if(num == 6) {
        return '五'
    } else if(num == 0) {
        return '六'
    } else if(num == 1) {
        return '日'
    } else {
        return ''
    }
}