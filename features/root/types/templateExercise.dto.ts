export interface ITemplateExerciseDto {
  _id: string
  name: string
  sets: number
}

export interface ICreateTemplateExercisePayload {
  name: string
  sets: number
}

export interface IEditTemplateExerciseNamePayload {
  name: string
}

export interface IEditTemplateExerciseSetsPayload {
  sets: number
}

export interface IMoveTemplateExercisePayload {
  containerId: string
  sourceIndex: number
  destinationIndex: number
}
