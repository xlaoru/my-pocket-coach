import { ITemplateExerciseFormProps } from "@/types/props";
import { StyleSheet, View } from "react-native";
import BottomSheetInput from "../BottomSheetForm/BottomSheetInput";
import IconButton from "../IconButton/IconButton";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";

export default function TemplateExerciseForm({ exerciseName, setExerciseName, exerciseSets, setExerciseSets, }: ITemplateExerciseFormProps) {
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
        </View >
    )
}

const styles = StyleSheet.create({
    outterContainer: {
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