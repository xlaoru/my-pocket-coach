import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { IExerciseTableProps } from "@/types/props";
import Paragraph from "../Paragraph/Paragraph";
import IconButton from "../IconButton/IconButton";
import Title from "../Title/Title";
import { colors } from "@/styles/colors";
import AddSetOutlineButton from "../ExerciseForm/AddSetOutlineButton";
import ExerciseTableRow from "./ExerciseTableRow";

export default function ExerciseTable({ index, exercise }: IExerciseTableProps) {
  return (
    <View style={styles.outterContainer}>
        <View style={styles.headerContainer}>
            <View style={styles.headingContainer}>
                <IconButton iconName="reorder-two" onPress={() => {}} />
                <View style={styles.indexBox}>
                    <Paragraph>{index + 1}</Paragraph>
                </View>
                <Title>{exercise.name}</Title>
            </View>
            <IconButton iconName="trash-bin-outline" onPress={() => {}} />
        </View>
            <ScrollView
                style={styles.setsContainer}
            >
                <View style={styles.setsHeaderContainer}>
                    <View style={styles.dataCell}>
                        <Paragraph style={styles.headerTitle}>Set</Paragraph>
                    </View>
                    <View style={styles.dataCell}>
                        <Paragraph style={styles.headerTitle}>kg</Paragraph>
                    </View>
                    <View style={styles.dataCell}>
                        <Paragraph style={styles.headerTitle}>Reps</Paragraph>
                    </View>
                    <View style={styles.actionPlaceholder} />
                </View>
                {
                    exercise.sets.map((set, setIndex) => <ExerciseTableRow key={setIndex} index={setIndex} set={set} />)
                }
            </ScrollView>
        <AddSetOutlineButton onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
    outterContainer: {
        padding: 12,
        backgroundColor: colors.gray700,
        borderWidth: 1,
        borderColor: colors.gray500,
        borderRadius: 14,
        gap: 12,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headingContainer: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    indexBox: {
        width: 28,
        height: 28,
        borderRadius: 10,
        backgroundColor: colors.gray600,
        justifyContent: "center",
        alignItems: "center",
    },
    setsContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.gray500,
        overflow: "hidden",
    },
    setsHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.gray600,
        paddingVertical: 8,
        paddingLeft: 0,
        paddingRight: 16,
    },
    dataCell: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
    },
    actionPlaceholder: {
        width: 22,
    }
});
