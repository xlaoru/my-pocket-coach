import { colors } from "@/styles/colors";
import { IAttachStageCardProps } from "@/types/props";
import { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";

export default function StageCard({ index, periodizationId, stage, onLinkStage, setAttachPeriodizationMode, setStagePicking, setPickedPeriodization }: IAttachStageCardProps) {
    const handleLinkStage = useCallback(() => {
        void onLinkStage(periodizationId, stage._id)
            .then(() => {
                setAttachPeriodizationMode(false)
                setStagePicking(false)
                setPickedPeriodization(null)
            })
    }, [onLinkStage, periodizationId, stage._id, setAttachPeriodizationMode, setPickedPeriodization, setStagePicking])

    return (
        <Pressable onPress={handleLinkStage} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
            <View style={styles.indexContainer}>
                <Title style={styles.indexText}>{index + 1}</Title>
            </View>
            <View style={styles.contentContainer}>
                <Title>{stage.name.length > 20 ? `${stage.name.substring(0, 20)}...` : stage.name}</Title>
                {stage.description && <Paragraph>{stage.description.length > 30 ? `${stage.description.substring(0, 30)}...` : stage.description}</Paragraph>}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 12,
        padding: 12,
        backgroundColor: colors.gray900,
        borderWidth: 1,
        borderColor: colors.gray500,
        borderRadius: 16,
        alignItems: "center",
    },
    contentContainer: {
        flex: 1,
        minWidth: 0,
    },
    indexContainer: {
        width: 48,
        height: 48,
        backgroundColor: colors.gray500,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    indexText: {
        color: colors.gray100
    },
    stagesTitle: {
        fontSize: 14,
    },
    pressed: {
        opacity: 0.85,
    }
})