import { colors } from "@/styles/colors";
import { IEntityEmptyStateProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Paragraph from "../Paragraph/Paragraph";

export default function EntityEmptyState({ iconName, message }: IEntityEmptyStateProps) {
    return (
        <View style={styles.infoContainer}>
            <View style={styles.iconContainer}>
                <Ionicons name={iconName} color={colors.gray500} size={24} />
            </View>
            <Paragraph style={styles.paragraph}>{message}</Paragraph>
        </View>
    );
}

const styles = StyleSheet.create({
    infoContainer: {
        marginTop: 120,
        alignItems: "center",
        gap: 12
    },
    iconContainer: {
        padding: 24,
        backgroundColor: colors.gray700,
        borderRadius: 50,
        alignSelf: "center",
    },
    paragraph: {
        textAlign: "center",
    }
});
