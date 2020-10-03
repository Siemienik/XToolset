import { ImportType } from './ImportType';

export default interface ISourceConfig {
    type?: ImportType | string;
    worksheet: string;
}
