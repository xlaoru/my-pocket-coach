import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import BottomSheetInput from "@/components/BottomSheetForm/BottomSheetInput";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Loader from "@/components/Loader/Loader";
import Paragraph from "@/components/Paragraph/Paragraph";
import TemplateList from "@/components/TemplateList/TemplateList";
import { useCreateTemplate } from "@/features/programs/hooks/use-create-template";
import { useDeleteTemplate } from "@/features/programs/hooks/use-delete-template";
import { useTemplates } from "@/features/programs/hooks/use-templates";
import { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Templates() {
    const insets = useSafeAreaInsets();

    const { data: templates = [], isLoading, isError, refetch } = useTemplates()

    const createTemplateMutation = useCreateTemplate()
    const deleteTemplateMutation = useDeleteTemplate()

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

    const [templateName, setTemplateName] = useState("")
    const [templateDescription, setTemplateDescription] = useState("")

    const handleCreateTemplate = useCallback(async () => {
        try {
            setIsBottomSheetOpen(false)

            const trimmedTemplateName = templateName.trim()
            const trimmedTemplateDescription = templateDescription.trim()

            if (!trimmedTemplateName) return

            await createTemplateMutation.mutateAsync({
                name: trimmedTemplateName,
                description: trimmedTemplateDescription
            })

            setTemplateName("")
            setTemplateDescription("")
        } catch {
            Alert.alert("Failed to create template", "Please try again.");
        }
    }, [createTemplateMutation, templateDescription, templateName])

    const handleDeleteTemplate = useCallback(async (templateId: string) => {
        try {
            await deleteTemplateMutation.mutateAsync({
                templateId
            })
        } catch {
            Alert.alert("Failed to delete template", "Please try again.");
        }
    }, [deleteTemplateMutation])

    return (
        <View
            style={[
                styles.screen,
                {
                    paddingTop: insets.top + 24,
                    paddingLeft: insets.left + 24,
                    paddingRight: insets.right + 24,
                    paddingBottom: insets.bottom - 36,
                },
            ]}
        >
            <View>
                <HeadingLabel>Blueprints</HeadingLabel>
                <Heading>Templates</Heading>
                <Paragraph>
                    {
                        isError
                            ? "Failed to fetch templates"
                            : isLoading || createTemplateMutation.isPending
                                ? "Loading templates..."
                                : `${templates.length} template${templates.length !== 1 ? "s" : ""}`
                    }
                </Paragraph>
            </View>
            <View style={styles.listContainer}>
                {
                    isError
                        ? (
                            <EntityEmptyState
                                iconName="alert-circle-outline"
                                title="Failed to load templates"
                                message="Please check the API connection and try again."
                                onRetry={() => refetch()}
                            />
                        )
                        : isLoading || createTemplateMutation.isPending
                            ? (
                                <Loader text="Loading your templates..." />
                            )
                            : templates.length === 0
                                ? (
                                    <EntityEmptyState iconName="document-text-outline" title="No templates yet" message="Create a template" />
                                )
                                : (
                                    <TemplateList templates={templates} onDeleteTemplate={handleDeleteTemplate} />
                                )
                }
            </View>
            <Button iconName="add-outline" onPress={() => { setIsBottomSheetOpen(true) }}>New Template</Button>
            <BottomSheetForm
                isOpen={isBottomSheetOpen}
                title="New Template"
                onSubmit={handleCreateTemplate}
                onClose={() => setIsBottomSheetOpen(false)}
            >
                <BottomSheetInput label="Template Name" placeholder="e.g. Push Day Template" value={templateName} onChangeText={setTemplateName} />
                <BottomSheetInput label="Template Description" placeholder="e.g. A push day workout template" value={templateDescription} onChangeText={setTemplateDescription} />
            </BottomSheetForm>
        </View >
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        gap: 16,
    },
    listContainer: {
        flex: 1,
        marginTop: 16,
    },
});