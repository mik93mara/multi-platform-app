// error: "invalid_request"
// error_description: "Invalid token"
import { store } from '../store/store';

export interface Ifetch {
    url: string;
    method?: string;
    headers?: { [S: string]: string };
    body?: string;
}

export const fetchUrl = async (fetchProps: Ifetch) => {
    const { url, method = 'GET', headers, body } = fetchProps;
    const res = await fetch(url, {
        method,
        headers,
        body,
    })
        .then(response => {
            return response.text();
        })
        .then(data => {
            return data && data !== 'Invalid password' ? JSON.parse(data) : { error: 'invalid_grant' };
        })
        .catch(e => {
            return {
                error: 'invalid_grant',
                error_description: e,
            };
        });
    if (res.error && res.error_description === 'Invalid token') {
        store.dispatch({
            type: 'LOGGED_IN',
            payload: { ...{}, isLoggedIn: false },
        });
        return false;
    }
    return res;
};
