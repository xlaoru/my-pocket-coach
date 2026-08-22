import { colors } from "@/styles/colors";
import { ISupersetTableProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { NestableDraggableFlatList } from "react-native-draggable-flatlist";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";
import SubExerciseTabel from "./SubExerciseTabel";

function SupersetTableComponent({ index, superset, workoutItemId, outsideSupersetExercises, onDrag, onSupersetNameChange, onDeleteSuperset, onExerciseNameChange, onAddExerciseSet, onEditExerciseSet, onDeleteExerciseSet, onDeleteExercise, onMoveExercise, onUnlinkExercise, onUnlinkAllExercises, onCreateNewExercise, onLinkExercise, onSetExerciseNote, onSetSupersetNote, isMoveDisabled }: ISupersetTableProps) {
    const [editableName, setEditableName] = useState(superset.name)
    const [newExerciseName, setNewExerciseName] = useState("")
    const [editableNote, setEditableNote] = useState(superset.note)

    const [isNoteMode, setNoteMode] = useState(false)
    const noteInputRef = useRef<TextInput>(null)

    const [isCreateNewExerciseMode, setCreateNewExerciseMode] = useState(false)
    const [isPickExistingExerciseMode, setPickExistingExerciseMode] = useState(false)

    const [isSupersetNameDisabled, setSupersetNameDisabled] = useState(false)
    const [isSupersetNoteDisabled, setSupersetNoteDisabled] = useState(false)
    const [isDeleteSupersetDisabled, setDeleteSupersetDisabled] = useState(false)

    useEffect(() => {
        setEditableName(superset.name)
        setEditableNote(superset.note)
    }, [superset.name, superset.note])

    useEffect(() => {
        if (outsideSupersetExercises.length === 0) {
            setPickExistingExerciseMode(false)
        }
    }, [outsideSupersetExercises.length])

    const handleNameBlur = useCallback(async () => {
        const trimmedName = editableName.trim()

        if (!trimmedName) {
            setEditableName(superset.name)
            return
        }

        if (trimmedName === superset.name) return

        setSupersetNameDisabled(true)

        await onSupersetNameChange(superset._id, trimmedName).finally(() => {
            setSupersetNameDisabled(false)
        })
    }, [editableName, superset._id, superset.name, onSupersetNameChange])

    const handleDeleteSuperset = useCallback(async () => {
        setDeleteSupersetDisabled(true)
        await onDeleteSuperset(superset._id).finally(() => {
            setDeleteSupersetDisabled(false)
        })
    }, [superset._id, onDeleteSuperset])

    const handleUnlinkAllExercises = useCallback(() => {
        void onUnlinkAllExercises(superset._id)
    }, [superset._id, onUnlinkAllExercises])

    const handleCreateNewExercise = useCallback(() => {
        const trimmedNewExerciseName = newExerciseName.trim()

        if (!trimmedNewExerciseName) {
            return
        }

        void onCreateNewExercise(superset._id, newExerciseName)

        setNewExerciseName("")
        setCreateNewExerciseMode(false)
    }, [newExerciseName, onCreateNewExercise, superset._id])

    const handleLinkExercise = useCallback((exerciseId: string) => {
        void onLinkExercise(superset._id, exerciseId)
    }, [superset._id, onLinkExercise])

    const handleNotePress = useCallback(() => {
        if (superset.note) {
            noteInputRef.current?.focus()
            return
        }

        setNoteMode(true)
    }, [superset.note])

    const handleNoteBlur = useCallback(async () => {
        const trimmedNote = editableNote.trim()

        if (!trimmedNote) {
            setNoteMode(false)
        }

        if (trimmedNote === superset.note) return

        setSupersetNoteDisabled(true)

        await onSetSupersetNote(superset._id, trimmedNote).finally(() => {
            setSupersetNoteDisabled(false)
        })
    }, [superset._id, superset.note, editableNote, onSetSupersetNote])

    return (
        <View style={[styles.outterContainer, isDeleteSupersetDisabled && styles.disabled]}>
            <View style={styles.headerContainer}>
                <View style={styles.headingContainer}>
                    <Pressable onLongPress={onDrag} style={({ pressed }) => [pressed && styles.pressed, (isDeleteSupersetDisabled || isMoveDisabled) && styles.disabled]} disabled={isDeleteSupersetDisabled || isMoveDisabled}>
                        <Ionicons name="reorder-two" size={22} color={colors.red500} />
                    </Pressable>
                    <View style={styles.indexBox}>
                        <Paragraph style={styles.indexText}>{index + 1}</Paragraph>
                    </View>
                    <Title isEditable disabled={isDeleteSupersetDisabled || isSupersetNameDisabled} style={styles.nameInput} onChangeText={setEditableName} onBlur={handleNameBlur}>{editableName}</Title>
                </View>
                <View style={styles.headerIconButtonsContainer}>
                    <IconButton disabled={isDeleteSupersetDisabled} iconName="unlink-outline" onPress={handleUnlinkAllExercises} />
                    <IconButton disabled={isDeleteSupersetDisabled || isSupersetNoteDisabled} iconName="reader-outline" onPress={handleNotePress} />
                    <IconButton disabled={isDeleteSupersetDisabled} iconName="trash-bin-outline" onPress={handleDeleteSuperset} />
                </View>
            </View>
            <NestableDraggableFlatList
                data={superset.components}
                keyExtractor={(exercise) => exercise._id}
                containerStyle={styles.subExercisesContainer}
                contentContainerStyle={styles.subExercisesContent}
                renderItem={({ item: exercise, drag }) => (
                    <SubExerciseTabel
                        supersetId={superset._id}
                        exercise={exercise}
                        onDrag={drag}
                        onExerciseNameChange={onExerciseNameChange}
                        onAddExerciseSet={onAddExerciseSet}
                        onEditExerciseSet={onEditExerciseSet}
                        onDeleteExerciseSet={onDeleteExerciseSet}
                        onDeleteExercise={onDeleteExercise}
                        onUnlinkExercise={onUnlinkExercise}
                        onSetExerciseNote={onSetExerciseNote}
                        isDeleteSupersetDisabled={isDeleteSupersetDisabled}
                    />
                )}
                onDragEnd={({ from, to }) => {
                    if (from === to) return;
                    void onMoveExercise(workoutItemId, from, to);
                }}
            />
            {
                (superset.note || isNoteMode) && (
                    <View style={styles.noteContainer}>
                        <Paragraph ref={noteInputRef} isEditable disabled={isDeleteSupersetDisabled || isSupersetNoteDisabled} autoFocus={isNoteMode && !superset.note} onChangeText={setEditableNote} onBlur={handleNoteBlur} style={{ fontSize: 14 }}>{editableNote}</Paragraph>
                    </View>
                )
            }
            <View style={styles.buttonsContainer}>
                {
                    (isCreateNewExerciseMode && !isDeleteSupersetDisabled)
                        ? (
                            <View style={styles.createNewExerciseContainer}>
                                <Input label="New exercise name:" placeholder="E.g. Arnold Press" value={newExerciseName} onChangeText={setNewExerciseName} style={styles.input} />
                                <View style={styles.createNewExerciseButtonsContainer}>
                                    <Button iconName="checkmark-outline" onPress={handleCreateNewExercise} style={styles.buttons}>Add</Button>
                                    <Button variant="outlined" onPress={() => { setCreateNewExerciseMode(false); setNewExerciseName("") }} style={styles.buttons}>Cancel</Button>
                                </View>
                            </View>
                        ) : (isPickExistingExerciseMode && !isDeleteSupersetDisabled)
                            ? (
                                <View style={styles.pickExistingExerciseContainer}>
                                    {outsideSupersetExercises.map((exercise) => (
                                        <Pressable key={exercise._id} style={({ pressed }) => pressed ? [styles.pickExistingExerciseCard, styles.pressed] : styles.pickExistingExerciseCard} onPress={() => { handleLinkExercise(exercise.components[0]._id) }}>
                                            <Ionicons name="barbell-outline" size={22} color={colors.red500} />
                                            <Title>{exercise.name}</Title>
                                        </Pressable>
                                    ))}
                                    <Button variant="outlined" onPress={() => { setPickExistingExerciseMode(false) }} style={styles.buttons}>Cancel</Button>
                                </View>
                            ) : (
                                <>
                                    <Button disabled={isDeleteSupersetDisabled} iconName="add-circle-outline" variant="dashed" onPress={() => { setCreateNewExerciseMode(true) }} style={styles.buttons}>New Exercise</Button>
                                    {outsideSupersetExercises.length >= 1 && <Button disabled={isDeleteSupersetDisabled} iconName="barbell-outline" variant="dashed" onPress={() => { setPickExistingExerciseMode(true) }} style={styles.buttons}>Pick existing</Button>}
                                </>
                            )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outterContainer: {
        padding: 16,
        backgroundColor: colors.red900,
        borderRadius: 14,
        gap: 12,
        borderWidth: 1,
        borderColor: colors.red500,
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
        backgroundColor: colors.red100,
        justifyContent: "center",
        alignItems: "center",
    },
    indexText: {
        color: colors.red500,
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
    headerIconButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 16
    },
    subExercisesContainer: {
        borderLeftWidth: 1,
        borderLeftColor: colors.red500,
        paddingHorizontal: 8,
    },
    subExercisesContent: {
        display: "flex",
        gap: 16,
    },
    buttonsContainer: {
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: colors.red500,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    buttons: {
        paddingVertical: 8,
        borderRadius: 16,
        flex: 1
    },
    input: {
        flex: 1
    },
    createNewExerciseContainer: {
        display: "flex",
        flex: 1,
        gap: 8
    },
    createNewExerciseButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 8
    },
    pickExistingExerciseContainer: {
        display: "flex",
        flex: 1,
        gap: 8
    },
    pickExistingExerciseCard: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        backgroundColor: colors.gray500,
        borderRadius: 8,
        padding: 12,
        color: colors.white,
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

export default React.memo(SupersetTableComponent)