export const removeUnnecessaryBlankSpaces = (value) => {
    return value.replace(/( )+/g, ' ');
};

export const removeAllBlankSpaces = (value) => {
    return value.replace(/\s/g, '');
};
