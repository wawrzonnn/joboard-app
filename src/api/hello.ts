import { NextRouteHandler } from 'next/types';

const helloHandler: NextRouteHandler = async (req, res) => {
  console.log('hello');
  res.status(200).send('Check your server console.');
};

export default helloHandler;