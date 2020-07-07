import { gql } from 'apollo-boost'

const typeDefs = gql`
  scalar DiffPerMin
  type Timeline {
    participantId:               Int
    creepsPerMinDeltas:          DiffPerMin
    xpPerMinDeltas:              DiffPerMin
    goldPerMinDeltas:            DiffPerMin
    csDiffPerMinDeltas:          DiffPerMin
    xpDiffPerMinDeltas:          DiffPerMin
    damageTakenPerMinDeltas:     DiffPerMin
    damageTakenDiffPerMinDeltas: DiffPerMin
    role:                        String
    lane:                        String
  }
  type Player {
    platformId:        String
    accountId:         String
    summonerName:      String
    summonerId:        String
    currentPlatformId: String
    currentAccountId:  String
    matchHistoryUri:   String
    profileIcon:       Int
  }

  type ParticipantIdentity {
    participantId: Int
    player:        Player
  }

  type Stats {
    participantId:                   Int
    win:                             Boolean
    item0:                           Int
    item1:                           Int
    item2:                           Int
    item3:                           Int
    item4:                           Int
    item5:                           Int
    item6:                           Int
    kills:                           Int
    deaths:                          Int
    assists:                         Int
    largestKillingSpree:             Int
    largestMultiKill:                Int
    killingSprees:                   Int
    longestTimeSpentLiving:          Int
    doubleKills:                     Int
    tripleKills:                     Int
    quadraKills:                     Int
    pentaKills:                      Int
    unrealKills:                     Int
    totalDamageDealt:                Int
    magicDamageDealt:                Int
    physicalDamageDealt:             Int
    trueDamageDealt:                 Int
    largestCriticalStrike:           Int
    totalDamageDealtToChampions:     Int
    magicDamageDealtToChampions:     Int
    physicalDamageDealtToChampions:  Int
    trueDamageDealtToChampions:      Int
    totalHeal:                       Int
    totalUnitsHealed:                Int
    damageSelfMitigated:             Int
    damageDealtToObjectives:         Int
    damageDealtToTurrets:            Int
    visionScore:                     Int
    timeCCingOthers:                 Int
    totalDamageTaken:                Int
    magicalDamageTaken:              Int
    physicalDamageTaken:             Int
    trueDamageTaken:                 Int
    goldEarned:                      Int
    goldSpent:                       Int
    turretKills:                     Int
    inhibitorKills:                  Int
    totalMinionsKilled:              Int
    neutralMinionsKilled:            Int
    neutralMinionsKilledTeamJungle:  Int
    neutralMinionsKilledEnemyJungle: Int
    totalTimeCrowdControlDealt:      Int
    champLevel:                      Int
    visionWardsBoughtInGame:         Int
    sightWardsBoughtInGame:          Int
    wardsPlaced:                     Int
    wardsKilled:                     Int
    firstBloodKill:                  Boolean
    firstBloodAssist:                Boolean
    firstTowerKill:                  Boolean
    firstTowerAssist:                Boolean
    firstInhibitorKill:              Boolean
    firstInhibitorAssist:            Boolean
    combatPlayerScore:               Int
    objectivePlayerScore:            Int
    totalPlayerScore:                Int
    totalScoreRank:                  Int
    playerScore0:                    Int
    playerScore1:                    Int
    playerScore2:                    Int
    playerScore3:                    Int
    playerScore4:                    Int
    playerScore5:                    Int
    playerScore6:                    Int
    playerScore7:                    Int
    playerScore8:                    Int
    playerScore9:                    Int
    perk0:                           Int
    perk0Var1:                       Int
    perk0Var2:                       Int
    perk0Var3:                       Int
    perk1:                           Int
    perk1Var1:                       Int
    perk1Var2:                       Int
    perk1Var3:                       Int
    perk2:                           Int
    perk2Var1:                       Int
    perk2Var2:                       Int
    perk2Var3:                       Int
    perk3:                           Int
    perk3Var1:                       Int
    perk3Var2:                       Int
    perk3Var3:                       Int
    perk4:                           Int
    perk4Var1:                       Int
    perk4Var2:                       Int
    perk4Var3:                       Int
    perk5:                           Int
    perk5Var1:                       Int
    perk5Var2:                       Int
    perk5Var3:                       Int
    perkPrimaryStyle:                Int
    perkSubStyle:                    Int
    statPerk0:                       Int
    statPerk1:                       Int
    statPerk2:                       Int
  }

  type Participant {
    participantId: Int
    teamId:        Int
    championId:    Int
    spell1Id:      Int
    spell2Id:      Int
    stats:         Stats
    timeline:      Timeline
  }

  type Ban {
    championId: Int
    pickTurn:   Int
  }

  type Team {
    teamId:               Int
    win:                  String
    firstBlood:           Boolean
    firstTower:           Boolean
    firstInhibitor:       Boolean
    firstBaron:           Boolean
    firstDragon:          Boolean
    firstRiftHerald:      Boolean
    towerKills:           Int
    inhibitorKills:       Int
    baronKills:           Int
    dragonKills:          Int
    vilemawKills:         Int
    riftHeraldKills:      Int
    dominionVictoryScore: Int
    bans:                 [Ban]
  }

  type Match {
    gameId:                String
    platformId:            String
    gameCreation:          Float
    gameDuration:          Float
    queueId:               Int
    mapId:                 Int
    seasonId:              Int
    gameVersion:           String
    gameMode:              String
    gameType:              String
    teams:                 [Team]
    participants:          [Participant]
    participantIdentities: [ParticipantIdentity]
  }

  type Query {
    matchData(gameId: String!): Match
  }
`

export default typeDefs