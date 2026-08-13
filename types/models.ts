export interface ISet {
  weight: number
  reps: number
}

export interface IExercise {
  _id: string
  name: string
  sets: ISet[]
}

export interface IWorkoutItem {
  _id: string
  name: string
  type: 'exercise' | 'superset'
  components: IExercise[]
}

export interface IProgram {
  _id: string
  name: string
  description?: string
  periodizationStage: IStage
  workout: IWorkoutItem[]
  date: Date
}

export interface IStage {
  _id: string
  name: string
  description?: string
  periodizationId?: {
    _id: string
    name: string
  }
}

export interface IPeriodization {
  _id: string
  name: string
  description?: string
  stages: IStage[]
}

export interface ISuperset {
  _id: string
  name: string
  type: 'superset'
  components: IExercise[]
}

export interface ITemplate {
  _id: string
  name: string
  description?: string
  templateWorkout: ITemplateWorkoutItem[]
}

export interface ITemplateWorkoutItem {
  _id: string
  type: 'exercise' | 'superset'
  name: string
  components: ITemplateExercise[]
}

export interface ITemplateExercise {
  _id: string
  name: string
  sets: number
}

export interface ITemplateSuperset {
  _id: string
  type: 'superset'
  name: string
  components: ITemplateExercise[]
}
