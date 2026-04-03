import { IPeriodizationListProps } from "@/types/props";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import PeriodizationListItem from "./PeriodizationListItem";

export default function PeriodizationList({ periodizations }: IPeriodizationListProps) {
    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={periodizations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <PeriodizationListItem
                    title={item.name}
                    description={item.description}
                    stages={item.stages.length}
                    onPress={() => { }}
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
