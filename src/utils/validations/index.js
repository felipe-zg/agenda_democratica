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

export const isMayorNumber = (number) => {
    return number.trim().length === 2;
};

export const isCityCouncilorNumber = (number) => {
    return number.trim().length === 5;
};

//aplicar a lógica correta de valição de número de identificação de candidatura
export const isId = (id) => {
    return id.trim().length >= 10;
};

export const isCep = (cep) => {
    return cep.trim().length === 8;
};

export const isDate = (date) => {
    var ExpReg = new RegExp(
        '(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}',
    );
    var ardt = date.split('/');
    var erro = false;
    if (date.search(ExpReg) == -1) {
        erro = true;
    } else if (
        (ardt[1] == 4 || ardt[1] == 6 || ardt[1] == 9 || ardt[1] == 11) &&
        ardt[0] > 30
    ) {
        erro = true;
    } else if (ardt[1] == 2) {
        if (ardt[0] > 28 && ardt[2] % 4 != 0) {
            erro = true;
        }
        if (ardt[0] > 29 && ardt[2] % 4 == 0) {
            erro = true;
        }
    }
    if (!erro) {
        if (!isAFutureDate(date)) {
            erro = true;
        }
    }
    return erro ? false : true;
};

const isAFutureDate = (date) => {
    let parts = date.split('/');
    let today = new Date();
    date = new Date(parts[2], parts[1] - 1, parts[0]);
    return date >= today ? true : false;
};

export const HasMinChars = (value, minChars) => {
    return value.trim().length >= minChars;
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
        message: 'Número inválido',
    },
    invalidId: {
        border: '1px solid #f00',
        message: 'identificação inválida',
    },
    invalidCep: {
        border: '1px solid #f00',
        message: 'CEP inválido',
    },
    invalidDate: {
        border: '1px solid #f00',
        message: 'Data inválida',
    },
    invalidTitle: {
        border: '1px solid #f00',
        message: 'Mínimo de 8 caracteres',
    },
    invalidDescription: {
        border: '1px solid #f00',
        message: 'Mínimo de 100 caracteres',
    },
    valid: {
        border: 'none',
        message: '',
    },
};
