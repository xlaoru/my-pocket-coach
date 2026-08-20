import { colors } from "@/styles/colors";
import { ISubExerciseTabelRowProps } from "@/types/props";
import { parseNumericInput } from "@/utils/parseNumericInput";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../IconButton/IconButton";
import Title from "../Title/Title";

export default function SubExerciseTabelRow({ exerciseId, index, set, onEditExerciseSet, onDeleteExerciseSet }: ISubExerciseTabelRowProps) {
    const [exerciseSet, setExerciseSet] = useState({ weight: String(set.weight), reps: String(set.reps) })

    useEffect(() => {
        setExerciseSet({ weight: String(set.weight), reps: String(set.reps) })
    }, [set])

    const handleSetBlur = useCallback(() => {
        const weight = parseNumericInput(exerciseSet.weight, set.weight)
        const reps = parseNumericInput(exerciseSet.reps, set.reps)

        setExerciseSet({ weight: String(weight), reps: String(reps) })
        void onEditExerciseSet(exerciseId, index, { weight, reps })
    }, [exerciseSet, exerciseId, index, set, onEditExerciseSet])

    const handleDeleteExerciseSet = useCallback(() => {
        void onDeleteExerciseSet(exerciseId, index)
    }, [exerciseId, index, onDeleteExerciseSet])

    return (
        <View style={styles.container}>
            <View style={styles.dataCell}>
                <Title style={[styles.title, styles.indexTitle]}>{index + 1}</Title>
            </View>
            <View style={styles.dataCell}>
                <Title keyboardType="decimal-pad" isEditable style={[styles.title, styles.editableTitle]} onChangeText={(text) => setExerciseSet({ ...exerciseSet, weight: text })} onBlur={handleSetBlur}>{exerciseSet.weight}</Title>
            </View>
            <View style={styles.dataCell}>
                <Title keyboardType="decimal-pad" isEditable style={[styles.title, styles.editableTitle]} onChangeText={(text) => setExerciseSet({ ...exerciseSet, reps: text })} onBlur={handleSetBlur}>{exerciseSet.reps}</Title>
            </View>
            <View style={styles.actionCell}>
                <IconButton iconName="remove-circle-outline" onPress={handleDeleteExerciseSet} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 4,
        paddingLeft: 0,
        paddingRight: 16,
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: colors.gray100,
    },
    dataCell: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
    },
    editableTitle: {
        alignSelf: "stretch",
    },
    indexTitle: {
        color: colors.red500
    },
    actionCell: {
        width: 22,
        alignItems: "center",
    }
});
