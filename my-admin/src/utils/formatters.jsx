import moment from "moment";

const capitalize =  (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
} 

const formatNotificationType =  (type) => {
    switch(type){
        case 'email':
             return capitalize(type)
        case 'sms':
             return type.toUpperCase()
        default:
            return type
    }
}

const formatDate = (date) => {
    if(date === null){
        return "-"
    }else{
        return moment(date).format("L")
    }
}



export { 
    capitalize,
    formatNotificationType,
    formatDate
}