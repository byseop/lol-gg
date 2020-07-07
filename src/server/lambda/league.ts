import { ApolloServer, gql, IResolvers } from 'apollo-server-lambda';
import { getLeagueDatas } from '../api/league';

const typeDefs = gql`
  type League {
    leagueId: String
    queueType: String
    tier: String
    rank: String
    summonerId: String
    summonerName: String
    leaguePoints: Int
    wins: Int
    losses: Int
    veteran: Boolean
    inactive: Boolean
    freshBlood: Boolean
    hotStreak: Boolean
  }

  type Query {
    league(encryptedSummonerId: String!): [League]
  }
`;

const resolvers: IResolvers = {
  Query: {
    league: async (_, args) => {
      try {
        const league = await getLeagueDatas(args.encryptedSummonerId);
        return league;
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
