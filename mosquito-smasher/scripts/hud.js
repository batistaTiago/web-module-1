function updateHealthUI() {
	var healthIcon = document.getElementById('v' + currentLives)
	if (healthIcon) {
		healthIcon.src = "images/coracao_vazio.png"
		currentLives--
		console.log(currentLives)
	} else {
		endGame()
	}
}

function updateTimer() {
	console.log('updating timer')
	timeLeft--
	if (timeLeft == 0) {
		endGame()
	}
	document.getElementById('timer').innerHTML = timeLeft
}