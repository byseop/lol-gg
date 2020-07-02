import { ApolloServer, gql, IResolvers } from 'apollo-server-lambda';
import { getSummonerInfo, getMatchesByAccount } from '../api/stats';
import { SummonerInfoTypes } from '../api/stats/types';

const typeDefs = gql`
  type Summoner {
    id: ID!
    accountId: ID!
    puuid: ID!
    name: String!
    profileIconId: ID!
    revisionDate: Float!
    summonerLevel: Int!
  }

  input MatchOptions {
    champion: Int
    queue: Int
    season: Int
    endIndex: Int
    beginIndex: Int
    endTime: Float
    beginTime: Float
  }

  type Match {
    platformId: ID
    gameId: ID
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

  type SummonerData {
    summonerInfo: Summoner!
    matchesInfo: Matches
  }

  type Query {
    summonerData(nickname: String!, params: MatchOptions): SummonerData
  }
`;

const resolvers: IResolvers = {
  Query: {
    summonerData: async (_, args) => {
      try {
        const summoner = await getSummonerInfo(args.nickname);
        const match = await getMatchesByAccount(
          (summoner as SummonerInfoTypes).accountId,
          args.params
        );
        return {
          summonerInfo: summoner,
          matchesInfo: match
        };
      } catch (e) {
        console.error(e);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.handler = server.createHandler();
