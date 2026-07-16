import AttachPeriodizationButton from "@/components/AttachPeriodizationButton/AttachPeriodizationButton";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import Paragraph from "@/components/Paragraph/Paragraph";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DraggableFlatList from "react-native-draggable-flatlist" 

import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import ExerciseForm from "@/components/ExerciseForm/ExerciseForm";
import { useProgram } from "@/features/programs/hooks/use-program";
import Loader from "@/components/Loader/Loader";

import ExerciseTable from "@/components/ExerciseTable/ExerciseTable";
import { useCreateExercise } from "@/features/programs/hooks/use-create-exercise";
import { useEditExerciseName } from "@/features/programs/hooks/use-edit-exercise-name";
import { ISet } from "@/types/models";
import { useAddExerciseSet } from "@/features/programs/hooks/use-add-exercise-set";
import { useEditExerciseSet } from "@/features/programs/hooks/use-edit-exercise-set";
import { useDeleteExerciseSet } from "@/features/programs/hooks/use-delete-exercise-set";
import { useDeleteExercise } from "@/features/programs/hooks/use-delete-exercise";
import { useMoveExercise } from "@/features/programs/hooks/use-move-exercise";
import Title from "@/components/Title/Title";
import { colors } from "@/styles/colors";

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

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const [isSupersetCombiningMode, setSupersetCombiningMode] = useState(false)
    const [selectedExercises, setSelectedExercises] = useState<string[]>([])

    const [exerciseName, setExerciseName] = useState("")

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

    const handleCreateExercise = async () => {
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
            setIsBottomSheetOpen(false)
        } catch {
            Alert.alert("Failed to create exercise", "Please try again.")
        }
    }

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

    const handleDeleteExerciseSet = useCallback(async(exerciseId: string, setIndex: number) => {
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

    const handleDeleteExercise = useCallback(async(exerciseId: string) => {
        try {
            await deleteExerciseMutation.mutateAsync({
                programId: _id,
                exerciseId: exerciseId
            })
        } catch {
            Alert.alert("Failed to delete exercise", "Please try again.");
        }
    }, [_id, deleteExerciseMutation])

    const handleMoveExercise = useCallback(async(containerId: string, sourceIndex: number, destinationIndex: number ) => {
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
                        <Button variant="outlined" onPress={() => {setSupersetCombiningMode(false)}} style={styles.combiningPanelButton}>Cancel</Button>
                        {selectedExercises.length >= 2 && <Button onPress={() => { console.log(selectedExercises) }} style={styles.combiningPanelButton}>Combine</Button>}
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
                                : <DraggableFlatList
                                    showsVerticalScrollIndicator={false}
                                    autoscrollThreshold={80}
                                    autoscrollSpeed={150}
                                    data={program!.workout ?? []}
                                    renderItem={({ item, getIndex, drag }) => {
                                        const index = getIndex()
                                        return (
                                            <View style={styles.itemWrapper}>
                                                {item.type === "exercise"
                                                    ? <ExerciseTable
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
                                                            setSupersetCombiningMode={setSupersetCombiningMode}
                                                            selectedExercises={selectedExercises}
                                                            setSelectedExercises={setSelectedExercises}
                                                        />
                                                    : <View><Heading>{item.name}</Heading><Paragraph>Superset</Paragraph></View>}
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
                }
            </View>
            <View style={styles.buttonContainer}>
                <Button iconName="add" onPress={() => setIsBottomSheetOpen(true)} style={styles.button}>New Exercise</Button>
                {program?.workout && program?.workout.length >= 2 && <Button iconName="layers" variant="secondary" onPress={() => setSupersetCombiningMode((prev) => !prev)} style={styles.button}>Add Superset</Button>}
            </View>
            <BottomSheetForm isOpen={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} onSubmit={handleCreateExercise} title="Add Exercise">
                <ExerciseForm exerciseName={exerciseName} setExerciseName={setExerciseName} sets={sets} onSetChange={handleSetChange} onAddSet={addSet} onRemoveSet={removeSet} />
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