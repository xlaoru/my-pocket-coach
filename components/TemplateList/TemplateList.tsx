import { ITemplateWorkoutItem } from "@/types/models";
import { ITemplateListProps } from "@/types/props";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";
import TemplateListItem from "./TemplateListItem";

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

export default function TemplateList({ templates }: ITemplateListProps) {
    const router = useRouter()

    return (
        <FlatList
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={templates}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <TemplateListItem
                    templateId={item._id}
                    title={item.name}
                    description={item.description ?? ""}
                    exercises={countExercises(item.templateWorkout)}
                    supersets={countSupersets(item.templateWorkout)}
                    onPress={() => {
                        router.push({
                            pathname: "/(modals)/templates/[_id]",
                            params: { _id: item._id }
                        })
                    }}
                    onDeleteTemplate={async () => { }}
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        gap: 12,
    }
});
