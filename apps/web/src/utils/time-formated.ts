import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function timeFromNow(date: string) {
	return dayjs(date).fromNow()
}

export function timeFullFormated(date: string) {
	return dayjs(date).format('dddd, MMMM D, YYYY h:mm A')
}
