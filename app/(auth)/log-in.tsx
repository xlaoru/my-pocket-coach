import Button from "@/components/Button/Button";
import Heading from "@/components/Heading/Heading";
import Input from "@/components/Input/Input";
import { useLogIn } from "@/features/auth/hooks/use-log-in";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LogIn() {
    const insets = useSafeAreaInsets();

    const logInMutation = useLogIn();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLogInDisabled, setLogInDisabled] = useState(false)

    const handleLogIn = async () => {
        try {
            setLogInDisabled(true)

            await logInMutation.mutateAsync({ email: email.trim(), password }).finally(() => {
                setLogInDisabled(false)
                router.replace("/");
            })
        } catch {
            Alert.alert("Failed to log in", "Please try again.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    {
                        paddingTop: insets.top + 24,
                        paddingLeft: insets.left + 24,
                        paddingRight: insets.right + 24,
                        paddingBottom: insets.bottom + 24,
                    },
                ]}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                <Pressable style={styles.content} onPress={Keyboard.dismiss}>
                    <Heading>Log In</Heading>
                    <View style={styles.form}>
                        <Input label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
                        <Input label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />
                    </View>
                    <View style={styles.actions}>
                        <Button disabled={isLogInDisabled} onPress={handleLogIn}>
                            Log In
                        </Button>
                        <Button variant="text" style={{ alignSelf: "center" }} onPress={() => router.push("/sign-up")}>
                            Don&apos;t have an account? Sign Up
                        </Button>
                    </View>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    content: {
        gap: 24,
    },
    form: {
        gap: 16,
    },
    actions: {
        gap: 8,
    },
    error: {
        color: "#ff2d2d",
    },
});