import loginUser from '../auth/private/login';

import create from './create';
import usersAllowedAttributes from './private/usersAllowedAttributes';

import reqSecure from 'server-utils/common/reqSecure';

export default async function signUp(req) {
  reqSecure(req, usersAllowedAttributes);
  const { newUser } = await create(req);
  const sessionKey = await loginUser(newUser);
  return { ...newUser, session: sessionKey };
}
