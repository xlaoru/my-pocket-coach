import { colors } from "@/styles/colors";
import { IEntityEmptyStateProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";

export default function EntityEmptyState({ iconName, title, message }: IEntityEmptyStateProps) {
    return (
        <View style={styles.infoContainer}>
            <View style={styles.iconContainer}>
                <Ionicons name={iconName} color={colors.gray500} size={24} />
            </View>
            <View>
                <Title style={styles.text}>{title}</Title>
                <Paragraph style={styles.text}>{message}</Paragraph>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    infoContainer: {
        alignItems: "center",
        marginTop: 120,
        gap: 8
    },
    iconContainer: {
        padding: 24,
        backgroundColor: colors.gray700,
        borderRadius: 50,
        alignSelf: "center",
    },
    text: {
        textAlign: "center",
    }
});
