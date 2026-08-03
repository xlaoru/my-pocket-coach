import { colors } from "@/styles/colors";
import { IAttachPeriodizationButtonProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Paragraph from "../Paragraph/Paragraph";

export default function AttachPeriodizationButton({ isAttaced, unpressedValue, pressedValue, onPress }: IAttachPeriodizationButtonProps) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed ? styles.pressed : undefined}>
            <View style={styles.innerContainer}>
                <Ionicons name="flash" size={12} color={isAttaced ? colors.red500 : colors.gray100} />
                <Paragraph style={isAttaced ? [styles.attachment, styles.pressedText] : styles.attachment}>{isAttaced ? pressedValue : unpressedValue}</Paragraph>
                {isAttaced && <Ionicons name="close" size={12} color={colors.red500} />}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    attachment: {
        fontWeight: "bold",
    },
    pressedText: {
        color: colors.red500
    },
    pressed: {
        opacity: 0.7
    }
});
