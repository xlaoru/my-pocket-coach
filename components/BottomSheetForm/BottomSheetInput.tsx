import { colors } from "@/styles/colors";
import { IInputProps } from "@/types/props";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, View } from "react-native";
import Paragraph from "../Paragraph/Paragraph";

export default function BottomSheetInput({ label, placeholder, value, onChangeText }: IInputProps) {
    return (
        <View style={styles.container}>
            <Paragraph style={styles.label}>{label.toUpperCase()}</Paragraph>
            <BottomSheetTextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={colors.gray400}
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
        borderWidth: .25,
        borderColor: colors.gray500,
        backgroundColor: colors.gray600,
        borderRadius: 8,
        padding: 12,
        color: colors.white,
    }
});
