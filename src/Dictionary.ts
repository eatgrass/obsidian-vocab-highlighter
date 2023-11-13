import dict from '../assets/dict'
import { memoize } from 'lodash'

export const query = memoize(async (word: string): Promise<number> => {
    return _query(word)
})

const _query = memoize((word: string) => (dict as any)[word])
