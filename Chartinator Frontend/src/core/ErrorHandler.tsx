import React from 'react';
import ErrorPage from '../pages/system/ErrorPage';
import { useSession } from './SessionProvider';

export const ErrorHandler: React.FC = (props) => {
    const session = useSession();

    if (session.error.code !== -1) {
        return <ErrorPage />;
    }
    return <div>{props.children}</div>;
};
