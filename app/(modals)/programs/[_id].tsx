import AttachPeriodizationButton from "@/components/AttachPeriodizationButton/AttachPeriodizationButton";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import Paragraph from "@/components/Paragraph/Paragraph";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import ExerciseForm from "@/components/ExerciseForm/ExerciseForm";
import { useProgram } from "@/features/programs/hooks/use-program";
import Loader from "@/components/Loader/Loader";

export default function Program() {
    const insets = useSafeAreaInsets()

    const { _id } = useLocalSearchParams<{ _id: string }>()

    const { data: program, isLoading, isError } = useProgram(_id)

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

    const [isOpen, setOpen] = useState(false)

    const [exerciseName, setExerciseName] = useState("")

    return (
        <ScrollView
            contentContainerStyle={[
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
                                : null
                }
            </View>
            <Button iconName="add" onPress={() => setOpen(true)}>New Exercise</Button>
            <BottomSheetForm isOpen={isOpen} onClose={() => setOpen(false)} onSubmit={() => { }} title="Add Exercise">
                <ExerciseForm exerciseName={exerciseName} setExerciseName={setExerciseName} />
            </BottomSheetForm>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
        marginTop: 16,
    },
    attachment: {
        fontWeight: "bold"
    }
});