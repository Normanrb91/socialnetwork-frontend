import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

export const timeAgo = (timeStamp) => {
    return moment(timeStamp).startOf('minute').fromNow()
}

export const timeInit = (timeStamp) => {
    const month = moment(timeStamp).format('MMMM')
    const year = moment(timeStamp).format('YYYY')
    return `Se unió en ${month} de ${year}`
}