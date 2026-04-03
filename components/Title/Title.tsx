import { colors } from "@/styles/colors";
import { ITitleProps } from "@/types/props";
import React from "react";
import { StyleSheet, Text } from "react-native";

export default function Title({ children }: ITitleProps) {
    return (
        <Text style={styles.title}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.white,
    }
});
