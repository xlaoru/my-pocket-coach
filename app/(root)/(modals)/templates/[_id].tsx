import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import Loader from "@/components/Loader/Loader";
import Paragraph from "@/components/Paragraph/Paragraph";
import TemplateExerciseForm from "@/components/TemplateExerciseForm/TemplateExerciseForm";
import TemplateExerciseTable from "@/components/TemplateExerciseTable/TemplateExerciseTable";
import TemplateSupersetForm from "@/components/TemplateSupersetForm/TemplateSupersetForm";
import TemplateSupersetTable from "@/components/TemplateSupersetTable/TemplateSupersetTable";
import Title from "@/components/Title/Title";
import { useCreateNewTemplateExercise } from "@/features/programs/hooks/use-create-new-template-exercise";
import { useCreateTemplateExercise } from "@/features/programs/hooks/use-create-template-exercise";
import { useCreateTemplateSuperset } from "@/features/programs/hooks/use-create-template-superset";
import { useDeleteTemplateExercise } from "@/features/programs/hooks/use-delete-template-exercise";
import { useDeleteTemplateSuperset } from "@/features/programs/hooks/use-delete-template-superset";
import { useEditTemplateDescription } from "@/features/programs/hooks/use-edit-template-description";
import { useEditTemplateExerciseName } from "@/features/programs/hooks/use-edit-template-exercise-name";
import { useEditTemplateExerciseSets } from "@/features/programs/hooks/use-edit-template-exercise-sets";
import { useEditTemplateName } from "@/features/programs/hooks/use-edit-template-name";
import { useEditTemplateSupersetName } from "@/features/programs/hooks/use-edit-template-superset-name";
import { useLinkTemplateExercise } from "@/features/programs/hooks/use-link-template-exercise";
import { useMoveTemplateExercise } from "@/features/programs/hooks/use-move-template-exercise";
import { useTemplate } from "@/features/programs/hooks/use-template";
import { useUnlinkAllTemplateExercises } from "@/features/programs/hooks/use-unlink-all-template-exercises";
import { useUnlinkTemplateExercise } from "@/features/programs/hooks/use-unlink-template-exercise";
import { colors } from "@/styles/colors";
import { ITemplateExercise } from "@/types/models";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { NestableDraggableFlatList, NestableScrollContainer } from "react-native-draggable-flatlist";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Template() {
    const insets = useSafeAreaInsets()

    const { _id } = useLocalSearchParams<{ _id: string }>()

    const { data: template, isLoading, isError } = useTemplate(_id)

    const editTemplateNameMutation = useEditTemplateName()
    const editTemplateDescriptionMutation = useEditTemplateDescription()
    const createTemplateExerciseMutation = useCreateTemplateExercise()
    const editTemplateExerciseNameMutation = useEditTemplateExerciseName()
    const editTemplateExerciseSetsMutation = useEditTemplateExerciseSets()
    const moveTemplateExerciseMutation = useMoveTemplateExercise()
    const deleteTemplateExerciseMutation = useDeleteTemplateExercise()
    const createTemplateSupersetMutation = useCreateTemplateSuperset()
    const editTemplateSupersetNameMutation = useEditTemplateSupersetName()
    const deleteTemplateSupersetMutation = useDeleteTemplateSuperset()
    const unlinkAllTemplateExercisesMutation = useUnlinkAllTemplateExercises()
    const unlinkTemplateExerciseMutation = useUnlinkTemplateExercise()
    const linkTemplateExerciseMutation = useLinkTemplateExercise()
    const createNewTemplateExerciseMutation = useCreateNewTemplateExercise()

    const [templateName, setTemplateName] = useState(template?.name ?? "")
    const [templateDescription, setTemplateDescription] = useState(template?.description ?? "")

    const [isSupersetCombiningMode, setSupersetCombiningMode] = useState(false)
    const [selectedExercisesData, setSelectedExercisesData] = useState<ITemplateExercise[]>([])

    const [selectedExercises, setSelectedExercises] = useState<string[]>([])

    const outsideSupersetExercises = template?.templateWorkout.filter(item => item.type === "exercise") || []

    const [isExerciseFormOpen, setExerciseFormOpen] = useState(false);
    const [isSupersetCombiningFormOpen, setSupersetCombiningFormOpen] = useState(false);

    const [exerciseName, setExerciseName] = useState("")
    const [exerciseSets, setExerciseSets] = useState(0)

    const [supersetName, setSupersetName] = useState("")

    const [isTemplateNameDisabled, setTemplateNameDisabled] = useState(false)
    const [isTemplateDescriptionDisabled, setTemplateDescriptionDisabled] = useState(false)
    const [isCreateExerciseDisabled, setCreateExerciseDisabled] = useState(false)
    const [isGeneralMoveDisable, setGeneralMoveDisable] = useState(false)

    useEffect(() => {
        if (template) {
            setTemplateName(template.name)
            setTemplateDescription(template.description ?? "")
        }
    }, [template])

    const navigation = useNavigation()

    const templateExercisesAmount = template?.templateWorkout.reduce((acc, item) => {
        if (item.type === "exercise") {
            return acc + 1
        } else if (item.type === "superset") {
            return acc + item.components.length
        }

        return acc
    }, 0) || 0

    const templateBareExercisesAmount = template?.templateWorkout.reduce((acc, item) => {
        if (item.type === "exercise") {
            return acc + 1
        }

        return acc
    }, 0)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Templates"
        })
    }, [template, navigation])

    const handleEditTemplateName = useCallback(async () => {
        try {
            const trimmedTemplateName = templateName.trim()

            if (!trimmedTemplateName) {
                setTemplateName(template?.name ?? "")
                return
            }

            if (templateName === template?.name) return

            setTemplateNameDisabled(true)

            await editTemplateNameMutation.mutateAsync({
                templateId: _id,
                payload: {
                    name: trimmedTemplateName
                }
            }).finally(() => {
                setTemplateNameDisabled(false)
            })
        } catch {
            Alert.alert("Failed to edit template name", "Please try again.");
        }
    }, [_id, template?.name, editTemplateNameMutation, templateName])

    const handleEditTemplateDescription = useCallback(async () => {
        try {
            const trimmedTemplateDescription = templateDescription.trim()

            if (!trimmedTemplateDescription) {
                setTemplateDescription(template?.description ?? "")
                return
            }

            if (templateDescription === template?.description) return

            setTemplateDescriptionDisabled(true)

            await editTemplateDescriptionMutation.mutateAsync({
                templateId: _id,
                payload: {
                    description: trimmedTemplateDescription
                }
            }).finally(() => {
                setTemplateDescriptionDisabled(false)
            })
        } catch {
            Alert.alert("Failed to edit template description", "Please try again.");
        }
    }, [_id, template?.description, editTemplateDescriptionMutation, templateDescription])

    const handleCreateTemplateExercise = useCallback(async () => {
        try {
            const trimmedExerciseName = exerciseName.trim()

            if (!trimmedExerciseName) return;

            setExerciseFormOpen(false)
            setCreateExerciseDisabled(true)

            await createTemplateExerciseMutation.mutateAsync({
                templateId: _id,
                payload: {
                    name: trimmedExerciseName,
                    sets: exerciseSets
                }
            }).finally(() => {
                setCreateExerciseDisabled(false)
            })

            setExerciseName("")
            setExerciseSets(0)
        } catch {
            Alert.alert("Failed to create exercise", "Please try again.")
        }
    }, [_id, createTemplateExerciseMutation, exerciseName, exerciseSets])

    const handleEditTemplateExerciseName = useCallback(async (exerciseId: string, newName: string) => {
        try {
            const trimmedExerciseName = newName.trim();

            if (!trimmedExerciseName) return;

            await editTemplateExerciseNameMutation.mutateAsync({
                templateId: _id,
                exerciseId,
                payload: {
                    name: trimmedExerciseName
                }
            })
        } catch {
            Alert.alert("Failed to edit exercise name", "Please try again.")
        }
    }, [_id, editTemplateExerciseNameMutation])

    const handleEditTemplateExerciseSets = useCallback(async (exerciseId: string, newSets: number) => {
        try {
            if (newSets <= 0) return

            await editTemplateExerciseSetsMutation.mutateAsync({
                templateId: _id,
                exerciseId,
                payload: {
                    sets: newSets
                }
            })
        } catch {
            Alert.alert("Failed to edit exercise sets", "Please try again.")
        }
    }, [_id, editTemplateExerciseSetsMutation])

    const handleMoveTemplateExercise = useCallback(async (containerId: string, sourceIndex: number, destinationIndex: number) => {
        try {
            if (_id === containerId) {
                setGeneralMoveDisable(true)
            } else {

            }

            await moveTemplateExerciseMutation.mutateAsync({
                templateId: _id,
                payload: {
                    containerId,
                    sourceIndex,
                    destinationIndex
                }
            }).finally(() => {
                setGeneralMoveDisable(false)
            })
        } catch {
            Alert.alert("Failed to move exercise", "Please try again.");
        }
    }, [_id, moveTemplateExerciseMutation])

    const handleDeleteTemplateExercise = useCallback(async (exerciseId: string) => {
        try {
            await deleteTemplateExerciseMutation.mutateAsync({
                templateId: _id,
                exerciseId
            })
        } catch {
            Alert.alert("Failed to delete exercise", "Please try again.");
        }
    }, [_id, deleteTemplateExerciseMutation])

    useEffect(() => {
        if (!isSupersetCombiningMode) {
            setSelectedExercises([])
        }
    }, [isSupersetCombiningMode])

    const handleCreateTemplateSuperset = useCallback(async () => {
        const trimmedSupertsetName = supersetName.trim()

        if (!trimmedSupertsetName) {
            return
        }

        try {
            await createTemplateSupersetMutation.mutateAsync({
                templateId: _id,
                payload: {
                    name: trimmedSupertsetName,
                    templateWorkoutItemIds: selectedExercises
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
    }, [_id, createTemplateSupersetMutation, selectedExercises, supersetName])

    const handleEditTemplateSupersetName = useCallback(async (supersetId: string, newName: string) => {
        const trimmedTemplateSupersetName = newName.trim()

        if (!trimmedTemplateSupersetName) return

        try {
            await editTemplateSupersetNameMutation.mutateAsync({
                templateId: _id,
                supersetId,
                payload: {
                    name: trimmedTemplateSupersetName
                }
            })
        } catch {
            Alert.alert("Failed to edit superset name", "Please try again.");
        }
    }, [_id, editTemplateSupersetNameMutation])

    const handleDeleteTemplateSuperset = useCallback(async (supersetId: string) => {
        try {
            await deleteTemplateSupersetMutation.mutateAsync({
                templateId: _id,
                supersetId
            })
        } catch {
            Alert.alert("Failed to delete superset", "Please try again.");
        }
    }, [_id, deleteTemplateSupersetMutation])

    const handleUnlinkAllTemplateExercises = useCallback(async (supersetId: string) => {
        try {
            await unlinkAllTemplateExercisesMutation.mutateAsync({
                templateId: _id,
                supersetId
            })
        } catch {
            Alert.alert("Failed to unlink exercises", "Please try again.");
        }
    }, [_id, unlinkAllTemplateExercisesMutation])

    const handleUnlinkTemplateExercise = useCallback(async (supersetId: string, exerciseId: string) => {
        try {
            await unlinkTemplateExerciseMutation.mutateAsync({
                templateId: _id,
                supersetId,
                exerciseId
            })
        } catch {
            Alert.alert("Failed to unlink exercise", "Please try again.");
        }
    }, [_id, unlinkTemplateExerciseMutation])

    const handleLinkTemplateExercise = useCallback(async (supersetId: string, exerciseId: string) => {
        try {
            await linkTemplateExerciseMutation.mutateAsync({
                templateId: _id,
                supersetId, exerciseId
            })
        } catch {
            Alert.alert("Failed to link exercise", "Please try again.");
        }
    }, [_id, linkTemplateExerciseMutation])

    const handleCreateNewTemplateExercise = useCallback(async (supersetId: string, newName: string) => {
        try {
            await createNewTemplateExerciseMutation.mutateAsync({
                templateId: _id,
                supersetId,
                payload: {
                    name: newName,
                    sets: 0
                }
            })
        } catch {
            Alert.alert("Failed to create exercise", "Please try again.");
        }
    }, [_id, createNewTemplateExerciseMutation])

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
                        isLoading
                            ? <Heading>Loading...</Heading>
                            : <Heading isEditable disabled={isTemplateNameDisabled} onChangeText={setTemplateName} onBlur={handleEditTemplateName}>{templateName}</Heading>
                    }
                    {
                        template?.description
                            ? isLoading
                                ? <Paragraph>Loading...</Paragraph>
                                : <Paragraph isEditable disabled={isTemplateDescriptionDisabled} onChangeText={setTemplateDescription} onBlur={handleEditTemplateDescription}>{templateDescription}</Paragraph>
                            : null
                    }
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
                        isError
                            ? (
                                <EntityEmptyState
                                    iconName="alert-circle-outline"
                                    title="Failed to load templates"
                                    message="Please check the API connection and try again."
                                />
                            )
                            : isLoading
                                ? (
                                    <Loader />
                                )
                                : templateExercisesAmount === 0
                                    ? (
                                        <EntityEmptyState iconName="document-text-outline" title="Empty template" message="Add template below to get started" />
                                    )
                                    : (
                                        <NestableScrollContainer showsVerticalScrollIndicator={false}>
                                            <NestableDraggableFlatList
                                                autoscrollThreshold={30}
                                                autoscrollSpeed={100}
                                                data={template!.templateWorkout ?? []}
                                                renderItem={({ item, getIndex, drag }) => {
                                                    const index = getIndex()
                                                    return (
                                                        <View style={styles.itemWrapper}>
                                                            {
                                                                item.type === "exercise"
                                                                    ? (
                                                                        <TemplateExerciseTable
                                                                            index={index ?? 0}
                                                                            exercise={item.components[0]}
                                                                            templateWorkoutItemId={item._id}
                                                                            onDrag={drag}
                                                                            onExerciseNameChange={handleEditTemplateExerciseName}
                                                                            onExerciseSetChange={handleEditTemplateExerciseSets}
                                                                            onDeleteExercise={handleDeleteTemplateExercise}
                                                                            isSupersetCombiningMode={isSupersetCombiningMode}
                                                                            selectedExercises={selectedExercises}
                                                                            setSelectedExercises={setSelectedExercises}
                                                                            setSelectedExercisesData={setSelectedExercisesData}
                                                                            isGeneralMoveDisable={isGeneralMoveDisable}
                                                                        />
                                                                    )
                                                                    : (
                                                                        <TemplateSupersetTable
                                                                            index={index ?? 0}
                                                                            superset={item}
                                                                            templateWorkoutItemId={item._id}
                                                                            outsideSupersetExercises={outsideSupersetExercises}
                                                                            onDrag={drag}
                                                                            onSupersetNameChange={handleEditTemplateSupersetName}
                                                                            onDeleteSuperset={handleDeleteTemplateSuperset}
                                                                            onExerciseNameChange={handleEditTemplateExerciseName}
                                                                            onExerciseSetChange={handleEditTemplateExerciseSets}
                                                                            onDeleteExercise={handleDeleteTemplateExercise}
                                                                            onMoveExercise={handleMoveTemplateExercise}
                                                                            onUnlinkExercise={handleUnlinkTemplateExercise}
                                                                            onUnlinkAllExercises={handleUnlinkAllTemplateExercises}
                                                                            onCreateNewExercise={handleCreateNewTemplateExercise}
                                                                            onLinkExercise={handleLinkTemplateExercise}
                                                                        />
                                                                    )
                                                            }
                                                        </View>
                                                    )
                                                }}
                                                keyExtractor={(item) => item._id}
                                                onDragEnd={({ from, to }) => {
                                                    if (from === to) return

                                                    handleMoveTemplateExercise(_id, from, to)
                                                }}
                                            />
                                        </NestableScrollContainer>
                                    )
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <Button iconName="add" disabled={isCreateExerciseDisabled} onPress={() => setExerciseFormOpen(true)} style={styles.button}>New Exercise</Button>
                    {template?.templateWorkout && (templateBareExercisesAmount ?? 0) >= 2 && <Button iconName="layers" variant="secondary" onPress={() => setSupersetCombiningMode((prev) => !prev)} style={styles.button}>Add Superset</Button>}
                </View>
                <BottomSheetForm disabled={isCreateExerciseDisabled} isOpen={isExerciseFormOpen} onClose={() => setExerciseFormOpen(false)} onSubmit={handleCreateTemplateExercise} title="Add Exercise">
                    <TemplateExerciseForm exerciseName={exerciseName} setExerciseName={setExerciseName} exerciseSets={exerciseSets} setExerciseSets={setExerciseSets} />
                </BottomSheetForm>
                <BottomSheetForm isOpen={isSupersetCombiningFormOpen} title="Create Superset" onSubmit={handleCreateTemplateSuperset} onClose={() => { setSupersetCombiningFormOpen(false) }}>
                    <TemplateSupersetForm supersetName={supersetName} setSupersetName={setSupersetName} selectedExercisesData={selectedExercisesData} />
                </BottomSheetForm>
            </View>
        </KeyboardAvoidingView>
    )
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
})
