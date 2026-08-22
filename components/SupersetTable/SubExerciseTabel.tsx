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

function SubExerciseTabel({ supersetId, exercise, onDrag, onExerciseNameChange, onAddExerciseSet, onEditExerciseSet, onDeleteExerciseSet, onDeleteExercise, onUnlinkExercise, onSetExerciseNote, isDeleteSupersetDisabled }: ISubExerciseTabelProps) {
    const [editableName, setEditableName] = useState(exercise.name);
    const [editableNote, setEditableNote] = useState(exercise.note)

    const [isNoteMode, setNoteMode] = useState(false)
    const noteInputRef = useRef<TextInput>(null)

    useEffect(() => {
        setEditableName(exercise.name);
        setEditableNote(exercise.note)
    }, [exercise.name, exercise.note]);

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

    const handleUnlinkExercise = useCallback(() => {
        void onUnlinkExercise(supersetId, exercise._id)
    }, [supersetId, exercise._id, onUnlinkExercise])

    const handleNotePress = useCallback(() => {
        if (exercise.note) {
            noteInputRef.current?.focus()
            return
        }

        setNoteMode(true)
    }, [exercise.note])

    const handleNoteBlur = useCallback(() => {
        const trimmedNote = editableNote.trim()

        if (!trimmedNote) {
            setNoteMode(false)
        }

        if (trimmedNote === exercise.note) return

        void onSetExerciseNote(exercise._id, trimmedNote)
    }, [exercise._id, exercise.note, editableNote, onSetExerciseNote])

    return (
        <View style={[styles.outterContainer, isDeleteSupersetDisabled && styles.disabled]}>
            <View style={styles.headerContainer}>
                <View style={styles.headingContainer}>
                    <Pressable onLongPress={onDrag} disabled={isDeleteSupersetDisabled} style={({ pressed }) => pressed && styles.pressed}>
                        <Ionicons name="reorder-two" size={22} color={colors.gray100} />
                    </Pressable>
                    <Title isEditable disabled={isDeleteSupersetDisabled} style={styles.nameInput} onChangeText={setEditableName} onBlur={handleNameBlur}>{editableName}</Title>
                </View>
                <View style={styles.headerIconButtonsContainer}>
                    <IconButton disabled={isDeleteSupersetDisabled} iconName="unlink-outline" onPress={handleUnlinkExercise} />
                    <IconButton disabled={isDeleteSupersetDisabled} iconName="reader-outline" onPress={handleNotePress} />
                    <IconButton disabled={isDeleteSupersetDisabled} iconName="trash-bin-outline" onPress={handleDeleteExercise} />
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
                    <SubExerciseTabelRow isDeleteSupersetDisabled={isDeleteSupersetDisabled} key={index} index={index} exerciseId={exercise._id} set={set} onEditExerciseSet={onEditExerciseSet} onDeleteExerciseSet={onDeleteExerciseSet} />
                ))}
            </View>
            <AddSetOutlineButton disabled={isDeleteSupersetDisabled} onPress={() => { onAddExerciseSet(exercise._id) }} />
            {
                (exercise.note || isNoteMode) && (
                    <View style={styles.noteContainer}>
                        <Paragraph disabled={isDeleteSupersetDisabled} ref={noteInputRef} isEditable autoFocus={isNoteMode && !exercise.note} onChangeText={setEditableNote} onBlur={handleNoteBlur} style={{ fontSize: 14 }}>{editableNote}</Paragraph>
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