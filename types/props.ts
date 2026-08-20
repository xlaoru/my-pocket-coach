import { Ionicons } from '@expo/vector-icons'
import { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react'
import { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native'
import {
  IExercise,
  IPeriodization,
  IProgram,
  ISet,
  IStage,
  ITemplate,
  ITemplateExercise,
  ITemplateWorkoutItem,
  IWorkoutItem,
} from './models'

type TIoniconName = ComponentProps<typeof Ionicons>['name']

export interface IHeadingProps {
  children: ReactNode
  style?: StyleProp<TextStyle>
  isEditable?: boolean
  onChangeText?: (text: string) => void
  onBlur?: VoidFunction
}

export interface IHeadingLabelProps {
  children: ReactNode
  style?: StyleProp<TextStyle>
}

export interface IParagraphProps {
  children: ReactNode
  style?: StyleProp<TextStyle>
  isEditable?: boolean
  autoFocus?: boolean
  onChangeText?: (text: string) => void
  onBlur?: VoidFunction
}

export interface IEntityEmptyStateProps {
  iconName: TIoniconName
  title: string
  message: string
  wrapperStyle?: StyleProp<ViewStyle>
}

export interface IProgramListProps {
  programs: IProgram[]
  onDeleteProgram: (programId: string) => Promise<void>
}

export interface IProgramListItemsProps {
  programId: string
  title: string
  description?: string
  exercises: number
  supersets: number
  onPress: VoidFunction
  onDeleteProgram: (programId: string) => Promise<void>
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
  variant?: 'primary' | 'secondary' | 'outlined' | 'dashed' | 'text'
  iconName?: TIoniconName
  onPress: VoidFunction
  style?: PressableProps['style']
  iconSize?: number
}

export interface IPeriodizationListProps {
  periodizations: IPeriodization[]
  onDeletePeriodization: (periodizationId: string) => Promise<void>
}

export interface IPeriodizationListItemProps {
  periodizationId: string
  title: string
  description?: string
  stages: number
  onPress: VoidFunction
  onDeletePeriodization: (periodizationId: string) => Promise<void>
}

export interface IBottomSheetFormProps {
  isOpen: boolean
  children: ReactNode
  title: string
  onSubmit: VoidFunction
  onClose: VoidFunction
  isWithoutSubmition?: boolean
}

export interface IInputProps {
  label?: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  style?: StyleProp<ViewStyle>
  secureTextEntry?: boolean
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  keyboardType?: 'default' | 'email-address'
  onBlur?: VoidFunction
}

export interface IAttachPeriodizationButtonProps {
  isAttaced: boolean
  value: string | null
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
  onSetExerciseNote: (exerciseId: string, newNote: string) => Promise<void>
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
  outsideSupersetExercises: IWorkoutItem[]
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
  onUnlinkExercise: (supersetId: string, exerciseId: string) => Promise<void>
  onUnlinkAllExercises: (supersetId: string) => Promise<void>
  onCreateNewExercise: (supersetId: string, newName: string) => Promise<void>
  onLinkExercise: (supersetId: string, exerciseId: string) => Promise<void>
  onSetExerciseNote: (exerciseId: string, newNote: string) => Promise<void>
  onSetSupersetNote: (supersetId: string, newNote: string) => Promise<void>
}

export interface ISubExerciseTabelProps {
  supersetId: string
  exercise: IExercise
  onDrag: () => void
  onExerciseNameChange: (exerciseId: string, name: string) => Promise<void>
  onAddExerciseSet: (exerciseId: string) => Promise<void>
  onEditExerciseSet: (exerciseId: string, setIndex: number, set: ISet) => Promise<void>
  onDeleteExerciseSet: (exerciseId: string, setIndex: number) => Promise<void>
  onDeleteExercise: (exerciseId: string) => Promise<void>
  onUnlinkExercise: (supersetId: string, exerciseId: string) => Promise<void>
  onSetExerciseNote: (exerciseId: string, newNote: string) => Promise<void>
}

export interface ISubExerciseTabelRowProps {
  exerciseId: string
  index: number
  set: ISet
  onEditExerciseSet: (exerciseId: string, setIndex: number, set: ISet) => Promise<void>
  onDeleteExerciseSet: (exerciseId: string, setIndex: number) => Promise<void>
}

export interface IStageFormProps {
  stageName: string
  setStageName: Dispatch<SetStateAction<string>>
  stageDescription: string
  setStageDescription: Dispatch<SetStateAction<string>>
}

export interface IStageCardProps {
  index: number
  stage: IStage
  onDrag: () => void
  onDeleteStage: (stageId: string) => Promise<void>
  onEditStageName: (stageId: string, name: string) => Promise<void>
  onEditStageDescription: (stageId: string, description: string) => Promise<void>
}

export interface IAttachPeriodizationFormProps {
  isStagePicking: boolean
  setStagePicking: Dispatch<SetStateAction<boolean>>
  pickedPeriodization: IPeriodization | null
  setPickedPeriodization: Dispatch<SetStateAction<IPeriodization | null>>
  periodizations: IPeriodization[]
  onLinkStage: (periodizationId: string, stageId: string) => Promise<void>
  setAttachPeriodizationMode: (value: boolean) => void
}

export interface IPeriodizationCardProps {
  periodization: IPeriodization
  setStagePicking: Dispatch<SetStateAction<boolean>>
  setPickedPeriodization: Dispatch<SetStateAction<IPeriodization | null>>
}

export interface IAttachStageCardProps {
  index: number
  periodizationId: string
  stage: IStage
  onLinkStage: (periodizationId: string, stageId: string) => Promise<void>
  setAttachPeriodizationMode: (value: boolean) => void
  setStagePicking: Dispatch<SetStateAction<boolean>>
  setPickedPeriodization: Dispatch<SetStateAction<IPeriodization | null>>
}

export interface ITemplateListProps {
  templates: ITemplate[]
  onDeleteTemplate: (templateId: string) => Promise<void>
}

export interface ITemplateListItemProps {
  templateId: string
  title: string
  description: string
  exercises: number
  supersets: number
  onPress: VoidFunction
  onDeleteTemplate: (templateId: string) => Promise<void>
}

export interface ITemplateExerciseTableProps {
  index: number
  exercise: ITemplateExercise
  templateWorkoutItemId: string
  onDrag: VoidFunction
  onExerciseNameChange: (exerciseId: string, name: string) => Promise<void>
  onExerciseSetChange: (exerciseId: string, set: number) => Promise<void>
  onDeleteExercise: (exerciseId: string) => Promise<void>
  isSupersetCombiningMode: boolean
  selectedExercises: string[]
  setSelectedExercises: Dispatch<SetStateAction<string[]>>
  setSelectedExercisesData: Dispatch<SetStateAction<ITemplateExercise[]>>
}

export interface ITemplateSupersetTableProps {
  index: number
  superset: ITemplateWorkoutItem
  templateWorkoutItemId: string
  outsideSupersetExercises: ITemplateWorkoutItem[]
  onDrag: VoidFunction
  onSupersetNameChange: (supersetId: string, name: string) => Promise<void>
  onDeleteSuperset: (supersetId: string) => Promise<void>
  onExerciseNameChange: (exerciseId: string, name: string) => Promise<void>
  onExerciseSetChange: (exerciseId: string, sets: number) => Promise<void>
  onDeleteExercise: (exerciseId: string) => Promise<void>
  onMoveExercise: (
    containerId: string,
    sourceIndex: number,
    destinationIndex: number,
  ) => Promise<void>
  onUnlinkExercise: (supersetId: string, exerciseId: string) => Promise<void>
  onUnlinkAllExercises: (supersetId: string) => Promise<void>
  onCreateNewExercise: (supersetId: string, newName: string) => Promise<void>
  onLinkExercise: (supersetId: string, exerciseId: string) => Promise<void>
}

export interface ISubTemplateExerciseTableProps {
  supersetId: string
  exercise: ITemplateExercise
  onDrag: VoidFunction
  onExerciseNameChange: (exerciseId: string, name: string) => Promise<void>
  onExerciseSetChange: (exerciseId: string, sets: number) => Promise<void>
  onDeleteExercise: (exerciseId: string) => Promise<void>
  onUnlinkExercise: (supersetId: string, exerciseId: string) => Promise<void>
}

export interface ITemplateExerciseFormProps {
  exerciseName: string
  setExerciseName: (name: string) => void
  exerciseSets: number
  setExerciseSets: (sets: number) => void
}

export interface ITemplateSupersetFormProps {
  supersetName: string
  setSupersetName: Dispatch<SetStateAction<string>>
  selectedExercisesData: ITemplateExercise[]
}

export interface IGenerateProgramByTemplateFormProps {
  templates: ITemplate[]
  onGenerateProgramByTemplate: (templateId: string) => Promise<void>
}

export interface ITemplateCardProps {
  template: ITemplate
  onGenerateProgramByTemplate: (templateId: string) => Promise<void>
}
