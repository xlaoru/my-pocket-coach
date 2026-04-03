import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import IconButton from "@/components/IconButton/IconButton";
import Paragraph from "@/components/Paragraph/Paragraph";
import ProgramListItem from "@/components/ProgramList/ProgramListItem";
import Title from "@/components/Title/Title";
import { colors } from "@/styles/colors";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function ComponentsPreview() {
    const insets = useSafeAreaInsets()
    return (
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

            <View style={styles.separator} />

            <Heading>Entity Empty State</Heading>

            <EntityEmptyState iconName="ban-outline" message="This is an empty state" />

            <View style={styles.separator} />

            <Heading>Program List Item</Heading>

            <ProgramListItem
                title="Test Program"
                description="Demo description."
                exercises={5}
                supersets={3}
                total={8}
            />
        </ScrollView>
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
