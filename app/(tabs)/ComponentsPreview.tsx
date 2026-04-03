import { colors } from "@/styles/colors";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";


export default function ComponentsPreview() {
    return (
        <FlatList
            style={styles.outerContainer}
            data={Object.entries(colors)}
            keyExtractor={([key]) => key}
            renderItem={({ item: [key, value] }) => (
                <View style={styles.innerContainer}>
                    <View style={[styles.box, { backgroundColor: value }]} />
                    <Text style={styles.label}>{key}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        padding: 16,
    },
    innerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    box: {
        width: 100,
        height: 100,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
    }
});
