import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Paragraph from "@/components/Paragraph/Paragraph";
import { periodizations as dummyPeriodizations } from "@/dummy-data";
import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Periodization() {
    const insets = useSafeAreaInsets();

    const [periodizations, setPeriodizations] = useState(dummyPeriodizations);

    return (
        <View style={{ paddingTop: insets.top + 24, paddingHorizontal: insets.left + 24, paddingBottom: insets.bottom }}>
            <View>
                <HeadingLabel>Planning</HeadingLabel>
                <Heading>Periodization</Heading>
                <Paragraph>{periodizations.length} period{periodizations.length !== 1 ? "s" : ""}</Paragraph>
            </View>
            <View>
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