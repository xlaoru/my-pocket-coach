import { colors } from "@/styles/colors";
import { IAttachPeriodizationButtonProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Paragraph from "../Paragraph/Paragraph";

export default function AttachPeriodizationButton({ onPress }: IAttachPeriodizationButtonProps) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed ? styles.pressed : undefined}>
            <Paragraph style={styles.attachment}><Ionicons name="flash" size={12} color={colors.gray100} /> Attach Periodization</Paragraph>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    attachment: {
        fontWeight: "bold"
    },
    pressed: {
        opacity: 0.7
    }
});
