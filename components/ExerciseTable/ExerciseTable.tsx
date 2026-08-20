import { colors } from "@/styles/colors";
import { IExerciseTableProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Checkbox from "../Checkbox/Checkbox";
import AddSetOutlineButton from "../ExerciseForm/AddSetOutlineButton";
import IconButton from "../IconButton/IconButton";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";
import ExerciseTableRow from "./ExerciseTableRow";

function ExerciseTableComponent({ index, exercise, workoutItemId, onDrag, onExerciseNameChange, onAddExerciseSet, onEditExerciseSet, onDeleteExerciseSet, onDeleteExercise, isSupersetCombiningMode, selectedExercises, setSelectedExercises, setSelectedExercisesData, onSetExerciseNote }: IExerciseTableProps) {
    const [editableName, setEditableName] = useState(exercise.name)
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

    const toggleSelect = useCallback(() => {
        setSelectedExercises((prev) => prev.includes(workoutItemId) ? prev.filter((id) => id !== workoutItemId) : [...prev, workoutItemId])
        setSelectedExercisesData((prev) =>
            prev.some((currentExercise) => currentExercise._id === exercise._id)
                ? prev.filter((currentExercise) => currentExercise._id !== exercise._id)
                : [...prev, exercise]
        )
    }, [workoutItemId, setSelectedExercises, setSelectedExercisesData, exercise])

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
                                <Title isEditable style={styles.nameInput} onChangeText={setEditableName} onBlur={handleNameBlur}>{editableName}</Title>
                            </View>
                            <View style={styles.headerIconButtonsContainer}>
                                <IconButton iconName="reader-outline" onPress={handleNotePress} />
                                <IconButton iconName="trash-bin-outline" onPress={handleDeleteExercise} />
                            </View>
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
            {
                (exercise.note || isNoteMode) && (
                    <View style={styles.noteContainer}>
                        <Paragraph ref={noteInputRef} isEditable autoFocus={isNoteMode && !exercise.note} onChangeText={setEditableNote} onBlur={handleNoteBlur} style={{ fontSize: 14 }}>{editableNote}</Paragraph>
                    </View>
                )
            }
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
        flex: 1,
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
        flex: 1,
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
});

export default React.memo(ExerciseTableComponent);
