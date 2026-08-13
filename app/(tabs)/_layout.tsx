import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (

        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.gray900,
                },
                tabBarActiveTintColor: colors.red500,
                sceneStyle: {
                    backgroundColor: colors.black,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Training",
                    tabBarLabel: "Programs",
                    tabBarIcon: ({ color, size }) => <Ionicons name="barbell-outline" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="Templates"
                options={{
                    title: "Templates",
                    tabBarLabel: "Templates",
                    tabBarIcon: ({ color, size }) => <Ionicons name="document-text-outline" color={color} size={size} />
                }}
            />
            <Tabs.Screen
                name="Periodization"
                options={{
                    title: "Planning",
                    tabBarLabel: "Periodization",
                    tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" color={color} size={size} />,
                }}
            />
        </Tabs>
    );
}