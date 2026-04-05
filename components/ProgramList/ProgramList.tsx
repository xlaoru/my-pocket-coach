import { TWorkout } from "@/types/models";
import { IProgramListProps } from "@/types/props";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ProgramListItem from "./ProgramListItem";

function countExercises(workout: TWorkout): number {
    let count = 0;

    workout.forEach(item => {
        if ('sets' in item) {
            count += 1;
        } else if ('exercises' in item) {
            count += item.exercises.length;
        }
    });

    return count;
}

function countSupersets(workout: TWorkout): number {
    let count = 0;

    workout.forEach(item => {
        if ('exercises' in item) {
            count += 1;
        }
    });

    return count;
}

export default function ProgramList({ programs }: IProgramListProps) {
    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={programs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ProgramListItem
                    title={item.name}
                    description={item.description}
                    exercises={countExercises(item.workout)}
                    supersets={countSupersets(item.workout)}
                    onPress={() => { }}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        gap: 12,
    }
});
