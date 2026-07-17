import { colors } from "@/styles/colors";
import { ISupersetTableProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";
import SubExerciseTabel from "./SubExerciseTabel";

export default function SupersetTable({ index, superset, workoutItemId, onDrag }: ISupersetTableProps) {
    return (
        <View style={styles.outterContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.headingContainer}>
                    <Pressable onLongPress={onDrag} style={({ pressed }) => pressed && styles.pressed}>
                        <Ionicons name="reorder-two" size={22} color={colors.red500} />
                    </Pressable>
                    <View style={styles.indexBox}>
                        <Paragraph style={styles.indexText}>{index + 1}</Paragraph>
                    </View>
                    <Title isEditable onChangeText={() => { }} onBlur={() => { }}>{superset.name}</Title>
                </View>
                <View style={styles.headerIconButtonsContainer}>
                    <IconButton iconName="unlink-outline" onPress={() => { }} />
                    <IconButton iconName="trash-bin-outline" onPress={() => { }} />
                </View>
            </View>
            <View style={styles.subExercisesContainer}>
                {
                    superset.components.map((exercise, index) => (
                        <SubExerciseTabel key={exercise._id} exercise={exercise} />
                    ))
                }
            </View>
            <View style={styles.buttonsContainer}>
                <Button iconName="add-circle-outline" variant="dashed" onPress={() => { }} style={styles.buttons}>New Exercise</Button>
                <Button iconName="barbell-outline" variant="dashed" onPress={() => { }} style={styles.buttons}>Pick existing</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outterContainer: {
        padding: 16,
        backgroundColor: colors.red900,
        borderRadius: 14,
        gap: 12,
        borderWidth: 1,
        borderColor: colors.red500,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headingContainer: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    indexBox: {
        width: 28,
        height: 28,
        borderRadius: 10,
        backgroundColor: colors.red100,
        justifyContent: "center",
        alignItems: "center",
    },
    indexText: {
        color: colors.red500,
    },
    pressed: {
        opacity: 0.5,
    },
    headerIconButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 16
    },
    subExercisesContainer: {
        display: "flex",
        gap: 16,
        borderLeftWidth: 1,
        borderLeftColor: colors.red500,
        paddingHorizontal: 8,
    },
    buttonsContainer: {
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: colors.red500,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    buttons: {
        paddingVertical: 8,
        borderRadius: 16,
        flex: 1
    }
})