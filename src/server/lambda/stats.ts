import { ApolloServer, gql, IResolvers } from 'apollo-server-lambda';
import { getSummonerInfo, getMatchesByAccount } from '../api/stats';

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

  input MatchOptions {
    champion: Int
    queue: Int
    season: Int
    endIndex: Int
    beginIndex: Int
    endTime: String
    beginTime: String
  }

  type Match {
    platformId: String
    gameId: String
    champion: Int
    queue: Int
    season: Int
    timestamp: String
    role: String
    lane: String
  }

  type Matches {
    matches: [Match]
  }

  type Query {
    summonerInfo(nickname: String!): Summoner!
    matchesInfo(accountId: String!, params: MatchOptions): Matches!
  }
`;

const resolvers: IResolvers = {
  Query: {
    summonerInfo: async (_, args) => {
      return await getSummonerInfo(args.nickname);
    },
    matchesInfo: async (_, args) => {
      return await getMatchesByAccount(args.accountId, args.params);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.handler = server.createHandler();
