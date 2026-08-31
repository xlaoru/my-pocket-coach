import { IWorkoutItem } from "@/types/models";
import { IProgramListProps } from "@/types/props";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
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

export default function ProgramList({ programs, onDeleteProgram }: IProgramListProps) {
    const router = useRouter()

    const isNavigatingRef = useRef(false)
    const [isNavigating, setIsNavigating] = useState(false)

    const handlePressProgram = (id: string) => {
        if (isNavigatingRef.current) return
        isNavigatingRef.current = true
        setIsNavigating(true)

        requestAnimationFrame(() => {
            router.push({
                pathname: "/(root)/(modals)/programs/[_id]",
                params: { _id: id }
            })
        })
    }

    useFocusEffect(
        useCallback(() => {
            isNavigatingRef.current = false
            setIsNavigating(false)
        }, [])
    )

    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={programs}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <ProgramListItem
                    programId={item._id}
                    title={item.name}
                    description={item.description}
                    exercises={countExercises(item.workout)}
                    supersets={countSupersets(item.workout)}
                    onPress={() => handlePressProgram(item._id)}
                    onDeleteProgram={onDeleteProgram}
                    isNavigating={isNavigating}
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
