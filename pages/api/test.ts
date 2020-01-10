import { Photon } from '@prisma/photon';

const photon = new Photon();

export default async (req, res) => {
  photon.users.create({
    data: { email: 'test@example.com' },
  });

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ name: 'John Doe' }));
};
