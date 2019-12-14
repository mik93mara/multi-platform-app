import React from 'react';
import { Button, View, StyleSheet, TextInput, Image, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../styles';
import { IloginDataOut, Ilogin } from '../service';
import { useLogin } from '../helpers/login.helpers';

interface Iprops {
    reduxLogin: (login: Ilogin) => void;
}

const styles = StyleSheet.create({
    containerDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 50,
    },
    logoDiv: { marginBottom: 10 },
    logoImg: { height: 80, resizeMode: 'contain', width: 120 },
    username: { width: 200, height: 40, borderColor: 'gray', borderWidth: 1, padding: 5, marginBottom: 10 },
    password: { width: 200, height: 40, borderColor: 'gray', borderWidth: 1, padding: 5, marginBottom: 10 },
    errorMsg: { color: colors.error.textColor },
});

const Login = (props: Iprops) => {
    const { username, onChangeUsername, password, onChangePassword, errorMsg = '', isLoading, handleLogin } = useLogin(
        (payload: IloginDataOut) => {
            props.reduxLogin({ payload, isLoggedIn: true });
        }
    );

    return (
        <View style={styles.containerDiv}>
            <View style={styles.logoDiv}>
                <Image style={styles.logoImg} source={require('../img/logo.png')} />
            </View>
            <View>
                <Text style={styles.errorMsg}>{errorMsg}</Text>
            </View>
            <View>
                <TextInput
                    style={styles.username}
                    onChangeText={text => onChangeUsername(text)}
                    placeholder="Username"
                    value={username}
                />
            </View>
            <View>
                <TextInput
                    style={styles.password}
                    onChangeText={text => onChangePassword(text)}
                    placeholder="********"
                    value={password}
                    secureTextEntry={true}
                />
            </View>
            <View>
                {!isLoading ? (
                    <Button title="Login" onPress={handleLogin} />
                ) : (
                    <ActivityIndicator size={'large'} color={colors.warning.textColor} />
                )}
            </View>
        </View>
    );
};

Login.navigationOptions = {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
    headerStyle: { display: 'none' },
};

const mapStateToProps = state => {
    return {
        loggedIn: state.authReducer.loggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reduxLogin: (payload: Ilogin) =>
            dispatch({
                type: 'LOGGED_IN',
                payload: payload,
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
