let highlightEnabled = true

export const toggleHighlight = () => {
    highlightEnabled = !highlightEnabled
	const spans = document.querySelectorAll('.vocab-span');
	console.log(spans)
	const cls = highlightEnabled ? '' : 'vocab-hl-disabled'
	spans.forEach(el => {
		el.className = `vocab-span ${cls}`
    });
}
