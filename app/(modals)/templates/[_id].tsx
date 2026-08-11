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
import { useCreateTemplateExercise } from "@/features/programs/hooks/use-create-template-exercise";
import { useEditTemplateExerciseName } from "@/features/programs/hooks/use-edit-template-exercise-name";
import { useEditTemplateExerciseSets } from "@/features/programs/hooks/use-edit-template-exercise-sets";
import { useTemplate } from "@/features/programs/hooks/use-template";
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

    const createTemplateExerciseMutation = useCreateTemplateExercise()
    const editTemplateExerciseNameMutation = useEditTemplateExerciseName()
    const editTemplateExerciseSetsMutation = useEditTemplateExerciseSets()

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

    useEffect(() => {
        if (template) {
            setTemplateName(template.name)
            setTemplateDescription(template.description ?? "")
        }
    }, [template])

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Templates"
        })
    }, [template, navigation])

    const handleCreateTemplateExercise = useCallback(async () => {
        const trimmedExerciseName = exerciseName.trim()

        if (!trimmedExerciseName) return;

        try {
            await createTemplateExerciseMutation.mutateAsync({
                templateId: _id,
                payload: {
                    name: trimmedExerciseName,
                    sets: exerciseSets
                }
            })

            setExerciseName("")
            setExerciseSets(0)
            setExerciseFormOpen(false)
        } catch {
            Alert.alert("Failed to create exercise", "Please try again.")
        }
    }, [_id, createTemplateExerciseMutation, exerciseName, exerciseSets])

    const handleEditTemplateExerciseName = useCallback(async (exerciseId: string, newName: string) => {
        const trimmedExerciseName = newName.trim();

        if (!trimmedExerciseName) return;

        try {
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
        if (newSets <= 0) return

        try {
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
                    <Heading isEditable onChangeText={setTemplateName} onBlur={() => { }}>{isLoading ? "Loading..." : templateName}</Heading>
                    {template?.description && <Paragraph isEditable onChangeText={setTemplateDescription} onBlur={() => { }}>{isLoading ? "Loading..." : templateDescription}</Paragraph>}
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
                                    title="Failed to load templates"
                                    message="Please check the API connection and try again."
                                />
                            )
                            : isLoading
                                ? (
                                    <Loader />
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
                                                                        onDeleteExerciseSet={async () => { }}
                                                                        isSupersetCombiningMode={isSupersetCombiningMode}
                                                                        selectedExercises={selectedExercises}
                                                                        setSelectedExercises={setSelectedExercises}
                                                                        setSelectedExercisesData={setSelectedExercisesData} />
                                                                )
                                                                : (
                                                                    <TemplateSupersetTable
                                                                        index={index ?? 0}
                                                                        superset={item}
                                                                        templateWorkoutItemId={item._id}
                                                                        outsideSupersetExercises={outsideSupersetExercises}
                                                                        onDrag={drag}
                                                                        onSupersetNameChange={async () => { }}
                                                                        onDeleteSuperset={async () => { }}
                                                                        onExerciseNameChange={handleEditTemplateExerciseName}
                                                                        onExerciseSetChange={handleEditTemplateExerciseSets}
                                                                        onDeleteExercise={async () => { }}
                                                                        onMoveExercise={async () => { }}
                                                                        onUnlinkExercise={async () => { }}
                                                                        onUnlinkAllExercises={async () => { }}
                                                                        onCreateNewExercise={async () => { }}
                                                                        onLinkExercise={async () => { }}
                                                                    />
                                                                )
                                                        }
                                                    </View>
                                                )
                                            }}
                                            keyExtractor={(item) => item._id}
                                            onDragEnd={({ from, to }) => {
                                                if (from === to) return
                                            }}
                                        />
                                    </NestableScrollContainer>
                                )
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <Button iconName="add" onPress={() => setExerciseFormOpen(true)} style={styles.button}>New Exercise</Button>
                    {template?.templateWorkout && template?.templateWorkout.length >= 2 && <Button iconName="layers" variant="secondary" onPress={() => setSupersetCombiningMode((prev) => !prev)} style={styles.button}>Add Superset</Button>}
                </View>
                <BottomSheetForm isOpen={isExerciseFormOpen} onClose={() => setExerciseFormOpen(false)} onSubmit={handleCreateTemplateExercise} title="Add Exercise">
                    <TemplateExerciseForm exerciseName={exerciseName} setExerciseName={setExerciseName} exerciseSets={exerciseSets} setExerciseSets={setExerciseSets} />
                </BottomSheetForm>
                <BottomSheetForm isOpen={isSupersetCombiningFormOpen} title="Create Superset" onSubmit={() => { }} onClose={() => { setSupersetCombiningFormOpen(false) }}>
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
