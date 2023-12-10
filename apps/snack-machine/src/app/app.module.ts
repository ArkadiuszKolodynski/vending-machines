import { Global, Module, Provider } from '@nestjs/common';
import { APP_NAME_TOKEN, InvalidOperationExceptionFilterProvider, ValidationProvider } from '@vending-machines/shared';
import { DatabaseModule } from './database/database.module';
import { SnackMachineModule } from './snack-machine/snack-machine.module';

const AppNameProvider: Provider = { provide: APP_NAME_TOKEN, useValue: 'SnackMachine' };

@Global()
@Module({
  imports: [DatabaseModule, SnackMachineModule],
  providers: [AppNameProvider, ValidationProvider, InvalidOperationExceptionFilterProvider],
  exports: [AppNameProvider],
})
export class AppModule {}
