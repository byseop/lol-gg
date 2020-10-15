import { useRecoilValue, selector } from 'recoil';
import { gameDataAtom } from 'src/client/pages/MainRoutes';

const gameDataSelector = selector({
  key: 'useChampionInfomationAtom',
  get: ({ get }) => {
    return get(gameDataAtom);
  }
});

/**
 * Fetching the Champion information with champ's ID
 * @param championId 
 */
const useChampionInfo = (championId: number | undefined) => {
  const gameDataState = useRecoilValue(gameDataSelector);
  if (!gameDataState || championId === undefined) return undefined;
  return gameDataState.gameData.champs?.find(
    (c) => c.key === championId.toString()
  );
};

export default useChampionInfo;
