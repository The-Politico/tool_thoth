import { log } from 'Utils/console';
import htCreate from './ht-create';
import htEdit from './ht-edit';
import htList from './ht-list';

const commandHandlers = {
  [htCreate.command]: htCreate.handler,
  [htEdit.command]: htEdit.handler,
  [htList.command]: htList.handler,

};

const slashHandler = function slashHandler(request, event) {
  const commandHandler = commandHandlers[event.command];

  if (!commandHandler) {
    log('No slash command handler: ', event.command);
    return false;
  }

  return commandHandler(event);
};

export default slashHandler;
