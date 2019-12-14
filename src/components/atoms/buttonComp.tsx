import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, TextStyle, GestureResponderEvent } from "react-native";
import { colors } from "../../styles";
import TextComp from "./textComp";
import { GestureHandlerGestureEvent } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.black,
        height: "100%",
        padding: 15,
        borderBottomColor: colors.black,
        borderBottomWidth: 2,
    },
    activeButton: {
        backgroundColor: colors.black,
        height: "100%",
        padding: 15,
        borderBottomColor: colors.red,
        borderBottomWidth: 2,
    },
    buttonText: {
        color: colors.white,
        margin: "auto"
    }
});

interface Ibutton {
    active?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
    style?: { [S: string]: ViewStyle | TextStyle };
}

const ButtonComp: React.FunctionComponent<Ibutton> = (props) => {
    const { active = false, onPress = () => { }, style = styles } = props;

    return (
        <View>
            <TouchableOpacity style={active ? style.activeButton : style.button} onPress={onPress}>
                <TextComp customStyles={style.buttonText as { [S: string]: TextStyle }}>{props.children}</TextComp>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonComp;