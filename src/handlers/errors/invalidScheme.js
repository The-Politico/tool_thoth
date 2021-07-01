export default function invalidScheme(service) {
  return [
    null,
    {
      statusCode: 404,
      body: JSON.stringify({
        error: 'InvalidSchemeError',
        message: `${service} is not a valid authentication scheme. Use one of [slash, interactivity, bridge, test].`,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    },
  ];
}
