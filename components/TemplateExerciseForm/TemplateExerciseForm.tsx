import { ITemplateExerciseFormProps } from "@/types/props";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheetInput from "../BottomSheetForm/BottomSheetInput";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";

export default function TemplateExerciseForm({ onCreateTemplateExercise }: ITemplateExerciseFormProps) {
    const [exerciseName, setExerciseName] = useState("")
    const [exerciseSets, setExerciseSets] = useState(0)

    const [isCreateTemplateExerciseDisabled, setCreateTemplateExerciseDisabled] = useState(false)

    const handleCreateTemplateExercise = useCallback(async () => {
        const trimmedName = exerciseName.trim()

        if (!trimmedName) return;

        setCreateTemplateExerciseDisabled(true)

        await onCreateTemplateExercise(trimmedName, exerciseSets).finally(() => {
            setCreateTemplateExerciseDisabled(false)
        })

        setExerciseName("")
        setExerciseSets(0)
    }, [exerciseName, exerciseSets, onCreateTemplateExercise])

    return (
        <View style={styles.outterContainer}>
            <BottomSheetInput label="Exercise Name" placeholder="e.g. Bench Press" value={exerciseName} onChangeText={setExerciseName} />
            <View>
                <View style={styles.setsHeaderContainer}>
                    <Paragraph style={[styles.headerText, styles.setsTitle]}>{"Sets".toUpperCase()}</Paragraph>
                </View>
            </View>
            <View
                style={styles.setsContainer}
            >
                <IconButton iconName="remove-circle-outline" onPress={() => { setExerciseSets(exerciseSets > 0 ? exerciseSets - 1 : exerciseSets) }} />
                <Title>{exerciseSets} sets</Title>
                <IconButton iconName="add-circle-outline" onPress={() => { setExerciseSets(exerciseSets + 1) }} />
            </View>
            <Button iconName="checkmark" disabled={isCreateTemplateExerciseDisabled} onPress={handleCreateTemplateExercise}>Submit</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    outterContainer: {
        flex: 1,
        gap: 12,
        width: "100%",
    },
    setsHeaderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerText: {
        fontSize: 12
    },
    setsTitle: {
        fontWeight: "bold",
    },
    setsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
});