import { colors } from "@/styles/colors";
import { IAttachPeriodizationButtonProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Paragraph from "../Paragraph/Paragraph";

export default function AttachPeriodizationButton({ isAttaced, value, onPress, disabled }: IAttachPeriodizationButtonProps) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed ? [styles.innerContainer, styles.pressed, disabled && styles.disabled] : [styles.innerContainer, disabled && styles.disabled]} disabled={disabled}>
            <Ionicons name="flash" size={12} color={isAttaced ? colors.red500 : colors.gray100} />
            <Paragraph style={isAttaced ? [styles.attachment, styles.pressedText] : styles.attachment}>{value ? value : "Attach Periodization"} {isAttaced && <Ionicons name="close" size={12} color={colors.red500} />}</Paragraph>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        gap: 4,
    },
    attachment: {
        fontWeight: "bold",
    },
    pressedText: {
        color: colors.red500
    },
    pressed: {
        opacity: 0.85
    },
    disabled: {
        opacity: 0.5
    },
});
