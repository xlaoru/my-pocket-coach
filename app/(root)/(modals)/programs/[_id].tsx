import AttachPeriodizationButton from "@/components/AttachPeriodizationButton/AttachPeriodizationButton";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import Paragraph from "@/components/Paragraph/Paragraph";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NestableDraggableFlatList, NestableScrollContainer } from "react-native-draggable-flatlist";

import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import ExerciseForm from "@/components/ExerciseForm/ExerciseForm";
import Loader from "@/components/Loader/Loader";
import { useProgram } from "@/features/programs/hooks/use-program";

import AttachPeriodizationForm from "@/components/AttachPeriodizationForm/AttachPeriodizationForm";
import ExerciseTable from "@/components/ExerciseTable/ExerciseTable";
import SupersetForm from "@/components/SupersetForm/SupersetForm";
import SupersetTable from "@/components/SupersetTable/SupersetTable";
import Title from "@/components/Title/Title";
import { useAddExerciseSet } from "@/features/programs/hooks/use-add-exercise-set";
import { useCreateExercise } from "@/features/programs/hooks/use-create-exercise";
import { useCreateNewExercise } from "@/features/programs/hooks/use-create-new-exercise";
import { useCreateSuperset } from "@/features/programs/hooks/use-create-superset";
import { useDeleteExercise } from "@/features/programs/hooks/use-delete-exercise";
import { useDeleteExerciseSet } from "@/features/programs/hooks/use-delete-exercise-set";
import { useDeleteSuperset } from "@/features/programs/hooks/use-delete-superset";
import { useEditExerciseName } from "@/features/programs/hooks/use-edit-exercise-name";
import { useEditExerciseSet } from "@/features/programs/hooks/use-edit-exercise-set";
import { useEditProgram } from "@/features/programs/hooks/use-edit-program";
import { useEditSupersetName } from "@/features/programs/hooks/use-edit-superset-name";
import { useLinkExercises } from "@/features/programs/hooks/use-link-exercise";
import { useLinkStage } from "@/features/programs/hooks/use-link-stage";
import { useMoveExercise } from "@/features/programs/hooks/use-move-exercise";
import { usePeriodizations } from "@/features/programs/hooks/use-periodizations";
import { useSetExerciseNote } from "@/features/programs/hooks/use-set-exercise-note";
import { useSetSupersetNote } from "@/features/programs/hooks/use-set-superset-note";
import { useUnlinkAllExercises } from "@/features/programs/hooks/use-unlink-all-exercises";
import { useUnlinkExercise } from "@/features/programs/hooks/use-unlink-exercise";
import { useUnlinkStage } from "@/features/programs/hooks/use-unlink-stage";
import { colors } from "@/styles/colors";
import { IExercise, IPeriodization, ISet } from "@/types/models";
import { parseNumericInput } from "@/utils/parseNumericInput";

export default function Program() {
    const insets = useSafeAreaInsets()

    const { _id } = useLocalSearchParams<{ _id: string }>()

    const { data: program, isLoading: isProgramLoading, isError: isProgramError, refetch: refetchProgram } = useProgram(_id)
    const { data: periodizations, isLoading: isPeriodizationsLoading, isError: isPeriodizationsError, refetch: refetchPeriodizations } = usePeriodizations()

    const createExerciseMutation = useCreateExercise()
    const editExerciseNameMutation = useEditExerciseName()
    const addExerciseSetMutation = useAddExerciseSet()
    const editExerciseSetMutation = useEditExerciseSet()
    const deleteExerciseSetMutation = useDeleteExerciseSet()
    const deleteExerciseMutation = useDeleteExercise()
    const moveExerciseMutation = useMoveExercise()
    const createSupersetMutation = useCreateSuperset()
    const editSupersetNameMutation = useEditSupersetName()
    const deleteSupersetMutation = useDeleteSuperset()
    const unlinkExerciseMutation = useUnlinkExercise()
    const unlinkAllExercisesMutation = useUnlinkAllExercises()
    const createNewExerciseMutation = useCreateNewExercise()
    const linkExerciseMutation = useLinkExercises()
    const editProgramMutation = useEditProgram()
    const linkStageMutation = useLinkStage()
    const unlinkStageMutation = useUnlinkStage()
    const setExerciseNoteMutation = useSetExerciseNote()
    const setSupersetNoteMutation = useSetSupersetNote()

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Programs"
        })
    }, [program, navigation])

    const programExercisesAmount = program?.workout.reduce((acc, item) => {
        if (item.type === "exercise") {
            return acc + 1
        } else if (item.type === "superset") {
            return acc + item.components.length
        }

        return acc
    }, 0) || 0

    const programBareExercisesAmount = program?.workout.reduce((acc, item) => {
        if (item.type === "exercise") {
            return acc + 1
        }

        return acc
    }, 0)

    const [isExerciseFormOpen, setExerciseFormOpen] = useState(false);
    const [isSupersetCombiningFormOpen, setSupersetCombiningFormOpen] = useState(false);

    const [isSupersetCombiningMode, setSupersetCombiningMode] = useState(false)
    const [selectedExercises, setSelectedExercises] = useState<string[]>([])
    const [selectedExercisesData, setSelectedExercisesData] = useState<IExercise[]>([])

    const [isAttachPeriodizationMode, setAttachPeriodizationMode] = useState(false)
    const [isStagePicking, setStagePicking] = useState(false)
    const [pickedPeriodization, setPickedPeriodization] = useState<IPeriodization | null>(null)

    const [programName, setProgramName] = useState(program?.name ?? "")
    const [programDescription, setProgramDescription] = useState(program?.description ?? "")

    const [exerciseName, setExerciseName] = useState("")
    const [supersetName, setSupersetName] = useState("")

    const [isProgramNameDisabled, setProgramNameDisabled] = useState(false)
    const [isProgramDescriptionDisabled, setProgramDescriptionDisabled] = useState(false)
    const [isCreateExerciseDisabled, setCreateExerciseDisabled] = useState(false)
    const [isAttachmentDisabled, setAttachmentDisabled] = useState(false)
    const [isMoveDisabled, setMoveDisabled] = useState(false)
    const [isSupersetCombiningDisabled, setSupersetCombiningDisabled] = useState(false)

    useEffect(() => {
        if (program) {
            setProgramName(program.name)
            setProgramDescription(program.description ?? "")
        }
    }, [program])

    const periodizationLabel = program?.periodizationStage
        ? `${program.periodizationStage.periodizationId?.name} — ${program.periodizationStage.name}`
        : null

    const [sets, setSets] = useState<ISet[]>([
        { weight: 0, reps: 0 },
    ])

    const outsideSupersetExercises = program?.workout.filter(item => item.type === "exercise") || []

    const handleSetChange = (index: number, field: "weight" | "reps", value: string) => {
        setSets((prevSets) => {
            const numeric = parseNumericInput(value, prevSets[index][field]);
            const newSets = [...prevSets];
            newSets[index] = { ...newSets[index], [field]: numeric };
            return newSets;
        });
    }

    const addSet = () => {
        setSets((prevSets) => [...prevSets, { weight: 0, reps: 0 }]);
    }

    const removeSet = (index: number) => {
        setSets((prevSets) => prevSets.filter((_, i) => i !== index));
    }

    const handleEditProgramName = useCallback(async () => {
        try {
            const trimmedName = programName.trim()

            if (!trimmedName) {
                setProgramName(program?.name ?? "")
                return
            }

            if (programName === program?.name) return

            setProgramNameDisabled(true)

            await editProgramMutation.mutateAsync({
                programId: _id,
                payload: {
                    name: trimmedName
                }
            }).finally(() => {
                setProgramNameDisabled(false)
            })
        } catch {
            Alert.alert("Failed to edit program name", "Please try again.")
        }
    }, [_id, program?.name, editProgramMutation, programName])

    const handleEditProgramDescription = useCallback(async () => {
        try {
            const trimmedDescription = programDescription.trim()

            if (!trimmedDescription) {
                setProgramDescription(program?.description ?? "")
                return
            }

            if (programDescription === program?.description) return

            setProgramDescriptionDisabled(true)

            await editProgramMutation.mutateAsync({
                programId: _id,
                payload: {
                    description: trimmedDescription
                }
            }).finally(() => {
                setProgramDescriptionDisabled(false)
            })
        } catch {
            Alert.alert("Failed to edit program description", "Please try again.")
        }
    }, [_id, program?.description, editProgramMutation, programDescription])

    const handleCreateExercise = useCallback(async () => {
        try {
            const trimmedExerciseName = exerciseName.trim()

            if (!trimmedExerciseName) return;

            setExerciseFormOpen(false)
            setCreateExerciseDisabled(true)

            await createExerciseMutation.mutateAsync({
                programId: _id,
                payload: {
                    name: trimmedExerciseName,
                    sets: sets
                }
            }).finally(() => {
                setCreateExerciseDisabled(false)
            })

            setExerciseName("")
            setSets([
                { weight: 0, reps: 0 },
            ])
        } catch {
            Alert.alert("Failed to create exercise", "Please try again.")
        }
    }, [_id, createExerciseMutation, exerciseName, sets])

    const handleEditExerciseName = useCallback(async (exerciseId: string, newName: string) => {
        try {
            const trimmedExerciseName = newName.trim();

            if (!trimmedExerciseName) return;

            await editExerciseNameMutation.mutateAsync({
                programId: _id,
                exerciseId,
                payload: {
                    name: trimmedExerciseName,
                },
            });
        } catch {
            Alert.alert("Failed to edit exercise name", "Please try again.");
        }
    }, [_id, editExerciseNameMutation])

    const handleAddExerciseSet = useCallback(async (exerciseId: string) => {
        try {
            await addExerciseSetMutation.mutateAsync({
                programId: _id,
                exerciseId,
                payload: {
                    weight: 0,
                    reps: 0
                }
            })
        } catch {
            Alert.alert("Failed to add new exercise set", "Please try again.");
        }
    }, [_id, addExerciseSetMutation])

    const handleEditExerciseSet = useCallback(async (exerciseId: string, setIndex: number, set: ISet) => {
        try {
            await editExerciseSetMutation.mutateAsync({
                programId: _id,
                exerciseId: exerciseId,
                setIndex,
                payload: {
                    weight: set.weight ?? 0,
                    reps: set.reps ?? 0
                }
            })
        } catch {
            Alert.alert("Failed to edit exercise set", "Please try again.");
        }
    }, [_id, editExerciseSetMutation])

    const handleDeleteExerciseSet = useCallback(async (exerciseId: string, setIndex: number) => {
        try {
            await deleteExerciseSetMutation.mutateAsync({
                programId: _id,
                exerciseId: exerciseId,
                setIndex
            })
        } catch {
            Alert.alert("Failed to delete exercise set", "Please try again.");
        }
    }, [_id, deleteExerciseSetMutation])

    const handleDeleteExercise = useCallback(async (exerciseId: string) => {
        try {
            await deleteExerciseMutation.mutateAsync({
                programId: _id,
                exerciseId: exerciseId
            })
        } catch {
            Alert.alert("Failed to delete exercise", "Please try again.");
        }
    }, [_id, deleteExerciseMutation])

    const handleMoveExercise = useCallback(async (containerId: string, sourceIndex: number, destinationIndex: number) => {
        try {
            setMoveDisabled(true)

            await moveExerciseMutation.mutateAsync({
                programId: _id,
                payload: {
                    containerId,
                    sourceIndex,
                    destinationIndex
                }
            }).finally(() => {
                setMoveDisabled(false)
            })
        } catch {
            Alert.alert("Failed to move exercise", "Please try again.");
        }
    }, [_id, moveExerciseMutation])

    useEffect(() => {
        if (!isSupersetCombiningMode) {
            setSelectedExercises([])
        }
    }, [isSupersetCombiningMode])

    const handleCreateSuperset = useCallback(async () => {
        try {
            setSupersetCombiningFormOpen(false)
            setSupersetCombiningMode(false)
            setSupersetCombiningDisabled(true)

            const trimmedSupertsetName = supersetName.trim()

            if (!trimmedSupertsetName) {
                return
            }

            await createSupersetMutation.mutateAsync({
                programId: _id,
                payload: {
                    name: supersetName,
                    workoutItemIds: selectedExercises
                }
            }).finally(() => {
                setSupersetCombiningDisabled(false)
            })

            setSupersetName("")
            setSelectedExercises([])
            setSelectedExercisesData([])
        } catch {
            Alert.alert("Failed to create superset", "Please try again.")
        }
    }, [_id, createSupersetMutation, selectedExercises, supersetName])

    const handleEditSupersetName = useCallback(async (supersetId: string, newName: string) => {
        const trimmedSupersetName = newName.trim()

        if (!trimmedSupersetName) {
            return
        }

        try {
            await editSupersetNameMutation.mutateAsync({
                programId: _id,
                supersetId,
                payload: {
                    name: trimmedSupersetName
                }
            })
        } catch {
            Alert.alert("Failed to edit superset name", "Please try again.");
        }
    }, [_id, editSupersetNameMutation])

    const handleDeleteSuperset = useCallback(async (supersetId: string) => {
        try {
            await deleteSupersetMutation.mutateAsync({
                programId: _id,
                supersetId
            })
        } catch {
            Alert.alert("Failed to delete superset", "Please try again.");
        }
    }, [_id, deleteSupersetMutation])

    const handleUnlinkExercise = useCallback(async (supersetId: string, exerciseId: string) => {
        try {
            await unlinkExerciseMutation.mutateAsync({
                programId: _id,
                supersetId,
                exerciseId
            })
        } catch {
            Alert.alert("Failed to unlink exercise", "Please try again.");
        }
    }, [_id, unlinkExerciseMutation])

    const handleUnlinkAllExercises = useCallback(async (supersetId: string) => {
        try {
            await unlinkAllExercisesMutation.mutateAsync({
                programId: _id,
                supersetId
            })
        } catch {
            Alert.alert("Failed to unlink exercises", "Please try again.");
        }
    }, [_id, unlinkAllExercisesMutation])

    const handleCreateNewExercise = useCallback(async (supersetId: string, newName: string) => {
        try {
            await createNewExerciseMutation.mutateAsync({
                programId: _id,
                supersetId,
                payload: {
                    name: newName,
                    sets: [
                        {
                            weight: 0, reps: 0
                        }
                    ]
                }
            })
        } catch {
            Alert.alert("Failed to create exercise", "Please try again.");
        }
    }, [_id, createNewExerciseMutation])

    const handleLinkExercise = useCallback(async (supersetId: string, exerciseId: string) => {
        try {
            await linkExerciseMutation.mutateAsync({
                programId: _id,
                supersetId,
                exerciseId
            })
        } catch {
            Alert.alert("Failed to link exercise", "Please try again.");
        }
    }, [_id, linkExerciseMutation])

    const handleLinkStage = useCallback(async (periodizationId: string, stageId: string) => {
        try {
            setAttachPeriodizationMode(false)
            setAttachmentDisabled(true)

            await linkStageMutation.mutateAsync({
                programId: _id,
                periodizationId,
                stageId
            }).finally(() => {
                setAttachmentDisabled(false)
            })
        } catch {
            Alert.alert("Failed to link stage", "Please try again.");
        }
    }, [_id, linkStageMutation])

    const handleUnlinkStage = useCallback(async (periodizationId: string, stageId: string) => {
        try {
            setAttachmentDisabled(true)

            await unlinkStageMutation.mutateAsync({
                programId: _id,
                periodizationId,
                stageId
            }).finally(() => {
                setAttachmentDisabled(false)
            })
        } catch {
            Alert.alert("Failed to unlink stage", "Please try again.");
        }
    }, [_id, unlinkStageMutation])

    const onHandleAttachment = useCallback(() => {
        if (!periodizationLabel) {
            setAttachPeriodizationMode(true)
        } else {
            if (program?.periodizationStage?.periodizationId?._id) {
                handleUnlinkStage(program?.periodizationStage?.periodizationId?._id, program?.periodizationStage?._id)
            }
        }
    }, [periodizationLabel, program?.periodizationStage?._id, program?.periodizationStage?.periodizationId?._id, handleUnlinkStage])

    const handleSetExerciseNote = useCallback(async (exerciseId: string, newNote: string) => {
        try {
            await setExerciseNoteMutation.mutateAsync({
                programId: _id,
                exerciseId,
                payload: {
                    note: newNote
                }
            })
        } catch {
            Alert.alert("Failed to set exercise note", "Please try again.");
        }
    }, [_id, setExerciseNoteMutation])

    const handleSetSupersetNote = useCallback(async (supersetId: string, newNote: string) => {
        try {
            await setSupersetNoteMutation.mutateAsync({
                programId: _id,
                supersetId,
                payload: {
                    note: newNote
                }
            })
        } catch {
            Alert.alert("Failed to set superset note", "Please try again.");
        }
    }, [_id, setSupersetNoteMutation])

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View
                style={[
                    { paddingBottom: insets.bottom + 12 },
                    styles.outerContainer,
                ]}
            >
                <View style={styles.header}>
                    {
                        isProgramLoading
                            ? (

                                <Heading>Loading...</Heading>
                            )
                            : (
                                <Heading isEditable onChangeText={setProgramName} onBlur={handleEditProgramName} disabled={isProgramNameDisabled}>{programName}</Heading>
                            )
                    }
                    {
                        program?.description && isProgramLoading
                            ? (
                                <Paragraph>Loading...</Paragraph>
                            )
                            : (
                                <Paragraph isEditable onChangeText={setProgramDescription} onBlur={handleEditProgramDescription} disabled={isProgramDescriptionDisabled}>{programDescription}</Paragraph>
                            )
                    }
                    <AttachPeriodizationButton onPress={onHandleAttachment} isAttaced={Boolean(periodizationLabel)} value={isProgramLoading ? "Loading..." : periodizationLabel} disabled={isAttachmentDisabled} />
                </View>
                {isSupersetCombiningMode && (
                    <View style={styles.combiningPanelContainer}>
                        <View>
                            <Title style={styles.combiningPanelTitle}>Combining mode</Title>
                            <Paragraph>Select at least 2</Paragraph>
                        </View>
                        <View style={styles.combiningPanelButtonsContainer}>
                            <Button variant="outlined" onPress={() => { setSupersetCombiningMode(false); setSelectedExercises([]); setSelectedExercisesData([]) }} style={styles.combiningPanelButton}>Cancel</Button>
                            {selectedExercises.length >= 2 && <Button onPress={() => { setSupersetCombiningFormOpen(true) }} style={styles.combiningPanelButton}>Combine</Button>}
                        </View>
                    </View>
                )}
                <View style={styles.listContainer}>
                    {
                        isProgramError
                            ? (
                                <EntityEmptyState
                                    iconName="alert-circle-outline"
                                    title="Failed to load program"
                                    message="Please check the API connection and try again."
                                    onRetry={() => refetchProgram()}
                                />
                            )
                            : isProgramLoading || createExerciseMutation.isPending || createSupersetMutation.isPending
                                ? (
                                    <Loader text="Loading your program..." />
                                )
                                : programExercisesAmount === 0
                                    ? (
                                        <EntityEmptyState iconName="barbell" title="Empty program" message="Add exercise below to get started" />
                                    )
                                    : <NestableScrollContainer showsVerticalScrollIndicator={false}>
                                        <NestableDraggableFlatList
                                            autoscrollThreshold={30}
                                            autoscrollSpeed={100}
                                            data={program!.workout ?? []}
                                            renderItem={({ item, getIndex, drag }) => {
                                                const index = getIndex()
                                                return (
                                                    <View style={styles.itemWrapper}>
                                                        {
                                                            item.type === "exercise"
                                                                ? (
                                                                    <ExerciseTable
                                                                        index={index ?? 0}
                                                                        exercise={item.components[0]}
                                                                        workoutItemId={item._id}
                                                                        onDrag={drag}
                                                                        onExerciseNameChange={handleEditExerciseName}
                                                                        onAddExerciseSet={handleAddExerciseSet}
                                                                        onEditExerciseSet={handleEditExerciseSet}
                                                                        onDeleteExerciseSet={handleDeleteExerciseSet}
                                                                        onDeleteExercise={handleDeleteExercise}
                                                                        isSupersetCombiningMode={isSupersetCombiningMode}
                                                                        selectedExercises={selectedExercises}
                                                                        setSelectedExercises={setSelectedExercises}
                                                                        setSelectedExercisesData={setSelectedExercisesData}
                                                                        onSetExerciseNote={handleSetExerciseNote}
                                                                        isMoveDisabled={isMoveDisabled}
                                                                    />
                                                                )
                                                                : (
                                                                    <SupersetTable
                                                                        index={index ?? 0}
                                                                        superset={item}
                                                                        workoutItemId={item._id}
                                                                        outsideSupersetExercises={outsideSupersetExercises}
                                                                        onDrag={drag}
                                                                        onSupersetNameChange={handleEditSupersetName}
                                                                        onDeleteSuperset={handleDeleteSuperset}
                                                                        onExerciseNameChange={handleEditExerciseName}
                                                                        onAddExerciseSet={handleAddExerciseSet}
                                                                        onEditExerciseSet={handleEditExerciseSet}
                                                                        onDeleteExerciseSet={handleDeleteExerciseSet}
                                                                        onDeleteExercise={handleDeleteExercise}
                                                                        onMoveExercise={handleMoveExercise}
                                                                        onUnlinkExercise={handleUnlinkExercise}
                                                                        onUnlinkAllExercises={handleUnlinkAllExercises}
                                                                        onCreateNewExercise={handleCreateNewExercise}
                                                                        onLinkExercise={handleLinkExercise}
                                                                        onSetExerciseNote={handleSetExerciseNote}
                                                                        onSetSupersetNote={handleSetSupersetNote}
                                                                    />
                                                                )
                                                        }
                                                    </View>
                                                )
                                            }}
                                            keyExtractor={(item) => item._id}
                                            onDragEnd={({ from, to }) => {
                                                if (from === to) {
                                                    return
                                                }

                                                handleMoveExercise(_id, from, to)
                                            }}
                                        />
                                    </NestableScrollContainer>
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <Button disabled={isCreateExerciseDisabled || isSupersetCombiningMode} iconName="add" onPress={() => setExerciseFormOpen(true)} style={styles.button}>New Exercise</Button>
                    {program?.workout && (programBareExercisesAmount ?? 0) >= 2 && <Button iconName="layers" variant="secondary" onPress={() => { setSupersetCombiningMode((prev) => !prev); setSelectedExercises([]); setSelectedExercisesData([]) }} style={styles.button}>Add Superset</Button>}
                </View>
                <BottomSheetForm disabled={isCreateExerciseDisabled} isOpen={isExerciseFormOpen} onClose={() => setExerciseFormOpen(false)} onSubmit={handleCreateExercise} title="Add Exercise">
                    <ExerciseForm exerciseName={exerciseName} setExerciseName={setExerciseName} sets={sets} onSetChange={handleSetChange} onAddSet={addSet} onRemoveSet={removeSet} />
                </BottomSheetForm>
                <BottomSheetForm disabled={isSupersetCombiningDisabled} isOpen={isSupersetCombiningFormOpen} title="Create Superset" onSubmit={handleCreateSuperset} onClose={() => { setSupersetCombiningFormOpen(false) }}>
                    <SupersetForm supersetName={supersetName} setSupersetName={setSupersetName} selectedExercisesData={selectedExercisesData} />
                </BottomSheetForm>
                <BottomSheetForm isWithoutSubmition isOpen={isAttachPeriodizationMode} title="Select Periodization" onSubmit={() => { }} onClose={() => { setAttachPeriodizationMode(false); setStagePicking(false); setPickedPeriodization(null) }}>
                    <AttachPeriodizationForm periodizations={periodizations ?? []} onLinkStage={handleLinkStage} setAttachPeriodizationMode={setAttachPeriodizationMode} isStagePicking={isStagePicking} pickedPeriodization={pickedPeriodization} setStagePicking={setStagePicking} setPickedPeriodization={setPickedPeriodization} isLoading={isPeriodizationsLoading} isError={isPeriodizationsError} refetchPeriodizations={refetchPeriodizations} />
                </BottomSheetForm>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        flex: 1,
    },
    outerContainer: {
        flex: 1,
        padding: 16,
        gap: 16,
        justifyContent: "space-between"
    },
    header: {
        gap: 2,
    },
    listContainer: {
        flex: 1,
    },
    attachment: {
        fontWeight: "bold"
    },
    itemWrapper: {
        paddingBottom: 12,
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 8
    },
    button: {
        flex: 1
    },
    combiningPanelContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.red900,
        borderWidth: 1,
        borderColor: colors.red500,
        borderRadius: 10,
        padding: 15
    },
    combiningPanelTitle: {
        color: colors.red500
    },
    combiningPanelButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    combiningPanelButton: {
        paddingVertical: 8,
        borderRadius: 16
    }
});