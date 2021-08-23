const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const convertFieldName = (field) => {
    return capitalizeFirstLetter(field.split('_').join(" "))
}

const prepareDataForListing = (field, value, ignoreList = [], removeNull = false, transformData = {}) => {
    
    if(removeNull && value === null){
        return null
    }

    if(ignoreList.includes(field)){
        return null
    } else {

        if(transformData && transformData[field]){
            value = transformData[field](value)
        }

        field = convertFieldName(field)
        return [field, value]
    }
}

module.exports = {
    prepareDataForListing,
    convertFieldName,
    capitalizeFirstLetter
}
