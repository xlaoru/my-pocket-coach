import { colors } from "@/styles/colors";
import { IHeadingLabelProps } from "@/types/props";
import React from "react";
import { StyleSheet, Text } from "react-native";

export default function HeadingLabel({ children, style }: IHeadingLabelProps) {
    return (
        <Text style={[styles.label, style]}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.red500
    }
})