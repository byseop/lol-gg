import { ApolloServer, gql, IResolvers } from 'apollo-server-lambda';
import { getVersions, getChamps } from '../api/data';

const typeDefs = gql`
  type Stat {
    hp: Float
    hpperlevel: Float
    mp: Float
    mpperlevel: Float
    movespeed: Float
    armor: Float
    armorperlevel: Float
    spellblock: Float
    spellblockperlevel: Float
    attackrange: Float
    hpregen: Float
    hpregenperlevel: Float
    mpregen: Float
    mpregenperlevel: Float
    crit: Float
    critperlevel: Float
    attackdamage: Float
    attackdamageperlevel: Float
    attackspeedperlevel: Float
    attackspeed: Float
  }
  type Image {
    full: String
    sprite: String
    group: String
    x: Int
    y: Int
    w: Int
    h: Int
  }
  type Champion {
    version: String
    id: ID
    key: String
    name: String
    title: String
    blurb: String
    image: Image
    tags: [String]
    partype: String
    stats: Stat
  }
  type GameData {
    version: String
    champs: [Champion]
  }
  type Query {
    gameData: GameData
  }
`;

const resolvers: IResolvers = {
  Query: {
    gameData: async () => {
      try {
        const version = await getVersions();
        const champs = await getChamps(version as string);
        return {
          version,
          champs
        };
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
