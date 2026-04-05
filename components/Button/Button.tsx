import { colors } from "@/styles/colors";
import { IButtonProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({ children, iconName, onPress, style }: IButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={(state) => {
                const resolvedStyle = typeof style === "function" ? style(state) : style;
                return [styles.buttonContainer, state.pressed && styles.pressed, resolvedStyle];
            }}
        >
            <Ionicons name={iconName} color={colors.white} size={22} />
            <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        backgroundColor: colors.red500,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    pressed: {
        opacity: 0.85,
    }
});
