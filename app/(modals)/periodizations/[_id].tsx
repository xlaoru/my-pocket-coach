import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import Loader from "@/components/Loader/Loader";
import Paragraph from "@/components/Paragraph/Paragraph";
import StageCard from "@/components/StageCard/StageCard";
import StageForm from "@/components/StageForm/StageForm";
import { useCreateStage } from "@/features/programs/hooks/use-create-stage";
import { usePeriodization } from "@/features/programs/hooks/use-periodization";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { NestableDraggableFlatList, NestableScrollContainer } from "react-native-draggable-flatlist";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Periodization() {
    const insets = useSafeAreaInsets()

    const { _id } = useLocalSearchParams<{ _id: string }>()

    const { data: periodization, isLoading, isError } = usePeriodization(_id)

    const createStageMutation = useCreateStage()

    const navigation = useNavigation()

    const [isBottomSheetOpen, setBottomSheetOpen] = useState(false)

    const [periodizationName, setPeriodizationName] = useState(periodization?.name ?? "")
    const [periodizationDescription, setPeriodizationDescription] = useState(periodization?.description ?? "")

    const [stageName, setStageName] = useState("")
    const [stageDescription, setStageDescription] = useState("")

    useEffect(() => {
        if (periodization) {
            setPeriodizationName(periodization.name)
            setPeriodizationDescription(periodization.description ?? "")
        }
    }, [periodization])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Periodization"
        })
    }, [periodization, navigation])

    const handleCreateStage = useCallback(async () => {
        const trimmedStageName = stageName.trim()
        const trimmedStageDescription = stageDescription.trim()

        if (!trimmedStageName) return

        try {
            await createStageMutation.mutateAsync({
                periodizationId: _id,
                payload: {
                    name: trimmedStageName,
                    description: trimmedStageDescription
                }
            })

            setStageName("")
            setStageDescription("")
            setBottomSheetOpen(false)
        } catch {
            Alert.alert("Failed to create stage", "Please try again.")
        }
    }, [_id, createStageMutation, stageDescription, stageName])

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
                    <Heading isEditable onChangeText={setPeriodizationName} onBlur={() => { }}>{isLoading ? "Loading..." : periodizationName}</Heading>
                    {periodization?.description && <Paragraph isEditable onChangeText={setPeriodizationDescription}>{periodizationDescription}</Paragraph>}
                </View>
                <View style={styles.listContainer}>
                    {
                        isError ? (<EntityEmptyState
                            iconName="alert-circle-outline"
                            title="Failed to load periodizations"
                            message="Please check the API connection and try again."
                        />) : isLoading
                            ? (
                                <Loader />
                            )
                            : periodization?.stages.length === 0
                                ? (
                                    <EntityEmptyState iconName="barbell" title="Empty periodization" message="Add stage below to get started" />
                                )
                                : (
                                    <NestableScrollContainer showsVerticalScrollIndicator={false}>
                                        <NestableDraggableFlatList
                                            autoscrollThreshold={30}
                                            autoscrollSpeed={100}
                                            data={periodization!.stages ?? []}
                                            renderItem={({ item, getIndex, drag }) => {
                                                const index = getIndex()
                                                return (
                                                    <View style={styles.itemWrapper}>
                                                        <StageCard index={index ?? 0} stage={item} onDrag={drag} onDeleteStage={async () => { }} />
                                                    </View>
                                                )
                                            }}
                                            keyExtractor={(item) => item._id}
                                            onDragEnd={({ from, to }) => {
                                                if (from === to) {
                                                    return
                                                }
                                            }}
                                        />
                                    </NestableScrollContainer>
                                )

                    }
                </View>
                <View style={styles.buttonContainer}>
                    <Button iconName="add" onPress={() => { setBottomSheetOpen(true) }} style={styles.button}>New Stage</Button>
                </View>
                <BottomSheetForm isOpen={isBottomSheetOpen} onClose={() => setBottomSheetOpen(false)} onSubmit={handleCreateStage} title="Add Stage">
                    <StageForm stageName={stageName} setStageName={setStageName} stageDescription={stageDescription} setStageDescription={setStageDescription} />
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
        gap: 2
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
});