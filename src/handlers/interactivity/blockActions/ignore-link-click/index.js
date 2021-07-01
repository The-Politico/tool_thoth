const ignore = async function ignore() {
  /* Unfortunately, slack sends a payload even if the button is
   * just supposed to be a link. So this handler is here to ignore those
   * payloads
   */

  return true;
};

export default {
  handler: ignore,
};
