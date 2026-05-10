import { colors } from "@/styles/colors";
import { IExerciseFormRowProps } from "@/types/props";
import React from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../IconButton/IconButton";
import Paragraph from "../Paragraph/Paragraph";
import ExerciseFormRowInput from "./ExerciseFormRowInput";

export default function ExerciseFormRow({ index, set, onChange, onRemove }: IExerciseFormRowProps) {
    return (
        <View style={styles.outterContainer}>
            <Paragraph style={styles.index}>{index + 1}</Paragraph>
            <View style={styles.inputsContainer}>
                <ExerciseFormRowInput placeholder="0" value={set.weight.toString()} onChangeText={(text) => onChange(index, "weight", text)} />
                <ExerciseFormRowInput placeholder="0" value={set.reps.toString()} onChangeText={(text) => onChange(index, "reps", text)} />
            </View>
            <IconButton iconName="remove" onPress={() => onRemove(index)} />
        </View>
    );
}

const styles = StyleSheet.create({
    outterContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginVertical: 4,
        width: "100%",
        minWidth: 0,
    },
    inputsContainer: {
        flexDirection: "row",
        gap: 8,
        flex: 1,
        minWidth: 0,
    },
    index: {
        fontSize: 14,
        textAlign: "center",
        fontWeight: "bold",
        color: colors.red500,
        width: 16,
    }
});
