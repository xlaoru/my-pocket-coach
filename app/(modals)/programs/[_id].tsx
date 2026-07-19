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

import ExerciseTable from "@/components/ExerciseTable/ExerciseTable";
import SupersetForm from "@/components/SupersetForm/SupersetForm";
import SupersetTable from "@/components/SupersetTable/SupersetTable";
import Title from "@/components/Title/Title";
import { useAddExerciseSet } from "@/features/programs/hooks/use-add-exercise-set";
import { useCreateExercise } from "@/features/programs/hooks/use-create-exercise";
import { useCreateSuperset } from "@/features/programs/hooks/use-create-superset";
import { useDeleteExercise } from "@/features/programs/hooks/use-delete-exercise";
import { useDeleteExerciseSet } from "@/features/programs/hooks/use-delete-exercise-set";
import { useDeleteSuperset } from "@/features/programs/hooks/use-delete-superset";
import { useEditExerciseName } from "@/features/programs/hooks/use-edit-exercise-name";
import { useEditExerciseSet } from "@/features/programs/hooks/use-edit-exercise-set";
import { useEditSupersetName } from "@/features/programs/hooks/use-edit-superset-name";
import { useMoveExercise } from "@/features/programs/hooks/use-move-exercise";
import { colors } from "@/styles/colors";
import { IExercise, ISet } from "@/types/models";

export default function Program() {
    const insets = useSafeAreaInsets()

    const { _id } = useLocalSearchParams<{ _id: string }>()

    const { data: program, isLoading, isError } = useProgram(_id)
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

    const [isExerciseFormOpen, setExerciseFormOpen] = useState(false);
    const [isSupersetCombiningFormOpen, setSupersetCombiningFormOpen] = useState(false);

    const [isSupersetCombiningMode, setSupersetCombiningMode] = useState(false)
    const [selectedExercises, setSelectedExercises] = useState<string[]>([])
    const [selectedExercisesData, setSelectedExercisesData] = useState<IExercise[]>([])

    const [exerciseName, setExerciseName] = useState("")
    const [supersetName, setSupersetName] = useState("")

    const [sets, setSets] = useState<ISet[]>([
        { weight: 0, reps: 0 },
    ])

    const handleSetChange = (index: number, field: "weight" | "reps", value: string) => {
        const parsed = parseInt(value, 10);
        const numeric = isNaN(parsed) ? 0 : parsed;
        setSets((prevSets) => {
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

    const handleCreateExercise = useCallback(async () => {
        const trimmedExerciseName = exerciseName.trim()

        if (!trimmedExerciseName) return;

        if (createExerciseMutation.isPending) return;

        try {
            await createExerciseMutation.mutateAsync({
                programId: _id,
                payload: {
                    name: trimmedExerciseName,
                    sets: sets
                }
            })

            setExerciseName("")
            setSets([
                { weight: 0, reps: 0 },
            ])
            setExerciseFormOpen(false)
        } catch {
            Alert.alert("Failed to create exercise", "Please try again.")
        }
    }, [_id, createExerciseMutation, exerciseName, sets])

    const handleEditExerciseName = useCallback(async (exerciseId: string, newName: string) => {
        const trimmedExerciseName = newName.trim();

        if (!trimmedExerciseName) return;

        try {
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
            await moveExerciseMutation.mutateAsync({
                programId: _id,
                payload: {
                    containerId,
                    sourceIndex,
                    destinationIndex
                }
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
            })

            setSupersetName("")
            setSelectedExercises([])
            setSupersetCombiningMode(false)
            setSupersetCombiningFormOpen(false)
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
                    <Heading isEditable>{isLoading ? "Loading..." : program?.name}</Heading>
                    <Paragraph isEditable>{isLoading ? "Loading..." : program?.description}</Paragraph>
                    <AttachPeriodizationButton onPress={() => { }} />
                </View>
                {isSupersetCombiningMode && (
                    <View style={styles.combiningPanelContainer}>
                        <View>
                            <Title style={styles.combiningPanelTitle}>Combining mode</Title>
                            <Paragraph>Select at least 2</Paragraph>
                        </View>
                        <View style={styles.combiningPanelButtonsContainer}>
                            <Button variant="outlined" onPress={() => { setSupersetCombiningMode(false) }} style={styles.combiningPanelButton}>Cancel</Button>
                            {selectedExercises.length >= 2 && <Button onPress={() => { setSupersetCombiningFormOpen(true) }} style={styles.combiningPanelButton}>Combine</Button>}
                        </View>
                    </View>
                )}
                <View style={styles.listContainer}>
                    {
                        isError
                            ? (
                                <EntityEmptyState
                                    iconName="alert-circle-outline"
                                    title="Failed to load programs"
                                    message="Please check the API connection and try again."
                                />
                            )
                            : isLoading
                                ? (
                                    <Loader />
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
                                                                    />
                                                                )
                                                                : (
                                                                    <SupersetTable
                                                                        index={index ?? 0}
                                                                        superset={item}
                                                                        workoutItemId={item._id}
                                                                        onDrag={drag}
                                                                        onSupersetNameChange={handleEditSupersetName}
                                                                        onDeleteSuperset={handleDeleteSuperset}
                                                                        onExerciseNameChange={handleEditExerciseName}
                                                                        onAddExerciseSet={handleAddExerciseSet}
                                                                        onEditExerciseSet={handleEditExerciseSet}
                                                                        onDeleteExerciseSet={handleDeleteExerciseSet}
                                                                        onDeleteExercise={handleDeleteExercise}
                                                                        onMoveExercise={handleMoveExercise}
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
                    <Button iconName="add" onPress={() => setExerciseFormOpen(true)} style={styles.button}>New Exercise</Button>
                    {program?.workout && program?.workout.length >= 2 && <Button iconName="layers" variant="secondary" onPress={() => setSupersetCombiningMode((prev) => !prev)} style={styles.button}>Add Superset</Button>}
                </View>
                <BottomSheetForm isOpen={isExerciseFormOpen} onClose={() => setExerciseFormOpen(false)} onSubmit={handleCreateExercise} title="Add Exercise">
                    <ExerciseForm exerciseName={exerciseName} setExerciseName={setExerciseName} sets={sets} onSetChange={handleSetChange} onAddSet={addSet} onRemoveSet={removeSet} />
                </BottomSheetForm>
                <BottomSheetForm isOpen={isSupersetCombiningFormOpen} title="Create Superset" onSubmit={handleCreateSuperset} onClose={() => { setSupersetCombiningFormOpen(false) }}>
                    <SupersetForm supersetName={supersetName} setSupersetName={setSupersetName} selectedExercisesData={selectedExercisesData} />
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
        gap: 2
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