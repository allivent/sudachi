import { VocabListType } from './Vocab';

export type UnitType = {
  id: string;
  name: string;
  vocab: VocabListType;
  headers: { [key: string]: string };
};
