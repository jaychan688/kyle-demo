const audioContext = new AudioContext()

const NOTE_DETAILS = [
	{ note: 'C', key: 'Z', frequency: 261.626 },
	{ note: 'Db', key: 'S', frequency: 277.183 },
	{ note: 'D', key: 'X', frequency: 293.665 },
	{ note: 'Eb', key: 'D', frequency: 311.127 },
	{ note: 'E', key: 'C', frequency: 329.628 },
	{ note: 'F', key: 'V', frequency: 349.228 },
	{ note: 'Gb', key: 'G', frequency: 369.994 },
	{ note: 'G', key: 'B', frequency: 391.995 },
	{ note: 'Ab', key: 'H', frequency: 415.305 },
	{ note: 'A', key: 'N', frequency: 440 },
	{ note: 'Bb', key: 'J', frequency: 466.164 },
	{ note: 'B', key: 'M', frequency: 493.883 },
]

document.addEventListener('keydown', e => {
	// Prevent hold the key down and keep to fire the event (return early)
	if (e.repeat) return

	const keyboardKey = e.code
	const noteDetail = getNoteDetail(keyboardKey)
	// if there this match note, escape
	if (noteDetail == null) return
	// attach active property marked that not are been played
	noteDetail.active = true

	playNotes()
})

document.addEventListener('keyup', e => {
	// Release the key
	const keyboardKey = e.code
	const noteDetail = getNoteDetail(keyboardKey)

	if (noteDetail == null) return
	noteDetail.active = false

	playNotes()
})

function getNoteDetail(keybardKey) {
	// Get the individual note base on the key are pressed
	return NOTE_DETAILS.find(note => `Key${note.key}` === keybardKey)
}

function playNotes() {
	NOTE_DETAILS.forEach(n => {
		// Get every one of individual key
		const keyElement = document.querySelector(`[data-note="${n.note}"]`)
		// if the note is currently active, apply active class
		// n.active is actural been set to undefined (default seeting)
		// technically undefined is not false in this scenario, so it
		// need a actural "false" fallback option
		keyElement.classList.toggle('active', n.active || false)

		// Do we have some oscillator currently on the object. if that is the case
		// stop play this
		// In if condition, undefined equal to null.
		// console.log(n)
		if (n.oscillator != null) {
			n.oscillator.stop()
			n.oscillator.disconnect()
		}
	})

	const activeNotes = NOTE_DETAILS.filter(n => n.active)
	const gain = 1 / activeNotes.length
	activeNotes.forEach(n => {
		startNote(n, gain)
	})
}

function startNote(noteDetail, gain) {
	const gainNode = audioContext.createGain()
	gainNode.gain.value = gain

	const oscillator = audioContext.createOscillator()
	oscillator.frequency.value = noteDetail.frequency

	oscillator.type = 'sine'
	oscillator.connect(gainNode).connect(audioContext.destination)
	oscillator.start()
	// save the local variable to the global object, so we can access everywhere
	noteDetail.oscillator = oscillator
}
