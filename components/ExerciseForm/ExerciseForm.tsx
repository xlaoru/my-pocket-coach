import { ISetInput } from "@/types/models";
import { IExerciseFormProps } from "@/types/props";
import { parseNumericInput } from "@/utils/parseNumericInput";
import { useCallback, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import BottomSheetInput from "../BottomSheetForm/BottomSheetInput";
import { useBottomSheetFormScroll } from "../BottomSheetForm/BottomSheetForm";
import Button from "../Button/Button";
import Paragraph from "../Paragraph/Paragraph";
import AddSetOutlineButton from "./AddSetOutlineButton";
import ExerciseFormRow from "./ExerciseFormRow";

const emptySet: ISetInput = { weight: "", reps: "" }

export default function ExerciseForm({ onCreateExercise }: IExerciseFormProps) {
    const { scrollToEnd } = useBottomSheetFormScroll();

    const [exerciseName, setExerciseName] = useState("")

    const [isCreateExerciseDisabled, setCreateExerciseDisabled] = useState(false)

    const [sets, setSets] = useState<ISetInput[]>([emptySet])

    const onSetChange = (index: number, field: "weight" | "reps", value: string) => {
        setSets((prevSets) => prevSets.map((set, i) => i === index ? { ...set, [field]: value } : set));
    }

    const onAddSet = () => {
        setSets((prevSets) => [...prevSets, emptySet]);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                scrollToEnd();
            });
        });
    }

    const onRemoveSet = (index: number) => {
        Keyboard.dismiss()
        setSets((prevSets) => prevSets.filter((_, i) => i !== index));
    }

    const handleCreateExercise = useCallback(async () => {
        Keyboard.dismiss()

        const trimmedExerciseName = exerciseName.trim()

        if (!trimmedExerciseName) return;

        setCreateExerciseDisabled(true)

        const numericSets = sets.map((set) => ({
            weight: parseNumericInput(set.weight),
            reps: parseNumericInput(set.reps),
        }))

        await onCreateExercise(trimmedExerciseName, numericSets).finally(() => {
            setCreateExerciseDisabled(false)
        })

        setExerciseName("")
        setSets([emptySet])
    }, [exerciseName, onCreateExercise, sets])

    return (
        <View style={styles.outterContainer}>
            <BottomSheetInput label="Exercise Name" placeholder="e.g. Bench Press" value={exerciseName} onChangeText={setExerciseName} />
            <View>
                <View style={styles.setsHeaderContainer}>
                    <Paragraph style={[styles.headerText, styles.setsTitle]}>{"Sets".toUpperCase()}</Paragraph>
                    <Paragraph style={styles.headerText}>{sets.length} set{sets.length > 1 ? "s" : ""}</Paragraph>
                </View>
                <View>
                    <View style={styles.measurementHeader}>
                        <Paragraph style={styles.measurementTitle}>kg</Paragraph>
                        <Paragraph style={styles.measurementTitle}>reps</Paragraph>
                    </View>
                    {
                        sets.map((set, index) => (
                            <ExerciseFormRow key={index} index={index} set={set} onChange={onSetChange} onRemove={onRemoveSet} />
                        ))
                    }
                </View>
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
        paddingLeft: 36,
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
