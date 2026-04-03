import { Ionicons } from '@expo/vector-icons'
import { ComponentProps, ReactNode } from 'react'
import { StyleProp, TextStyle } from 'react-native'

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
