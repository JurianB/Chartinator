import { IErrorInfo } from './interfaces/system/IErrorInfo';
import { IResponse } from './interfaces/system/IResponse';
import { IStateContext } from './interfaces/system/IStateContext';

function getApiData(context: IStateContext, url: string, codes: number[]) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'get',
            credentials: 'same-origin'
        })
            .then(async (response) => {
                const responseData = await response.json();

                if (!codes.includes(responseData.code)) {
                    const info = responseData.data;

                    const errorInfo: IErrorInfo = {
                        description: info.description,
                        caller: info.caller,
                        code: responseData.code,
                        codeText: responseData.codeText,
                        exception: info.exception
                    };

                    context.setError(errorInfo);

                    return reject(errorInfo);
                }

                resolve(responseData as IResponse);
            })
            .catch((error) => {
                const errorInfo: IErrorInfo = {
                    description: error.message,
                    caller: url,
                    code: 500,
                    codeText: 'Internal Exchange Error',
                    exception: 'Exchange'
                };

                context.setError(errorInfo);

                return resolve(errorInfo);
            });
    });
}

function postApiData(context: IStateContext, url: string, body: object, codes: number[]) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(body);

        fetch(url, {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: postData
        })
            .then(async (response) => {
                const responseData = await response.json();

                if (!codes.includes(responseData.code)) {
                    const info = responseData.data;

                    const errorInfo: IErrorInfo = {
                        description: info.description,
                        caller: info.caller,
                        code: responseData.code,
                        codeText: responseData.codeText,
                        exception: info.exception
                    };

                    context.setError(errorInfo);

                    return reject(errorInfo);
                }

                resolve(responseData as IResponse);
            })
            .catch((error) => {
                console.log('postApiData Error: ', error);

                const errorInfo: IErrorInfo = {
                    description: error.message,
                    caller: url,
                    code: 500,
                    codeText: 'Internal exchange error',
                    exception: 'Exchange'
                };

                context.setError(errorInfo);

                reject(errorInfo);
            });
    });
}

function IsStatusCodeIn200Range(statusCode: number) {
    return statusCode >= 200 && statusCode <= 299;
}

export default {
    getApiData,
    postApiData
};
