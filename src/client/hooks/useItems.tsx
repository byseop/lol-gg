import { useRecoilValue, selector } from 'recoil';
import { gameDataAtom } from 'src/client/pages/MainRoutes';
import type { ItemsData } from 'src/server/api/data/types';

const gameDataSelector = selector({
  key: 'useItemsAtom',
  get: ({ get }) => {
    return get(gameDataAtom);
  }
});

/**
 * Fetching the spells
 */
const useItems = (
  itemIdArray: number[]
): ({ id: number; data: ItemsData } | undefined)[] | undefined => {
  const gameDataState = useRecoilValue(gameDataSelector);
  if (!gameDataState) return undefined;
  return itemIdArray.map(
    (id) =>
      gameDataState.gameData.items && {
        id,
        data: gameDataState.gameData.items[
          id.toString() as keyof ItemsData[]
        ] as ItemsData
      }
  );
};

export default useItems;
