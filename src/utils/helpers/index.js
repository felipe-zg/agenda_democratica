export const today = () => {
    var date = new Date(),
        day = date.getDate().toString(),
        formatedDay = day.length == 1 ? '0' + day : day,
        month = (date.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        formatedMonth = month.length == 1 ? '0' + month : month,
        year = date.getFullYear();
    return formatedDay + '/' + formatedMonth + '/' + year;
};

export const todayPlus1Year = () => {
    var date = new Date(),
        day = date.getDate().toString(),
        formatedDay = day.length == 1 ? '0' + day : day,
        month = (date.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        formatedMonth = month.length == 1 ? '0' + month : month,
        year = date.getFullYear() + 1;
    return formatedDay + '/' + formatedMonth + '/' + year;
};
