import Button from "@/components/Button/Button";
import Heading from "@/components/Heading/Heading";
import Input from "@/components/Input/Input";
import { useSignUp } from "@/features/auth/hooks/use-sign-up";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignUp() {
    const insets = useSafeAreaInsets();

    const signUpMutation = useSignUp();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isSignUpDisabled, setSignUpDisabled] = useState(false)

    const handleSignUp = async () => {
        try {
            const trimmedName = name.trim();
            const trimmedEmail = email.trim();

            if (!trimmedName || !trimmedEmail || !password) return;

            if (confirmPassword.length > 0 && password !== confirmPassword) {
                Alert.alert("Passwords do not match", "Please try again.")
                return
            }

            setSignUpDisabled(true)

            await signUpMutation.mutateAsync({ name: trimmedName, email: trimmedEmail, password }).finally(() => {
                setSignUpDisabled(false)
                router.replace("/");
            })
        } catch {
            Alert.alert("Failed to sign up", "Please try again.");
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
                    <Heading>Sign Up</Heading>
                    <View style={styles.form}>
                        <Input label="Name" placeholder="John Doe" value={name} onChangeText={setName} autoCapitalize="words" />
                        <Input label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
                        <Input label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />
                        <Input label="Confirm Password" placeholder="••••••••" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
                    </View>
                    <View style={styles.actions}>
                        <Button disabled={isSignUpDisabled} onPress={handleSignUp}>
                            Sign Up
                        </Button>
                        <Button variant="text" style={{ alignSelf: "center" }} onPress={() => router.push("/log-in")}>
                            Already have an account? Log In
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
        color: colors.red500,
    },
});
