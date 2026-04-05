export interface ISet {
  weight: number
  reps: number
}

export interface IExercise {
  id: string
  name: string
  sets: ISet[]
}

export interface ISuperset {
  id: string
  name: string
  exercises: IExercise[]
}

export type TWorkout = (IExercise | ISuperset)[]

export interface IProgram {
  id: string
  name: string
  description?: string
  workout: TWorkout
  date: Date
}

export interface IStage {
  id: string
  name: string
  description?: string
}

export interface IPeriodization {
  id: string
  name: string
  description?: string
  stages: IStage[]
}
