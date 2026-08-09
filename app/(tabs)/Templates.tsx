import BottomSheetForm from "@/components/BottomSheetForm/BottomSheetForm";
import BottomSheetInput from "@/components/BottomSheetForm/BottomSheetInput";
import Button from "@/components/Button/Button";
import EntityEmptyState from "@/components/EntityEmptyState/EntityEmptyState";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Loader from "@/components/Loader/Loader";
import Paragraph from "@/components/Paragraph/Paragraph";
import TemplateList from "@/components/TemplateList/TemplateList";
import { useTemplates } from "@/features/programs/hooks/use-templates";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Templates() {
    const insets = useSafeAreaInsets();

    const { data: templates = [], isLoading, isError } = useTemplates()

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

    const [templateName, setTemplateName] = useState("")
    const [templateDescription, setTemplateDescription] = useState("")

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
                        isLoading
                            ? "Loading templates..."
                            : `${templates.length} template${templates.length !== 1 ? "s" : ""}`
                    }
                </Paragraph>
            </View>
            <View style={styles.listContainer}>
                {
                    isError
                        ? (
                            <EntityEmptyState iconName="document-text-outline" title="No templates yet" message="Create a template" />
                        )
                        : isLoading
                            ? (
                                <Loader />
                            )
                            : (
                                <TemplateList templates={templates} />
                            )
                }
            </View>
            <Button iconName="add-outline" onPress={() => { setIsBottomSheetOpen(true) }}>New Template</Button>
            <BottomSheetForm
                isOpen={isBottomSheetOpen}
                title="New Template"
                onSubmit={() => { }}
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