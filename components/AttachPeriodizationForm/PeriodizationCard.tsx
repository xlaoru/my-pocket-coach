import { colors } from "@/styles/colors";
import { IPeriodizationCardProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import IconButton from "../IconButton/IconButton";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";

export default function PeriodizationCard({ periodization, setStagePicking, setPickedStages }: IPeriodizationCardProps) {
    return (
        <Pressable onPress={() => { setStagePicking(true); setPickedStages(periodization.stages) }} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
            <View style={styles.iconContainer}>
                <Ionicons name="flash" size={24} color={colors.red500} />
            </View>
            <View style={styles.contentContainer}>
                <Title>{periodization.name.length > 15 ? `${periodization.name.substring(0, 15)}...` : periodization.name}</Title>
                {periodization.description && <Paragraph>{periodization.description.length > 20 ? `${periodization.description.substring(0, 20)}...` : periodization.description}</Paragraph>}
                <Paragraph style={styles.stagesTitle}>{periodization.stages.length} stage{periodization.stages.length !== 1 ? "s" : ""}</Paragraph>
            </View>
            <IconButton iconName="chevron-forward-outline" onPress={() => { setStagePicking(true); setPickedStages(periodization.stages) }} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 12,
        padding: 8,
        backgroundColor: colors.gray900,
        borderWidth: 1,
        borderColor: colors.gray500,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "space-between",
    },
    contentContainer: {
        flex: 1,
        minWidth: 0,
    },
    iconContainer: {
        padding: 12,
        backgroundColor: colors.red900,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    stagesTitle: {
        fontSize: 14,
    },
    pressed: {
        opacity: 0.85,
    }
})