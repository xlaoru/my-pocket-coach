import { ISet } from "@/types/models";

export interface IExerciseDto {
  _id: string
  name: string
  sets: ISet[]
}

export interface ICreateExercisePayload {
  name: string;
  sets: ISet[]
}

export interface IEditExerciseNamePayload {
  name: string;
}