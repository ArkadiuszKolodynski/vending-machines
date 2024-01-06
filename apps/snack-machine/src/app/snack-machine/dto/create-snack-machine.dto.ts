import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateSnackMachineDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID('4')
  readonly id!: string;
}
