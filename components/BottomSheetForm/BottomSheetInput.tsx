import { colors } from "@/styles/colors";
import { IInputProps } from "@/types/props";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Paragraph from "../Paragraph/Paragraph";

export default function BottomSheetInput({ label, placeholder, value, onChangeText }: IInputProps) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <View style={styles.container}>
            {label && <Paragraph style={styles.label}>{label.toUpperCase()}</Paragraph>}
            {
                isEditing
                    ? (
                        <BottomSheetTextInput
                            style={styles.input}
                            placeholder={placeholder}
                            value={value}
                            onChangeText={onChangeText}
                            onBlur={() => setIsEditing(false)}
                            placeholderTextColor={colors.gray100}
                            autoFocus
                        />
                    )
                    : (
                        <Pressable style={styles.input} onPress={() => setIsEditing(true)}>
                            <Text style={[styles.text, !value && styles.placeholder]}>{value || placeholder}</Text>
                        </Pressable>
                    )
            }
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
    },
    text: {
        color: colors.white,
    },
    placeholder: {
        color: colors.gray100,
    },
});
