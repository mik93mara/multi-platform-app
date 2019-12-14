import { colors } from "./colors";
import { align } from "./flex";

export const btn = {
    link: {
        backgroundColor: 'tranparent',
        alignItems: align.center,
        alignSelf: align.flexStart,
    },
    linkText: {
        color: colors.blue
    },
    primary: {
        backgroundColor: colors.red,
        padding: 10,
        borderRadius: 5,
        alignItems: align.center,
        alignSelf: align.flexStart,
    },
    primaryText: {
        color: colors.white
    },
    secondary: {
        borderRadius: 10,
        backgroundColor: colors.gray,
        alignItems: "center",
        alignSelf: "flex-start"
    }
}