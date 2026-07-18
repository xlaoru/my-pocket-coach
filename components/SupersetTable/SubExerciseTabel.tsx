import { colors } from "@/styles/colors";
import { ISubExerciseTabelProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AddSetOutlineButton from "../ExerciseForm/AddSetOutlineButton";
import IconButton from "../IconButton/IconButton";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";
import SubExerciseTabelRow from "./SubExerciseTabelRow";

function SubExerciseTabel({ exercise, onExerciseNameChange, onAddExerciseSet, onEditExerciseSet, onDeleteExerciseSet, onDeleteExercise }: ISubExerciseTabelProps) {
    const [editableName, setEditableName] = useState(exercise.name);

    useEffect(() => {
        setEditableName(exercise.name);
    }, [exercise.name]);

    const handleNameBlur = useCallback(() => {
        const trimmedName = editableName.trim();

        if (!trimmedName) {
            setEditableName(exercise.name);
            return;
        }

        if (trimmedName === exercise.name) {
            return;
        }

        void onExerciseNameChange(exercise._id, trimmedName);
    }, [editableName, exercise._id, exercise.name, onExerciseNameChange]);

    const handleDeleteExercise = useCallback(() => {
        void onDeleteExercise(exercise._id)
    }, [exercise, onDeleteExercise])

    return (
        <View style={styles.outterContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.headingContainer}>
                    <Pressable onLongPress={() => { }} style={({ pressed }) => pressed && styles.pressed}>
                        <Ionicons name="reorder-two" size={22} color={colors.gray100} />
                    </Pressable>
                    <Title isEditable onChangeText={setEditableName} onBlur={handleNameBlur}>{editableName}</Title>
                </View>
                <View style={styles.headerIconButtonsContainer}>
                    <IconButton iconName="unlink-outline" onPress={() => { }} />
                    <IconButton iconName="trash-bin-outline" onPress={handleDeleteExercise} />
                </View>
            </View>
            <View style={styles.tableContainer}>
                <View
                    style={styles.setsContainer}
                >
                    <View style={styles.setsHeaderContainer}>
                        <View style={styles.dataCell}>
                            <Paragraph style={styles.headerTitle}>Set</Paragraph>
                        </View>
                        <View style={styles.dataCell}>
                            <Paragraph style={styles.headerTitle}>kg</Paragraph>
                        </View>
                        <View style={styles.dataCell}>
                            <Paragraph style={styles.headerTitle}>Reps</Paragraph>
                        </View>
                        <View style={styles.actionPlaceholder} />
                    </View>
                </View>
                {exercise.sets.map((set, index) => (
                    <SubExerciseTabelRow key={index} index={index} exerciseId={exercise._id} set={set} onEditExerciseSet={onEditExerciseSet} onDeleteExerciseSet={onDeleteExerciseSet} />
                ))}
            </View>
            <AddSetOutlineButton onPress={() => { onAddExerciseSet(exercise._id) }} />
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
    rowsContainer: {
        borderWidth: 1,
        borderColor: colors.gray100,
        borderRadius: 16,
        padding: 8,
    },
    setsHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.gray500,
        paddingVertical: 2,
        paddingRight: 16,
    },
    dataCell: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
    },
    actionPlaceholder: {
        width: 22,
    },
    tableContainer: {
        borderWidth: 1,
        borderColor: colors.gray100,
        borderRadius: 16
    },
    setsContainer: {
        borderWidth: 1,
        borderRadius: 16,
        borderColor: colors.gray500,
    },
    headerIconButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 8
    },
})

export default React.memo(SubExerciseTabel)