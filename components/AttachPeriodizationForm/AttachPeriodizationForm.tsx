import { IStage } from "@/types/models";
import { IAttachPeriodizationFormProps } from "@/types/props";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Button from "../Button/Button";
import Paragraph from "../Paragraph/Paragraph";
import PeriodizationCard from "./PeriodizationCard";
import StageCard from "./StageCard";

export default function AttachPeriodizationForm({ periodizations }: IAttachPeriodizationFormProps) {
    const [isStagePicking, setStagePicking] = useState(false)
    const [pickedStages, setPickedStages] = useState<IStage[]>([])

    return (
        <View style={styles.container}>
            {
                isStagePicking ? (
                    <View style={styles.stagePickingWrapper}>
                        <Button iconName="arrow-back-outline" variant="text" onPress={() => { setStagePicking(false); setPickedStages([]) }}>Back</Button>
                        <Paragraph>Select a stage to attach thir program to:</Paragraph>
                        <FlatList
                            style={styles.container}
                            contentContainerStyle={styles.contentContainer}
                            data={pickedStages}
                            keyExtractor={(item) => item._id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <StageCard index={index} stage={item} />
                            )}
                        />
                    </View>
                )
                    : (

                        <FlatList
                            style={styles.container}
                            contentContainerStyle={styles.contentContainer}
                            data={periodizations}
                            keyExtractor={(item) => item._id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <PeriodizationCard periodization={item} setStagePicking={setStagePicking} setPickedStages={setPickedStages} />
                            )}
                        />
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        gap: 12,
    },
    stagePickingWrapper: {
        display: "flex",
        gap: 16
    }
})