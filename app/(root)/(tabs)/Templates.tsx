import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Loader from "@/components/Loader/Loader";
import Paragraph from "@/components/Paragraph/Paragraph";
import TemplateForm from "@/components/TemplateForm/TemplateForm";
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

    const [isCreateTemplateDisabled, setCreateTemplateDisabled] = useState(false)
    const [isDeleteTemplateDisabled, setDeleteTemplateDisabled] = useState(false)

    const handleCreateTemplate = useCallback(async (name: string, description: string) => {
        try {
            setIsBottomSheetOpen(false)
            setCreateTemplateDisabled(true)

            await createTemplateMutation.mutateAsync({
                name,
                description,
            }).finally(() => {
                setCreateTemplateDisabled(false)
            })
        } catch {
            Alert.alert("Failed to create template", "Please try again.");
        }
    }, [createTemplateMutation])

    const handleDeleteTemplate = useCallback(async (templateId: string) => {
        try {
            setDeleteTemplateDisabled(true)
            await deleteTemplateMutation.mutateAsync({
                templateId
            }).finally(() => {
                setDeleteTemplateDisabled(false)
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
                            : isLoading || isCreateTemplateDisabled || isDeleteTemplateDisabled
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
                        : isLoading
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
            <Button disabled={isCreateTemplateDisabled} iconName="add-outline" onPress={() => { setIsBottomSheetOpen(true) }}>New Template</Button>
            <BottomSheetForm
                isOpen={isBottomSheetOpen}
                title="New Template"
                onClose={() => setIsBottomSheetOpen(false)}
            >
                <TemplateForm onCreateTemplate={handleCreateTemplate} />
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