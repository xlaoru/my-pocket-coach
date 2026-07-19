import { colors } from "@/styles/colors";
import { ICheckboxProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function Checkbox({isSelected, toggleSelect}: ICheckboxProps) {
    return (
        <Pressable onPress={toggleSelect} style={[styles.checkbox, isSelected && styles.pressed]}>
            <Ionicons name="checkmark-outline" style={isSelected ?styles.iconPressed : styles.iconUnpressed} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    iconUnpressed: {
        color: colors.gray900,
    },
    iconPressed: {
        color: colors.white,
    },
    checkbox: {
        borderWidth: 1,
        borderColor: colors.gray100,
        borderRadius: 3,
        padding: 1
    },
    pressed: {
        backgroundColor: colors.red500
    }
})