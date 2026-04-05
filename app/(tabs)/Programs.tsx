import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import BottomSheetInput from "@/components/BottomSheetForm/BottomSheetInput";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Paragraph from "@/components/Paragraph/Paragraph";
import ProgramList from "@/components/ProgramList/ProgramList";
import { programs as dummyPrograms } from "@/dummy-data";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Programs() {
    const insets = useSafeAreaInsets();

    const [programs] = useState(dummyPrograms);

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const [programName, setProgramName] = useState("");
    const [programDescription, setProgramDescription] = useState("");

    return (
        <View
            style={[
                styles.screen,
                {
                    paddingTop: insets.top + 24,
                    paddingLeft: insets.left + 24,
                    paddingRight: insets.right + 24,
                    paddingBottom: insets.bottom - 36,
                },
            ]}
        >
            <View>
                <HeadingLabel>Training</HeadingLabel>
                <Heading>Programs</Heading>
                <Paragraph>{programs.length} program{programs.length !== 1 ? "s" : ""}</Paragraph>
            </View>
            <View style={styles.listContainer}>
                {programs.length === 0
                    ? (
                        <EntityEmptyState iconName="barbell-outline" message="No programs found. Create a new program to get started." />
                    )
                    : (
                        <ProgramList programs={programs} />
                    )
                }
            </View>
            <Button iconName="add-outline" onPress={() => setIsBottomSheetOpen(true)}>New Program</Button>
            <BottomSheetForm
                isOpen={isBottomSheetOpen}
                title="New Program"
                onSubmit={() => { }}
                onClose={() => setIsBottomSheetOpen(false)}
            >
                <BottomSheetInput label="Program Name" placeholder="e.g. Fullbody" value={programName} onChangeText={setProgramName} />
                <BottomSheetInput label="Program Description" placeholder="e.g. A fullbody workout program" value={programDescription} onChangeText={setProgramDescription} />
            </BottomSheetForm>
        </View >
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        gap: 16,
    },
    listContainer: {
        flex: 1,
        marginTop: 16,
    },
});

