import { colors } from "@/styles/colors";
import { IHeadingProps } from "@/types/props";
import React from "react";
import { StyleSheet, Text } from "react-native";

export default function Heading({ children, style }: IHeadingProps) {
    return (
        <Text style={[styles.heading, style]}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 36,
        fontWeight: "bold",
        color: colors.white
    }
});
