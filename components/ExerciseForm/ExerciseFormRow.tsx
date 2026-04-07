import { colors } from "@/styles/colors";
import { IExerciseFormRowProps } from "@/types/props";
import React from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../IconButton/IconButton";
import Paragraph from "../Paragraph/Paragraph";
import ExerciseFormRowInput from "./ExerciseFormRowInput";

export default function ExerciseFormRow({ index }: IExerciseFormRowProps) {
    return (
        <View style={styles.outterContainer}>
            <Paragraph style={styles.index}>{index}</Paragraph>
            <View style={styles.inputsContainer}>
                <ExerciseFormRowInput placeholder="0" value="" onChangeText={() => { }} />
                <ExerciseFormRowInput placeholder="0" value="" onChangeText={() => { }} />
            </View>
            <IconButton iconName="remove" onPress={() => { }} />
        </View>
    );
}

const styles = StyleSheet.create({
    outterContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginVertical: 4,
        width: "100%",
        minWidth: 0,
    },
    inputsContainer: {
        flexDirection: "row",
        gap: 8,
        flex: 1,
        minWidth: 0,
    },
    index: {
        fontSize: 14,
        textAlign: "center",
        fontWeight: "bold",
        color: colors.red500,
        width: 16,
    }
});
