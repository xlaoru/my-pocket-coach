import Button from "@/components/Button/Button";
import Heading from "@/components/Heading/Heading";
import Input from "@/components/Input/Input";
import Paragraph from "@/components/Paragraph/Paragraph";
import { useLogIn } from "@/features/auth/hooks/use-log-in";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LogIn() {
    const insets = useSafeAreaInsets();

    const logInMutation = useLogIn();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogIn = async () => {
        try {
            await logInMutation.mutateAsync({ email: email.trim(), password });
            router.replace("/");
        } catch {
            // error is already exposed via logInMutation.error below
        }
    };

    return (
        <View
            style={[
                styles.screen,
                {
                    paddingTop: insets.top + 24,
                    paddingLeft: insets.left + 24,
                    paddingRight: insets.right + 24,
                    paddingBottom: insets.bottom + 24,
                },
            ]}
        >
            <Heading>Log In</Heading>
            <View style={styles.form}>
                <Input label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} />
                <Input label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} />

                {logInMutation.isError && (
                    <Paragraph style={styles.error}>
                        {logInMutation.error?.response?.data?.message ?? "Log in failed. Please try again."}
                    </Paragraph>
                )}
            </View>
            <Button onPress={handleLogIn}>
                {logInMutation.isPending ? "Logging in..." : "Log In"}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        gap: 24,
        justifyContent: "center",
    },
    form: {
        gap: 16,
    },
    error: {
        color: "#ff2d2d",
    },
});