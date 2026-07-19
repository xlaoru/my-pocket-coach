import { IBottomSheetFormProps } from "@/types/props";
import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/styles/colors";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import Title from "../Title/Title";

export default function BottomSheetForm({ isOpen, title, children, onSubmit, onClose }: IBottomSheetFormProps) {
    const insets = useSafeAreaInsets();

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    useEffect(() => {
        if (isOpen) {
            bottomSheetRef.current?.present();
        } else {
            bottomSheetRef.current?.dismiss();
        }
    }, [isOpen]);

    const handleDismiss = useCallback(() => {
        onClose();
    }, [onClose]);

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                opacity={0.5}
                pressBehavior="close"
            />
        ),
        []
    );

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            bottomInset={insets.bottom}
            enableDynamicSizing
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustPan"
            enableBlurKeyboardOnGesture
            enablePanDownToClose
            onDismiss={handleDismiss}
            backdropComponent={renderBackdrop}
            backgroundStyle={styles.sheetBackground}
            handleIndicatorStyle={styles.handleIndicator}
        >
            <BottomSheetView style={styles.container}>
                <View style={styles.titleContainer}>
                    <Title>{title}</Title>
                    <IconButton iconName="close" onPress={handleDismiss} />
                </View>
                <View style={styles.separator} />
                <View style={styles.childrenContainer}>
                    {children}
                </View>
                <Button iconName="checkmark" onPress={onSubmit}>Submit</Button>
            </BottomSheetView>
        </BottomSheetModal>
    );
}

const styles = StyleSheet.create({
    sheetBackground: {
        backgroundColor: colors.gray900,
    },
    handleIndicator: {
        backgroundColor: colors.gray100,
    },
    container: {
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
        backgroundColor: colors.gray100,
    },
    childrenContainer: {
        gap: 8
    }
});
