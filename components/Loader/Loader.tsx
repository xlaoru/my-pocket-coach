import { colors } from "@/styles/colors";
import Paragraph from "../Paragraph/Paragraph";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function Loader() {
  const repValue = useRef(new Animated.Value(0)).current;
  const glowValue = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    const repAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(repValue, {
          toValue: 1,
          duration: 850,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(repValue, {
          toValue: 0,
          duration: 850,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ])
    );

    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowValue, {
          toValue: 1.05,
          duration: 850,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(glowValue, {
          toValue: 0.85,
          duration: 850,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    repAnimation.start();
    glowAnimation.start();

    return () => {
      repAnimation.stop();
      glowAnimation.stop();
    };
  }, [glowValue, repValue]);

  const lift = repValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["8deg", "-8deg"],
  });

  const rise = repValue.interpolate({
    inputRange: [0, 1],
    outputRange: [6, -8],
  });

  const glowScale = glowValue.interpolate({
    inputRange: [0, 1.05],
    outputRange: [0.88, 1.05],
  });

  return (
    <View style={styles.container}>
      <View style={styles.loaderStage}>
        <Animated.View
          style={[
            styles.halo,
            {
              transform: [{ scale: glowScale }],
            },
          ]}
        />

        <View style={styles.track} />

        <Animated.View
          style={[
            styles.barbell,
            {
              transform: [{ translateY: rise }, { rotate: lift }],
            },
          ]}
        >
          <View style={styles.sideStack}>
            <View style={[styles.plate, styles.outerPlate]} />
            <View style={[styles.plate, styles.innerPlate]} />
          </View>

          <View style={styles.bar}>
            <View style={styles.knurl} />
          </View>

          <View style={styles.sideStack}>
            <View style={[styles.plate, styles.innerPlate]} />
            <View style={[styles.plate, styles.outerPlate]} />
          </View>
        </Animated.View>
      </View>

      <Paragraph style={styles.label}>Racking your next set...</Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  loaderStage: {
    width: 140,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  halo: {
    position: "absolute",
    width: 112,
    height: 112,
    borderRadius: 999,
    backgroundColor: colors.red900,
    opacity: 0.35,
  },
  track: {
    position: "absolute",
    width: 122,
    height: 122,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.gray600,
    backgroundColor: colors.gray700,
  },
  barbell: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    zIndex: 2,
  },
  sideStack: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  plate: {
    backgroundColor: colors.red500,
    borderRadius: 4,
  },
  outerPlate: {
    width: 8,
    height: 32,
  },
  innerPlate: {
    width: 10,
    height: 24,
    backgroundColor: colors.white,
  },
  bar: {
    width: 54,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.white,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  knurl: {
    height: 2,
    borderRadius: 999,
    backgroundColor: colors.gray500,
  },
  label: {
    color: colors.gray400,
    textAlign: "center",
  },
});