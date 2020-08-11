import { ResolverMap } from 'types';
import { Ping } from './ping.entity';

const Resolvers: ResolverMap = {
  Query: {
    ping: async (_, __, { ip }): Promise<string> => {
      const ping = new Ping(ip);
      await ping.save();
      return 'pong';
    },
  },
};

export default Resolvers;
