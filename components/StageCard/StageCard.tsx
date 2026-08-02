import { colors } from "@/styles/colors"
import { IStageCardProps } from "@/types/props"
import { Ionicons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import IconButton from "../IconButton/IconButton"
import Paragraph from "../Paragraph/Paragraph"
import Title from "../Title/Title"

function StageCardComponent({ index, stage, onDrag }: IStageCardProps) {
    const [editableName, setEditableName] = useState(stage.name)
    const [editableDescription, setEditableDescription] = useState(stage.description)

    useEffect(() => {
        if (stage.name && stage.description) {
            setEditableName(stage.name)
            setEditableDescription(stage.description)
        }
    }, [stage.name, stage.description])

    return (
        <View style={styles.outterContainer}>
            <View style={styles.innerConainer}>
                <Pressable onLongPress={onDrag} style={({ pressed }) => pressed && styles.pressed}>
                    <Ionicons name="reorder-two" size={22} color={colors.gray100} />
                </Pressable>
                <View style={styles.indexBox}>
                    <Paragraph>{index + 1}</Paragraph>
                </View>
                <View style={styles.textContainer}>
                    <Title isEditable onChangeText={setEditableName} onBlur={() => { }}>{editableName}</Title>
                    {stage.description && <Paragraph isEditable onChangeText={setEditableDescription} onBlur={() => { }} style={styles.descriptionText}>{editableDescription}</Paragraph>}
                </View>
            </View>
            <IconButton iconName="trash-bin-outline" onPress={() => { }} />
        </View>
    )
}

const styles = StyleSheet.create({
    outterContainer: {
        padding: 16,
        backgroundColor: colors.gray900,
        borderRadius: 14,
        gap: 12,
        borderWidth: 1,
        borderColor: colors.gray500,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    innerConainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    textContainer: {
        display: "flex",
        gap: 4
    },
    indexBox: {
        width: 28,
        height: 28,
        borderRadius: 10,
        backgroundColor: colors.gray500,
        justifyContent: "center",
        alignItems: "center",
    },
    descriptionText: {
        fontSize: 14
    },
    pressed: {
        opacity: 0.5,
    },
})

export default React.memo(StageCardComponent)