import { Photon } from '@prisma/photon';

const photon = new Photon();

export default async (req, res) => {
  const user = await photon.users.create({ data: { email: 'matt@example.com' } });

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(user));
};
