import { colors } from "@/styles/colors";
import React, { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

export default function Heading({ children }: { children: ReactNode }) {
    return (
        <Text style={styles.heading}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 36,
        fontWeight: "bold",
        color: colors.white
    }
});
