import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import GenerateProgramByTemplateForm from "@/components/GenerateProgramByTemplateForm/GenerateProgramByTemplateForm";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Loader from "@/components/Loader/Loader";
import Paragraph from "@/components/Paragraph/Paragraph";
import ProgramForm from "@/components/ProgramForm/ProgramForm";
import ProgramList from "@/components/ProgramList/ProgramList";
import { useCreateProgram } from "@/features/programs/hooks/use-create-program";
import { useDeleteProgram } from "@/features/programs/hooks/use-delete-program";
import { useGenerateProgramByTemplate } from "@/features/programs/hooks/use-generate-program-by-template";
import { usePrograms } from "@/features/programs/hooks/use-programs";
import { useTemplates } from "@/features/programs/hooks/use-templates";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Programs() {
    const insets = useSafeAreaInsets();

    const { data: programs = [], isLoading: isProgramsLoading, isError: isProgramsError, refetch: refetchPrograms } = usePrograms();
    const { data: templates, isLoading: isTemplatesLoading, isError: isTemplatesError, refetch: refetchTemplates } = useTemplates()

    const createProgramMutation = useCreateProgram();
    const deleteProgramMutation = useDeleteProgram()
    const generateProgramByTemplateMutation = useGenerateProgramByTemplate()

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const [isGeneratingProgramByTemplate, setGeneratingProgramByTemplate] = useState(false)

    const [isCreateProgramDisabled, setCreateProgramDisabled] = useState(false)
    const [isDeleteProgramDisabled, setDeleteProgramDisabled] = useState(false)
    const [isGenerateProgramDisabled, setGenerateProgramDisabled] = useState(false)

    const handleCreateProgram = useCallback(async (name: string, description: string) => {
        try {
            setIsBottomSheetOpen(false);
            setCreateProgramDisabled(true)

            await createProgramMutation.mutateAsync({
                name,
                description,
            }).finally(() => {
                setCreateProgramDisabled(false)
            })
        } catch {
            Alert.alert("Failed to create program", "Please try again.");
        }
    }, [createProgramMutation])

    const handleDeleteProgram = useCallback(async (programId: string) => {
        try {
            setDeleteProgramDisabled(true)
            await deleteProgramMutation.mutateAsync({
                programId
            }).finally(() => {
                setDeleteProgramDisabled(false)
            })
        } catch {
            Alert.alert("Failed to delete program", "Please try again.");
        }
    }, [deleteProgramMutation])

    const handleGenerateProgramByTemplate = useCallback(async (templateId: string) => {
        try {
            setGeneratingProgramByTemplate(false)
            setGenerateProgramDisabled(true)

            await generateProgramByTemplateMutation.mutateAsync({
                templateId
            }).finally(() => {
                setGenerateProgramDisabled(false)
            })
        } catch {
            Alert.alert("Failed to generate program by template", "Please try again.");
        }
    }, [generateProgramByTemplateMutation])

    return (
        <View
            style={[
                styles.screen,
                {
                    paddingTop: insets.top + 24,
                    paddingLeft: insets.left + 24,
                    paddingRight: insets.right + 24,
                    paddingBottom: insets.bottom - 36,
                },
            ]}
        >
            <View>
                <HeadingLabel>Training</HeadingLabel>
                <View style={styles.headingContainer}>
                    <Heading>Programs</Heading>
                    <Button disabled={isGenerateProgramDisabled} variant="secondary" iconName="sparkles" iconSize={14} onPress={() => { setGeneratingProgramByTemplate(true) }} style={{ paddingVertical: 6, paddingHorizontal: 16, borderRadius: 50 }}>Autofill</Button>
                </View>
                <Paragraph>
                    {
                        isProgramsError
                            ? "Failed to load programs"
                            : isProgramsLoading || isCreateProgramDisabled || isDeleteProgramDisabled || isGenerateProgramDisabled
                                ? "Loading programs..."
                                : `${programs.length} program${programs.length !== 1 ? "s" : ""}`
                    }
                </Paragraph>
            </View>
            <View style={styles.listContainer}>
                {
                    isProgramsError
                        ? (
                            <EntityEmptyState
                                iconName="alert-circle-outline"
                                title="Failed to load programs"
                                message="Please check the API connection and try again."
                                onRetry={() => refetchPrograms()}
                            />
                        )
                        : isProgramsLoading
                            ? (
                                <Loader text="Loading your programs..." />
                            )
                            : programs.length === 0
                                ? (
                                    <EntityEmptyState iconName="barbell-outline" title="No programs yet" message="Create your first training program" />
                                )
                                : (
                                    <ProgramList programs={programs} onDeleteProgram={handleDeleteProgram} />
                                )
                }
            </View>
            <Button iconName="add-outline" disabled={isCreateProgramDisabled} onPress={() => setIsBottomSheetOpen(true)}>New Program</Button>
            <BottomSheetForm
                isOpen={isBottomSheetOpen}
                title="New Program"
                onClose={() => setIsBottomSheetOpen(false)}
            >
                <ProgramForm onCreateProgram={handleCreateProgram} />
            </BottomSheetForm>
            <BottomSheetForm isOpen={isGeneratingProgramByTemplate} title="Generate from Template" onClose={() => setGeneratingProgramByTemplate(false)}>
                <GenerateProgramByTemplateForm templates={templates ?? []} isLoading={isTemplatesLoading} isError={isTemplatesError} onGenerateProgramByTemplate={handleGenerateProgramByTemplate} refetchTemplates={refetchTemplates} isGenerateProgramDisabled={isGenerateProgramDisabled} />
            </BottomSheetForm>
        </View >
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        gap: 16,
    },
    listContainer: {
        flex: 1,
        marginTop: 16,
    },
    headingContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});

