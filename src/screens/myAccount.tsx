import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Ilogin, IactivePage } from '../service';
import Header from '../components/header';
import { TextComp } from '../components/atoms';

interface Iprops {
    navigation: any;
    reduxActivePage: (page: IactivePage) => void;
    loggedIn?: Partial<Ilogin>;
}

const MyAccount = (props: Iprops) => {
    const { navigate } = props.navigation;

    return (
        <Header page="MyAccount" navigate={navigate} reduxActivePage={props.reduxActivePage}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    padding: 50,
                }}>
                <TextComp>Create Listings Page</TextComp>
            </View>
        </Header>
    );
};

MyAccount.navigationOptions = {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
    headerStyle: { display: 'none' },
};

const mapStateToProps = state => {
    // console.log('state>>>', state);
    return {
        loggedIn: state.authReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reduxActivePage: (payload: IactivePage) =>
            dispatch({
                type: 'ACTIVE_PAGE',
                payload: payload,
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
