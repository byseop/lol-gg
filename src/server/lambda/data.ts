import { ApolloServer, gql, IResolvers } from 'apollo-server-lambda';
import { getVersions, getChamps } from '../api/data';

const typeDefs = gql`
  type Stat {
    hp: Int
    hpperlevel: Int
    mp: Int
    mpperlevel: Int
    movespeed: Int
    armor: Int
    armorperlevel: Int
    spellblock: Int
    spellblockperlevel: Int
    attackrange: Int
    hpregen: Int
    hpregenperlevel: Int
    mpregen: Int
    mpregenperlevel: Int
    crit: Int
    critperlevel: Int
    attackdamage: Int
    attackdamageperlevel: Int
    attackspeedperlevel: Int
    attackspeed: Int
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
    id: String
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
      const version = await getVersions();
      try {
        if (!version) {
          throw new Error('Error found at getVersions');
        }
        const champs = await getChamps(version);
        try {
          if (!champs) {
            throw new Error('Error found at getChamps');
          }
          return {
            version,
            champs
          };
        } catch (e) {
          throw new Error(e);
        }
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
