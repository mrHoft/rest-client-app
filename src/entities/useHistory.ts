'use client';

import { TMethod } from '~/utils/rest';
import Storage from '~/utils/storage';

const storage = new Storage();

export interface HistoryRecord {
  date: number;
  method: TMethod;
  url: string;
}

const pushHistory = (record: HistoryRecord) => storage.push('history', record);
const getHistory = () => storage.get<HistoryRecord[]>('history');
const clearHistory = () => storage.set('history', []);
const updateHistory = (records: HistoryRecord[]) => storage.set('history', records);

export default function useHistory() {
  return { pushHistory, getHistory, clearHistory, updateHistory };
}
