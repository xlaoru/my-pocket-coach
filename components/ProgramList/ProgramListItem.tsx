import { colors } from "@/styles/colors";
import { IProgramListItemsProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import IconButton from "../IconButton/IconButton";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";

export default function ProgramListItem({ title, description, exercises, supersets, onPress }: IProgramListItemsProps) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
            <View style={styles.iconContainer}>
                <Ionicons name="barbell-outline" size={24} color={colors.red500} />
            </View>
            <View style={styles.contentContainer}>
                <Title>{title.length > 15 ? `${title.substring(0, 15)}...` : title}</Title>
                <Paragraph>{description && description.length > 20 ? `${description.substring(0, 20)}...` : description}</Paragraph>
                <View style={styles.amountsContainer}>
                    {exercises > 0 && <Paragraph style={styles.amountTitle}>{exercises} exercise{exercises !== 1 ? 's' : ''}</Paragraph>}
                    {supersets > 0 && <Paragraph style={styles.amountTitle}>{supersets} superset{supersets !== 1 ? 's' : ''}</Paragraph>}
                </View>
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
    amountsContainer: {
        flexDirection: "row",
        gap: 4,
    },
    amountTitle: {
        fontSize: 14
    },
    buttonsContainer: {
        flexDirection: "row",
        gap: 18,
    },
    pressed: {
        opacity: 0.85,
    }
});