import env from 'Middleware/dotenv';
import auth from 'Middleware/auth';
import setVerboseMode from 'Utils/setVerboseMode';
import parseAndAuthenticate from 'Utils/parseAndAuthenticate/index';

import { log } from 'Utils/console';
import invalidSchemeError from './errors/invalidScheme';
import badRequestError from './errors/badRequest';
import invalidAuthError from './errors/invalidAuth';
import serverError from './errors/serverError';

import slashHandler from './slash';
import interactivityHandler from './interactivity';
import bridgeHandler from './bridge';
import testHandler from './test';

const endpointHandlers = {
  slash: slashHandler,
  interactivity: interactivityHandler,
  bridge: bridgeHandler,
  test: testHandler,
};

export default async (request, context, callback) => {
  setVerboseMode(process.env.TESTING !== 'true');
  await env();
  await auth();

  let event;
  try {
    event = parseAndAuthenticate(request);
  } catch (e) {
    const eResp = badRequestError(e);
    log(`Response /  Error  /  ${eResp[1].statusCode}  /  ${JSON.parse(eResp[1].body).error}\n`);
    callback(...eResp);
    return;
  }

  if (event === false) {
    const eResp = invalidAuthError();
    log(`Response /  Error  /  ${eResp[1].statusCode}  /  ${JSON.parse(eResp[1].body).error}\n`);
    callback(...eResp);
    return;
  }

  let responseBody = '';
  let endpointName;

  if (request.path) {
    const urlParts = request.path.split('/').filter((p) => !!p);

    [endpointName] = urlParts;
  } else if (Object.hasOwnProperty.call(event, 'endpoint')) {
    endpointName = event.endpoint;
  }

  if (!endpointName || !(endpointName in endpointHandlers)) {
    const eResp = invalidSchemeError(endpointName);
    log(`Response /  Error  /  ${eResp[1].statusCode}  /  ${JSON.parse(eResp[1].body).error}\n`);
    callback(...eResp);
    return;
  }

  try {
    const endpointHandler = endpointHandlers[endpointName];
    const response = await endpointHandler(request, event);

    if (typeof response === 'object') {
      responseBody = JSON.stringify(response);
    } else if (typeof response === 'string') {
      responseBody = response;
    }

    log(`Response /  Success  /  200  /  ${responseBody}`);
    callback(null, {
      statusCode: 200,
      body: responseBody,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.error(e);
    const eResp = serverError();
    log(`Response /  Error  /  ${eResp[1].statusCode}  /  ${JSON.parse(eResp[1].body).error}\n`);
    callback(...eResp);
  }
};
