import React from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Ilogin, IactivePage } from '../service';
import { colors, measurements } from '../styles';
import { ButtonComp } from './atoms';

const headerHeight = measurements.mainHeaderHeight;

const styles = StyleSheet.create({
    imageRow: {
        height: headerHeight,
        flexDirection: 'row',
        marginRight: 62,
    },
});

interface Iheader {
    page: string;
    navigate: any;
    reduxLogin: (Ilogin) => void;
    reduxActivePage: (page: IactivePage) => void;
    deviceInfo: { screenHeight: number; screenWidth: number };
    useScrollView?: boolean;
    isLoading?: boolean;
}

const Header: React.FunctionComponent<Iheader> = props => {
    const { page, navigate, deviceInfo, useScrollView = true, isLoading = false } = props;
    const handleLogout = React.useCallback(() => {
        props.reduxLogin({ ...{}, isLoggedIn: false });
    }, []);
    const handlePagePressDashboard = React.useCallback(() => {
        props.reduxActivePage({ page: 'Dashboard' });
        navigate('Dashboard', {});
    }, []);
    const handlePagePressMyaccount = React.useCallback(() => {
        props.reduxActivePage({ page: 'MyAccount' });
        navigate('MyAccount', {});
    }, []);
    const handlePagePressSupport = React.useCallback(() => {
        navigate('support', {});
    }, []);
    const handlePagePressNotes = React.useCallback(() => {
        navigate('notes', {});
    }, []);
    const handlePagePressTechsupport = React.useCallback(() => {
        navigate('techsupport', {});
    }, []);

    const scrollHeight =
        Platform.OS === 'web'
            ? { height: deviceInfo.screenHeight - (!isLoading ? headerHeight : 0) }
            : { minHeight: deviceInfo.screenHeight - (!isLoading ? headerHeight : 0) };

    return (
        <>
            {!isLoading && (
                <View
                    style={{
                        backgroundColor: colors.black,
                        display: 'flex',
                        height: 'auto',
                        width: '100%',
                        marginTop: Platform.OS === 'web' ? 0 : 30,
                    }}>
                    <ScrollView horizontal={true} snapToStart={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.imageRow}>
                            <ButtonComp onPress={handlePagePressDashboard} active={page === 'Dashboard'}>
                                Dashboard
                            </ButtonComp>
                            <ButtonComp onPress={handlePagePressMyaccount} active={page === 'MyAccount'}>
                                Create Listings
                            </ButtonComp>
                            <ButtonComp onPress={handlePagePressSupport} active={page === 'support'}>
                                Admin
                            </ButtonComp>
                            <ButtonComp onPress={handlePagePressNotes} active={page === 'notes'}>
                                Alerts
                            </ButtonComp>
                            <ButtonComp onPress={handlePagePressTechsupport} active={page === 'techsupport'}>
                                Settings
                            </ButtonComp>
                            <ButtonComp onPress={handleLogout}>Logout</ButtonComp>
                        </View>
                    </ScrollView>
                </View>
            )}
            {useScrollView ? (
                <ScrollView
                    contentContainerStyle={{
                        backgroundColor: colors.black,
                        flexGrow: 1,
                        ...scrollHeight,
                    }}>
                    {props.children}
                </ScrollView>
            ) : (
                <View
                    style={{
                        backgroundColor: colors.black,
                        flexGrow: 1,
                        ...scrollHeight,
                    }}>
                    {props.children}
                </View>
            )}
        </>
    );
};

const mapStateToProps = state => {
    // console.log("state>>>", state);
    return {
        loggedIn: state.authReducer,
        deviceInfo: state.deviceInfo,
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
