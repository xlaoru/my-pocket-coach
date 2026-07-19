import { colors } from "@/styles/colors";
import { IHeadingProps } from "@/types/props";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";


export default function Heading({ children, style, isEditable, onChangeText, onBlur }: IHeadingProps) {
    if (!isEditable) {
        return <Text style={[styles.heading, style]}>{children}</Text>;
    } else {
        return (
            <TextInput
                style={[styles.heading, style]}
                value={String(children)}
                multiline
                onChangeText={onChangeText}
                onBlur={onBlur}
                scrollEnabled={false}
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
    }
});
