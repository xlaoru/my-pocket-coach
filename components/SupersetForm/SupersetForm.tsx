import { colors } from "@/styles/colors";
import { ISupersetFormProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheetInput from "../BottomSheetForm/BottomSheetInput";
import Button from "../Button/Button";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";

export default function SupersetForm({ selectedExercisesData, onCreateSuperset }: ISupersetFormProps) {
    const [supersetName, setSupersetName] = useState("")

    const [isCreateSupersetDisabled, setCreateSupersetDisabled] = useState(false)

    const handleCreateSuperset = useCallback(async () => {
        const trimmedName = supersetName.trim()

        if (!trimmedName) return

        setCreateSupersetDisabled(true)

        await onCreateSuperset(trimmedName).finally(() => {
            setCreateSupersetDisabled(false)
        })

        setSupersetName("")
    }, [onCreateSuperset, supersetName])

    return (
        <View style={styles.supersetFormContainer}>
            <View style={styles.supersetVisualizingTableContainer}>
                <View style={styles.supersetVisualizingTableTitleContainer}>
                    <Ionicons name="link" style={styles.supersetVisualizingTableTitleIcon} />
                    <Title style={styles.supersetVisualizingTableTitle}>Combinig {selectedExercisesData.length} exercises</Title>
                </View>
                <View style={styles.exercisesTableContainer}>
                    {selectedExercisesData.map((exercise, index) => (
                        <View key={exercise._id} style={styles.exercisesTableRow}>
                            <Paragraph style={styles.exercisesTableIndex}>{index + 1}.</Paragraph>
                            <View style={styles.exercisesTableRowValueContainer}>
                                <Title style={styles.candidateExerciseTitle}>{exercise.name}</Title>
                                <Paragraph>{exercise.sets.length} set{exercise.sets.length > 1 ? "s" : ""}</Paragraph>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
            <BottomSheetInput label="Superset Name" placeholder="e.g. Shoulder Circuit" value={supersetName} onChangeText={setSupersetName} />
            <Button iconName="checkmark" disabled={isCreateSupersetDisabled} onPress={handleCreateSuperset}>Submit</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    supersetFormContainer: {
        display: "flex",
        gap: 12
    },
    supersetVisualizingTableContainer: {
        display: "flex",
        gap: 16,
        borderWidth: 1,
        borderColor: colors.red500,
        backgroundColor: colors.red900,
        borderRadius: 8,
        padding: 12
    },
    supersetVisualizingTableTitleContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center"
    },
    supersetVisualizingTableTitleIcon: {
        color: colors.red500,
        fontSize: 18
    },
    supersetVisualizingTableTitle: {
        color: colors.red500
    },
    exercisesTableContainer: {
        display: "flex",
        gap: 8
    },
    exercisesTableIndex: {
        color: colors.red500,
        fontWeight: "bold"
    },
    exercisesTableRow: {
        display: "flex",
        flexDirection: "row",
        gap: 16,
        alignItems: "center"
    },
    exercisesTableRowValueContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        flex: 1,
        flexShrink: 1,
    },
    candidateExerciseTitle: {
        flexShrink: 1,
    }
})