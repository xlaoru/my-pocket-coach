import { IGenerateProgramByTemplateFormProps } from "@/types/props";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import EntityEmptyState from "../EntityEmptyState/EntityEmptyState";
import Loader from "../Loader/Loader";
import TemplateCard from "./TemplateCard";

export default function GenerateProgramByTemplateForm({ templates, onGenerateProgramByTemplate, isLoading, isError, refetchTemplates, isGenerateProgramDisabled }: IGenerateProgramByTemplateFormProps) {
    return (
        <View style={styles.container}>
            {
                isError
                    ? (
                        <EntityEmptyState
                            iconName="alert-circle-outline"
                            title="Failed to load templates"
                            message="Please check the API connection and try again"
                            wrapperStyle={{ marginTop: 0, marginBottom: 50 }}
                            onRetry={() => refetchTemplates()}
                        />
                    )
                    : isLoading
                        ? (
                            <Loader text="Loading your templates..." />
                        )
                        : templates && templates.length === 0
                            ? (
                                <EntityEmptyState iconName="document-text-outline" title="No templates yet" message="You haven't created any templates" wrapperStyle={{ marginTop: 0, marginBottom: 50 }} />
                            )
                            : (
                                <FlatList
                                    style={styles.container}
                                    contentContainerStyle={styles.contentContainer}
                                    data={templates}
                                    keyExtractor={(item) => item._id}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <TemplateCard template={item} key={index} onGenerateProgramByTemplate={onGenerateProgramByTemplate} isGenerateProgramDisabled={isGenerateProgramDisabled} />
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
})