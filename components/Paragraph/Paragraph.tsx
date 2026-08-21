import { colors } from "@/styles/colors";
import { IParagraphProps } from "@/types/props";
import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";

function Paragraph({ children, style, isEditable, autoFocus, onChangeText, onBlur, disabled }: IParagraphProps, ref: React.Ref<TextInput>) {
    if (!isEditable) {
        return <Text style={[styles.paragraph, style]}>{children}</Text>;
    } else {
        return (
            <TextInput
                ref={ref}
                style={[styles.paragraph, disabled && styles.disabled, style]}
                value={String(children)}
                multiline
                autoFocus={autoFocus}
                onChangeText={onChangeText}
                onBlur={onBlur}
                scrollEnabled={false}
                editable={!disabled}
            />
        )
    }
}

export default React.forwardRef(Paragraph);

const styles = StyleSheet.create({
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.gray100,
        padding: 0
    },
    disabled: {
        opacity: 0.5
    }
});
