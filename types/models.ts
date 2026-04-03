export interface ISet {
  weight: number
  reps: number
}

export interface IExercise {
  name: string
  sets: ISet[]
}

export interface ISuperset {
  name: string
  exercises: IExercise[]
}

export interface IProgram {
  name: string
  description?: string
  workout: (IExercise | ISuperset)[]
  date: Date
}

export interface IStage {
  name: string
  description?: string
}

export interface IPeriodization {
  name: string
  description?: string
  stages: IStage[]
}
