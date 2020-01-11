import { Photon } from '@prisma/photon';

const photon = new Photon();

export default async (req, res) => {
  const users = await photon.users.findMany();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users));
};
