import { Ionicons } from '@expo/vector-icons'
import { ComponentProps, ReactNode } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import { IProgram } from './models'

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
  iconName: ComponentProps<typeof Ionicons>['name']
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
  iconName: ComponentProps<typeof Ionicons>['name']
  onPress: VoidFunction
}
