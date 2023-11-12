import * as dict from '../assets/dict.json'

const cache = new Map()

export const query = async (word: string): Promise<number> => {
    return new Promise((resolve) => {
        if (cache.has(word)) {
            resolve(cache.get(word))
        }
        resolve((dict as any)[word])
    })
}

export const hash = (str: string): number => {
    let hash = 0
    if (!str || str.length === 0) return hash

    for (let i = 0, chr = 0; i < str.length; i++) {
        chr = str.charCodeAt(i)
        hash = (hash << 5) - hash + chr
        hash |= 0
    }
    return hash
}
