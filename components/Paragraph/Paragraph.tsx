import { colors } from "@/styles/colors";
import { IParagraphProps } from "@/types/props";
import React from "react";
import { StyleSheet, Text } from "react-native";

export default function Paragraph({ children, style }: IParagraphProps) {
    return (
        <Text style={[styles.paragraph, style]}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.white,
    }
});
