import AttachPeriodizationButton from "@/components/AttachPeriodizationButton/AttachPeriodizationButton";
import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import BottomSheetInput from "@/components/BottomSheetForm/BottomSheetInput";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import AddExerciseOutlineButton from "@/components/ExerciseForm/AddExerciseOutlineButton";
import ExerciseForm from "@/components/ExerciseForm/ExerciseForm";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import IconButton from "@/components/IconButton/IconButton";
import Input from "@/components/Input/Input";
import Loader from "@/components/Loader/Loader";
import Paragraph from "@/components/Paragraph/Paragraph";
import PeriodizationListItem from "@/components/PeriodizationList/PeriodizationListItem";
import ProgramListItem from "@/components/ProgramList/ProgramListItem";
import Title from "@/components/Title/Title";
import { colors } from "@/styles/colors";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function ComponentsPreview() {
    const insets = useSafeAreaInsets()

    const [isOpenSimpleBottomSheet, setOpenSimpleBottomSheet] = useState(false)

    const [isOpenExerciseBottomSheet, setOpenExerciseBottomSheet] = useState(false)

    return (
        <>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={[
                    { paddingTop: insets.top, paddingBottom: insets.bottom },
                    styles.outerContainer,
                ]}
            >
                <Heading>Colors</Heading>

                {Object.entries(colors).map(([key, value]) => (
                    <View key={key} style={styles.innerContainer}>
                        <View style={[styles.box, { backgroundColor: value }]} />
                        <Text style={styles.label}>{key}</Text>
                    </View>
                ))}

                <View style={styles.separator} />

                <Heading>Typography</Heading>

                <Heading>Heading</Heading>
                <HeadingLabel>HeadingLabel</HeadingLabel>
                <Paragraph>Paragraph</Paragraph>
                <Title>Title</Title>

                <View style={styles.separator} />

                <Heading>Buttons</Heading>

                <Button iconName="checkmark-outline" onPress={() => { }} >Button</Button>
                <View style={styles.iconButtonContainer}>
                    <IconButton iconName="hourglass-outline" onPress={() => { }} />
                    <Paragraph>IconButton</Paragraph>
                </View>
                <AttachPeriodizationButton onPress={() => { }} />
                <AddExerciseOutlineButton onPress={() => { }} />

                <View style={styles.separator} />

                <Heading>Entity Empty State</Heading>

                <EntityEmptyState iconName="ban-outline" title="Empty State" message="This is an empty state" />

                <View style={styles.separator} />

                <Heading>Program List Item</Heading>

                <ProgramListItem
                    title="Test Program"
                    description="Demo description."
                    exercises={5}
                    supersets={3}
                    onPress={() => { }}
                />

                <View style={styles.separator} />

                <Heading>Periodization List Item</Heading>

                <PeriodizationListItem
                    title="Test Periodization"
                    description="Demo description."
                    stages={3}
                    onPress={() => { }}
                />

                <View style={styles.separator} />

                <Heading>Inputs</Heading>

                <Input
                    label="Label"
                    placeholder="This is an input"
                    value=""
                    onChangeText={() => { }}
                />

                <View style={styles.separator} />

                <Heading>Bottom Sheet Form</Heading>

                <Button iconName="add-outline" onPress={() => setOpenSimpleBottomSheet(true)}>Open Bottom Sheet</Button>

                <View style={styles.separator} />

                <Heading>Bottom Sheet Form for Exercise</Heading>

                <Button iconName="add-outline" onPress={() => setOpenExerciseBottomSheet(true)}>Open Exercise Bottom Sheet</Button>

                <View style={styles.separator} />

                <Heading>Loader</Heading>

                <Loader />
            </ScrollView>

            <BottomSheetForm
                isOpen={isOpenSimpleBottomSheet}
                title="Simple Bottom Sheet Title"
                onSubmit={() => { }}
                onClose={() => setOpenSimpleBottomSheet(false)}
            >
                <BottomSheetInput label="Label" placeholder="This is a bottom sheet input" value="" onChangeText={() => { }} />
            </BottomSheetForm>

            <BottomSheetForm
                isOpen={isOpenExerciseBottomSheet}
                title="Exercise Bottom Sheet Title"
                onSubmit={() => { }}
                onClose={() => setOpenExerciseBottomSheet(false)}
            >
                <ExerciseForm exerciseName="" setExerciseName={() => { }} />
            </BottomSheetForm>
        </>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        padding: 16,
        gap: 16
    },
    innerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    box: {
        width: 100,
        height: 100,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.white,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: colors.white,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    iconButtonContainer: {
        flexDirection: "row",
        gap: 16,
    }
});
