import { ScrollView, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { IExerciseTableProps } from "@/types/props";
import Paragraph from "../Paragraph/Paragraph";
import IconButton from "../IconButton/IconButton";
import { colors } from "@/styles/colors";
import AddSetOutlineButton from "../ExerciseForm/AddSetOutlineButton";
import ExerciseTableRow from "./ExerciseTableRow";
import Title from "../Title/Title";

function ExerciseTableComponent({ index, exercise, onExerciseNameChange, onAddExerciseSet, onEditExerciseSet, onDeleteExerciseSet }: IExerciseTableProps) {
    const [editableName, setEditableName] = useState(exercise.name);

    useEffect(() => {
        setEditableName(exercise.name);
    }, [exercise.name]);

    const handleNameBlur = useCallback(() => {
        const trimmedName = editableName.trim();

        if (!trimmedName) {
            setEditableName(exercise.name);
            return;
        }

        if (trimmedName === exercise.name) {
            return;
        }

        void onExerciseNameChange(exercise._id, trimmedName);
    }, [editableName, exercise._id, exercise.name, onExerciseNameChange]);

    return (
        <View style={styles.outterContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.headingContainer}>
                    <IconButton iconName="reorder-two" onPress={() => {}} />
                    <View style={styles.indexBox}>
                        <Paragraph>{index + 1}</Paragraph>
                    </View>
                    <Title isEditable onChangeText={setEditableName} onBlur={handleNameBlur}>{editableName}</Title>
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
                        exercise.sets.map((set, setIndex) => <ExerciseTableRow key={setIndex} exerciseId={exercise._id} index={setIndex} set={set} onEditExerciseSet={onEditExerciseSet} onDeleteExerciseSet={onDeleteExerciseSet} />)
                    }
                </ScrollView>
            <AddSetOutlineButton onPress={() => onAddExerciseSet(exercise._id)} />
        </View>
    );
}

const styles = StyleSheet.create({
    outterContainer: {
        padding: 16,
        backgroundColor: colors.gray900,
        borderRadius: 14,
        gap: 12,
        borderWidth: 1,
        borderColor: colors.gray500,
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
        backgroundColor: colors.gray500,
        justifyContent: "center",
        alignItems: "center",
    },
    setsContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.gray500,
    },
    setsHeaderContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.gray500,
        paddingVertical: 2,
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
    },
    nameInput: {
        flexShrink: 1,
        minWidth: 0,
        fontSize: 18,
        fontWeight: "bold",
        color: colors.white,
        padding: 0,
    }
});

export default React.memo(ExerciseTableComponent);
