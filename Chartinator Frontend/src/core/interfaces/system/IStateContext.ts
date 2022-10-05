import { IErrorInfo } from './IErrorInfo';
import { IUserSessionInfo } from './IUserSessionInfo';

export interface IStateContext {
    user: IUserSessionInfo;
    setUser: (newUser: IUserSessionInfo) => void;
    error: IErrorInfo;
    setError: (input: IErrorInfo) => void;
}
