import { IAttachPeriodizationFormProps } from "@/types/props";
import { FlatList, StyleSheet, View } from "react-native";
import Button from "../Button/Button";
import EntityEmptyState from "../EntityEmptyState/EntityEmptyState";
import Paragraph from "../Paragraph/Paragraph";
import PeriodizationCard from "./PeriodizationCard";
import StageCard from "./StageCard";

export default function AttachPeriodizationForm({ isStagePicking, setStagePicking, pickedPeriodization, setPickedPeriodization, periodizations, onLinkStage, setAttachPeriodizationMode }: IAttachPeriodizationFormProps) {
    return (
        <View style={styles.container}>
            {
                isStagePicking ? (
                    <View style={styles.stagePickingWrapper}>
                        <Button iconName="arrow-back-outline" variant="text" onPress={() => { setStagePicking(false); setPickedPeriodization(null) }}>Back</Button>
                        <Paragraph>Select a stage to attach thir program to:</Paragraph>
                        {
                            pickedPeriodization?.stages && pickedPeriodization?.stages.length === 0
                                ? (
                                    <EntityEmptyState iconName="flash" title="No stages yet" message="This periodization has no stages" wrapperStyle={{ marginTop: 0, marginBottom: 50 }} />
                                )
                                : (
                                    <FlatList
                                        style={styles.container}
                                        contentContainerStyle={styles.contentContainer}
                                        data={pickedPeriodization?.stages}
                                        keyExtractor={(item) => item._id}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }) => (
                                            <StageCard index={index} periodizationId={pickedPeriodization?._id ?? ""} stage={item} onLinkStage={onLinkStage} setAttachPeriodizationMode={setAttachPeriodizationMode} setStagePicking={setStagePicking} setPickedPeriodization={setPickedPeriodization} />
                                        )}
                                    />
                                )
                        }
                    </View>
                )
                    : (
                        periodizations && periodizations.length === 0
                            ? (
                                <EntityEmptyState iconName="flash" title="No periodiozation yet" message="You haven't created any periodizations" wrapperStyle={{ marginTop: 0, marginBottom: 50 }} />
                            )
                            : (
                                <FlatList
                                    style={styles.container}
                                    contentContainerStyle={styles.contentContainer}
                                    data={periodizations}
                                    keyExtractor={(item) => item._id}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <PeriodizationCard periodization={item} setStagePicking={setStagePicking} setPickedPeriodization={setPickedPeriodization} />
                                    )}
                                />
                            )
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