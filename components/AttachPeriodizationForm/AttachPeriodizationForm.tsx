import { IAttachPeriodizationFormProps } from "@/types/props";
import { StyleSheet, View } from "react-native";
import Button from "../Button/Button";
import EntityEmptyState from "../EntityEmptyState/EntityEmptyState";
import Loader from "../Loader/Loader";
import Paragraph from "../Paragraph/Paragraph";
import PeriodizationCard from "./PeriodizationCard";
import StageCard from "./StageCard";

export default function AttachPeriodizationForm({ isStagePicking, setStagePicking, pickedPeriodization, setPickedPeriodization, periodizations, onLinkStage, setAttachPeriodizationMode, isLoading, isError, refetchPeriodizations }: IAttachPeriodizationFormProps) {
    return (
        <View style={styles.container}>
            {
                isError
                    ? (
                        <EntityEmptyState
                            iconName="alert-circle-outline"
                            title="Failed to load periodizations"
                            message="Please check the API connection and try again."
                            wrapperStyle={{ marginTop: 0, marginBottom: 50 }}
                            onRetry={() => refetchPeriodizations()}
                        />
                    )
                    : isLoading
                        ? (
                            <Loader text="Loading your periodizations..." />
                        )
                        : isStagePicking
                            ? (
                                <View style={styles.stagePickingWrapper}>
                                    <Button iconName="arrow-back-outline" variant="text" onPress={() => { setStagePicking(false); setPickedPeriodization(null) }}>Back</Button>
                                    <Paragraph>Select a stage to attach thir program to:</Paragraph>
                                    {
                                        pickedPeriodization?.stages && pickedPeriodization?.stages.length === 0
                                            ? (
                                                <EntityEmptyState iconName="flash" title="No stages yet" message="This periodization has no stages" wrapperStyle={{ marginTop: 0, marginBottom: 50 }} />
                                            )
                                            : (
                                                <View style={styles.contentContainer}>
                                                    {pickedPeriodization?.stages.map((item, index) => (
                                                        <StageCard key={item._id} index={index} periodizationId={pickedPeriodization?._id ?? ""} stage={item} onLinkStage={onLinkStage} setAttachPeriodizationMode={setAttachPeriodizationMode} setStagePicking={setStagePicking} setPickedPeriodization={setPickedPeriodization} />
                                                    ))}
                                                </View>
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
                                        <View style={styles.contentContainer}>
                                            {periodizations?.map((item) => (
                                                <PeriodizationCard key={item._id} periodization={item} setStagePicking={setStagePicking} setPickedPeriodization={setPickedPeriodization} />
                                            ))}
                                        </View>
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