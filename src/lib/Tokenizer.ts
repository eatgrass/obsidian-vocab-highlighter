const pattern = /[^A-Za-zА-Яа-я0-9_]+/
// const pattern = /\s+/
//
const contractions2 = [
    /(.)('ll|'re|'ve|n't|'s|'m|'d)\b/gi,
    /\b(can)(not)\b/gi,
    /\b(D)('ye)\b/gi,
    /\b(Gim)(me)\b/gi,
    /\b(Gon)(na)\b/gi,
    /\b(Got)(ta)\b/gi,
    /\b(Lem)(me)\b/gi,
    /\b(Mor)('n)\b/gi,
    /\b(T)(is)\b/gi,
    /\b(T)(was)\b/gi,
    /\b(Wan)(na)\b/gi,
]

const contractions3 = [/\b(Whad)(dd)(ya)\b/gi, /\b(Wha)(t)(cha)\b/gi]

export const tokenize = (text: string): string[] => {
    contractions2.forEach(function (regexp) {
        text = text.replace(regexp, '$1 $2')
    })

    contractions3.forEach(function (regexp) {
        text = text.replace(regexp, '$1 $2 $3')
    })

    // most punctuation
    text = text.replace(/([^\w.'\-/+<>,&])/g, ' $1 ')

    // commas if followed by space
    text = text.replace(/(,\s)/g, ' $1')

    // single quotes if followed by a space
    text = text.replace(/('\s)/g, ' $1')

    // periods before newline or end of string
    text = text.replace(/\. *(\n|$)/g, ' . ')

    return text.split(/\s+/).filter((s) => s !== '')
}
