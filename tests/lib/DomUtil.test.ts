/**
 * @jest-environment jsdom
 */

import { tokenize } from '../../src/lib/Tokenizer'
import { query,hash } from '../../src/Dictionary'

describe('forEachNode', () => {
    document.body.innerHTML =
        '<div> abcd' +
        '  <span id="username" />' +
        '  <button id="button" />' +
        '</div>'

    test('iterate over each node', () => {
        let str = "They'll save and invest more."
        let result = tokenize(str)
        expect(result).toEqual([
            'They',
            "'ll",
            'save',
            'and',
            'invest',
            'more',
            '.',
        ])
    })
})

describe('query dictionary', () => {

    test('query a word', async () => {
       
        console.log(await query('hello'))
        console.log(await query('hello'))
    })
})
