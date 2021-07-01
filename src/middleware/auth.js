import { auth as authGootenberg } from 'Utils/gootenberg';

const auth = async function auth() {
  await authGootenberg();
};

export default auth;
