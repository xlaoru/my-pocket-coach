import { colors } from "@/styles/colors";
import { IExerciseTableRowProps } from "@/types/props";
import { parseNumericInput } from "@/utils/parseNumericInput";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../IconButton/IconButton";
import Title from "../Title/Title";

export default function ExerciseTableRow({ exerciseId, index, set, onEditExerciseSet, onDeleteExerciseSet, isDeleteExerciseDisabled, isSupersetCombiningMode, isMoveDisabled }: IExerciseTableRowProps) {
  const [exerciseSet, setExerciseSet] = useState({ weight: String(set.weight), reps: String(set.reps) })

  const [isSetDisabled, setSetDisabled] = useState(false)

  useEffect(() => {
    setExerciseSet({ weight: String(set.weight), reps: String(set.reps) })
  }, [set])

  const handleSetBlur = useCallback(async () => {
    const weight = parseNumericInput(exerciseSet.weight, set.weight)
    const reps = parseNumericInput(exerciseSet.reps, set.reps)

    setExerciseSet({ weight: String(weight), reps: String(reps) })

    if (weight === set.weight && reps === set.reps) return

    setSetDisabled(true)

    await onEditExerciseSet(exerciseId, index, { weight, reps }).finally(() => {
      setSetDisabled(false)
    })
  }, [exerciseSet, exerciseId, index, set, onEditExerciseSet])

  const handleDeleteExerciseSet = useCallback(async () => {
    setSetDisabled(true)

    await onDeleteExerciseSet(exerciseId, index).finally(() => {
      setSetDisabled(false)
    })
  }, [exerciseId, index, onDeleteExerciseSet])

  return (
    <View style={styles.container}>
      <View style={styles.dataCell}>
        <Title style={[styles.title, styles.indexTitle]}>{index + 1}</Title>
      </View>
      <View style={styles.dataCell}>
        <Title keyboardType="decimal-pad" disabled={isMoveDisabled || isDeleteExerciseDisabled || isSupersetCombiningMode || isSetDisabled} isEditable style={[styles.title, styles.editableTitle]} onChangeText={(text) => setExerciseSet({ ...exerciseSet, weight: text })} onBlur={handleSetBlur}>{exerciseSet.weight}</Title>
      </View>
      <View style={styles.dataCell}>
        <Title keyboardType="decimal-pad" disabled={isMoveDisabled || isDeleteExerciseDisabled || isSupersetCombiningMode || isSetDisabled} isEditable style={[styles.title, styles.editableTitle]} onChangeText={(text) => setExerciseSet({ ...exerciseSet, reps: text })} onBlur={handleSetBlur}>{exerciseSet.reps}</Title>
      </View>
      <View style={styles.actionCell}>
        <IconButton disabled={isMoveDisabled || isDeleteExerciseDisabled || isSupersetCombiningMode || isSetDisabled} iconName="remove-circle-outline" onPress={handleDeleteExerciseSet} />
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
  editableTitle: {
    alignSelf: "stretch",
  },
  indexTitle: {
    color: colors.red500
  },
  actionCell: {
    width: 22,
    alignItems: "center",
  }
});
