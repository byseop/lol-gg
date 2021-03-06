import React from 'react';
import styled from 'styled-components';
import URL from 'src/client/constants/url';
import { gameDataAtom } from 'src/client/pages/MainRoutes';
import { useRecoilValue, selector } from 'recoil';

export type ProfilePropTypes = {
  name?: string;
  profileIconId?: string;
};

const { DDRAGON, IMG, CDN } = URL;

const gameDataSelector = selector({
  key: 'gameDataUsingProfile',
  get: ({ get }) => {
    return get(gameDataAtom);
  }
});

export default function Profile({ name, profileIconId }: ProfilePropTypes) {
  const gameDataState = useRecoilValue(gameDataSelector);
  return (
    <ProfileDiv>
      <div className="profile_icon">
        <picture>
          {profileIconId && (
            <img
              src={`${DDRAGON}/${CDN}/${gameDataState?.gameData.version}/${IMG}/profileicon/${profileIconId}.png`}
              alt="profile icon"
            />
          )}
        </picture>
      </div>
      <div className="nickname">{name && <p>{name}</p>}</div>
    </ProfileDiv>
  );
}

const ProfileDiv = styled.div`
  display: flex;
  align-items: center;

  .profile_icon {
    width: 78px;
    height: 78px;

    picture {
      display: block;
      height: 100%;
      border-radius: 100%;
      overflow: hidden;
      position: relative;

      &:before {
        position: absolute;
        left: 0;
        top: 0;
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 100%;
        border: 2px solid #af853c;
        z-index: 2;
        box-sizing: border-box;
      }

      &:after {
        position: absolute;
        left: 2px;
        top: 2px;
        content: '';
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        border-radius: 100%;
        border: 2px solid #000;
        z-index: 2;
        box-sizing: border-box;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .nickname {
    margin-left: 1rem;

    p {
      font-size: 1.35rem;
      font-weight: bold;
      letter-spacing: -0.05em;
    }
  }
`;
