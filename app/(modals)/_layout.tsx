import { Stack } from "expo-router";
import React from "react";

export default function ModalLayout() {
    return (
        <Stack>
            <Stack.Screen name="Program" options={{ headerShown: false }} />
        </Stack>
    );
}