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
    summonerData: async(_, args) => {
      const summoner = await getSummonerInfo(args.nickname);
      try {
        const match = await getMatchesByAccount(summoner.accountId, args.params);
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
