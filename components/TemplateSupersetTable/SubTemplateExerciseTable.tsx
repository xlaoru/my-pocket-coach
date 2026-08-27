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
    isGeneralMoveDisable,
    isUnlinkAllExercisesDisabled,
    isDeleteSupersetDisabled,
    isCreateNewExerciseDisabled,
    isLocalMoveDisabled,
    isSubexercisesOfMovedSuperset,
    isLinkExerciseDisabled
}: ISubTemplateExerciseTableProps) {
    const [editableName, setEditableName] = useState(exercise.name);
    const [exerciseSets, setExerciseSets] = useState(exercise.sets)

    useEffect(() => {
        setEditableName(exercise.name);
    }, [exercise.name]);

    useEffect(() => {
        setExerciseSets(exercise.sets);
    }, [exercise.sets]);

    const [isDeleteExerciseDisabled, setDeleteExerciseDisabled] = useState(false)
    const [isUnlinkExerciseDisabled, setUnlinkExerciseDisabled] = useState(false)
    const [isEditSubexerciseNameDisabled, setEditSubexerciseNameDisabled] = useState(false)
    const [isEditSubexerciseSetDisabled, setEditSubexerciseSetDisabled] = useState(false)

    const handleNameBlur = useCallback(async () => {
        const trimmedName = editableName.trim();

        if (!trimmedName) {
            setEditableName(exercise.name);
            return;
        }

        if (trimmedName === exercise.name) {
            return;
        }

        setEditSubexerciseNameDisabled(true)

        await onExerciseNameChange(exercise._id, trimmedName).finally(() => {
            setEditSubexerciseNameDisabled(false)
        })
    }, [editableName, exercise._id, exercise.name, onExerciseNameChange])

    const handleDecrementSets = useCallback(async () => {
        if (exerciseSets <= 1) return;

        const next = exerciseSets - 1;

        setExerciseSets(next);

        setEditSubexerciseSetDisabled(true)

        await onExerciseSetChange(exercise._id, next).finally(() => {
            setEditSubexerciseSetDisabled(false)
        })
    }, [exercise._id, exerciseSets, onExerciseSetChange]);

    const handleIncrementSets = useCallback(async () => {
        const next = exerciseSets + 1

        setExerciseSets(next)

        setEditSubexerciseSetDisabled(true)

        await onExerciseSetChange(exercise._id, next).finally(() => {
            setEditSubexerciseSetDisabled(false)
        })
    }, [exercise._id, exerciseSets, onExerciseSetChange])

    const handleDeleteTemplateExercise = useCallback(async () => {
        setDeleteExerciseDisabled(true)
        await onDeleteExercise(exercise._id).finally(() => {
            setDeleteExerciseDisabled(false)
        })
    }, [exercise._id, onDeleteExercise])

    const handleUnlinkTemplateExercise = useCallback(async () => {
        setUnlinkExerciseDisabled(true)
        await onUnlinkExercise(supersetId, exercise._id).finally(() => {
            setUnlinkExerciseDisabled(false)
        })
    }, [exercise._id, onUnlinkExercise, supersetId])

    return (
        <View style={[styles.outterContainer, ((isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isGeneralMoveDisable || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isUnlinkExerciseDisabled || isLinkExerciseDisabled) && styles.disabled]}>
            <View style={styles.headerContainer}>
                <View style={styles.headingContainer}>
                    <Pressable disabled={(isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isGeneralMoveDisable || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isUnlinkExerciseDisabled || isLinkExerciseDisabled} onLongPress={onDrag} style={({ pressed }) => [pressed && styles.pressed, ((isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isGeneralMoveDisable || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isUnlinkExerciseDisabled || isLinkExerciseDisabled) && styles.disabled]}>
                        <Ionicons name="reorder-two" size={22} color={colors.gray100} />
                    </Pressable>
                    <Title disabled={(isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isGeneralMoveDisable || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isUnlinkExerciseDisabled || isLinkExerciseDisabled || isEditSubexerciseNameDisabled} isEditable style={styles.nameInput} onChangeText={setEditableName} onBlur={handleNameBlur}>{editableName}</Title>
                </View>
                <View style={styles.headerIconButtonsContainer}>
                    <IconButton disabled={(isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isGeneralMoveDisable || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isUnlinkExerciseDisabled || isLinkExerciseDisabled} iconName="unlink-outline" onPress={handleUnlinkTemplateExercise} />
                    <IconButton disabled={(isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isGeneralMoveDisable || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isUnlinkExerciseDisabled || isLinkExerciseDisabled} iconName="trash-bin-outline" onPress={handleDeleteTemplateExercise} />
                </View>
            </View>
            <View style={styles.setsContainer} >
                <IconButton disabled={(isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isGeneralMoveDisable || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isUnlinkExerciseDisabled || isLinkExerciseDisabled || isEditSubexerciseSetDisabled} iconName="remove-circle-outline" onPress={handleDecrementSets} />
                <Title>{exerciseSets} sets</Title>
                <IconButton disabled={(isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isGeneralMoveDisable || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isUnlinkExerciseDisabled || isLinkExerciseDisabled || isEditSubexerciseSetDisabled} iconName="add-circle-outline" onPress={handleIncrementSets} />
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