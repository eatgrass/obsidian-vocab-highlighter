export const getSettingDesc = (documentFragment: DocumentFragment) => {
    const div = documentFragment.createDiv()
    const p1 = document.createElement('p')
    p1.textContent =
        'Whether highlight processor should be applied to all documents.'
    div.appendChild(p1)
    const p2 = document.createElement('p')
    p2.textContent = 'Disabling this then you can add '
    const strong1 = document.createElement('strong')
    const i1 = document.createElement('i')
    i1.textContent = 'enable-vocab-hl'
    strong1.appendChild(i1)
    p2.appendChild(strong1)
    p2.appendChild(document.createTextNode(' to '))
    const strong2 = document.createElement('strong')
    const i2 = document.createElement('i')
    i2.textContent = 'cssclasses'
    strong2.appendChild(i2)
    p2.appendChild(strong2)
    p2.appendChild(document.createTextNode(' in your frontmatter'))
    const br = document.createElement('br')
    p2.appendChild(br)
    p2.appendChild(
        document.createTextNode('to enable processor for certain documents.'),
    )
    div.appendChild(p2)

    const p3 = document.createElement('p')
    p3.textContent =
        'Sometimes, it may be necessary to reopen a file to allow the processor to reapply the highlights'
    div.appendChild(p3)

    const p4 = document.createElement('p')
    const b = document.createElement('b')
    b.textContent = 'Important: '
    const code = document.createElement('code')
    code.textContent = 'toggle highlight'
    b.appendChild(code)
    b.appendChild(
        document.createTextNode(
            ' command can only affects the documents that have been processed.',
        ),
    )
    p4.appendChild(b)
    div.appendChild(p4)
}
