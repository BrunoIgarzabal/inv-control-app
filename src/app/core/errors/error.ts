export interface ValidationError {
    status: number;
    error: string;
    message: string;
    path: string;
    errors: ErrorFields[];
}

export interface ErrorFields {
    fieldName: string;
    message: string;
}


export const StatusError = (error: number) => {
    switch(error) {
        case 403:
            return 'Acesso Negado';
        case 422:
            return 'Erro de Validação';
        default:
            return `Ocorreu um erro: ${error}`
    }
}