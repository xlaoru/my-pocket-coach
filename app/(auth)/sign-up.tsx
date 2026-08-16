import Button from "@/components/Button/Button";
import Heading from "@/components/Heading/Heading";
import Input from "@/components/Input/Input";
import Paragraph from "@/components/Paragraph/Paragraph";
import { useSignUp } from "@/features/auth/hooks/use-sign-up";
import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignUp() {
    const insets = useSafeAreaInsets();

    const signUpMutation = useSignUp();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

    const handleSignUp = async () => {
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();

        if (!trimmedName || !trimmedEmail || !password || password !== confirmPassword) return;

        try {
            await signUpMutation.mutateAsync({ name: trimmedName, email: trimmedEmail, password });
            router.replace("/");
        } catch {
            // error is already exposed via signUpMutation.error below
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
            <Heading>Sign Up</Heading>
            <View style={styles.form}>
                <Input label="Name" placeholder="John Doe" value={name} onChangeText={setName} autoCapitalize="words" />
                <Input label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
                <Input label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />
                <Input label="Confirm Password" placeholder="••••••••" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

                {passwordsMismatch && (
                    <Paragraph style={styles.error}>Passwords do not match.</Paragraph>
                )}

                {signUpMutation.isError && (
                    <Paragraph style={styles.error}>
                        {signUpMutation.error?.response?.data?.message ?? "Sign up failed. Please try again."}
                    </Paragraph>
                )}
            </View>
            <View style={styles.actions}>
                <Button onPress={handleSignUp}>
                    {signUpMutation.isPending ? "Signing up..." : "Sign Up"}
                </Button>
                <Button variant="text" style={{ alignSelf: "center" }} onPress={() => router.push("/log-in")}>
                    Already have an account? Log In
                </Button>
            </View>
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
    actions: {
        gap: 8,
    },
    error: {
        color: colors.red500,
    },
});
