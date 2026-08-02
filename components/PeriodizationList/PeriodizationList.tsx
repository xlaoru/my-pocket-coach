import { IPeriodizationListProps } from "@/types/props";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import PeriodizationListItem from "./PeriodizationListItem";

export default function PeriodizationList({ periodizations, onDeletePeriodization }: IPeriodizationListProps) {
    const router = useRouter()

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
                    onPress={() => {
                        router.push({
                            pathname: "/(modals)/periodizations/[_id]",
                            params: { _id: item._id }
                        })
                    }}
                    onDeletePeriodization={onDeletePeriodization}
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
