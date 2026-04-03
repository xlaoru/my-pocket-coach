import { colors } from "@/styles/colors";
import { IIconButtonProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

export default function IconButton({ iconName, onPress }: IIconButtonProps) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
            <Ionicons name={iconName} size={22} color={colors.gray500} />
        </Pressable>

    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.5,
    }
});
