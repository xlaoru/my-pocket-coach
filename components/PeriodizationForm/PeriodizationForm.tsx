import { IPeriodizationFormProps } from "@/types/props";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheetInput from "../BottomSheetForm/BottomSheetInput";
import Button from "../Button/Button";

export default function PeriodizationForm({ onCreatePeriodization }: IPeriodizationFormProps) {
    const [periodizationName, setPeriodizationName] = useState("");
    const [periodizationDescription, setPeriodizationDescription] = useState("");

    const [isCreatePeriodizationDisabled, setCreatePeriodizationDisabled] = useState(false)

    const handleCreatePeriodization = useCallback(async () => {
        const trimmedName = periodizationName.trim()
        const trimmedDescription = periodizationDescription.trim()

        if (!trimmedName) return

        setCreatePeriodizationDisabled(true)

        await onCreatePeriodization(trimmedName, trimmedDescription).finally(() => {
            setCreatePeriodizationDisabled(false)
        })

        setPeriodizationName("")
        setPeriodizationDescription("")
    }, [onCreatePeriodization, periodizationDescription, periodizationName])

    return (
        <View style={styles.container}>
            <BottomSheetInput label="Program Name" placeholder="e.g. Fullbody" value={periodizationName} onChangeText={setPeriodizationName} />
            <BottomSheetInput label="Program Description" placeholder="e.g. A fullbody workout program" value={periodizationDescription} onChangeText={setPeriodizationDescription} />
            <Button iconName="checkmark" disabled={isCreatePeriodizationDisabled} onPress={handleCreatePeriodization}>Submit</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12
    }
});