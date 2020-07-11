const dateFormat = (type, diff = 0, date = '') => {
    const shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const fullMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septempber', 'October', 'November', 'December']

    let d = new Date()
    
    if (date !== '') {
        d = new Date(date)
    }
    
    if (diff !== 0) {
        d.setDate(d.getDate() + diff)
    }    

    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        
        if (type === 1) {
        // Default
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    } else if (type === 2) {
        // Short mode        
        return [day, shortMonth[d.getMonth()]].join(' ');
    } else if (type === 3) {
        // Full mode        
        return [day, fullMonth[d.getMonth()], year].join(' ');
    }
}

const dateDiff = (date1, date2) => {
    let d1= new Date(date1)
    let d2 = new Date(date2)
    
    const t2 = d2.getTime();
    const t1 = d1.getTime();
 
    return parseInt((t2-t1)/(24*3600*1000));
}

export {dateFormat, dateDiff}