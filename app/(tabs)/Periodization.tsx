import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Paragraph from "@/components/Paragraph/Paragraph";
import { periodizations as dummyPeriodizations } from "@/dummy-data";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Periodization() {
    const insets = useSafeAreaInsets();

    const [periodizations] = useState(dummyPeriodizations);

    return (
        <View
            style={[
                styles.screen,
                {
                    paddingTop: insets.top + 24,
                    paddingLeft: insets.left + 24,
                    paddingRight: insets.right + 24,
                    paddingBottom: insets.bottom,
                },
            ]}
        >
            <View>
                <HeadingLabel>Planning</HeadingLabel>
                <Heading>Periodization</Heading>
                <Paragraph>{periodizations.length} period{periodizations.length !== 1 ? "s" : ""}</Paragraph>
            </View>
            <View style={styles.listContainer}>
                {periodizations.length === 0
                    ? (
                        <EntityEmptyState iconName="calendar-outline" message="No periodizations found. Create a new periodization to get started." />
                    )
                    : (
                        <Paragraph>Here is some periodizations!</Paragraph>
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        marginTop: 16,
    },
});