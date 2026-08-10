import { colors } from "@/styles/colors";
import { ISubTemplateExerciseTableProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import IconButton from "../IconButton/IconButton";
import Title from "../Title/Title";

function SubTemplateExerciseTableComponent({
    supersetId,
    exercise,
    onDrag,
    onExerciseNameChange,
    onExerciseSetChange,
    onDeleteExercise,
    onUnlinkExercise,

}: ISubTemplateExerciseTableProps) {
    const [editableName, setEditableName] = useState(exercise.name);
    const [exerciseSets, setExerciseSets] = useState(exercise.sets)

    useEffect(() => {
        setEditableName(exercise.name);
    }, [exercise.name]);

    return (
        <View style={styles.outterContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.headingContainer}>
                    <Pressable onLongPress={onDrag} style={({ pressed }) => pressed && styles.pressed}>
                        <Ionicons name="reorder-two" size={22} color={colors.gray100} />
                    </Pressable>
                    <Title isEditable onChangeText={setEditableName} onBlur={() => { }}>{editableName}</Title>
                </View>
                <View style={styles.headerIconButtonsContainer}>
                    <IconButton iconName="unlink-outline" onPress={() => { }} />
                    <IconButton iconName="trash-bin-outline" onPress={() => { }} />
                </View>
            </View>
            <View
                style={styles.setsContainer}
            >
                <IconButton iconName="remove-circle-outline" onPress={() => { }} />
                <Title>{exerciseSets} sets</Title>
                <IconButton iconName="add-circle-outline" onPress={() => { }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outterContainer: {
        display: "flex",
        gap: 8,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headingContainer: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    pressed: {
        opacity: 0.5,
    },
    setsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    headerIconButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 8
    },
})

export default React.memo(SubTemplateExerciseTableComponent)