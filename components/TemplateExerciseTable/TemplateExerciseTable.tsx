import { colors } from "@/styles/colors";
import { ITemplateExerciseTableProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Checkbox from "../Checkbox/Checkbox";
import IconButton from "../IconButton/IconButton";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";

function TemplateExerciseTableComponents({
    index,
    exercise,
    templateWorkoutItemId,
    onDrag,
    onExerciseNameChange,
    onExerciseSetChange,
    onDeleteExercise,
    isSupersetCombiningMode,
    selectedExercises,
    setSelectedExercises,
    setSelectedExercisesData
}: ITemplateExerciseTableProps) {
    const [editableName, setEditableName] = useState(exercise.name);
    const [exerciseSets, setExerciseSets] = useState(exercise.sets)

    useEffect(() => {
        setEditableName(exercise.name);
    }, [exercise.name]);

    useEffect(() => {
        setExerciseSets(exercise.sets);
    }, [exercise.sets]);

    const handleNameBlur = useCallback(() => {
        const trimmedName = editableName.trim();

        if (!trimmedName) {
            setEditableName(exercise.name);
            return;
        }

        if (trimmedName === exercise.name) {
            return;
        }

        void onExerciseNameChange(exercise._id, trimmedName)
    }, [editableName, exercise._id, exercise.name, onExerciseNameChange])

    const handleDecrementSets = useCallback(() => {
        setExerciseSets((prev) => {
            if (prev <= 1) return prev;
            const next = prev - 1;
            void onExerciseSetChange(exercise._id, next);
            return next;
        });
    }, [exercise._id, onExerciseSetChange]);

    const handleIncrementSets = useCallback(() => {
        setExerciseSets((prev) => {
            const next = prev + 1;
            void onExerciseSetChange(exercise._id, next);
            return next;
        });
    }, [exercise._id, onExerciseSetChange]);

    const handleDeleteTemplateExercise = useCallback(() => {
        void onDeleteExercise(exercise._id)
    }, [exercise._id, onDeleteExercise])

    const toggleSelect = useCallback(() => {
        setSelectedExercises((prev) => prev.includes(templateWorkoutItemId) ? prev.filter((id) => id !== templateWorkoutItemId) : [...prev, templateWorkoutItemId])
        setSelectedExercisesData((prev) =>
            prev.some((currentExercise) => currentExercise._id === exercise._id)
                ? prev.filter((currentExercise) => currentExercise._id !== exercise._id)
                : [...prev, exercise]
        )
    }, [templateWorkoutItemId, setSelectedExercises, setSelectedExercisesData, exercise])

    return (
        <View style={[styles.outterContainer, selectedExercises.includes(templateWorkoutItemId) && styles.selected]}>
            {
                isSupersetCombiningMode
                    ? (
                        <View style={styles.combiningCheckboxContainer}>
                            <Checkbox isSelected={selectedExercises.includes(templateWorkoutItemId)} toggleSelect={toggleSelect} />
                            <Title>{editableName}</Title>
                        </View>
                    )
                    : (
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
                            <IconButton iconName="trash-bin-outline" onPress={handleDeleteTemplateExercise} />
                        </View>
                    )
            }
            <View
                style={styles.setsContainer}
            >
                <IconButton iconName="remove-circle-outline" onPress={handleDecrementSets} />
                <Title>{exerciseSets} sets</Title>
                <IconButton iconName="add-circle-outline" onPress={handleIncrementSets} />
            </View>
        </View>
    )
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
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
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


export default React.memo(TemplateExerciseTableComponents)

