import { colors } from "@/styles/colors";
import { IParagraphProps } from "@/types/props";
import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";

function Paragraph({ children, style, isEditable, autoFocus, onChangeText, onBlur }: IParagraphProps, ref: React.Ref<TextInput>) {
    if (!isEditable) {
        return <Text style={[styles.paragraph, style]}>{children}</Text>;
    } else {
        return (
            <TextInput
                ref={ref}
                style={[styles.paragraph, style]}
                value={String(children)}
                multiline
                autoFocus={autoFocus}
                onChangeText={onChangeText}
                onBlur={onBlur}
                scrollEnabled={false}
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
    }
});
