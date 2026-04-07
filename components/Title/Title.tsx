import { colors } from "@/styles/colors";
import { ITitleProps } from "@/types/props";
import { StyleSheet, Text, TextInput } from "react-native";


export default function Title({ children, style, isEditable }: ITitleProps) {
    if (!isEditable) {
        return <Text style={[styles.title, style]}>{children}</Text>;
    } else {
        return (
            <TextInput
                style={[styles.title, style]}
                value={String(children)}
                multiline
                scrollEnabled={false}
            />
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.white,
        padding: 0
    }
});
