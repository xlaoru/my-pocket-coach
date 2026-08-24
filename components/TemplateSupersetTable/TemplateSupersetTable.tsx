import { colors } from "@/styles/colors";
import { ITemplateSupersetTableProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { NestableDraggableFlatList } from "react-native-draggable-flatlist";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";
import SubTemplateExerciseTable from "./SubTemplateExerciseTable";

function TemplateSupersetTableComponent({
    index,
    superset,
    templateWorkoutItemId,
    outsideSupersetExercises,
    onDrag,
    onSupersetNameChange,
    onDeleteSuperset,
    onExerciseNameChange,
    onExerciseSetChange,
    onDeleteExercise,
    onMoveExercise,
    onUnlinkExercise,
    onUnlinkAllExercises,
    onCreateNewExercise,
    onLinkExercise,
    isSupersetCombiningDisabled,
    isSupersetCombiningMode,
    isCreateExerciseDisabled,
    isGeneralMoveDisable,
    isDeleteExerciseDisabled
}: ITemplateSupersetTableProps) {
    const [editableName, setEditableName] = useState(superset.name)
    const [newExerciseName, setNewExerciseName] = useState("")

    const [isCreateNewExerciseMode, setCreateNewExerciseMode] = useState(false)
    const [isPickExistingExerciseMode, setPickExistingExerciseMode] = useState(false)

    useEffect(() => {
        setEditableName(superset.name);
    }, [superset.name]);

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
    }, [editableName, onSupersetNameChange, superset._id, superset.name])

    const handleDeleteTemplateSuperset = useCallback(() => {
        void onDeleteSuperset(superset._id)
    }, [superset._id, onDeleteSuperset])

    const handleUnlinkAllTemplateExercises = useCallback(() => {
        void onUnlinkAllExercises(superset._id)
    }, [onUnlinkAllExercises, superset._id])

    useEffect(() => {
        if (outsideSupersetExercises.length === 0) {
            setPickExistingExerciseMode(false)
        }
    }, [outsideSupersetExercises.length])

    const handleLinkTemplateExercise = useCallback((exerciseId: string) => {
        void onLinkExercise(superset._id, exerciseId)
    }, [onLinkExercise, superset._id])

    const handleCreateNewTemplateExercise = useCallback(() => {
        const trimmedNewExerciseName = newExerciseName.trim()

        if (!trimmedNewExerciseName) return

        void onCreateNewExercise(superset._id, trimmedNewExerciseName)

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
                    <Title isEditable style={styles.nameInput} onChangeText={setEditableName} onBlur={handleNameBlur}>{editableName}</Title>

                </View>
                <View style={styles.headerIconButtonsContainer}>
                    <IconButton iconName="unlink-outline" onPress={handleUnlinkAllTemplateExercises} />
                    <IconButton iconName="trash-bin-outline" onPress={handleDeleteTemplateSuperset} />
                </View>
            </View>
            <NestableDraggableFlatList
                data={superset.components}
                keyExtractor={(exercise) => exercise._id}
                containerStyle={styles.subExercisesContainer}
                contentContainerStyle={styles.subExercisesContent}
                renderItem={({ item: exercise, drag }) => (
                    <SubTemplateExerciseTable supersetId={superset._id}
                        exercise={exercise}
                        onDrag={drag}
                        onExerciseNameChange={onExerciseNameChange}
                        onExerciseSetChange={onExerciseSetChange}
                        onDeleteExercise={onDeleteExercise}
                        onUnlinkExercise={onUnlinkExercise}
                    />
                )}
                onDragEnd={({ from, to }) => {
                    if (from === to) return;
                    void onMoveExercise(templateWorkoutItemId, from, to)
                }}
            />
            <View style={styles.buttonsContainer}>
                {isCreateNewExerciseMode ? (
                    <View style={styles.createNewExerciseContainer}>
                        <Input label="New exercise name:" placeholder="E.g. Arnold Press" value={newExerciseName} onChangeText={setNewExerciseName} style={styles.input} />
                        <View style={styles.createNewExerciseButtonsContainer}>
                            <Button iconName="checkmark-outline" onPress={handleCreateNewTemplateExercise} style={styles.buttons}>Add</Button>
                            <Button variant="outlined" onPress={() => { setCreateNewExerciseMode(false); setNewExerciseName("") }} style={styles.buttons}>Cancel</Button>
                        </View>
                    </View>
                ) : (isPickExistingExerciseMode && !isSupersetCombiningDisabled && !isSupersetCombiningMode && !isGeneralMoveDisable && !isCreateExerciseDisabled && !isDeleteExerciseDisabled) ? (
                    <View style={styles.pickExistingExerciseContainer}>
                        {outsideSupersetExercises.map((exercise) => (
                            <Pressable key={exercise._id} disabled={isSupersetCombiningDisabled || isSupersetCombiningMode || isGeneralMoveDisable || isCreateExerciseDisabled || isDeleteExerciseDisabled} style={({ pressed }) => [styles.pickExistingExerciseCard, pressed && styles.pressed, (isSupersetCombiningDisabled || isSupersetCombiningMode || isGeneralMoveDisable || isCreateExerciseDisabled || isDeleteExerciseDisabled) && styles.disabled]} onPress={() => { handleLinkTemplateExercise(exercise.components[0]._id) }}>
                                <Ionicons name="barbell-outline" size={22} color={colors.red500} />
                                <Title>{exercise.name}</Title>
                            </Pressable>
                        ))}
                        <Button variant="outlined" disabled={isSupersetCombiningDisabled || isSupersetCombiningMode || isGeneralMoveDisable || isCreateExerciseDisabled || isDeleteExerciseDisabled} onPress={() => { setPickExistingExerciseMode(false) }} style={styles.buttons}>Cancel</Button>
                    </View>
                ) : (
                    <>
                        <Button iconName="add-circle-outline" variant="dashed" onPress={() => { setCreateNewExerciseMode(true) }} style={styles.buttons}>New Exercise</Button>
                        {outsideSupersetExercises.length >= 1 && <Button disabled={isSupersetCombiningDisabled || isSupersetCombiningMode || isGeneralMoveDisable || isCreateExerciseDisabled || isDeleteExerciseDisabled} iconName="barbell-outline" variant="dashed" onPress={() => { setPickExistingExerciseMode(true) }} style={styles.buttons}>Pick existing</Button>}
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
        opacity: 0.85,
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
    disabled: {
        opacity: 0.5
    }
})

export default React.memo(TemplateSupersetTableComponent)