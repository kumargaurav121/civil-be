const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const validateLimit = (params) => {
    let {limit, offset} = params;
        
    if (limit == undefined){
        limit = 10;
    }
    if (offset == undefined){
        offset = 0;
    }
    return {limit, offset};
}

module.exports = {validateEmail, validateLimit}