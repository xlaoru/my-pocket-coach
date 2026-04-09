import { colors } from "@/styles/colors";
import { Stack } from "expo-router";
import React from "react";

export default function ModalLayout() {
    return (
        <Stack
            screenOptions={{
                presentation: "modal",
                contentStyle: {
                    backgroundColor: colors.black,
                },
                headerStyle: {
                    backgroundColor: colors.black,
                },
                headerTintColor: colors.gray400
            }}
        >
            <Stack.Screen name="programs/[_id]" />
        </Stack>
    );
}