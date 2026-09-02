import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Loader from "@/components/Loader/Loader";
import Paragraph from "@/components/Paragraph/Paragraph";
import PeriodizationForm from "@/components/PeriodizationForm/PeriodizationForm";
import PeriodizationList from "@/components/PeriodizationList/PeriodizationList";
import { useCreatePeriodization } from "@/features/programs/hooks/use-create-periodization";
import { useDeletePeriodization } from "@/features/programs/hooks/use-delete-periodization";
import { usePeriodizations } from "@/features/programs/hooks/use-periodizations";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Periodization() {
    const insets = useSafeAreaInsets();

    const { data: periodizations = [], isLoading, isError, refetch } = usePeriodizations()

    const createPeriodizationMutation = useCreatePeriodization()
    const deletePeriodizationMutation = useDeletePeriodization()

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const [isCreatePeriodization, setCreatePeriodization] = useState(false)
    const [isDeletePeriodization, setDeletePeriodization] = useState(false)

    const handleCreatePeriodization = useCallback(async (name: string, description: string) => {
        try {
            setIsBottomSheetOpen(false)
            setCreatePeriodization(true)

            await createPeriodizationMutation.mutateAsync({
                name,
                description
            }).finally(() => {
                setCreatePeriodization(false)
            })
        } catch {
            Alert.alert("Failed to create periodization", "Please try again.");
        }
    }, [createPeriodizationMutation])

    const handleDeletePeriodization = useCallback(async (periodizationId: string) => {
        try {
            setDeletePeriodization(true)
            await deletePeriodizationMutation.mutateAsync({
                periodizationId
            }).finally(() => {
                setDeletePeriodization(false)
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
                        isError
                            ? "Failed to load periodizations"
                            : isLoading || isCreatePeriodization || isDeletePeriodization
                                ? "Loading periodizations..."
                                : `${periodizations.length} period${periodizations.length !== 1 ? "s" : ""}`
                    }
                </Paragraph>
            </View>
            <View style={styles.listContainer}>
                {
                    isError
                        ? (
                            <EntityEmptyState
                                iconName="alert-circle-outline"
                                title="Failed to load periodizations"
                                message="Please check the API connection and try again."
                                onRetry={() => refetch()}
                            />
                        )
                        : isLoading

                            ? (
                                <Loader text="Loading your periodizations..." />
                            )
                            : periodizations.length === 0
                                ? (
                                    <EntityEmptyState iconName="calendar-outline" title="No periods yet" message="Create a periodization period with stages" />
                                )
                                : (
                                    <PeriodizationList periodizations={periodizations} onDeletePeriodization={handleDeletePeriodization} />
                                )
                }
            </View>
            <Button disabled={isCreatePeriodization} iconName="add-outline" onPress={() => { setIsBottomSheetOpen(true) }}>New Periodization</Button>
            <BottomSheetForm
                isOpen={isBottomSheetOpen}
                title="New Periodization"
                onClose={() => setIsBottomSheetOpen(false)}
            >
                <PeriodizationForm onCreatePeriodization={handleCreatePeriodization} />
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