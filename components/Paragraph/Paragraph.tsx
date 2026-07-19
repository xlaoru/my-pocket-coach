import { colors } from "@/styles/colors";
import { IParagraphProps } from "@/types/props";
import { StyleSheet, Text, TextInput } from "react-native";

export default function Paragraph({ children, style, isEditable, onChangeText, onBlur }: IParagraphProps) {
    if (!isEditable) {
        return <Text style={[styles.paragraph, style]}>{children}</Text>;
    } else {
        return (
            <TextInput
                style={[styles.paragraph, style]}
                value={String(children)}
                multiline
                onChangeText={onChangeText}
                onBlur={onBlur}
                scrollEnabled={false}
            />
        )
    }
}

const styles = StyleSheet.create({
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.gray100,
        padding: 0
    }
});
