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

const formatDiscount = (value, type) => {
    return type === "percentage" ? `${value}%` : 
    value.toLocaleString('en-PH', {style: 'currency',currency: 'PHP'});
}

const formatFullName = (record) => {
    return `${record.first_name} ${record.middle_name} ${record.last_name} ${record.suffix}`
}

const formatApptTitle = (item) => {
    return `[${formatDate(item.appointment_date)}]  ${formatFullName(item?.patient?.person)} | ${item.details}`;
}




export { 
    capitalize,
    formatNotificationType,
    formatDate,
    formatDiscount,
    formatFullName,
    formatApptTitle
}