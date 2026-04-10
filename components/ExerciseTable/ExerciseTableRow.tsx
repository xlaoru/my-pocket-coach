import { StyleSheet, View } from "react-native";
import React from "react";
import { IExerciseTableRowProps } from "@/types/props";
import IconButton from "../IconButton/IconButton";
import Title from "../Title/Title";
import { colors } from "@/styles/colors";

export default function ExerciseTableRow({ index, set }: IExerciseTableRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.dataCell}>
        <Title style={[styles.title, styles.indexTitle]}>{index + 1}</Title>
      </View>
      <View style={styles.dataCell}>
        <Title style={styles.title}>{set.weight}</Title>
      </View>
      <View style={styles.dataCell}>
        <Title style={styles.title}>{set.reps}</Title>
      </View>
      <View style={styles.actionCell}>
        <IconButton iconName="remove-circle-outline" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingLeft: 0,
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.gray500,
  },
  dataCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
  },
  indexTitle: {
    color: colors.red500
  },
  actionCell: {
    width: 22,
    alignItems: "center",
  }
});
