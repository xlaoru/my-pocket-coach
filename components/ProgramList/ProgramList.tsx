import { IWorkoutItem } from "@/types/models";
import { IProgramListProps } from "@/types/props";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ProgramListItem from "./ProgramListItem";

function countExercises(workout: IWorkoutItem[]): number {
    let count = 0;

    workout.forEach((item: IWorkoutItem) => {
        if (item.type === "exercise") {
            count += 1;
        } else if (item.type === "superset") {
            count += item.components.length
        }
    });

    return count;
}

function countSupersets(workout: IWorkoutItem[]): number {
    let count = 0;

    workout.forEach((item: IWorkoutItem) => {
        if (item.type === "superset") {
            count += 1;
        }
    });

    return count;
}

export default function ProgramList({ programs }: IProgramListProps) {
    const router = useRouter()

    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={programs}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <ProgramListItem
                    title={item.name}
                    description={item.description}
                    exercises={countExercises(item.workout)}
                    supersets={countSupersets(item.workout)}
                    onPress={() => {
                        router.push({
                            pathname: "/(modals)/programs/[_id]",
                            params: { _id: item._id }
                        })
                    }}
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
