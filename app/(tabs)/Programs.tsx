import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Programs() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[{ paddingTop: insets.top + 24, paddingLeft: insets.left + 24, paddingBottom: insets.bottom }]}>
            <View>
                <HeadingLabel>Training</HeadingLabel>
                <Heading>Programs</Heading>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25
    }
})