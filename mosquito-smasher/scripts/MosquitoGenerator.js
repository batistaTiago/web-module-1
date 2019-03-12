function generateRandom2DPosition() {
	updateWindowSize()
	
	var x = Math.round(Math.random() * windowWidth) - windowMargin
	var y = Math.round(Math.random() * windowHeight) - windowMargin

	x = x < 0 ? 0 : x
	y = y < 0 ? 0 : y

	return [x, y]
}

function randomizeParameters(element) {
	randomizePosition(element)
	randomizeSize(element)
	randomizeOrientation(element)
}

function randomizePosition(element) {
	position = generateRandom2DPosition()
	element.style.left = position[0] + 'px'
	element.style.top = position[1] + 'px'
}

function randomizeSize(element) {
	var tamanho = Math.round((3 * Math.random()))
	element.className = 'mosquito-' + tamanho
}

function randomizeOrientation(element) {
	var facingDirection = Math.floor(2 * Math.random())
	if (facingDirection == 0) {
		element.className += ' left-faced'
	} else {
		element.className += ' right-faced'
	}
}

function removeLastMosquito() {
	var lastMosquito = document.getElementById('mosquito')
	if (lastMosquito != null) {
		lastMosquito.remove()
		updateHealthUI(false)
	}
}

function generateMosquito() {
	removeLastMosquito()
	var mosquito = document.createElement('img')
	mosquito.id = 'mosquito'
	mosquito.src = 'images/mosquito.png'
	mosquito.style.position = 'absolute'
	mosquito.onclick = function() {
		this.remove()
		totalKills++
		document.getElementById('kill-counter').innerHTML = totalKills
		if ((totalKills % killsToGetAdditionalTime) == 0) {
			timeLeft += 3
			document.getElementById('timer').innerHTML = timeLeft
		}
	}
	randomizeParameters(mosquito)
	document.body.appendChild(mosquito)
}