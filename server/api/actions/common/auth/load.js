import authentication from 'server-utils/common/authentication';

export default async function load(req) {
  let user = await authentication(req);
  if (user) {
    return {
      user: {
        id: user.id,
        name: user.name,
        uname: user.uname,
        email: user.email,
        emailVerified: user.emailVerified,
        admin: user.admin,
      },
    };
  }
  return { user: null };
}
