import { colors } from "@/styles/colors";
import { ITitleProps } from "@/types/props";
import { StyleSheet, Text, TextInput } from "react-native";


export default function Title({ children, style, isEditable, onChangeText, onBlur, onSubmitEditing, keyboardType, disabled }: ITitleProps) {
    if (!isEditable) {
        return <Text style={[styles.title, style]}>{children}</Text>;
    } else {
        return (
            <TextInput
                style={[styles.title, disabled && styles.disabled, style]}
                multiline
                scrollEnabled={false}
                value={String(children)}
                onChangeText={onChangeText}
                onBlur={onBlur}
                onSubmitEditing={onSubmitEditing}
                keyboardType={keyboardType}
                editable={!disabled}
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
    },
    disabled: {
        opacity: 0.5
    }
});
