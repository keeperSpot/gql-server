const Resolvers = {
  Query: {
    ping: function (): string {
      return 'pong';
    },
  },
};

export default Resolvers;
