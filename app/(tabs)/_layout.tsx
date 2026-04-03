import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="Programs"
                options={{
                    title: "Programs",
                    tabBarIcon: ({ color, size }) => <Ionicons name="barbell-outline" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="Periodizations"
                options={{
                    title: "Periodizations",
                    tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" color={color} size={size} />,
                }}
            />
        </Tabs>
    );
}