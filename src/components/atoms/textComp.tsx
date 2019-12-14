import React from "react";
import { Text, StyleSheet, TextStyle, Dimensions } from "react-native";
import { colors } from "../../styles";

const screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
    text: {
        color: colors.white,
        fontSize: screenWidth < 550 ? 21 : 16
    }
});

interface Itext {
    customStyles?: { [S: string]: TextStyle };
    ref?: any;
}

const TextComp: React.FunctionComponent<Itext> = props => {
    const { ref = null, customStyles } = props;
    return (
        <Text ref={ref} style={[styles.text, customStyles]}>
            {props.children}
        </Text>
    );
};

export default TextComp;
