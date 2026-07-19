import { Ionicons } from '@expo/vector-icons'
import { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import { PressableProps, StyleProp, TextStyle } from 'react-native'
import { IExercise, IPeriodization, IProgram, ISet, IWorkoutItem } from './models'

type TIoniconName = ComponentProps<typeof Ionicons>['name']

export interface IHeadingProps {
  children: ReactNode
  style?: StyleProp<TextStyle>
  isEditable?: boolean
}

export interface IHeadingLabelProps {
  children: ReactNode
  style?: StyleProp<TextStyle>
}

export interface IParagraphProps {
  children: ReactNode
  style?: StyleProp<TextStyle>
  isEditable?: boolean
}

export interface IEntityEmptyStateProps {
  iconName: TIoniconName
  title: string
  message: string
}

export interface IProgramListProps {
  programs: IProgram[]
}

export interface IProgramListItemsProps {
  title: string
  description?: string
  exercises: number
  supersets: number
  onPress: VoidFunction
}

export interface ITitleProps {
  children: ReactNode
  style?: StyleProp<TextStyle>
  isEditable?: boolean
  onChangeText?: (text: string) => void
  onBlur?: VoidFunction
  onSubmitEditing?: VoidFunction
}

export interface IIconButtonProps {
  iconName: TIoniconName
  onPress: VoidFunction
}

export interface IButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outlined' | 'dashed'
  iconName?: TIoniconName
  onPress: VoidFunction
  style?: PressableProps['style']
}

export interface IPeriodizationListProps {
  periodizations: IPeriodization[]
}

export interface IPeriodizationListItemProps {
  title: string
  description?: string
  stages: number
  onPress: VoidFunction
}

export interface IBottomSheetFormProps {
  isOpen: boolean
  children: ReactNode
  title: string
  onSubmit: VoidFunction
  onClose: VoidFunction
}

export interface IInputProps {
  label: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
}

export interface IAttachPeriodizationButtonProps {
  onPress: VoidFunction
}

export interface IExerciseFormProps {
  exerciseName: string
  setExerciseName: (name: string) => void
  sets: ISet[]
  onSetChange: (index: number, field: 'weight' | 'reps', value: string) => void
  onAddSet: VoidFunction
  onRemoveSet: (index: number) => void
}

export interface IExerciseFormRowProps {
  index: number
  set: ISet
  onChange: (index: number, field: 'weight' | 'reps', value: string) => void
  onRemove: (index: number) => void
}

export interface IExerciseFormRowInputProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
}

export interface IAddSetOutlineButtonProps {
  onPress: VoidFunction
}

export interface IExerciseTableProps {
  index: number
  exercise: IExercise
  workoutItemId: string
  onDrag: () => void
  onExerciseNameChange: (exerciseId: string, name: string) => Promise<void>
  onAddExerciseSet: (exerciseId: string) => Promise<void>
  onEditExerciseSet: (exerciseId: string, setIndex: number, set: ISet) => Promise<void>
  onDeleteExerciseSet: (exerciseId: string, setIndex: number) => Promise<void>
  onDeleteExercise: (exerciseId: string) => Promise<void>
  isSupersetCombiningMode: boolean
  selectedExercises: string[]
  setSelectedExercises: Dispatch<SetStateAction<string[]>>
  setSelectedExercisesData: Dispatch<SetStateAction<IExercise[]>>
}

export interface IExerciseTableRowProps {
  exerciseId: string
  index: number
  set: ISet
  onEditExerciseSet: (exerciseId: string, setIndex: number, set: ISet) => Promise<void>
  onDeleteExerciseSet: (exerciseId: string, setIndex: number) => Promise<void>
}

export interface ICheckboxProps {
  isSelected: boolean
  toggleSelect: () => void
}

export interface ISupersetFormProps {
  supersetName: string
  setSupersetName: Dispatch<SetStateAction<string>>
  selectedExercisesData: IExercise[]
}

export interface ISupersetTableProps {
  index: number
  superset: IWorkoutItem
  workoutItemId: string
  onDrag: () => void
  onSupersetNameChange: (supersetId: string, name: string) => Promise<void>
  onDeleteSuperset: (supersetId: string) => Promise<void>
  onExerciseNameChange: (exerciseId: string, name: string) => Promise<void>
  onAddExerciseSet: (exerciseId: string) => Promise<void>
  onEditExerciseSet: (exerciseId: string, setIndex: number, set: ISet) => Promise<void>
  onDeleteExerciseSet: (exerciseId: string, setIndex: number) => Promise<void>
  onDeleteExercise: (exerciseId: string) => Promise<void>
  onMoveExercise: (
    containerId: string,
    sourceIndex: number,
    destinationIndex: number,
  ) => Promise<void>
}

export interface ISubExerciseTabelProps {
  exercise: IExercise
  onDrag: () => void
  onExerciseNameChange: (exerciseId: string, name: string) => Promise<void>
  onAddExerciseSet: (exerciseId: string) => Promise<void>
  onEditExerciseSet: (exerciseId: string, setIndex: number, set: ISet) => Promise<void>
  onDeleteExerciseSet: (exerciseId: string, setIndex: number) => Promise<void>
  onDeleteExercise: (exerciseId: string) => Promise<void>
}

export interface ISubExerciseTabelRowProps {
  exerciseId: string
  index: number
  set: ISet
  onEditExerciseSet: (exerciseId: string, setIndex: number, set: ISet) => Promise<void>
  onDeleteExerciseSet: (exerciseId: string, setIndex: number) => Promise<void>
}
