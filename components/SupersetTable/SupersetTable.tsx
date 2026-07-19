import { colors } from "@/styles/colors";
import { ISupersetTableProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { NestableDraggableFlatList } from "react-native-draggable-flatlist";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";
import SubExerciseTabel from "./SubExerciseTabel";

function SupersetTableComponent({ index, superset, workoutItemId, outsideSupersetExercises, onDrag, onSupersetNameChange, onDeleteSuperset, onExerciseNameChange, onAddExerciseSet, onEditExerciseSet, onDeleteExerciseSet, onDeleteExercise, onMoveExercise, onUnlinkExercise, onUnlinkAllExercises, onCreateNewExercise }: ISupersetTableProps) {
    const [editableName, setEditableName] = useState(superset.name)
    const [newExerciseName, setNewExerciseName] = useState("")

    const [isCreateNewExerciseMode, setCreateNewExerciseMode] = useState(false)
    const [isPickExistingExerciseMode, setPickExistingExerciseMode] = useState(false)

    useEffect(() => {
        setEditableName(superset.name)
    }, [superset.name])

    useEffect(() => {
        if (outsideSupersetExercises.length === 0) {
            setPickExistingExerciseMode(false)
        }
    }, [outsideSupersetExercises.length])

    const handleNameBlur = useCallback(() => {
        const trimmedName = editableName.trim()

        if (!trimmedName) {
            setEditableName(superset.name)
            return
        }

        if (trimmedName === superset.name) {
            return
        }

        void onSupersetNameChange(superset._id, trimmedName)
    }, [editableName, superset._id, superset.name, onSupersetNameChange])

    const handleDeleteSuperset = useCallback(() => {
        void onDeleteSuperset(superset._id)
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

    return (
        <View style={styles.outterContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.headingContainer}>
                    <Pressable onLongPress={onDrag} style={({ pressed }) => pressed && styles.pressed}>
                        <Ionicons name="reorder-two" size={22} color={colors.red500} />
                    </Pressable>
                    <View style={styles.indexBox}>
                        <Paragraph style={styles.indexText}>{index + 1}</Paragraph>
                    </View>
                    <Title isEditable onChangeText={setEditableName} onBlur={handleNameBlur}>{editableName}</Title>
                </View>
                <View style={styles.headerIconButtonsContainer}>
                    <IconButton iconName="unlink-outline" onPress={handleUnlinkAllExercises} />
                    <IconButton iconName="trash-bin-outline" onPress={handleDeleteSuperset} />
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
                    />
                )}
                onDragEnd={({ from, to }) => {
                    if (from === to) return;
                    void onMoveExercise(workoutItemId, from, to);
                }}
            />
            <View style={styles.buttonsContainer}>
                {isCreateNewExerciseMode ? (
                    <View style={styles.createNewExerciseContainer}>
                        <Input label="New exercise name:" placeholder="E.g. Arnold Press" value={newExerciseName} onChangeText={setNewExerciseName} style={styles.input} />
                        <View style={styles.createNewExerciseButtonsContainer}>
                            <Button iconName="checkmark-outline" onPress={handleCreateNewExercise} style={styles.buttons}>Add</Button>
                            <Button variant="outlined" onPress={() => { setCreateNewExerciseMode(false); setNewExerciseName("") }} style={styles.buttons}>Cancel</Button>
                        </View>
                    </View>
                ) : isPickExistingExerciseMode ? (
                    <View style={styles.pickExistingExerciseContainer}>
                        {outsideSupersetExercises.map((exercise) => (
                            <Pressable key={exercise._id} style={({ pressed }) => pressed ? [styles.pickExistingExerciseCard, styles.pressed] : styles.pickExistingExerciseCard} onPress={() => { }}>
                                <Ionicons name="barbell-outline" size={22} color={colors.red500} />
                                <Title>{exercise.name}</Title>
                            </Pressable>
                        ))}
                        <Button variant="outlined" onPress={() => { setPickExistingExerciseMode(false) }} style={styles.buttons}>Cancel</Button>
                    </View>
                ) : (
                    <>
                        <Button iconName="add-circle-outline" variant="dashed" onPress={() => { setCreateNewExerciseMode(true) }} style={styles.buttons}>New Exercise</Button>
                        {outsideSupersetExercises.length >= 2 && <Button iconName="barbell-outline" variant="dashed" onPress={() => { setPickExistingExerciseMode(true) }} style={styles.buttons}>Pick existing</Button>}
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
    }
})

export default React.memo(SupersetTableComponent)