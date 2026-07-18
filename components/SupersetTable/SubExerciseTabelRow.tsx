import { colors } from "@/styles/colors";
import { ISet } from "@/types/models";
import { ISubExerciseTabelRowProps } from "@/types/props";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../IconButton/IconButton";
import Title from "../Title/Title";

export default function SubExerciseTabelRow({ exerciseId, index, set, onEditExerciseSet, onDeleteExerciseSet }: ISubExerciseTabelRowProps) {
    const [exerciseSet, setExerciseSet] = useState<ISet>(set)

    useEffect(() => {
        setExerciseSet(set)
    }, [set])

    const handleSetBlur = useCallback(() => {
        void onEditExerciseSet(exerciseId, index, exerciseSet)
    }, [exerciseSet, exerciseId, index, onEditExerciseSet])

    const handleDeleteExerciseSet = useCallback(() => {
        void onDeleteExerciseSet(exerciseId, index)
    }, [exerciseId, index, onDeleteExerciseSet])

    return (
        <View style={styles.container}>
            <View style={styles.dataCell}>
                <Title style={[styles.title, styles.indexTitle]}>{index + 1}</Title>
            </View>
            <View style={styles.dataCell}>
                <Title isEditable style={styles.title} onChangeText={(text) => setExerciseSet({ ...exerciseSet, weight: Number(text) })} onBlur={handleSetBlur}>{exerciseSet.weight}</Title>
            </View>
            <View style={styles.dataCell}>
                <Title isEditable style={styles.title} onChangeText={(text) => setExerciseSet({ ...exerciseSet, reps: Number(text) })} onBlur={handleSetBlur}>{exerciseSet.reps}</Title>
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
    indexTitle: {
        color: colors.red500
    },
    actionCell: {
        width: 22,
        alignItems: "center",
    }
});