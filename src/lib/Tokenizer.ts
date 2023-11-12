const pattern = /([A-Za-zÀ-ÿ-]+|[0-9._]+|.|!|\?|'|"|:|;|,|-)/i

export const tokenize = (text: string | null): string[] => {
    return text ? text.split(pattern).filter((s) => s !== '') : []
}


