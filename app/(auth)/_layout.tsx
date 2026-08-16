import { colors } from "@/styles/colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: colors.black,
                },
            }}
        >
            <Stack.Screen name="log-in" />
        </Stack>
    );
}