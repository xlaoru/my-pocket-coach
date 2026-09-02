import { ITemplateFormProps } from "@/types/props";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheetInput from "../BottomSheetForm/BottomSheetInput";
import Button from "../Button/Button";

const TemplateForm = ({ onCreateTemplate }: ITemplateFormProps) => {
    const [templateName, setTemplateName] = useState("")
    const [templateDescription, setTemplateDescription] = useState("")

    const [isCreateTemplateDisabled, setCreateTemplateDisabled] = useState(false)

    const handleCreateTemplate = useCallback(async () => {
        const trimmedName = templateName.trim()
        const trimmedDescription = templateDescription.trim()

        if (!trimmedName) return

        setCreateTemplateDisabled(true)

        await onCreateTemplate(trimmedName, trimmedDescription).finally(() => {
            setCreateTemplateDisabled(false)
        })

        setTemplateName("")
        setTemplateDescription("")
    }, [onCreateTemplate, templateDescription, templateName])

    return (
        <View style={styles.container}>
            <BottomSheetInput label="Template Name" placeholder="e.g. Push Day Template" value={templateName} onChangeText={setTemplateName} />
            <BottomSheetInput label="Template Description" placeholder="e.g. A push day workout template" value={templateDescription} onChangeText={setTemplateDescription} />
            <Button iconName="checkmark" disabled={isCreateTemplateDisabled} onPress={handleCreateTemplate}>Submit</Button>
        </View>
    );
};

export default TemplateForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12
    }
});