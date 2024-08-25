let modInfo = {
	name: "MetaTree",
	id: "metree",
	author: "unicodes/wk",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 3,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3½",
	name: "It's like 1.5 onions",
}

let changelog = `galaxy has a changelog you don't need this one!`

let winText = `Wow! You won! But there will be more <i>soon...</i>`

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

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new Decimal(0)
	let gain = new Decimal(1)
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
	gain = gain.times(new Decimal(1).mul(new Decimal(1).mul(x).pow(15).sub(1)).times(50).pow(0.9)).add(1) // it's jank but it works
	if (player['+'].points.gte(13)) gain = gain.times(1.5)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {return 'You have ' + format(player['+'].points, 0) + ' additions'},
	"Endgame: infinity upgrade 14",
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
		if (player.points.lte(7.10030834 * 1e15)) {
			return "If 1 point is a second, you'd have " + format(player.points.div(1798754748000*60*24*365)) + " galactic years"
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
	}
]

// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade('i', 14)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}