import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Paragraph from "@/components/Paragraph/Paragraph";
import { programs as dummyPrograms } from "@/dummy-data";
import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Programs() {
    const insets = useSafeAreaInsets();

    const [programs, setPrograms] = useState(dummyPrograms);

    return (
        <View style={{ paddingTop: insets.top + 24, paddingHorizontal: insets.left + 24, paddingBottom: insets.bottom }}>
            <View>
                <HeadingLabel>Training</HeadingLabel>
                <Heading>Programs</Heading>
                <Paragraph>{programs.length} program{programs.length !== 1 ? "s" : ""}</Paragraph>
            </View>
            <View>
                {programs.length === 0
                    ? (
                        <EntityEmptyState iconName="barbell-outline" message="No programs found. Create a new program to get started." />
                    )
                    : (
                        <Paragraph>Here is some programs!</Paragraph>
                    )
                }
            </View>
        </View >
    );
}

