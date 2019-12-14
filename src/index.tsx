import React, { useState } from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Login, Dashboard, MyAccount } from "./screens";
import { Ilogin, Ideviceinfo } from "./service";
import { connect } from "react-redux";
import { colors } from './styles';

const MainNavigator: any = createStackNavigator({
    Login: { screen: Login },
    Dashboard: { screen: Dashboard },
    MyAccount: { screen: MyAccount }
});

const AppContainer = createAppContainer(MainNavigator);

const AppWrapper = (props: { loggedIn?: Partial<Ilogin>, reduxDeviceInfo: (Ideviceinfo) => void, activePage: { page: string } }) => {
    const [route, setRout] = useState('Login');

    const calcDeviceInfo = () => {
        const screenWidth = Math.round(Dimensions.get('window').width);
        const screenHeight = Math.round(Dimensions.get('window').height);
        // console.log('file: src/index.tsx, function: window.addEventListener, screenWidth: ', screenWidth);
        props.reduxDeviceInfo({
            screenWidth,
            screenHeight
        });
    }

    React.useEffect(() => {
        calcDeviceInfo();
        Dimensions.addEventListener('change', () => {
            calcDeviceInfo();
        });
    }, []);

    React.useEffect(() => {
        if (props && props.loggedIn && props.loggedIn.isLoggedIn) {
            setRout(props.activePage.page || 'Dashboard');
        } else {
            setRout('Login');
        }
    }, [props.loggedIn, props.activePage]);

    return (
        <View style={{ display: "flex", flex: 1, height: "100%", backgroundColor: Platform.OS === 'web' ? colors.white : colors.black }}>
            <AppContainer ref={nav => {
                nav && nav.dispatch(
                    NavigationActions.navigate({ routeName: route })
                )
            }} />
        </View>
    );
}

const mapStateToProps = (state) => {
    // console.log('file: src/index.tsx, function: mapStateToProps, state: ', state);
    return {
        loggedIn: state.authReducer,
        activePage: state.activePage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        reduxDeviceInfo: (payload: Ideviceinfo) => dispatch({
            type: 'DEVICE_INFO',
            payload: payload,
        }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
