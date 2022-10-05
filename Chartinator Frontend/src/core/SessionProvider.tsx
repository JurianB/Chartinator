import React, { useEffect, useState } from 'react';
import { defaultError, defaultUser } from './defaults/SessionDefaults';
import { IErrorInfo } from './interfaces/system/IErrorInfo';
import { IStateContext } from './interfaces/system/IStateContext';
import { IUserSessionInfo } from './interfaces/system/IUserSessionInfo';

const user_key = 'user';

export interface StateContextProps {
    user: IUserSessionInfo;
    setUser: (input: IUserSessionInfo) => typeof input;
    error: IErrorInfo;
    setError: (input: IErrorInfo) => typeof input;
}

const StateContext = React.createContext<IStateContext>({
    user: defaultUser,
    setUser: (input: IUserSessionInfo) => input,
    error: defaultError,
    setError: (input: IErrorInfo) => input
});

export const SessionProvider: React.FC = (props) => {
    const [user, updateUser] = useState<IUserSessionInfo>(defaultUser);
    const [error, setError] = React.useState<IErrorInfo>(defaultError);

    useEffect(() => {
        const userData = sessionStorage.getItem(user_key);

        if (userData !== null) {
            const result = JSON.parse(userData);
            updateUser(result);
        }
    }, []);

    const setUser = (input: IUserSessionInfo) => {
        updateUser(input);
        sessionStorage.setItem(user_key, JSON.stringify(input));
        return input;
    };

    return (
        <StateContext.Provider
            value={{
                user,
                setUser,
                error,
                setError
            }}
        >
            {props.children}
        </StateContext.Provider>
    );
};

const useSession = () => {
    return React.useContext(StateContext);
};

export { StateContext, useSession };
