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
  workout: IWorkoutItem[]
  date: Date
}

export interface IStage {
  _id: string
  name: string
  description?: string
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
