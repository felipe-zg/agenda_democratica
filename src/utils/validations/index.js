export const isEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const isPassword = (password) => {
    return password.length >= 6;
};

export const isFullName = (name) => {
    return name.trim().split(' ').length >= 2;
};

export const isName = (name) => {
    return name.trim().length >= 4;
};

export const isParty = (party) => {
    return party.trim().length >= 2;
};

//aplicar a lógica correta de valição de número de identificação de candidatura
export const isId = (id) => {
    return id.trim().length >= 10;
};

export const fieldsAreEqual = (firstField, secondField) => {
    return firstField === secondField;
};

export const errors = {
    invalidEmail: {
        border: '1px solid #f00',
        message: 'E-mail inválido',
    },
    invalidPassword: {
        border: '1px solid #f00',
        message: 'Minimo de 6 caracteres',
    },
    invalidName: {
        border: '1px solid #f00',
        message: 'Mínimo de 4 caracteres',
    },
    invalidFullName: {
        border: '1px solid #f00',
        message: 'Nome e sobrenome obrigatórios',
    },
    invalidParty: {
        border: '1px solid #f00',
        message: 'Sigla inválida',
    },
    invalidNumber: {
        border: '1px solid #f00',
        message: 'Número inválida',
    },
    invalidId: {
        border: '1px solid #f00',
        message: 'identificação inválida',
    },
    valid: {
        border: 'none',
        message: '',
    },
};
