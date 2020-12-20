import { useRecoilValue, selector } from 'recoil';
import { gameDataAtom } from 'src/client/pages/MainRoutes';

const gameDataSelector = selector({
  key: 'useNewestGameVersionAtom',
  get: ({ get }) => {
    return get(gameDataAtom);
  }
});

/**
 * Fetching the Newest game version
 */
const useNewestGameVersion = () => {
  const gameDataState = useRecoilValue(gameDataSelector);
  return gameDataState?.gameData.version;
};

export default useNewestGameVersion;
