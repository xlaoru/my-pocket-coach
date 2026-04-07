import AttachPeriodizationButton from "@/components/AttachPeriodizationButton/AttachPeriodizationButton";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import Paragraph from "@/components/Paragraph/Paragraph";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { programs } from "@/dummy-data";

export default function Program() {
    const insets = useSafeAreaInsets()

    const { id } = useLocalSearchParams<{ id: string }>()

    const tempCurrentProgram = programs.find(program => program.id === id)
    const tempProgramExercisesAmount = tempCurrentProgram?.workout.reduce((acc, item) => {
        if ('sets' in item) {
            return acc + 1;
        } else if ('exercises' in item) {
            return acc + item.exercises.length;
        }
        return acc;
    }, 0) ?? 0;

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: tempCurrentProgram?.name,
        })
    }, [id, navigation])

    return (
        <ScrollView
            contentContainerStyle={[
                { paddingBottom: insets.bottom + 12 },
                styles.outerContainer,
            ]}
        >
            <View style={styles.header}>
                <Heading isEditable>{tempCurrentProgram?.name}</Heading>
                <Paragraph isEditable>{tempCurrentProgram?.description}</Paragraph>
                <AttachPeriodizationButton onPress={() => { }} />
            </View>
            <View style={styles.listContainer}>
                {
                    tempProgramExercisesAmount === 0
                        ? <EntityEmptyState iconName="barbell" title="Empty program" message="Add exercise below to get started" />
                        : null
                }
            </View>
            <Button iconName="add" onPress={() => { }}>New Exercise</Button>
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