import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Paragraph from "@/components/Paragraph/Paragraph";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Periodization() {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: insets.top + 24, paddingLeft: insets.left + 24, paddingBottom: insets.bottom }}>
            <View>
                <HeadingLabel>Planning</HeadingLabel>
                <Heading>Periodization</Heading>
                <Paragraph>{0} period</Paragraph>
            </View>
        </View>
    );
}
