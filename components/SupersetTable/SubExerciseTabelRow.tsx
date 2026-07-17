import { colors } from "@/styles/colors";
import { ISubExerciseTabelRowProps } from "@/types/props";
import { StyleSheet, View } from "react-native";
import IconButton from "../IconButton/IconButton";
import Title from "../Title/Title";

export default function SubExerciseTabelRow({ index, set }: ISubExerciseTabelRowProps) {
    return (
        <View style={styles.container}>
            <View style={styles.dataCell}>
                <Title style={[styles.title, styles.indexTitle]}>{index + 1}</Title>
            </View>
            <View style={styles.dataCell}>
                <Title isEditable style={styles.title} onChangeText={() => { }} onBlur={() => { }}>{set.weight}</Title>
            </View>
            <View style={styles.dataCell}>
                <Title isEditable style={styles.title} onChangeText={() => { }} onBlur={() => { }}>{set.reps}</Title>
            </View>
            <View style={styles.actionCell}>
                <IconButton iconName="remove-circle-outline" onPress={() => { }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 4,
        paddingLeft: 0,
        paddingRight: 16,
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: colors.gray100,
    },
    dataCell: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        textAlign: "center",
    },
    indexTitle: {
        color: colors.red500
    },
    actionCell: {
        width: 22,
        alignItems: "center",
    }
});