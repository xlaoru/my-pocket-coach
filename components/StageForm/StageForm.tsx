import { IStageFormProps } from "@/types/props";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheetInput from "../BottomSheetForm/BottomSheetInput";
import Button from "../Button/Button";

export default function StageForm({ onCreateStage }: IStageFormProps) {
    const [stageName, setStageName] = useState("")
    const [stageDescription, setStageDescription] = useState("")

    const [isCreateStageDisabled, setCreateStageDisabled] = useState(false)

    const handleCreateStage = useCallback(async () => {
        const trimmedName = stageName.trim()
        const trimmedDescription = stageDescription.trim()

        if (!trimmedName) return

        setCreateStageDisabled(true)

        await onCreateStage(trimmedName, trimmedDescription).finally(() => {
            setCreateStageDisabled(false)
        })

        setStageName("")
        setStageDescription("")
    }, [onCreateStage, stageDescription, stageName])

    return (
        <View style={styles.outterContainer}>
            <BottomSheetInput label="Stage Name" placeholder="e.g. Peak Phase" value={stageName} onChangeText={setStageName} />
            <BottomSheetInput label="Description (Optional)" placeholder="e.g. 90-95% of 1RM" value={stageDescription} onChangeText={setStageDescription} />
            <Button iconName="checkmark" disabled={isCreateStageDisabled} onPress={handleCreateStage}>Submit</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    outterContainer: {
        flex: 1,
        gap: 12,
        width: "100%",
    },
});