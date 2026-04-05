import { IBottomSheetFormProps } from "@/types/props";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/styles/colors";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import Title from "../Title/Title";

export default function BottomSheetForm({ isOpen, title, children, onSubmit, onClose }: IBottomSheetFormProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (isOpen) {
            bottomSheetRef.current?.expand();
            return;
        }

        bottomSheetRef.current?.close();
    }, [isOpen]);

    const handleClosePress = () => {
        bottomSheetRef.current?.close();
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={["30%"]}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustPan"
            enableBlurKeyboardOnGesture
            enablePanDownToClose
            onClose={onClose}
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    opacity={0.5}
                    pressBehavior="close"
                />
            )}
            backgroundStyle={styles.sheetBackground}
            handleIndicatorStyle={styles.handleIndicator}
        >
            <BottomSheetView style={styles.container}>
                <View style={styles.titleContainer}>
                    <Title>{title}</Title>
                    <IconButton iconName="close" onPress={handleClosePress} />
                </View>
                <View style={styles.separator} />
                <View style={styles.childrenContainer}>
                    {children}
                </View>
                <Button iconName="checkmark" onPress={onSubmit}>Submit</Button>
            </BottomSheetView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    sheetBackground: {
        backgroundColor: colors.gray700,
    },
    handleIndicator: {
        backgroundColor: colors.gray500,
    },
    container: {
        flex: 1,
        gap: 16,
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    separator: {
        height: 1,
        backgroundColor: colors.gray500,
    },
    childrenContainer: {
        gap: 8
    }
});
