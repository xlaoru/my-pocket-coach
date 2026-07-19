import { colors } from "@/styles/colors";
import { IExerciseTableProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Checkbox from "../Checkbox/Checkbox";
import AddSetOutlineButton from "../ExerciseForm/AddSetOutlineButton";
import IconButton from "../IconButton/IconButton";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";
import ExerciseTableRow from "./ExerciseTableRow";

function ExerciseTableComponent({ index, exercise, workoutItemId, onDrag, onExerciseNameChange, onAddExerciseSet, onEditExerciseSet, onDeleteExerciseSet, onDeleteExercise, isSupersetCombiningMode, selectedExercises, setSelectedExercises, setSelectedExercisesData }: IExerciseTableProps) {
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

    const toggleSelect = useCallback(() => {
        setSelectedExercises((prev) => prev.includes(workoutItemId) ? prev.filter((id) => id !== workoutItemId) : [...prev, workoutItemId])
        setSelectedExercisesData((prev) =>
            prev.some((currentExercise) => currentExercise._id === exercise._id)
                ? prev.filter((currentExercise) => currentExercise._id !== exercise._id)
                : [...prev, exercise]
        )
    }, [workoutItemId, setSelectedExercises, setSelectedExercisesData, exercise])

    return (
        <View style={[styles.outterContainer, selectedExercises.includes(workoutItemId) && styles.selected]}>
            {
                isSupersetCombiningMode
                    ?
                    (
                        <View style={styles.combiningCheckboxContainer}>
                            <Checkbox isSelected={selectedExercises.includes(workoutItemId)} toggleSelect={toggleSelect} />
                            <Title>{editableName}</Title>
                        </View>
                    )
                    :
                    (
                        <View style={styles.headerContainer}>
                            <View style={styles.headingContainer}>
                                <Pressable onLongPress={onDrag} style={({ pressed }) => pressed && styles.pressed}>
                                    <Ionicons name="reorder-two" size={22} color={colors.gray100} />
                                </Pressable>
                                <View style={styles.indexBox}>
                                    <Paragraph>{index + 1}</Paragraph>
                                </View>
                                <Title isEditable onChangeText={setEditableName} onBlur={handleNameBlur}>{editableName}</Title>
                            </View>
                            <IconButton iconName="trash-bin-outline" onPress={handleDeleteExercise} />
                        </View>
                    )
            }
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
                {
                    exercise.sets.map((set, setIndex) => <ExerciseTableRow key={setIndex} exerciseId={exercise._id} index={setIndex} set={set} onEditExerciseSet={onEditExerciseSet} onDeleteExerciseSet={onDeleteExerciseSet} />)
                }
            </View>
            <AddSetOutlineButton onPress={() => onAddExerciseSet(exercise._id)} />
        </View>
    );
}

const styles = StyleSheet.create({
    outterContainer: {
        padding: 16,
        backgroundColor: colors.gray900,
        borderRadius: 14,
        gap: 12,
        borderWidth: 1,
        borderColor: colors.gray500,
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
    indexBox: {
        width: 28,
        height: 28,
        borderRadius: 10,
        backgroundColor: colors.gray500,
        justifyContent: "center",
        alignItems: "center",
    },
    setsContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.gray500,
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
    nameInput: {
        flexShrink: 1,
        minWidth: 0,
        fontSize: 18,
        fontWeight: "bold",
        color: colors.white,
        padding: 0,
    },
    pressed: {
        opacity: 0.5,
    },
    combiningCheckboxContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    selected: {
        borderWidth: 2,
        borderColor: colors.red500
    }
});

export default React.memo(ExerciseTableComponent);
