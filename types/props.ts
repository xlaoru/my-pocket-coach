import { Ionicons } from '@expo/vector-icons'
import { ComponentProps, ReactNode } from 'react'
import { PressableProps, StyleProp, TextStyle } from 'react-native'
import { IProgram } from './models'

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
  total: number
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
