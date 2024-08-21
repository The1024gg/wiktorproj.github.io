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
	num: "0.1.1",
	name: "Prototyped, but better",
}

let changelog = `<h1>0.1.1 Prototyped, but better</h1><br><br>
Fixed an issue with an upgrade<br><br>
<h1>0.1 Prototyped</h1><br><br>
First Release<br><br>`

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
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function() {return 'You have ' + format(player['+'].points, 0) + ' additions'},
	function() {
		features = [
			"Addition layer", "Prestige layer, 1 upgrade for it", "+2 Upgrades for prestige layer", "+1 Upgrades for prestige layer",
			"+3 Upgrades for prestige layer", "<span style='font-size: 75%'>Rebirth layer, 1 upgrade for it, a x2 point boost and +2 Upgrades for prestige layer</span>",
			"+4 Upgrades for rebirth layer", "Nerf rebirth upgrade 15, and +4 Upgrades for rebirth layer", "Mega layer, 2 upgrades for it",
			"+2 Upgrades for mega layer"
		]
		if (features[parseInt(player['+'].points.toStringWithDecimalPlaces(0))] == undefined) return 'Latest added feature: Nothing'
		return 'Latest added feature: ' + features[parseInt(player['+'].points.toStringWithDecimalPlaces(0))]},
		"Endgame: 10 additions"
]

// Determines when the game "ends"
function isEndgame() {
	return player['+'].points.gte(10)
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