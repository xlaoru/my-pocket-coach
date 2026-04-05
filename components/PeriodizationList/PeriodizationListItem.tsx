import { colors } from "@/styles/colors";
import { IPeriodizationListItemProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import IconButton from "../IconButton/IconButton";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";

export default function PeriodizationListItem({ title, description, stages, onPress }: IPeriodizationListItemProps) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
            <View style={styles.iconContainer}>
                <Ionicons name="flash-outline" size={24} color={colors.red500} />
            </View>
            <View style={styles.contentContainer}>
                <Title>{title.length > 15 ? `${title.substring(0, 15)}...` : title}</Title>
                <Paragraph>{description && description.length > 20 ? `${description.substring(0, 20)}...` : description}</Paragraph>
                <Paragraph style={styles.stagesTitle}>{stages} stage{stages !== 1 ? "s" : ""}</Paragraph>
            </View>
            <View style={styles.buttonsContainer}>
                <IconButton iconName="trash-bin-outline" onPress={() => { }} />
                <IconButton iconName="chevron-forward-outline" onPress={onPress} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 12,
        padding: 12,
        backgroundColor: colors.gray700,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "space-between",
    },
    contentContainer: {
        flex: 1,
        minWidth: 0,
    },
    iconContainer: {
        padding: 12,
        backgroundColor: colors.red900,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    stagesTitle: {
        fontSize: 14,
    },
    buttonsContainer: {
        flexDirection: "row",
        gap: 18,
    },
    pressed: {
        opacity: 0.85,
    }
});
