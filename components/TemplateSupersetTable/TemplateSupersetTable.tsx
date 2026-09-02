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
    isDeleteExerciseDisabled,
    isUnlinkAllExercisesDisabled: isUnlinkAllExercisesGeneralDisabled,
    isLocalMoveDisabled,
    movedSupersetId,
    isUnlinkExerciseDisabled,
    setLinkedExerciseId,
    isGeneralLinkingDisabled,
    linkedSupersetId
}: ITemplateSupersetTableProps) {
    const [editableName, setEditableName] = useState(superset.name)
    const [newExerciseName, setNewExerciseName] = useState("")

    const [isCreateNewExerciseMode, setCreateNewExerciseMode] = useState(false)
    const [isPickExistingExerciseMode, setPickExistingExerciseMode] = useState(false)

    const [isSupersetNameDisabled, setSupersetNameDisabled] = useState(false)
    const [isDeleteSupersetDisabled, setDeleteSupersetDisabled] = useState(false)
    const [isUnlinkAllExercisesDisabled, setUnlinkAllExercisesDisabled] = useState(false)
    const [isCreateNewExerciseDisabled, setCreateNewExerciseDisabled] = useState(false)
    const [isLinkExerciseDisabled, setLinkExerciseDisabled] = useState(false)

    useEffect(() => {
        setEditableName(superset.name);
    }, [superset.name]);

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
    }, [editableName, onSupersetNameChange, superset._id, superset.name])

    const handleDeleteTemplateSuperset = useCallback(async () => {
        setDeleteSupersetDisabled(true)
        await onDeleteSuperset(superset._id).finally(() => {
            setDeleteSupersetDisabled(false)
        })
    }, [superset._id, onDeleteSuperset])

    const handleUnlinkAllTemplateExercises = useCallback(async () => {
        setUnlinkAllExercisesDisabled(true)
        await onUnlinkAllExercises(superset._id).finally(() => {
            setUnlinkAllExercisesDisabled(false)
        })
    }, [onUnlinkAllExercises, superset._id])

    useEffect(() => {
        if (outsideSupersetExercises.length === 0) {
            setPickExistingExerciseMode(false)
        }
    }, [outsideSupersetExercises.length])

    const handleLinkTemplateExercise = useCallback(async (exerciseId: string) => {
        setLinkExerciseDisabled(true)
        setLinkedExerciseId(exerciseId)
        await onLinkExercise(superset._id, exerciseId).finally(() => {
            setLinkExerciseDisabled(false)
            setLinkedExerciseId("")
        })
    }, [onLinkExercise, superset._id, setLinkedExerciseId])

    const handleCreateNewTemplateExercise = useCallback(async () => {
        const trimmedNewExerciseName = newExerciseName.trim()

        if (!trimmedNewExerciseName) return

        setCreateNewExerciseMode(false)

        setCreateNewExerciseDisabled(true)

        await onCreateNewExercise(superset._id, trimmedNewExerciseName).finally(() => {
            setCreateNewExerciseDisabled(false)
        })

        setNewExerciseName("")
    }, [newExerciseName, onCreateNewExercise, superset._id])

    return (
        <View style={[styles.outterContainer, (((movedSupersetId === superset._id) || isGeneralMoveDisable) || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isLinkExerciseDisabled) && styles.disabled]}>
            <View style={styles.headerContainer}>
                <View style={styles.headingContainer}>
                    <Pressable disabled={((movedSupersetId === superset._id) || isGeneralMoveDisable) || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isLinkExerciseDisabled} onLongPress={onDrag} style={({ pressed }) => [pressed && styles.pressed, (((movedSupersetId === superset._id) || isGeneralMoveDisable) || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isLinkExerciseDisabled) && styles.disabled]}>
                        <Ionicons name="reorder-two" size={22} color={colors.red500} />
                    </Pressable>
                    <View style={styles.indexBox}>
                        <Paragraph style={styles.indexText}>{index + 1}</Paragraph>
                    </View>
                    <Title isEditable disabled={isSupersetNameDisabled || ((movedSupersetId === superset._id) || isGeneralMoveDisable) || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isLinkExerciseDisabled} style={styles.nameInput} onChangeText={setEditableName} onBlur={handleNameBlur}>{editableName}</Title>
                </View>
                <View style={styles.headerIconButtonsContainer}>
                    <IconButton disabled={((movedSupersetId === superset._id) || isGeneralMoveDisable) || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isLinkExerciseDisabled} iconName="unlink-outline" onPress={handleUnlinkAllTemplateExercises} />
                    <IconButton disabled={((movedSupersetId === superset._id) || isGeneralMoveDisable) || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isLinkExerciseDisabled} iconName="trash-bin-outline" onPress={handleDeleteTemplateSuperset} />
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
                        isGeneralMoveDisable={isGeneralMoveDisable}
                        isUnlinkAllExercisesDisabled={isUnlinkAllExercisesDisabled}
                        isDeleteSupersetDisabled={isDeleteSupersetDisabled}
                        isCreateNewExerciseDisabled={isCreateNewExerciseDisabled}
                        isLocalMoveDisabled={isLocalMoveDisabled}
                        isSubexercisesOfMovedSuperset={movedSupersetId === superset._id}
                        isLinkExerciseDisabled={isLinkExerciseDisabled}
                    />
                )}
                onDragEnd={({ from, to }) => {
                    if (from === to) return;
                    void onMoveExercise(templateWorkoutItemId, from, to)
                }}
            />
            <View style={styles.buttonsContainer}>
                {(isCreateNewExerciseMode && !isUnlinkAllExercisesDisabled && !isDeleteSupersetDisabled && !((movedSupersetId === superset._id) || isGeneralMoveDisable)) ? (
                    <View style={styles.createNewExerciseContainer}>
                        <Input disabled={isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || ((movedSupersetId === superset._id) || isGeneralMoveDisable) || isCreateNewExerciseDisabled} label="New exercise name:" placeholder="E.g. Arnold Press" value={newExerciseName} onChangeText={setNewExerciseName} style={styles.input} />
                        <View style={styles.createNewExerciseButtonsContainer}>
                            <Button disabled={isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || ((movedSupersetId === superset._id) || isGeneralMoveDisable) || isCreateNewExerciseDisabled} iconName="checkmark-outline" onPress={handleCreateNewTemplateExercise} style={styles.buttons}>Add</Button>
                            <Button disabled={isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || ((movedSupersetId === superset._id) || isGeneralMoveDisable) || isCreateNewExerciseDisabled} variant="outlined" onPress={() => { setCreateNewExerciseMode(false); setNewExerciseName("") }} style={styles.buttons}>Cancel</Button>
                        </View>
                    </View>
                ) : (isPickExistingExerciseMode && !isSupersetCombiningDisabled && !isSupersetCombiningMode && !((movedSupersetId === superset._id) || isGeneralMoveDisable) && !isCreateExerciseDisabled && !isDeleteExerciseDisabled && !isUnlinkAllExercisesDisabled && !isUnlinkAllExercisesGeneralDisabled && !isDeleteSupersetDisabled && !isUnlinkExerciseDisabled && (!isGeneralLinkingDisabled || linkedSupersetId === superset._id)) ? (
                    <View style={styles.pickExistingExerciseContainer}>
                        {outsideSupersetExercises.map((exercise) => (
                            <Pressable key={exercise._id} disabled={isSupersetCombiningDisabled || isSupersetCombiningMode || ((movedSupersetId === superset._id) || isGeneralMoveDisable) || isCreateExerciseDisabled || isDeleteExerciseDisabled || isUnlinkAllExercisesDisabled || isUnlinkAllExercisesGeneralDisabled || isDeleteSupersetDisabled || isUnlinkExerciseDisabled || isLinkExerciseDisabled || (isGeneralLinkingDisabled && linkedSupersetId !== superset._id)} style={({ pressed }) => [styles.pickExistingExerciseCard, pressed && styles.pressed, (isSupersetCombiningDisabled || isSupersetCombiningMode || ((movedSupersetId === superset._id) || isGeneralMoveDisable) || isCreateExerciseDisabled || isDeleteExerciseDisabled || isUnlinkAllExercisesDisabled || isUnlinkAllExercisesGeneralDisabled || isDeleteSupersetDisabled || isUnlinkExerciseDisabled || isLinkExerciseDisabled || (isGeneralLinkingDisabled && linkedSupersetId !== superset._id)) && styles.disabled]} onPress={() => { handleLinkTemplateExercise(exercise.components[0]._id) }}>
                                <Ionicons name="barbell-outline" size={22} color={colors.red500} />
                                <Title>{exercise.name}</Title>
                            </Pressable>
                        ))}
                        <Button variant="outlined" disabled={isSupersetCombiningDisabled || isSupersetCombiningMode || ((movedSupersetId === superset._id) || isGeneralMoveDisable) || isCreateExerciseDisabled || isDeleteExerciseDisabled || isUnlinkAllExercisesDisabled || isUnlinkAllExercisesGeneralDisabled || isDeleteSupersetDisabled || isUnlinkExerciseDisabled || isLinkExerciseDisabled || (isGeneralLinkingDisabled && linkedSupersetId !== superset._id)} onPress={() => { setPickExistingExerciseMode(false) }} style={styles.buttons}>Cancel</Button>
                    </View>
                ) : (
                    <>
                        <Button disabled={((movedSupersetId === superset._id) || isGeneralMoveDisable) || isUnlinkAllExercisesDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isLinkExerciseDisabled} iconName="add-circle-outline" variant="dashed" onPress={() => { setCreateNewExerciseMode(true) }} style={styles.buttons}>New Exercise</Button>
                        {outsideSupersetExercises.length >= 1 && <Button disabled={isSupersetCombiningDisabled || isSupersetCombiningMode || ((movedSupersetId === superset._id) || isGeneralMoveDisable) || isCreateExerciseDisabled || isDeleteExerciseDisabled || isUnlinkAllExercisesDisabled || isUnlinkAllExercisesGeneralDisabled || isDeleteSupersetDisabled || isCreateNewExerciseDisabled || isUnlinkExerciseDisabled || isLinkExerciseDisabled || (isGeneralLinkingDisabled && linkedSupersetId !== superset._id)} iconName="barbell-outline" variant="dashed" onPress={() => { setPickExistingExerciseMode(true) }} style={styles.buttons}>Pick existing</Button>}
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
        gap: 8,
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