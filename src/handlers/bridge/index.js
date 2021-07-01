import { log } from 'Utils/console';
import htUpdate from './ht-update';

const commandHandlers = {
  [htUpdate.command]: htUpdate.handler,
};

const bridgeHandler = function bridgeHandler(request, event) {
  const commandHandler = commandHandlers[event.command];

  if (!commandHandler) {
    log('No bridge command handler: ', event.command);
    return false;
  }

  return commandHandler(event);
};

export default bridgeHandler;
