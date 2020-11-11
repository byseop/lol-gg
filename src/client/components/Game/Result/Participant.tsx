import React from 'react';
import styled from 'styled-components';
import ChampionPic from '../../Stats/Matches/MatchInfo/ChampionPic';
import SlotContainer from '../../Stats/Matches/MatchInfo/Slot';
import useChampionInfo from 'src/client/hooks/useChampionInfo';
import useRunes from 'src/client/hooks/useRunes';
import useSpells from 'src/client/hooks/useSpells';
import useItems from 'src/client/hooks/useItems';
import { Link } from 'react-router-dom';
import URL from 'src/client/constants/url';
import type { ParticipantDataType, TeamStats } from '../types';
import type { SidePanelEnum } from '../Game';

const { DDRAGON, IMG, CDN } = URL;

type ParticipantsPropTypes = {
  data: ParticipantDataType;
  index: number;
  gameVersion: string;
  gameDuration: number;
  teamStats: TeamStats;
  dealingAmoutRatio: number;
  grade: number;
  togglePanel: ({
    type,
    data
  }: {
    type: SidePanelEnum;
    data: ParticipantDataType;
  }) => void;
};

export default function Participant({
  data,
  index,
  gameVersion,
  gameDuration,
  teamStats,
  dealingAmoutRatio,
  grade,
  togglePanel
}: ParticipantsPropTypes) {
  const { player, championId, stats, spell1Id, spell2Id, timeline } = data;
  const champion = useChampionInfo(championId);
  const spells = useSpells({ spell1Id, spell2Id });
  const { summonerName } = player;
  const {
    kills,
    deaths,
    assists,
    champLevel,
    perk0,
    perkSubStyle,
    perkPrimaryStyle,
    totalMinionsKilled,
    neutralMinionsKilled,
    wardsPlaced,
    wardsKilled,
    visionWardsBoughtInGame,
    totalDamageDealtToChampions,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6
  } = stats;
  const { csDiffPerMinDeltas } = timeline;
  const runeSet = useRunes({
    primaryStyle: perkPrimaryStyle,
    primaryRuneId: perk0,
    secondaryStyle: perkSubStyle
  });
  const itemSet = useItems([item0, item1, item2, item3, item4, item5, item6]);

  return (
    <ParticipantWrap onClick={() => togglePanel({ type: 'PLAYER', data })}>
      {champion && (
        <ChampionPic
          size={36}
          index={index}
          id={championId.toString()}
          image={`${DDRAGON}/${CDN}/${gameVersion}/${IMG}/champion/${champion.id}.png`}
          champLevel={champLevel}
          grade={grade}
          useTooltip={true}
        />
      )}
      {spells && (
        <div className="spells">
          <SlotContainer
            index={index}
            data={spells[0]}
            type={'spell'}
            id={spells[0].id}
            key={`${index}-${spells[0].id}`}
            image={`${DDRAGON}/${CDN}/${gameVersion}/${IMG}/spell/${spells[0].id}.png`}
          />
          <SlotContainer
            index={index}
            data={spells[1]}
            type={'spell'}
            id={spells[1].id}
            key={`${index}-${spells[1].id}`}
            image={`${DDRAGON}/${CDN}/${gameVersion}/${IMG}/spell/${spells[1].id}.png`}
          />
        </div>
      )}
      {runeSet && (
        <div className="runes">
          <SlotContainer
            index={0}
            type={'rune'}
            data={runeSet.primary}
            id={runeSet.primary?.id as number}
            image={`${DDRAGON}/${CDN}/${IMG}/${runeSet.primary?.icon}`}
          />
          <SlotContainer
            index={1}
            type={'rune'}
            data={runeSet.secondary}
            id={runeSet.secondary?.id as number}
            image={`${DDRAGON}/${CDN}/${IMG}/${runeSet.secondary?.icon}`}
          />
        </div>
      )}
      <span className="summoner-name">
        <Link to={`/stats/@${summonerName}`}>{summonerName}</Link>
      </span>
      <div className="kda">
        <p>
          <span>{kills}</span> / <span>{deaths}</span> / <span>{assists}</span>
        </p>
        <p>
          <span>{((kills + assists) / deaths).toFixed(2)}</span> KDA
        </p>
      </div>
      <div className="etc">
        <p>
          <span>{totalMinionsKilled + neutralMinionsKilled}</span> (
          {(
            (totalMinionsKilled + neutralMinionsKilled) /
            (gameDuration / 60)
          ).toFixed(1)}
          ) CS
        </p>
        <p>
          {csDiffPerMinDeltas && csDiffPerMinDeltas['0-10'] && (
            <>
              <span>{csDiffPerMinDeltas['0-10'].toFixed(1)}</span> @ 10m
            </>
          )}
        </p>
      </div>
      <div className="etc">
        <p>
          <span>
            {(((kills + assists) / teamStats.kills) * 100).toFixed(1)}%
          </span>{' '}
          KP
        </p>
        <p>
          <span className="ep">
            {wardsPlaced} ({visionWardsBoughtInGame})
          </span>{' '}
          / <span className="ep">{wardsKilled}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="icon-ward"
          >
            <g fill="none" fillRule="nonzero">
              <path
                fill="#8890B5"
                d="M8.516 5.562L9.92 13.81 8 15.51l-1.92-1.7 1.404-8.246.52.59zM6.08 0h3.84l.64 1.108L8.007 4.43 5.44 1.108z"
              ></path>
              <path
                fill="#8890B5"
                d="M0 2.954h5.151l1.441 1.624-.96 4.062-2.423-1.255 1.24-2.142c-.98 0-1.589-.025-1.827-.074-.358-.074-.8-.312-1.494-.93A6.458 6.458 0 0 1 0 2.953zM16 2.954a6.458 6.458 0 0 1-1.128 1.284c-.694.62-1.136.857-1.494.931-.238.05-.847.074-1.826.074l1.239 2.142-2.423 1.255-.96-4.062 1.44-1.624H16z"
              ></path>
            </g>
          </svg>
        </p>
      </div>
      <Damage ratio={dealingAmoutRatio}>
        <p>
          <span>{totalDamageDealtToChampions.toLocaleString()}</span>
        </p>
        <div className="graph">
          <i />
        </div>
      </Damage>
      <div className="items">
        {itemSet?.map((item, index) => {
          if (!item || !item.data)
            return <div className="empty-slot" key={`${index}-empty`} />;
          return (
            <SlotContainer
              key={`${index}-${item}`}
              id={item.id as number}
              index={index}
              data={item.data}
              type={'item'}
              image={`${DDRAGON}/${CDN}/${gameVersion}/${IMG}/item/${item.id}.png`}
            />
          );
        })}
      </div>
    </ParticipantWrap>
  );
}

const ParticipantWrap = styled.div`
  display: flex;
  padding: 0.5rem;
  font-size: 13px;
  align-items: center;
  transition: all 0.2s ease-out;

  &:hover {
    position: relative;
    z-index: 1;
    background: linear-gradient(
      0.5turn,
      rgba(75, 83, 114, 0.1),
      rgba(75, 83, 114, 0.3),
      rgba(75, 83, 114, 0.1)
    );
    transform: scale(1.02, 1.02);
  }

  .summoner-name {
    width: 100px;
    margin-left: 10px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    > a {
      color: rgb(204, 173, 112);
      text-decoration: none;
      transition: all 0.2s ease-out;
      font-weight: bold;
      &:hover {
        color: #fff;
      }
    }
  }

  .runes,
  .spells {
    display: flex;
    flex-flow: column;
    box-shadow: 0 0 -1px #000;

    &.spells {
      margin-left: 10px;
    }

    &.runes:last-child > picture {
      transform: scale(0.8, 0.8);
      transform-origin: center center;
    }

    > div {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      overflow: hidden;
      margin: 2px;

      > picture {
        display: block;

        > img {
          display: block;
          width: 100%;
        }
      }
    }
  }

  .kda,
  .etc {
    width: 5.4rem;
    text-align: center;
    font-weight: bold;
    color: rgb(136, 144, 181);

    > p {
      line-height: 1.5;
      font-size: 0.8em;
      vertical-align: center;
      > span {
        vertical-align: center;
        color: #fff;
        font-size: 1.25em;

        &.ep {
          color: #fff !important;
        }
      }

      &:last-child {
        span {
          color: inherit;
        }
      }

      svg {
        display: inline-block;
        width: 12px;
        margin-left: 5px;
        vertical-align: middle;
      }
    }
  }

  .items {
    margin: -2px -2px -2px 10px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    > div {
      width: 28px;
      height: 28px;
      margin: 2px;
      border-radius: 4px;
      overflow: hidden;
      img,
      picture {
        display: block;
        width: 100%;
      }
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    .empty-slot {
      background: rgba(25, 20, 54, 0.7);
    }
  }
`;

const Damage = styled.div.attrs((props: { ratio: number }) => ({
  ratio: props.ratio
}))`
  width: 80px;
  margin-left: 10px;
  text-align: center;
  span {
    color: #fff;
    font-size: 1em;
    font-weight: bold;
  }
  > div {
    width: 100%;
    height: 8px;
    margin-top: 8px;
    position: relative;
    overflow: hidden;
    > i {
      position: absolute;
      border-radius: 4px;
      left: 0;
      top: 0;
      width: ${(props) => props.ratio * 100}%;
      height: 100%;
      background: rgb(100, 166, 208);
    }
  }
`;
