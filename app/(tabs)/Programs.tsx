import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import BottomSheetInput from "@/components/BottomSheetForm/BottomSheetInput";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import { useCreateProgram } from "@/features/programs/hooks/use-create-program";
import { usePrograms } from "@/features/programs/hooks/use-programs";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Paragraph from "@/components/Paragraph/Paragraph";
import ProgramList from "@/components/ProgramList/ProgramList";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Loader from "@/components/Loader/Loader";

export default function Programs() {
    const insets = useSafeAreaInsets();
    
    const { data: programs = [], isLoading, isError } = usePrograms();
    const createProgramMutation = useCreateProgram();

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
                                    <ProgramList programs={programs} />
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

