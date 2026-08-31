import { colors } from "@/styles/colors"
import { IStageCardProps } from "@/types/props"
import { Ionicons } from "@expo/vector-icons"
import React, { useCallback, useEffect, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import IconButton from "../IconButton/IconButton"
import Paragraph from "../Paragraph/Paragraph"
import Title from "../Title/Title"

function StageCardComponent({ index, stage, onDrag, onDeleteStage, onEditStageName, onEditStageDescription, isMoveStageDisabled }: IStageCardProps) {
    const [editableName, setEditableName] = useState(stage.name)
    const [editableDescription, setEditableDescription] = useState(stage.description)

    useEffect(() => {
        setEditableName(stage.name)
        setEditableDescription(stage.description)
    }, [stage.name, stage.description])

    const [isDeleteStageDisabled, setDeleteStageDisabled] = useState(false)
    const [isEditStageNameDisabled, setEditStageNameDisabled] = useState(false)
    const [isEditStageDescriptionDisabled, setEditStageDescriptionDisabled] = useState(false)

    const handleNameBlur = useCallback(async () => {
        const trimmedName = editableName.trim()

        if (!trimmedName) {
            setEditableName(stage.name)
            return
        }

        if (trimmedName === stage.name) return

        setEditStageNameDisabled(true)

        await onEditStageName(stage._id, trimmedName).finally(() => {
            setEditStageNameDisabled(false)
        })
    }, [editableName, stage.name, onEditStageName, stage._id])

    const handleDescriptionBlur = useCallback(async () => {
        const trimmedDescription = (editableDescription ?? "").trim()

        if (!trimmedDescription) {
            setEditableDescription(stage.description)
            return
        }

        if (trimmedDescription === stage.description) return

        setEditStageDescriptionDisabled(true)

        await onEditStageDescription(stage._id, trimmedDescription).finally(() => {
            setEditStageDescriptionDisabled(false)
        })
    }, [editableDescription, stage.description, onEditStageDescription, stage._id])

    const handleDeleteStage = useCallback(async () => {
        setDeleteStageDisabled(true)
        await onDeleteStage(stage._id).finally(() => {
            setDeleteStageDisabled(false)
        })
    }, [onDeleteStage, stage._id])

    return (
        <View style={[styles.outterContainer, (isDeleteStageDisabled || isMoveStageDisabled) && styles.disabled]}>
            <View style={styles.innerConainer}>
                <Pressable disabled={isDeleteStageDisabled || isMoveStageDisabled} onLongPress={onDrag} style={({ pressed }) => [pressed && styles.pressed, (isDeleteStageDisabled || isMoveStageDisabled) && styles.disabled]}>
                    <Ionicons name="reorder-two" size={22} color={colors.gray100} />
                </Pressable>
                <View style={styles.indexBox}>
                    <Paragraph>{index + 1}</Paragraph>
                </View>
                <View style={styles.textContainer}>
                    <Title disabled={isDeleteStageDisabled || isMoveStageDisabled || isEditStageNameDisabled} isEditable onChangeText={setEditableName} onBlur={handleNameBlur}>{editableName}</Title>
                    {stage.description && <Paragraph disabled={isDeleteStageDisabled || isMoveStageDisabled || isEditStageDescriptionDisabled} isEditable onChangeText={setEditableDescription} onBlur={handleDescriptionBlur} style={styles.descriptionText}>{editableDescription}</Paragraph>}
                </View>
            </View>
            <IconButton disabled={isDeleteStageDisabled || isMoveStageDisabled} iconName="trash-bin-outline" onPress={handleDeleteStage} />
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
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    textContainer: {
        flex: 1,
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
        opacity: 0.85,
    },
    disabled: {
        opacity: 0.5,
    }
})

export default React.memo(StageCardComponent)