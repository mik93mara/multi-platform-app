import React from "react";
import { login, IloginDataOut } from "../service";

export const useLogin = (onLogInSuccess: (loggedIn: IloginDataOut) => void) => {
    const [username, onChangeUsername] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogin = React.useCallback(async () => {
        if (username && password) {
            setIsLoading(true);
            setErrorMsg('');
            const loggedIn: IloginDataOut = await login({ username, password });
            setIsLoading(false);
            if (loggedIn && !loggedIn.error) {
                onLogInSuccess(loggedIn);
            }
            else {
                setErrorMsg(loggedIn.error_description || 'Incorrect username/password!');
            }
        }
        else {
            setErrorMsg('Incorrect username/password!');
        }
    }, [username, password]);

    return {
        username,
        onChangeUsername,
        password,
        onChangePassword,
        errorMsg,
        setErrorMsg,
        isLoading,
        setIsLoading,
        handleLogin
    }
}