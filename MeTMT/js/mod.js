let modInfo = {
	name: "MetaTree",
	id: "metree", // what is the point of this
	author: "unicodes/wk, The1024gg",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.6.1",
	name: "Challenging",
}

let changelog = `main: galaxy has a changelog you don't need this one! / tw.2s4.me for another mod!`

let winText = `Wow! You won! But there will be more <i>soon...</i>`

let additionCap = 28

let og = new Decimal(0)

let omegaSC = new Decimal(0)

let mg = new Decimal(0)

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

overginded = false

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new Decimal(0)
	let gain = new Decimal(1)
	if (player['+'].points.gte(17)) gain = gain.add(player.points.pow(0.025))
	if (player['+'].points.gte(5)) gain = gain.times(2)
	if (hasUpgrade('p', 13)) gain = gain.add(1)
	if (hasUpgrade('p', 11)) gain = gain.times(2)
	if (hasUpgrade('p', 12)) gain = gain.times(2)
	if (hasUpgrade('p', 14)) gain = gain.times(upgradeEffect('p', 14))
	if (hasUpgrade('p', 16)) gain = gain.times(upgradeEffect('p', 16))
	if (hasUpgrade('p', 17)) gain = gain.times(upgradeEffect('p', 17))
	if (hasUpgrade('r', 11)) gain = gain.times(2)
	if (hasUpgrade('r', 22)) gain = gain.times(25)
	if (hasUpgrade('m', 11)) gain = gain.times(3)
	if (hasUpgrade('m', 12)) gain = gain.pow(1.04)
	if (hasUpgrade('m', 13)) gain = gain.times(upgradeEffect('m', 13))
	if (hasUpgrade('m', 15)) gain = gain.times(15)
	if (hasUpgrade('m', 16)) gain = gain.pow(1.02)
	if (hasUpgrade('u', 11)) gain = gain.times(20)
	if (player['+'].points.gte(12)) gain = gain.times(3)
	if (hasUpgrade('i', 11)) gain = gain.times(50)
	if (hasUpgrade('i', 12)) gain = gain.times(20)
	if (getBuyableAmount('u',11).gte(1)) gain = gain.times(buyableEffect('u',11))
	if (player['+'].points.gte(13)) gain = gain.times(1.5)
	if (player['+'].points.gte(16)) gain = gain.times(player['+'].points.pow(1.1))
	if (hasUpgrade('i', 12)) gain = gain.times(2)
	if (hasUpgrade('i', 14)) gain = gain.times(5)
	if (hasUpgrade('i', 16)) gain = gain.times(9)
	if (hasUpgrade('i', 17)) gain = gain.times(69420)
	if (player['+'].points.gte(21)) gain = gain.pow(0.98)
	if (player['i'].omega.gte(1)) gain = gain.times(player['i'].omega.pow(0.05))
	if (hasUpgrade('x', 11)) gain = gain.times(5)
	if (hasUpgrade('x', 12)) gain = gain.times(10)
	if (hasUpgrade('x', 17)) gain = gain.pow(1.01)
	if (!inChallenge('i', 11)){
		if (hasUpgrade('i', 17)) gain = gain.times(69.420)
		if (hasUpgrade('i', 11)) gain = gain.times(0.5)
	}
	if (!inChallenge('i', 12)){
		if (hasUpgrade('i', 17)) gain = gain.times(6.9420)
		if (hasUpgrade('i', 11)) gain = gain.times(0.05)
	}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {return 'You have ' + format(player['+'].points) + '/' + format(additionCap) + ' additions'},
	"Endgame: 1,000,000,000,000 multiplier",
	function() {
		if (player.points.lte(100)) {
			return "If 1 point is a centimeter, you'd have " + format(player.points) + "cm"
		}
		if (player.points.lte(100e3)) {
			return "If 1 point is a centimeter, you'd have " + format(player.points.div(100)) + "m"
		}
		if (player.points.lte(29979245800)) {
			return "If 1 point is a centimeter, you'd have " + format(player.points.div(100e3)) + "km"
		}
		if (player.points.lte(1798754748000)) {
			return "If 1 point is a centimeter, you'd have " + format(player.points.div(29979245800)) + " light seconds"
		}
		if (player.points.lte(1798754748000*60)) {
			return "If 1 point is a centimeter, you'd have " + format(player.points.div(1798754748000)) + " light minutes"
		}
		if (player.points.lte(1798754748000*60*24)) {
			return "If 1 point is a centimeter, you'd have " + format(player.points.div(1798754748000*60)) + " light hours"
		}
		if (player.points.lte(1798754748000*60*24*365)) {
			return "If 1 point is a centimeter, you'd have " + format(player.points.div(1798754748000*60*24)) + " light days"
		}
		if (player.points.lte(3.08567758e16)) {
			return "If 1 point is a centimeter, you'd have " + format(player.points.div(1798754748000*60*24*365)) + " light years"
		}
		if (player.points.lte(3.08567758e19)) {
			return "If 1 point is a centimeter, you'd have " + format(player.points.div(3.08567758e16)) + " parsecs"
		}
		if (player.points.lte(3.08567758e22)) {
			return "If 1 point is a centimeter, you'd have " + format(player.points.div(3.08567758e19)) + " kiloparsecs"
		}
		if (player.points.lte(3.08567758e25)) {
			return "If 1 point is a centimeter, you'd have " + format(player.points.div(3.08567758e22)) + " megaparsecs"
		}
		if (player.points.lte(3.08567758e28)) {
			return "If 1 point is a centimeter, you'd have " + format(player.points.div(3.08567758e25)) + " gigaparsecs"
		}
		return "If you write 1 digit/s, you'd have to write for " + formatTime(player.points.log10().floor())
	},
	function() {
		if (player['+'].points.lte(1)) {
			return "Welcome to MetaTree! Collab with wiktorproj"
		}
		if (player['+'].points.lte(5)) {
			return "You have 5 layers left to unlock"
		}
		if (player['+'].points.lte(8)) {
			return "You have 4 layers left to unlock!"
		}
		if (player['+'].points.lte(11)) {
			return "You have 3 layers left to unlock!!!"
		}
		if (player['+'].points.lte(19)) {
			return "You have 2 layers left to unlock!!!!!!"
		}
		if (player['+'].points.lte(25)) {
			return "You have 1 layer left to unlock!?!?!?!?"
		}
		return "Reach 1e25 multiplier to endgame."
	}
]

// Determines when the game "ends"
function isEndgame() {
	return player.x.points.gte(1e25)
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	switch (options.maxTickLen) {
		case "1h":
			return 60*60
			break;
		case "3h":
			return 60*60*3
			break;
		case "10h":
			return 60*60*10
			break;
		case "10s":
			return 10
			break;
		case "1m":
			return 60
			break;
		case "5m":
			return 60*5
			break;
		case "30m":
			return 60*30
			break;
	}
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
