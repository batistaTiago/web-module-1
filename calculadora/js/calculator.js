var textField = document.getElementById('calc-textfield')
var didPressEqual = false

function handleClick(type, value) {
	if (type == 'action') {
		if (textField.value == '' && value == '.') {
			textField.value = '0.'
		} else if (value == 'c') {
			resetState()
		} else if (value == '=') {
			textField.value = eval(textField.value)
			didPressEqual = true
		} else {
			textField.value += value
		}
	} else if (type == 'value') {
		if (didPressEqual) {
			resetState()
		}
		textField.value += value
	}
}

function resetState() {
	textField.value = ""
	didPressEqual = false
}