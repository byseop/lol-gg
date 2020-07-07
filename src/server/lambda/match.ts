import { ApolloServer, IResolvers } from 'apollo-server-lambda';
import { getMatchData } from '../api/match';
import typeDefs from './matchSchema';

const resolvers: IResolvers = {
  Query: {
    matchData: async (_, args) => {
      try {
        const matchData = await getMatchData(args.gameId);
        return matchData;
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.handler = server.createHandler();
