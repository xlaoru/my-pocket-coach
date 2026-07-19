import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import BottomSheetInput from "@/components/BottomSheetForm/BottomSheetInput";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Loader from "@/components/Loader/Loader";
import Paragraph from "@/components/Paragraph/Paragraph";
import ProgramList from "@/components/ProgramList/ProgramList";
import { useCreateProgram } from "@/features/programs/hooks/use-create-program";
import { useDeleteProgram } from "@/features/programs/hooks/use-delete-program";
import { usePrograms } from "@/features/programs/hooks/use-programs";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Programs() {
    const insets = useSafeAreaInsets();

    const { data: programs = [], isLoading, isError } = usePrograms();

    const createProgramMutation = useCreateProgram();
    const deleteProgramMutation = useDeleteProgram()

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const [programName, setProgramName] = useState("");
    const [programDescription, setProgramDescription] = useState("");

    const handleCreateProgram = async () => {
        const trimmedProgramName = programName.trim();
        const trimmedProgramDescription = programDescription.trim();

        if (!trimmedProgramName) return;

        await createProgramMutation.mutateAsync({
            name: trimmedProgramName,
            description: trimmedProgramDescription || undefined,
        });

        setProgramName("");
        setProgramDescription("");
        setIsBottomSheetOpen(false);
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
                <Heading>Programs</Heading>
                <Paragraph>
                    {isLoading
                        ? "Loading programs..."
                        : `${programs.length} program${programs.length !== 1 ? "s" : ""}`}
                </Paragraph>
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
});

