import { colors } from "@/styles/colors";
import { ISubTemplateExerciseTableProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
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
    isGeneralMoveDisable
}: ISubTemplateExerciseTableProps) {
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

    const handleUnlinkTemplateExercise = useCallback(() => {
        void onUnlinkExercise(supersetId, exercise._id)
    }, [exercise._id, onUnlinkExercise, supersetId])

    return (
        <View style={[styles.outterContainer, isGeneralMoveDisable && styles.disabled]}>
            <View style={styles.headerContainer}>
                <View style={styles.headingContainer}>
                    <Pressable disabled={isGeneralMoveDisable} onLongPress={onDrag} style={({ pressed }) => [pressed && styles.pressed, isGeneralMoveDisable && styles.disabled]}>
                        <Ionicons name="reorder-two" size={22} color={colors.gray100} />
                    </Pressable>
                    <Title disabled={isGeneralMoveDisable} isEditable style={styles.nameInput} onChangeText={setEditableName} onBlur={handleNameBlur}>{editableName}</Title>
                </View>
                <View style={styles.headerIconButtonsContainer}>
                    <IconButton disabled={isGeneralMoveDisable} iconName="unlink-outline" onPress={handleUnlinkTemplateExercise} />
                    <IconButton disabled={isGeneralMoveDisable} iconName="trash-bin-outline" onPress={handleDeleteTemplateExercise} />
                </View>
            </View>
            <View
                style={styles.setsContainer}
            >
                <IconButton disabled={isGeneralMoveDisable} iconName="remove-circle-outline" onPress={handleDecrementSets} />
                <Title>{exerciseSets} sets</Title>
                <IconButton disabled={isGeneralMoveDisable} iconName="add-circle-outline" onPress={handleIncrementSets} />
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
        flex: 1,
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    nameInput: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        color: colors.white,
        padding: 0,
    },
    pressed: {
        opacity: 0.85,
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
    disabled: {
        opacity: 0.5
    }
})

export default React.memo(SubTemplateExerciseTableComponent)