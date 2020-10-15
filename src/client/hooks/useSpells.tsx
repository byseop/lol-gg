import { useRecoilValue, selector } from 'recoil';
import { gameDataAtom } from 'src/client/pages/MainRoutes';
import type { SummonerSpell } from 'src/server/api/data/types';

const gameDataSelector = selector({
  key: 'useSpellsAtom',
  get: ({ get }) => {
    return get(gameDataAtom);
  }
});

/**
 * Fetching the spells
 */
const useSpells = ({
  spell1Id,
  spell2Id
}: {
  spell1Id: number;
  spell2Id: number;
}): SummonerSpell[] | undefined => {
  const gameDataState = useRecoilValue(gameDataSelector);
  if (!gameDataState) return undefined;
  return [spell1Id, spell2Id].reduce(
    (acc, cur) =>
      acc.concat(
        gameDataState?.gameData.spells?.find((s) => s.key === cur.toString())
      ),
    [] as any
  );
};

export default useSpells;
