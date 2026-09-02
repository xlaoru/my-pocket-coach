import { colors } from "@/styles/colors";
import { ISubExerciseTabelProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import AddSetOutlineButton from "../ExerciseForm/AddSetOutlineButton";
import IconButton from "../IconButton/IconButton";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";
import SubExerciseTabelRow from "./SubExerciseTabelRow";

function SubExerciseTabel({ supersetId, exercise, onDrag, onExerciseNameChange, onAddExerciseSet, onEditExerciseSet, onDeleteExerciseSet, onDeleteExercise, onUnlinkExercise, onSetExerciseNote, isMoveDisabled, isDeleteSupersetDisabled, isUnlinkAllExercisesDisabled, isCreateNewExerciseDisabled, isLinkExerciseDisabled, isLocalMoveDisabled, isSubexercisesOfMovedSuperset }: ISubExerciseTabelProps) {
    const [editableName, setEditableName] = useState(exercise.name);
    const [editableNote, setEditableNote] = useState(exercise.note)

    const [isNoteMode, setNoteMode] = useState(false)
    const noteInputRef = useRef<TextInput>(null)

    const [isUnlinkExerciseDisabled, setUnlinkExerciseDisabled] = useState(false)
    const [isEditSubxerciseNameDisabled, setEditSubxerciseNameDisabled] = useState(false)
    const [isAddExerciseSetDisabled, setAddExerciseSetDisabled] = useState(false)
    const [isExerciseNoteDisabled, setExerciseNoteDisabled] = useState(false)
    const [isDeleteExerciseDisabled, setDeleteExerciseDisabled] = useState(false)

    useEffect(() => {
        setEditableName(exercise.name);
        setEditableNote(exercise.note)
    }, [exercise.name, exercise.note]);

    const handleNameBlur = useCallback(async () => {
        const trimmedName = editableName.trim();

        if (!trimmedName) {
            setEditableName(exercise.name);
            return;
        }

        if (trimmedName === exercise.name) return

        setEditSubxerciseNameDisabled(true)

        await onExerciseNameChange(exercise._id, trimmedName).finally(() => {
            setEditSubxerciseNameDisabled(false)
        })
    }, [editableName, exercise._id, exercise.name, onExerciseNameChange]);

    const handleDeleteExercise = useCallback(async () => {
        setDeleteExerciseDisabled(true)
        await onDeleteExercise(exercise._id).finally(() => {
            setDeleteExerciseDisabled(false)
        })
    }, [exercise, onDeleteExercise])

    const handleUnlinkExercise = useCallback(async () => {
        setUnlinkExerciseDisabled(true)
        await onUnlinkExercise(supersetId, exercise._id).finally(() => {
            setUnlinkExerciseDisabled(false)
        })
    }, [supersetId, exercise._id, onUnlinkExercise])

    const handleNotePress = useCallback(() => {
        if (exercise.note) {
            noteInputRef.current?.focus()
            return
        }

        setNoteMode(true)
    }, [exercise.note])

    const handleNoteBlur = useCallback(async () => {
        const trimmedNote = editableNote.trim()

        if (!trimmedNote) {
            setNoteMode(false)
        }

        if (trimmedNote === exercise.note) return

        setExerciseNoteDisabled(true)

        await onSetExerciseNote(exercise._id, trimmedNote).finally(() => {
            setExerciseNoteDisabled(false)
        })
    }, [exercise._id, exercise.note, editableNote, onSetExerciseNote])

    const handleAddExerciseSet = useCallback(async () => {
        setAddExerciseSetDisabled(true)
        await onAddExerciseSet(exercise._id).finally(() => {
            setAddExerciseSetDisabled(false)
        })
    }, [exercise._id, onAddExerciseSet])

    return (
        <View style={[styles.outterContainer, ((isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isLinkExerciseDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isMoveDisabled || isUnlinkAllExercisesDisabled || isUnlinkExerciseDisabled || isDeleteSupersetDisabled) && styles.disabled]}>
            <View style={styles.headerContainer}>
                <View style={styles.headingContainer}>
                    <Pressable onLongPress={onDrag} disabled={(isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isLinkExerciseDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isUnlinkAllExercisesDisabled || isUnlinkExerciseDisabled || isMoveDisabled || isDeleteSupersetDisabled} style={({ pressed }) => [pressed && styles.pressed, ((isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isLinkExerciseDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isUnlinkAllExercisesDisabled || isUnlinkExerciseDisabled || isMoveDisabled || isDeleteSupersetDisabled) && styles.disabled]}>
                        <Ionicons name="reorder-two" size={22} color={colors.gray100} />
                    </Pressable>
                    <Title isEditable disabled={(isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isLinkExerciseDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isEditSubxerciseNameDisabled || isMoveDisabled || isUnlinkAllExercisesDisabled || isUnlinkExerciseDisabled || isDeleteSupersetDisabled} style={styles.nameInput} onChangeText={setEditableName} onBlur={handleNameBlur}>{editableName}</Title>
                </View>
                <View style={styles.headerIconButtonsContainer}>
                    <IconButton disabled={(isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isLinkExerciseDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isMoveDisabled || isUnlinkAllExercisesDisabled || isUnlinkExerciseDisabled || isDeleteSupersetDisabled} iconName="unlink-outline" onPress={handleUnlinkExercise} />
                    <IconButton disabled={(isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isLinkExerciseDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isExerciseNoteDisabled || isMoveDisabled || isUnlinkAllExercisesDisabled || isUnlinkExerciseDisabled || isDeleteSupersetDisabled} iconName="reader-outline" onPress={handleNotePress} />
                    <IconButton disabled={(isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isLinkExerciseDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isMoveDisabled || isUnlinkAllExercisesDisabled || isUnlinkExerciseDisabled || isDeleteSupersetDisabled} iconName="trash-bin-outline" onPress={handleDeleteExercise} />
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
                    <SubExerciseTabelRow isLocalMoveDisabled={(isSubexercisesOfMovedSuperset && isLocalMoveDisabled)} isLinkExerciseDisabled={isLinkExerciseDisabled} isCreateNewExerciseDisabled={isCreateNewExerciseDisabled} isDeleteExerciseDisabled={isDeleteExerciseDisabled} isMoveDisabled={isMoveDisabled} isUnlinkAllExercisesDisabled={isUnlinkAllExercisesDisabled} isUnlinkExerciseDisabled={isUnlinkExerciseDisabled} isDeleteSupersetDisabled={isDeleteSupersetDisabled} key={index} index={index} exerciseId={exercise._id} set={set} onEditExerciseSet={onEditExerciseSet} onDeleteExerciseSet={onDeleteExerciseSet} />
                ))}
            </View>
            <AddSetOutlineButton disabled={(isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isLinkExerciseDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isAddExerciseSetDisabled || isMoveDisabled || isUnlinkAllExercisesDisabled || isUnlinkExerciseDisabled || isDeleteSupersetDisabled} onPress={handleAddExerciseSet} />
            {
                (exercise.note || isNoteMode) && (
                    <View style={styles.noteContainer}>
                        <Paragraph disabled={(isSubexercisesOfMovedSuperset && isLocalMoveDisabled) || isLinkExerciseDisabled || isCreateNewExerciseDisabled || isDeleteExerciseDisabled || isExerciseNoteDisabled || isMoveDisabled || isUnlinkAllExercisesDisabled || isUnlinkExerciseDisabled || isDeleteSupersetDisabled} ref={noteInputRef} isEditable autoFocus={isNoteMode && !exercise.note} onChangeText={setEditableNote} onBlur={handleNoteBlur} style={{ fontSize: 14 }}>{editableNote}</Paragraph>
                    </View>
                )
            }
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
        gap: 8,
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
    noteContainer: {
        borderLeftWidth: 1,
        borderColor: colors.red500,
        paddingLeft: 8
    },
    disabled: {
        opacity: 0.5
    }
})

export default React.memo(SubExerciseTabel)