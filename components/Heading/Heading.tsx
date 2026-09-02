import { colors } from "@/styles/colors";
import { IHeadingProps } from "@/types/props";
import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";

export default function Heading({ children, style, isEditable, onChangeText, onBlur, disabled }: IHeadingProps) {
    if (!isEditable) {
        return <Text style={[styles.heading, style]}>{children}</Text>;
    } else {
        return (
            <TextInput
                style={[styles.heading, disabled && styles.disabled, style]}
                value={String(children)}
                multiline
                onChangeText={onChangeText}
                onBlur={onBlur}
                scrollEnabled={false}
                editable={!disabled}
            />
        )
    }
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 36,
        fontWeight: "bold",
        color: colors.white,
        padding: 0
    },
    disabled: {
        opacity: 0.5
    }
});
