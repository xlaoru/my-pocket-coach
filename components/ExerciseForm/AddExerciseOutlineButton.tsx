import { colors } from "@/styles/colors";
import { IAddExerciseOutlineButtonProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Paragraph from "../Paragraph/Paragraph";

export default function AddExerciseOutlineButton({ onPress }: IAddExerciseOutlineButtonProps) {
    return (
        <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={onPress}>
            <Ionicons name="add-circle-outline" size={14} color={colors.red500} />
            <Paragraph style={styles.text}>Add set</Paragraph>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 8,
        alignSelf: "flex-start",
    },
    text: {
        color: colors.red500,
        fontSize: 14
    },
    pressed: {
        opacity: 0.7,
    }
});
