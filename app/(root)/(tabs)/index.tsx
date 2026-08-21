import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import BottomSheetInput from "@/components/BottomSheetForm/BottomSheetInput";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import GenerateProgramByTemplateForm from "@/components/GenerateProgramByTemplateForm/GenerateProgramByTemplateForm";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Loader from "@/components/Loader/Loader";
import Paragraph from "@/components/Paragraph/Paragraph";
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

    const [programName, setProgramName] = useState("");
    const [programDescription, setProgramDescription] = useState("");

    const handleCreateProgram = async () => {
        try {
            setIsBottomSheetOpen(false);

            const trimmedProgramName = programName.trim();
            const trimmedProgramDescription = programDescription.trim();

            if (!trimmedProgramName) return;

            await createProgramMutation.mutateAsync({
                name: trimmedProgramName,
                description: trimmedProgramDescription || undefined,
            });

            setProgramName("");
            setProgramDescription("");
        } catch {
            Alert.alert("Failed to create program", "Please try again.");
        }
    };

    const handleDeleteProgram = useCallback(async (programId: string) => {
        try {
            await deleteProgramMutation.mutateAsync({
                programId
            })
        } catch {
            Alert.alert("Failed to delete program", "Please try again.");
        }
    }, [deleteProgramMutation])

    const handleGenerateProgramByTemplate = useCallback(async (templateId: string) => {
        try {
            setGeneratingProgramByTemplate(false)

            await generateProgramByTemplateMutation.mutateAsync({
                templateId
            })

            setGeneratingProgramByTemplate(false)
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
                    <Button variant="secondary" iconName="sparkles" iconSize={14} onPress={() => { setGeneratingProgramByTemplate(true) }} style={{ paddingVertical: 6, paddingHorizontal: 16, borderRadius: 50 }}>Autofill</Button>
                </View>
                <Paragraph>
                    {
                        isProgramsError
                            ? "Failed to load programs"
                            : isProgramsLoading || createProgramMutation.isPending || deleteProgramMutation.isPending || generateProgramByTemplateMutation.isPending
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
                        : isProgramsLoading || createProgramMutation.isPending || generateProgramByTemplateMutation.isPending
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
            <Button iconName="add-outline" onPress={() => setIsBottomSheetOpen(true)}>New Program</Button>
            <BottomSheetForm
                isOpen={isBottomSheetOpen}
                title="New Program"
                onSubmit={handleCreateProgram}
                onClose={() => setIsBottomSheetOpen(false)}
            >
                <BottomSheetInput label="Program Name" placeholder="e.g. Fullbody" value={programName} onChangeText={setProgramName} />
                <BottomSheetInput label="Program Description" placeholder="e.g. A fullbody workout program" value={programDescription} onChangeText={setProgramDescription} />
            </BottomSheetForm>
            <BottomSheetForm isOpen={isGeneratingProgramByTemplate} title="Generate from Template" onClose={() => setGeneratingProgramByTemplate(false)} onSubmit={() => { }} isWithoutSubmition>
                <GenerateProgramByTemplateForm templates={templates ?? []} isLoading={isTemplatesLoading} isError={isTemplatesError} onGenerateProgramByTemplate={handleGenerateProgramByTemplate} refetchTemplates={refetchTemplates} />
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

