import { IStage } from '@/types/models'
import { IStageDto } from '../types/stage.dto'

export function mapStageDtoToModel(dto: IStageDto): IStage {
  return {
    _id: dto._id,
    name: dto.name,
    description: dto.description,
  }
}
