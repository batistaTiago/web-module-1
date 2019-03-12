function updateWindowSize() {
	windowWidth = window.innerWidth
	windowHeight = window.innerHeight
}

function endGame() {
	window.location.href = 'game-over.html'
	timeTracker = null
	mosquitoBuilder = null
}

var difficultyLevel = 1

var timeLeft = 1 + (60 / (2 * difficultyLevel))
var totalKills = 0
var killsToGetAdditionalTime = 5
var currentLives = 6
var windowWidth, windowHeight = 0
var windowMargin = 90


updateWindowSize()

var mosquitoBuilder = setInterval(generateMosquito, 2000 * (1 / difficultyLevel))
var timeTracker = setInterval(updateTimer, 1000)