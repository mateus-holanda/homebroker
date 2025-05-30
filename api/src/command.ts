import { CommandFactory } from 'nest-commander';
import { CommandModule } from './command.module';

async function bootstrap() {
  await CommandFactory.run(CommandModule, ['warn', 'error', 'log']);
}

bootstrap().catch((e) => {
  console.log('Error executing command module: ', e);
});
