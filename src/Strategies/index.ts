import { ImportType } from '../config/ImportType';
import { ImportStrategy } from './ImportStrategy';
import { invalidTypeStrategy } from './invalidTypeStrategy';
import { listVerticalStrategy } from './listVerticalStrategy';
import { singleObjectStrategy } from './singleObjectStrategy';

type TypeToStrategyMap = { [type in ImportType]: ImportStrategy };

const strategies: TypeToStrategyMap = {} as TypeToStrategyMap;

/** @see listVerticalStrategy */
strategies[ImportType.List] = listVerticalStrategy;
strategies[ImportType.ListVertical] = strategies[ImportType.List];
strategies[ImportType.Vertical] = strategies[ImportType.List];

/** @see listVerticalStrategy */
strategies[ImportType.Object] = singleObjectStrategy;
strategies[ImportType.Single] = strategies[ImportType.Object];
strategies[ImportType.Singleton] = strategies[ImportType.Object];

export const getStrategyByType = (type: ImportType): ImportStrategy => strategies[type] || invalidTypeStrategy;
