import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../database/database.module';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { SnackMachine } from './snack-machine';
import { SnackMachineController } from './snack-machine.controller';
import { SnackMachineRepository } from './snack-machine.repository.interface';

@Module({
  imports: [DatabaseModule, CqrsModule],
  controllers: [SnackMachineController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: SnackMachine,
      useFactory: async (snackMachineRepository: SnackMachineRepository) => await snackMachineRepository.findOne(),
      inject: [SnackMachineRepository],
    },
  ],
})
export class SnackMachineModule {}
