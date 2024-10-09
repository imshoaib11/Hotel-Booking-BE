export const validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

export const validatePhone = function(phone) {
    let re = /^\d{10}$/;
    return re.test(phone)
};

