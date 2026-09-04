import { colors } from "@/styles/colors";
import { IExerciseFormRowInputProps } from "@/types/props";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function ExerciseFormRowInput({ placeholder, value, onChangeText, onBlur, keyboardType }: IExerciseFormRowInputProps) {
    const [isEditing, setIsEditing] = useState(false);

    if (!isEditing) {
        return (
            <Pressable style={styles.input} onPress={() => setIsEditing(true)}>
                <Text style={[styles.text, !value && styles.placeholder]}>{value || placeholder}</Text>
            </Pressable>
        );
    }

    return (
        <BottomSheetTextInput
            style={[styles.input, styles.text]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onBlur={() => {
                setIsEditing(false);
                onBlur?.();
            }}
            placeholderTextColor={colors.gray100}
            keyboardType={keyboardType}
            autoFocus
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        backgroundColor: colors.gray500,
        padding: 12,
        flex: 1,
        width: 0,
        minWidth: 0,
    },
    text: {
        color: colors.white,
        textAlign: "center",
    },
    placeholder: {
        color: colors.gray100,
    },
})
