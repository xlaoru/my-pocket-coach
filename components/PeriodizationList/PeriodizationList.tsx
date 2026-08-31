import { IPeriodizationListProps } from "@/types/props";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import PeriodizationListItem from "./PeriodizationListItem";

export default function PeriodizationList({ periodizations, onDeletePeriodization }: IPeriodizationListProps) {
    const router = useRouter()

    const isNavigatingRef = useRef(false)
    const [isNavigating, setIsNavigating] = useState(false)

    const handlePressPeriodization = (id: string) => {
        if (isNavigatingRef.current) return
        isNavigatingRef.current = true
        setIsNavigating(true)

        requestAnimationFrame(() => {
            router.push({
                pathname: "/(root)/(modals)/periodizations/[_id]",
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
            data={periodizations}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <PeriodizationListItem
                    periodizationId={item._id}
                    title={item.name}
                    description={item.description}
                    stages={item.stages.length}
                    onPress={() => handlePressPeriodization(item._id)}
                    onDeletePeriodization={onDeletePeriodization}
                    isNavigating={isNavigating}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        gap: 12,
    },
});
