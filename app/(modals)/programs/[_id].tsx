import AttachPeriodizationButton from "@/components/AttachPeriodizationButton/AttachPeriodizationButton";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import Paragraph from "@/components/Paragraph/Paragraph";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { Alert, FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import ExerciseForm from "@/components/ExerciseForm/ExerciseForm";
import { useProgram } from "@/features/programs/hooks/use-program";
import Loader from "@/components/Loader/Loader";

import ExerciseTable from "@/components/ExerciseTable/ExerciseTable";
import { useCreateExercise } from "@/features/programs/hooks/use-create-exercise";
import { useEditExerciseName } from "@/features/programs/hooks/use-edit-exercise-name";
import { ISet } from "@/types/models";

export default function Program() {
    const insets = useSafeAreaInsets()

    const { _id } = useLocalSearchParams<{ _id: string }>()

    const { data: program, isLoading, isError } = useProgram(_id)
    const createExerciseMutation = useCreateExercise()
    const editExerciseNameMutation = useEditExerciseName()

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
                                : <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={program?.workout}
                                    renderItem={({ item, index }) => item.type === "exercise" ? <ExerciseTable index={index} exercise={item.components[0]} onExerciseNameChange={handleEditExerciseName} /> : <View><Heading>{item.name}</Heading><Paragraph>Superset</Paragraph></View>}
                                    keyExtractor={(item) => item._id}
                                    contentContainerStyle={styles.componentsList}
                                />
                }
            </View>
            <Button iconName="add" onPress={() => setIsBottomSheetOpen(true)}>New Exercise</Button>
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
    componentsList: {
        gap: 12,
    }
});