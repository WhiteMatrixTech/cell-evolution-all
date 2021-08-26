import { CellEvolutionClient } from './client';
import { EtherCellEvolutionClient } from './client/ethers-cellevolution-client';

export function cellEvolutionProvider(mock = false): CellEvolutionClient {
  if (mock) {
    throw 'Mock version deprecated';
  } else {
    return new EtherCellEvolutionClient();
  }
}

export { CellEvolutionClient } from './client';
export * from './model';
export {
  CellEvolutionNewWorld as CellEvolution,
  CellEvolutionNewWorld__factory as CellEvolution__factory
} from './typechain';

export * from './config';
