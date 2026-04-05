import { Ionicons } from '@expo/vector-icons'
import { ComponentProps, ReactNode } from 'react'
import { PressableProps, StyleProp, TextStyle } from 'react-native'
import { IPeriodization, IProgram } from './models'

type TIoniconName = ComponentProps<typeof Ionicons>['name']

export interface IHeadingProps {
  children: ReactNode
  style?: StyleProp<TextStyle>
}

export interface IHeadingLabelProps {
  children: ReactNode
  style?: StyleProp<TextStyle>
}

export interface IParagraphProps {
  children: ReactNode
  style?: StyleProp<TextStyle>
}

export interface IEntityEmptyStateProps {
  iconName: TIoniconName
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
}

export interface IIconButtonProps {
  iconName: TIoniconName
  onPress: VoidFunction
}

export interface IButtonProps {
  children: ReactNode
  iconName: TIoniconName
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
