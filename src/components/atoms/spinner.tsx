import React from "react";
import { View, Text, StyleSheet, TextStyle, ActivityIndicator } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
    view: {
        width: "100%",
        marginTop: 100,
        marginBottom: 0,
        marginRight: "auto",
        marginLeft: "auto"
    }
});

type Isize = "small" | "large";

interface Itext {
    text?: string;
    style?: { [S: string]: TextStyle };
    size?: Isize;
    color?: string;
}

const Spinner: React.FunctionComponent<Itext> = (props) => {
    const { style = styles, size = "small", text = "Loading...", color = colors.white } = props;
    const textSize = size === "small" ? 12 : 42;
    return (
        <View style={style.view}>
            <ActivityIndicator size={size} color={color} />
            <Text style={{ color: colors.white, fontSize: textSize, textAlign: "center" }}>{text}</Text>
        </View>
    )
}

export default Spinner;
