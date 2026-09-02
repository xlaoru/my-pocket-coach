import { IProgramFormProps } from "@/types/props";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheetInput from "../BottomSheetForm/BottomSheetInput";
import Button from "../Button/Button";

export default function ProgramForm({ onCreateProgram }: IProgramFormProps) {
    const [programName, setProgramName] = useState("");
    const [programDescription, setProgramDescription] = useState("");

    const [isCreateProgramDisabled, setCreateProgramDisabled] = useState(false)

    const handleCreateProgram = useCallback(async () => {
        const trimmedName = programName.trim()
        const trimmedDescription = programDescription.trim()

        if (!trimmedName) return

        setCreateProgramDisabled(true)

        await onCreateProgram(trimmedName, trimmedDescription).finally(() => {
            setCreateProgramDisabled(false)
        })

        setProgramName("")
        setProgramDescription("")
    }, [onCreateProgram, programDescription, programName])

    return (
        <View style={styles.container}>
            <BottomSheetInput label="Program Name" placeholder="e.g. Fullbody" value={programName} onChangeText={setProgramName} />
            <BottomSheetInput label="Program Description" placeholder="e.g. A fullbody workout program" value={programDescription} onChangeText={setProgramDescription} />
            <Button iconName="checkmark" disabled={isCreateProgramDisabled} onPress={handleCreateProgram}>Submit</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12
    }
});
