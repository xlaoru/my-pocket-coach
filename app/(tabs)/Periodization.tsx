import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import BottomSheetInput from "@/components/BottomSheetForm/BottomSheetInput";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Loader from "@/components/Loader/Loader";
import Paragraph from "@/components/Paragraph/Paragraph";
import PeriodizationList from "@/components/PeriodizationList/PeriodizationList";
import { useCreatePeriodization } from "@/features/programs/hooks/use-create-periodization";
import { useDeletePeriodization } from "@/features/programs/hooks/use-delete-periodization";
import { usePeriodizations } from "@/features/programs/hooks/use-periodizations";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Periodization() {
    const insets = useSafeAreaInsets();

    const { data: periodizations = [], isLoading, isError } = usePeriodizations()

    const createPeriodizationMutation = useCreatePeriodization()
    const deletePeriodizationMutation = useDeletePeriodization()

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const [periodizationName, setPeriodizationName] = useState("");
    const [periodizationDescription, setPeriodizationDescription] = useState("");

    const handleCreatePeriodization = useCallback(async () => {
        const trimmedPeriodizationName = periodizationName.trim()
        const trimmedPeriodizationDescription = periodizationDescription.trim()

        if (!trimmedPeriodizationName) return

        await createPeriodizationMutation.mutateAsync({
            name: trimmedPeriodizationName,
            description: trimmedPeriodizationDescription || undefined
        })

        setPeriodizationName("")
        setPeriodizationDescription("")
        setIsBottomSheetOpen(false)
    }, [createPeriodizationMutation, periodizationDescription, periodizationName])

    const handleDeletePeriodization = useCallback(async (periodizationId: string) => {
        try {
            await deletePeriodizationMutation.mutateAsync({
                periodizationId
            })
        } catch {
            Alert.alert("Failed to delete periodization", "Please try again.");
        }
    }, [deletePeriodizationMutation])

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
                <HeadingLabel>Planning</HeadingLabel>
                <Heading>Periodization</Heading>
                <Paragraph>
                    {
                        isLoading
                            ? "Loading periodizations..."
                            : `${periodizations.length} period${periodizations.length !== 1 ? "s" : ""}`
                    }
                </Paragraph>
            </View>
            <View style={styles.listContainer}>
                {
                    isError
                        ? (
                            <EntityEmptyState iconName="calendar-outline" title="No periods yet" message="Create a periodization period with stages" />
                        )
                        : isLoading

                            ? (
                                <Loader />
                            )
                            : (
                                <PeriodizationList periodizations={periodizations} onDeletePeriodization={handleDeletePeriodization} />
                            )
                }
            </View>
            <Button iconName="add-outline" onPress={() => { setIsBottomSheetOpen(true) }}>New Periodization</Button>
            <BottomSheetForm
                isOpen={isBottomSheetOpen}
                title="New Periodization"
                onSubmit={handleCreatePeriodization}
                onClose={() => setIsBottomSheetOpen(false)}
            >
                <BottomSheetInput label="Program Name" placeholder="e.g. Fullbody" value={periodizationName} onChangeText={setPeriodizationName} />
                <BottomSheetInput label="Program Description" placeholder="e.g. A fullbody workout program" value={periodizationDescription} onChangeText={setPeriodizationDescription} />
            </BottomSheetForm>
        </View>
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