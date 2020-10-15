import { useRecoilValue, selector } from 'recoil';
import { gameDataAtom } from 'src/client/pages/MainRoutes';

const gameDataSelector = selector({
  key: 'useRunesAtom',
  get: ({ get }) => {
    return get(gameDataAtom);
  }
});

/**
 * Fetching the Rune-Set with rune's IDs
 * @param { primaryRuneId, secondaryRuneId }
 */
const useRunes = ({
  primaryStyle,
  primaryRuneId,
  secondaryStyle
}: {
  primaryStyle: number;
  primaryRuneId: number;
  secondaryStyle: number;
}) => {
  const gameDataState = useRecoilValue(gameDataSelector);
  if (!gameDataState) return undefined;
  return {
    primary: gameDataState.gameData.runes
      ?.find((reforged) => reforged.id === primaryStyle)
      ?.slots[0].runes.find((rune) => rune.id === primaryRuneId),
    secondary: gameDataState.gameData.runes?.find(
      (reforged) => reforged.id === secondaryStyle
    )
  };
};

export default useRunes;
