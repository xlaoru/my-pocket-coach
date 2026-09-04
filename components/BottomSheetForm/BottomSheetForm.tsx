import { IBottomSheetFormProps } from "@/types/props";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";

import { colors } from "@/styles/colors";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, BottomSheetScrollViewMethods } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconButton from "../IconButton/IconButton";
import Title from "../Title/Title";

interface IBottomSheetFormScrollContext {
    scrollToEnd: VoidFunction;
}

const BottomSheetFormScrollContext = createContext<IBottomSheetFormScrollContext | null>(null);

export function useBottomSheetFormScroll() {
    const context = useContext(BottomSheetFormScrollContext);

    if (!context) {
        throw new Error("useBottomSheetFormScroll must be used within a BottomSheetForm");
    }

    return context;
}

export default function BottomSheetForm({ isOpen, title, children, onClose, }: IBottomSheetFormProps) {
    const insets = useSafeAreaInsets();

    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const scrollViewRef = useRef<BottomSheetScrollViewMethods>(null);

    useEffect(() => {
        if (isOpen) {
            bottomSheetRef.current?.present();
        } else {
            bottomSheetRef.current?.dismiss();
        }
    }, [isOpen]);

    useEffect(() => {
        const subscription = Keyboard.addListener("keyboardDidHide", () => {
            if (isOpen) {
                bottomSheetRef.current?.snapToIndex(0);
            }
        });

        return () => subscription.remove();
    }, [isOpen]);

    const handleDismiss = useCallback(() => {
        onClose();
    }, [onClose]);

    const scrollToEnd = useCallback(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, []);

    const scrollContextValue = useMemo(() => ({ scrollToEnd }), [scrollToEnd]);

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
            <BottomSheetScrollView
                ref={scrollViewRef}
                style={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <BottomSheetFormScrollContext.Provider value={scrollContextValue}>
                    <View style={styles.titleContainer}>
                        <Title>{title}</Title>
                        <IconButton iconName="close" onPress={handleDismiss} />
                    </View>
                    <View style={styles.separator} />
                    <Pressable style={[styles.childrenContainer, { paddingBottom: 24 }]} onPress={() => Keyboard.dismiss()}>
                        {children}
                    </Pressable>
                </BottomSheetFormScrollContext.Provider>
            </BottomSheetScrollView>
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
        marginVertical: 16
    },
    childrenContainer: {
        gap: 8
    }
});
