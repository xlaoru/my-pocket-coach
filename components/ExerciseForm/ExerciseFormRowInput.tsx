import { colors } from "@/styles/colors";
import { IExerciseFormRowInputProps } from "@/types/props";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

export default function ExerciseFormRowInput({ placeholder, value, onChangeText, onBlur, keyboardType }: IExerciseFormRowInputProps) {
    return (
        <BottomSheetTextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            placeholderTextColor={colors.gray100}
            keyboardType={keyboardType}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        color: colors.white,
        borderRadius: 8,
        backgroundColor: colors.gray500,
        padding: 12,
        textAlign: "center",
        flex: 1,
        width: 0,
        minWidth: 0,
    }
})