const { OAuth2Client } = require('google-auth-library');

export const getDecodedGoogleJWT = async (token) => {
  const CLIENT_ID_GOOGLE =
    '1056175725104-vg3onfaha901bd9t083dl2jhmfn7u1bh.apps.googleusercontent.com';

  try {
    const client = new OAuth2Client(CLIENT_ID_GOOGLE);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID_GOOGLE,
    });

    return ticket;
  } catch (error) {
    return { status: 500, data: error };
  }
};
