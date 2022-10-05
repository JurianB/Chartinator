import { IErrorInfo } from '../interfaces/system/IErrorInfo';
import { IUserSessionInfo } from '../interfaces/system/IUserSessionInfo';

export const defaultUser: IUserSessionInfo = {
    id: '89722b4d-e1a9-41a5-9a20-0621095636c9',
    name: 'L.J. Bouwman',
    alias: 'Bo',
    email: 'bo@bouwman66.nl',
    token: ''
};

export const defaultError: IErrorInfo = {
    code: -1,
    codeText: '',
    description: '',
    caller: ''
};

export const defaultState = {
    user: defaultUser,
    error: defaultError
};
