import { colors } from "@/styles/colors";
import { IInputProps } from "@/types/props";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Paragraph from "../Paragraph/Paragraph";

export default function Input({ placeholder, value, label, onChangeText, style }: IInputProps) {
    return (
        <View style={[styles.container, style]}>
            <Paragraph style={styles.label}>{label.toUpperCase()}</Paragraph>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={colors.gray100}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 4,
    },
    label: {
        fontWeight: "bold",
        fontSize: 12,
    },
    input: {
        backgroundColor: colors.gray500,
        borderRadius: 8,
        padding: 12,
        color: colors.white,
    }
});
