import { Base64 } from 'js-base64';
import { protocol, domain, token } from './paths';
import { fetchUrl } from './service';

export interface IloginData {
    password: string;
    username: string;
    grant_type?: string;
}

export interface IloginDataOut {
    access_token?: string;
    expires_in?: number;
    refresh_token?: string;
    scope?: string;
    token_type?: string;
    error?: string;
    error_description?: string;
}

export interface Ilogin {
    payload: IloginDataOut;
    isLoggedIn: boolean;
}

export const login = async (data: IloginData): Promise<IloginDataOut> => {
    const { password, username } = data;
    const url = `${protocol}://${domain}/internal/session/login`;
    return await fetchUrl({
        url,
        method: 'POST',
        headers: {
            Authorization: `Basic ${Base64.btoa(`${username}:${password}`)}`,
        },
    });
};
