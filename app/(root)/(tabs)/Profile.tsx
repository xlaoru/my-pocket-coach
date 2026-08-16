import Button from "@/components/Button/Button";
import Heading from "@/components/Heading/Heading";
import HeadingLabel from "@/components/Heading/HeadingLabel";
import Paragraph from "@/components/Paragraph/Paragraph";
import Title from "@/components/Title/Title";
import { useAuth } from "@/features/auth/context/AuthContext";
import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
    const insets = useSafeAreaInsets();

    const { user, logOut } = useAuth();

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogOut = () => {
        Alert.alert("Log Out", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Log Out",
                style: "destructive",
                onPress: async () => {
                    setIsLoggingOut(true);
                    try {
                        await logOut();
                    } finally {
                        setIsLoggingOut(false);
                    }
                },
            },
        ]);
    };

    return (
        <View
            style={[
                styles.screen,
                {
                    paddingTop: insets.top + 24,
                    paddingLeft: insets.left + 24,
                    paddingRight: insets.right + 24,
                    paddingBottom: insets.bottom - 36,
                },
            ]}
        >
            <View>
                <HeadingLabel>Account</HeadingLabel>
                <Heading>Profile</Heading>
            </View>
            <View style={styles.userCard}>
                <View style={styles.avatar}>
                    <Ionicons name="person" color={colors.red500} size={32} />
                </View>
                <View style={styles.userInfo}>
                    <Title>{user?.name}</Title>
                    <Paragraph>{user?.email}</Paragraph>
                </View>
            </View>
            <View style={styles.spacer} />
            <Button variant="secondary" iconName="log-out-outline" onPress={handleLogOut}>
                {isLoggingOut ? "Logging out..." : "Log Out"}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        gap: 24,
    },
    userCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        backgroundColor: colors.gray900,
        borderRadius: 16,
        padding: 16,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.red900,
        alignItems: "center",
        justifyContent: "center",
    },
    userInfo: {
        gap: 4,
    },
    spacer: {
        flex: 1,
    },
});
