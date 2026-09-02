import { ISet } from "@/types/models";
import { IExerciseFormProps } from "@/types/props";
import { parseNumericInput } from "@/utils/parseNumericInput";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheetInput from "../BottomSheetForm/BottomSheetInput";
import Button from "../Button/Button";
import Paragraph from "../Paragraph/Paragraph";
import AddSetOutlineButton from "./AddSetOutlineButton";
import ExerciseFormRow from "./ExerciseFormRow";

export default function ExerciseForm({ onCreateExercise }: IExerciseFormProps) {
    const [exerciseName, setExerciseName] = useState("")

    const [isCreateExerciseDisabled, setCreateExerciseDisabled] = useState(false)

    const [sets, setSets] = useState<ISet[]>([
        { weight: 0, reps: 0 },
    ])

    const onSetChange = (index: number, field: "weight" | "reps", value: string) => {
        setSets((prevSets) => {
            const numeric = parseNumericInput(value, prevSets[index][field]);
            const newSets = [...prevSets];
            newSets[index] = { ...newSets[index], [field]: numeric };
            return newSets;
        });
    }

    const onAddSet = () => {
        setSets((prevSets) => [...prevSets, { weight: 0, reps: 0 }]);
    }

    const onRemoveSet = (index: number) => {
        setSets((prevSets) => prevSets.filter((_, i) => i !== index));
    }

    const handleCreateExercise = useCallback(async () => {
        const trimmedExerciseName = exerciseName.trim()

        if (!trimmedExerciseName) return;

        setCreateExerciseDisabled(true)

        await onCreateExercise(trimmedExerciseName, sets).finally(() => {
            setCreateExerciseDisabled(false)
        })

        setExerciseName("")
        setSets([
            { weight: 0, reps: 0 },
        ])
    }, [exerciseName, onCreateExercise, sets])

    return (
        <View style={styles.outterContainer}>
            <BottomSheetInput label="Exercise Name" placeholder="e.g. Bench Press" value={exerciseName} onChangeText={setExerciseName} />
            <View>
                <View style={styles.setsHeaderContainer}>
                    <Paragraph style={[styles.headerText, styles.setsTitle]}>{"Sets".toUpperCase()}</Paragraph>
                    <Paragraph style={styles.headerText}>{sets.length} set{sets.length > 1 ? "s" : ""}</Paragraph>
                </View>
                <ScrollView>
                    <View style={styles.measurementHeader}>
                        <Paragraph style={styles.measurementTitle}>kg</Paragraph>
                        <Paragraph style={styles.measurementTitle}>reps</Paragraph>
                    </View>
                    {
                        sets.map((set, index) => (
                            <ExerciseFormRow key={index} index={index} set={set} onChange={onSetChange} onRemove={onRemoveSet} />
                        ))
                    }
                </ScrollView>
                <View style={styles.addButtonContainer}>
                    <AddSetOutlineButton onPress={onAddSet} />
                </View>
            </View>
            <Button iconName="checkmark" disabled={isCreateExerciseDisabled} onPress={handleCreateExercise}>Submit</Button>
        </View>
    );
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
    measurementHeader: {
        flexDirection: "row",
        paddingLeft: 28,
        paddingRight: 34,
        gap: 8,
    },
    measurementTitle: {
        flex: 1,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    addButtonContainer: {
        marginTop: 12,
    }
});
