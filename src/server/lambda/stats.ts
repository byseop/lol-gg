import { ApolloServer, gql, IResolvers } from 'apollo-server-lambda';
import { getSummonerInfo } from '../api/stats';

const typeDefs = gql`
  type Summoner {
    id: String!
    accountId: String!
    puuid: String!
    name: String!
    profileIconId: Int!
    revisionDate: Int!
    summonerLevel: Int!
  }

  type Query {
    summonerInfo(nickname: String!): Summoner!
  }
`;

const resolvers: IResolvers = {
  Query: {
    summonerInfo: async (_, args) => {
      return await getSummonerInfo(args.nickname);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.handler = server.createHandler();
