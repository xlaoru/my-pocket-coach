import { IStageFormProps } from "@/types/props";
import { StyleSheet, View } from "react-native";
import BottomSheetInput from "../BottomSheetForm/BottomSheetInput";

export default function StageForm({ stageName, stageDescription, setStageName, setStageDescription }: IStageFormProps) {
    return (
        <View style={styles.outterContainer}>
            <BottomSheetInput label="Stage Name" placeholder="e.g. Peak Phase" value={stageName} onChangeText={setStageName} />
            <BottomSheetInput label="Description (Optional)" placeholder="e.g. 90-95% of 1RM" value={stageDescription} onChangeText={setStageDescription} />
        </View>
    )
}

const styles = StyleSheet.create({
    outterContainer: {
        gap: 12,
        width: "100%",
    },
});