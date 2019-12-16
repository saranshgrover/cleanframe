/**
 * Remove control with key from list of controls
 * @param {[{}]} controls
 * @param {int} key
 */
export const deleteControl = (controls, key) => {
	let controlsCopy = JSON.parse(JSON.stringify(controls))
	controlsCopy = controlsCopy.filter(control => control.key !== key)
	return controlsCopy
}

export const duplicateControl = (controls, key) => {
	let controlsCopy = JSON.parse(JSON.stringify(controls))
	let control = controlsCopy.find(contrl => contrl.key === key)
	const newKey = controlsCopy.length
	control = { ...control, xCoordinate: 0, yCoordinate: 0, key: newKey }
	controlsCopy.push(control)
	return controlsCopy
}

/**
 * order all keys correctly
 * @param {[{}]} controls
 */
export const resetKeys = controls => {
	let index = 0
	for (const control of controls) {
		control.key = index
		index++
	}
	return controls
}
/**
 * Check if 2 objects are the same
 * @param {{}} a
 * @param {{}} b
 */
export const isSame = (a, b) => JSON.stringify(a) === JSON.stringify(b)
