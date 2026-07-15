import { colors } from "@/styles/colors";
import { IButtonProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({ children, variant = "primary", iconName, onPress, style }: IButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={(state) => {
                const resolvedStyle = typeof style === "function" ? style(state) : style;
                return [styles.buttonContainer, state.pressed && styles.pressed, resolvedStyle, variant === "primary" ? styles.primaryContainer : variant === "secondary" ? styles.secondaryContainer : styles.outlinedContainer];
            }}
        >
            {iconName && <Ionicons name={iconName} color={variant === "primary" ? styles.primaryText.color : variant === "secondary" ? styles.secondaryText.color : styles.outlinedText.color} size={22} />}
            <Text style={[styles.buttonText, variant === "primary" ? styles.primaryText : variant === "secondary" ? styles.secondaryText : styles.outlinedText ]}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    primaryContainer: {
        backgroundColor: colors.red500,
    },
    primaryText: {
        color: colors.white,
    },
    secondaryContainer: {
        backgroundColor: colors.red900,
        borderWidth: 1,
        borderColor: colors.red500
    },
    secondaryText: {
        color: colors.red500,
    },
    pressed: {
        opacity: 0.85,
    },
    outlinedContainer: {
        borderWidth: 1,
        borderColor: colors.gray500
    },
    outlinedText: {
        color: colors.gray100
    },
});