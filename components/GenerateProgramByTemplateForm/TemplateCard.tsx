import { colors } from "@/styles/colors";
import { ITemplateWorkoutItem } from "@/types/models";
import { ITemplateCardProps } from "@/types/props";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";

function countExercises(workout: ITemplateWorkoutItem[]): number {
    let count = 0;

    workout.forEach((item: ITemplateWorkoutItem) => {
        if (item.type === "exercise") {
            count += 1;
        } else if (item.type === "superset") {
            count += item.components.length
        }
    });

    return count;
}

function countSupersets(workout: ITemplateWorkoutItem[]): number {
    let count = 0;

    workout.forEach((item: ITemplateWorkoutItem) => {
        if (item.type === "superset") {
            count += 1;
        }
    });

    return count;
}

export default function TemplateCard({ template, onGenerateProgramByTemplate }: ITemplateCardProps) {
    const exercises = countExercises(template.templateWorkout);
    const supersets = countSupersets(template.templateWorkout);

    const handleGenerateProgramByTemplate = useCallback(() => {
        void onGenerateProgramByTemplate(template._id)
    }, [onGenerateProgramByTemplate, template._id])

    return (
        <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={handleGenerateProgramByTemplate}>
            <View style={styles.iconContainer}>
                <Ionicons name="document-text-outline" size={24} color={colors.red500} />
            </View>
            <View style={styles.contentContainer}>
                <Title>{template.name.length > 20 ? `${template.name.substring(0, 20)}...` : template.name}</Title>
                {template.description && <Paragraph>{template.description.length > 25 ? `${template.description.substring(0, 25)}...` : template.description}</Paragraph>}
                <View style={styles.amountsContainer}>
                    {exercises > 0 && <Paragraph style={styles.templateTitle}>{exercises} exercise{exercises !== 1 ? 's' : ''}</Paragraph>}
                    {supersets > 0 && <Paragraph style={styles.templateTitle}>{supersets} superset{supersets !== 1 ? 's' : ''}</Paragraph>}
                </View>
            </View>
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
    amountsContainer: {
        flexDirection: "row",
        gap: 4,
    },
    templateTitle: {
        fontSize: 14,
    },
    pressed: {
        opacity: 0.85,
    }
})