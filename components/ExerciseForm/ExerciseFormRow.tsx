import { colors } from "@/styles/colors";
import { IExerciseFormRowProps } from "@/types/props";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../IconButton/IconButton";
import Paragraph from "../Paragraph/Paragraph";
import ExerciseFormRowInput from "./ExerciseFormRowInput";

export default function ExerciseFormRow({ index, set, onChange, onRemove }: IExerciseFormRowProps) {
    const [setText, setSetText] = useState({ weight: set.weight.toString(), reps: set.reps.toString() })

    useEffect(() => {
        setSetText({ weight: set.weight.toString(), reps: set.reps.toString() })
    }, [set])

    return (
        <View style={styles.outterContainer}>
            <Paragraph style={styles.index}>{index + 1}</Paragraph>
            <View style={styles.inputsContainer}>
                <ExerciseFormRowInput keyboardType="decimal-pad" placeholder="0" value={setText.weight} onChangeText={(text) => { setSetText({ ...setText, weight: text }); onChange(index, "weight", text); }} />
                <ExerciseFormRowInput keyboardType="decimal-pad" placeholder="0" value={setText.reps} onChangeText={(text) => { setSetText({ ...setText, reps: text }); onChange(index, "reps", text); }} />
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
