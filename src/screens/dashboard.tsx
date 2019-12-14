import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Ilogin, IactivePage } from '../service';
import Header from '../components/header';
import { Spinner, TextComp } from '../components/atoms';

interface Iprops {
    navigation: any;
    reduxActivePage: (page: IactivePage) => void;
    loggedIn?: Partial<Ilogin>;
}

const Dashboard = (props: Iprops) => {
    const { navigate } = props.navigation;
    const [loading, setLoading] = React.useState(false);

    return (
        <Header page="Dashboard" navigate={navigate} reduxActivePage={props.reduxActivePage} isLoading={loading}>
            {!loading && (
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        padding: 50
                    }}>
                    <TextComp>Dashboard Page</TextComp>
                </View>
            )}
            {loading && <Spinner size={'large'} />}
        </Header>
    );
};

Dashboard.navigationOptions = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
