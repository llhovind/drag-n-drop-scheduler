import { format, isValid } from 'date-fns'

export function date2key(date) {

    if (isValid(date)) {

        return format(date, 'yyyyMMdd');
    }

    return (Math.random() * 10000).toString()
}