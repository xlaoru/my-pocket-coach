import { IExerciseFormProps } from "@/types/props";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheetInput from "../BottomSheetForm/BottomSheetInput";
import Paragraph from "../Paragraph/Paragraph";
import AddSetOutlineButton from "./AddSetOutlineButton";
import ExerciseFormRow from "./ExerciseFormRow";

export default function ExerciseForm({ exerciseName, setExerciseName, sets, onSetChange, onAddSet, onRemoveSet }: IExerciseFormProps) {
    

    return (
        <View style={styles.outterContainer}>
            <BottomSheetInput label="Exercise Name" placeholder="e.g. Bench Press" value={exerciseName} onChangeText={setExerciseName} />
            <View>
                <View style={styles.setsHeaderContainer}>
                    <Paragraph style={[styles.headerText, styles.setsTitle]}>{"Sets".toUpperCase()}</Paragraph>
                    <Paragraph style={styles.headerText}>{3} set{3 > 1 ? "s" : ""}</Paragraph>
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
            </View >
        </View >
    );
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
