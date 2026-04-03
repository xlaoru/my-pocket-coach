import { colors } from "@/styles/colors";
import React, { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

export default function HeadingLabel({ children }: { children: ReactNode }) {
    return (
        <Text style={styles.label}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.red500
    }
})