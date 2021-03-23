let moment = require('moment')

let dateFormatter = function(date){
    let newDate;
    newDate = moment(date, "DD-MM-YYYY").format("YYYY-MM-DD")
    if(newDate == 'Invalid date'){
        newDate = ''
    }
    return newDate
}

let idGenerator = function(){
    let id = "_"+Math.random().toString(36).substr(2, 9)
    return id
}

export {idGenerator, dateFormatter}