const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

export const getCurrentMonth = ():string => {
    return new Date().toLocaleString('default', { month: 'long' });
}

export const getMonth = (month:number):string => {
    return months[month];
}

export const getAllMonths = ():string[] => {
    return months;
}

export const getDateFormatted = (date:Date):string => {
    const year = date.getFullYear();
    const month = padTo2Digits(date.getMonth() + 1);
    const day = padTo2Digits(date.getDate());

    return (
        [year, month, day].join('-')
    )
}