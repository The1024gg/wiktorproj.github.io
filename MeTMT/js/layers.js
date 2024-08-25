addLayer("+", {
    name: "adds", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "~", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#5F6F7F",
    requires: new Decimal(15), // Can be a function that takes requirement increases into account
    resource: "additions", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    tabFormat: {
        "Progression": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text",
                    function() { return "Features:" },],
                ["display-text",
                    function() { if (player['+'].points.gte(0)) {return "- Addition layer"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(1)) {return "- Prestige layer, 1 upgrade for it"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(2)) {return "- +2 Upgrades for prestige layer"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(3)) {return "- +1 Upgrades for prestige layer"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(4)) {return "- +3 Upgrades for prestige layer"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(5)) {return "- Rebirth layer, 1 upgrade for it, a x2 point boost and +2 Upgrades for prestige layer"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(6)) {return "- +4 Upgrades for rebirth layer"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(7)) {return "- Nerf rebirth upgrade 15, and +4 Upgrades for rebirth layer"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(8)) {return "- Mega layer, 2 upgrades for it"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(9)) {return "- +2 Upgrades for mega layer"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(10)) {return "- +3 Upgrades for mega layer"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(11)) {return "- x3 point gain"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(12)) {return "- Ultra Buyable"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(13)) {return "- x1.5 point gain"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(14)) {return "- Gain 1% of ultra points/s"} },],
                ["display-text",
                    function() { if (player['+'].points.gte(19)) {return "- Infinity layer, 4 upgrades for it"} },],
            ],
        },
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 21)) mult = mult.div(2)
        if (hasUpgrade('p', 22)) mult = mult.div(1.5)
        if (hasUpgrade('r', 21)) mult = mult.div(5)
        if (hasUpgrade('m', 13)) mult = mult.div(100)
        if (player['+'].points.gte(10)) mult = mult.times(5e20)
        if (player['+'].points.gte(14)) mult = mult.times(5e5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})

addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFF00",
    requires: new Decimal(80085), // Can be a function that takes requirement increases into account
    tooltip: "Achievements",
    resource: "achis", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    achievements: {
        11: {
            name: "The first one's always free",
            tooltip: "If you don't have this, you don't exist",
            done() {return true}
        },
        12: {
            name: "Gotta start somewhere",
            tooltip: "Get 1 addition",
            done() {return player['+'].points.gte(1)}
        },
        13: {
            name: "A single upgrade?",
            tooltip: "Get prestige upgrade 11",
            done() {return hasUpgrade('p', 11)}
        },
        14: {
            name: "DYNAMIC!!",
            tooltip: "Get prestige upgrade 14",
            done() {return hasUpgrade('p', 14)}
        },
        15: {
            name: "That is long...",
            tooltip: "Get 5 additions",
            done() {return player['+'].points.gte(5)}
        },
        16: {
            name: "META",
            tooltip: "Get the first meta upgrade",
            done() {return hasUpgrade('p', 21)}
        },
        17: {
            name: "Rebirth!",
            tooltip: "Rebirth for the first time",
            done() {return player['r'].points.gte(1)} // ignore the lazy solution
        },
        18: {
            name: "Automated",
            tooltip: "Get rebirth upgrade 15",
            done() {return hasUpgrade('r', 15)}
        },
        19: {
            name: "What is a prestige reset?",
            tooltip: "Get rebirth upgrade 16",
            done() {return hasUpgrade('r', 16)}
        },
        21: {
            name: "Very mega",
            tooltip: "Mega for the first time",
            done() {return player['m'].points.gte(1)} // ignore the lazy solution
        },
        22: {
            name: "Silent rebirth",
            tooltip: "Get mega upgrade 14",
            done() {return hasUpgrade('m', 14)}
        },
        23: {
            name: "v0.1.x complete",
            tooltip: "Get 10 additions",
            done() {return player['+'].points.gte(10)}
        },
        24: {
            name: "Woah",
            tooltip: "Ultra for the first time",
            done() {return player['u'].points.gte(1)} // ignore the lazy solution
        },
        25: {
            name: "The first milestone",
            tooltip: "Get ultra milestone 0",
            done() {return hasMilestone('u', 0)}
        },
        26: {
            name: "v0.2.x complete",
            tooltip: "Get 13 additions",
            done() {return player['+'].points.gte(13)}
        },
        27: {
            name: "To infinity, and beyond!",
            tooltip: "Get 1 infinity",
            done() {return player['i'].points.gte(1)} // ignore the lazy solution
        },
        28: {
            name: "v0.3.x complete",
            tooltip: "Get infinity upgrade 14",
            done() {return hasUpgrade('i', 14)}
        },
    },
    tabFormat: {
        "Achievements": {
            content: [
                "achievements"
            ],
        },
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})

addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0F0",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    upgrades: {
        11: {
            title: "Times",
            description: "x2 point gain",
            cost: new Decimal(1),
            unlocked() {return player['+'].points.gte(1)}
        },
        12: {
            title: "Again",
            description: "x2 point gain again",
            cost: new Decimal(4),
            unlocked() {return player['+'].points.gte(2)}
        },
        13: {
            title: "Base Adder",
            description: "+1 base point gain",
            cost: new Decimal(7),
            unlocked() {return player['+'].points.gte(2)}
        },
        14: {
            title: "Scalar",
            description: "Multiplies points based off of points",
            cost: new Decimal(10),
            effect() {
                return player.points.add(1).pow(0.4)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(points+1)<sup>0.4</sup>",
            unlocked() {return player['+'].points.gte(3)}
        },
        15: {
            title: "More",
            description: "Multiplies prestige points based off of points",
            cost: new Decimal(20),
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(points+1)<sup>0.1</sup>",
            unlocked() {return player['+'].points.gte(4)}
        },
        16: {
            title: "More but Reversed",
            description: "Multiplies points based off of prestige points",
            cost: new Decimal(40),
            effect() {
                return player.p.points.add(1).pow(0.25)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(prestigepoints+1)<sup>0.25</sup>",
            unlocked() {return player['+'].points.gte(4)}
        },
        17: {
            title: "More but Small",
            description: "Multiplies points based off of prestige points (reduced effect)",
            cost: new Decimal(500),
            effect() {
                return player.p.points.add(1).pow(0.1)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(prestigepoints+1)<sup>0.1</sup>",
            unlocked() {return player['+'].points.gte(4)}
        },
        21: {
            title: "META",
            description: "/2 addition req.",
            cost: new Decimal(2000),
            style: function(){
                    if (hasUpgrade(this.layer, this.id)) {
                        return {'background': 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,253,0,1) 14%, rgba(0,255,25,1) 28%, rgba(0,244,237,1) 47%, rgba(0,1,242,1) 61%, rgba(235,0,246,1) 79%, rgba(255,0,0,1) 100%)'}
                    } else {
                        return
                    }
                },
            unlocked() {return player['+'].points.gte(5)}
        },
        22: {
            title: "Less META",
            description: function(){
                if (hasUpgrade(this.layer, this.id)) {
                    return "/1.5 addition req."
                } else {
                    return "???"
                }
            },
            cost: new Decimal(3000),
            style: function(){
                    if (hasUpgrade(this.layer, this.id)) {
                        return {'background': 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,253,0,1) 14%, rgba(0,255,25,1) 28%, rgba(0,244,237,1) 47%, rgba(0,1,242,1) 61%, rgba(235,0,246,1) 79%, rgba(255,0,0,1) 100%)'}
                    } else {
                        return
                    }
                },
            unlocked() {return player['+'].points.gte(5)}
        },
    },
    passiveGeneration() {
        if (hasUpgrade('m', 14)) return 1.5
        if (hasUpgrade('r', 15) && player['+'].points.gte(7)) return 0.05
        if (hasUpgrade('r', 15)) return 0.1
	    return 0
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 15)) mult = mult.times(upgradeEffect('p', 15))
        if (hasUpgrade('r', 12)) mult = mult.times(3)
        if (hasUpgrade('r', 13)) mult = mult.times(upgradeEffect('r', 13))
        if (hasUpgrade('r', 14)) mult = mult.times(upgradeEffect('r', 14))
        if (hasUpgrade('r', 17)) mult = mult.pow(1.05)
        if (hasUpgrade('i', 12)) mult = mult.times(10)
        return mult
    },
    automate() {
        if (hasUpgrade('r', 16)) {
            buyUpgrade('p', 11)
            buyUpgrade('p', 12)
            buyUpgrade('p', 13)
            buyUpgrade('p', 14)
            buyUpgrade('p', 15)
            buyUpgrade('p', 16)
            buyUpgrade('p', 17)
            buyUpgrade('p', 21)
            buyUpgrade('p', 22)
        }
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player['+'].points.gte(1)}
})

addLayer("r", {
    name: "rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    branches: "p",
    color: "#07F",
    requires: new Decimal(3000), // Can be a function that takes requirement increases into account
    resource: "rebirth points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    upgrades: {
        11: {
            title: "Multiply",
            description: "x2 point gain",
            cost: new Decimal(1),
            unlocked() {return player['+'].points.gte(5)}
        },
        12: {
            title: "Extra",
            description: "x3 prestige point gain",
            cost: new Decimal(2),
            unlocked() {return player['+'].points.gte(6)}
        },
        13: {
            title: "Dynamic",
            description: "Multiply prestige point gain by points",
            effect() {
                return player.points.add(1).pow(0.3)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(points+1)<sup>0.3</sup>",
            cost: new Decimal(5),
            unlocked() {return player['+'].points.gte(6)}
        },
        14: {
            title: "Double dynamic",
            description: "Multiply prestige point gain by points, but reduced effect",
            effect() {
                return player.points.add(1).pow(0.1)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(points+1)<sup>0.1</sup>",
            cost: new Decimal(30),
            unlocked() {return player['+'].points.gte(6)}
        },
        15: {
            title: "Volatility",
            description: function() {
                if (player['+'].points.gte(7)) {
                    return "Gain 5% of prestige points per second (nerfed by addition 7)"
                } else {
                    return "Gain 10% of prestige points per second"
                }
            },
            cost: new Decimal(1000),
            unlocked() {return player['+'].points.gte(6)}
        },
        16: {
            title: "Volatility extra",
            description: "Autobuy prestige upgrades",
            cost: new Decimal(20000),
            unlocked() {return player['+'].points.gte(7)}
        },
        17: {
            title: "Powers!",
            description: "^1.05 prestige points",
            cost: new Decimal(30000),
            unlocked() {return player['+'].points.gte(7)}
        },
        21: {
            title: "META II",
            description: "/5 addition req.",
            cost: new Decimal(35000),
            style: function(){
                if (hasUpgrade(this.layer, this.id)) {
                    return {'background': 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,253,0,1) 14%, rgba(0,255,25,1) 28%, rgba(0,244,237,1) 47%, rgba(0,1,242,1) 61%, rgba(235,0,246,1) 79%, rgba(255,0,0,1) 100%)'}
                } else {
                    return
                }
            },
            unlocked() {return player['+'].points.gte(7)}
        },
        22: {
            title: "MORE!!!",
            description: "x25 point gain",
            cost: new Decimal(40000),
            unlocked() {return player['+'].points.gte(7)}
        },
    },
    passiveGeneration() {
        if (hasUpgrade('m', 14)) return 0.5
	    return 0
    },
    automate() {
        if (hasUpgrade('m', 14)) {
            buyUpgrade('r', 11)
            buyUpgrade('r', 12)
            buyUpgrade('r', 13)
            buyUpgrade('r', 14)
            buyUpgrade('r', 15)
            buyUpgrade('r', 16)
            buyUpgrade('r', 17)
            buyUpgrade('r', 21)
            buyUpgrade('r', 22)
        }
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('m',11)) mult = mult.times(3)
        if (hasUpgrade('m',17)) mult = mult.times(20)
        if (hasUpgrade('i', 12)) mult = mult.times(5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for rebirth points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player['+'].points.gte(5)}},
    ],
    layerShown(){return player['+'].points.gte(5)}
})

addLayer("m", {
    name: "mega", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    branches: "r",
    color: "#F70",
    requires: new Decimal(100000), // Can be a function that takes requirement increases into account
    resource: "mega points", // Name of prestige currency
    baseResource: "rebirth points", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    upgrades: {
        11: {
            title: "More",
            description: "x3 rebirth and point gain",
            cost: new Decimal(1),
            unlocked() {return player['+'].points.gte(8)}
        },
        12: {
            title: "MORE POWER!!",
            description: "^1.04 point gain",
            cost: new Decimal(2),
            unlocked() {return player['+'].points.gte(8)}
        },
        13: {
            title: "Need to get that 10th addition!",
            description: "/100 addition req., and multiply points by mega points",
            style: function(){
                if (hasUpgrade(this.layer, this.id)) {
                    return {'background': 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,253,0,1) 14%, rgba(0,255,25,1) 28%, rgba(0,244,237,1) 47%, rgba(0,1,242,1) 61%, rgba(235,0,246,1) 79%, rgba(255,0,0,1) 100%)'}
                } else {
                    return
                }
            },
            effect() {
                return player.m.points.add(1).pow(0.5)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(megapoints+1)<sup>0.5</sup>",
            cost: new Decimal(25),
            unlocked() {return player['+'].points.gte(9)}
        },
        14: {
            title: "Automation",
            description: "Fully automate rebirth upgrades, gain 50% of rebirth points per second, and gain 150% of prestige points per second",
            cost: new Decimal(30),
            unlocked() {return player['+'].points.gte(9)}
        },
        15: {
            title: "Boom!",
            description: "x15 point gain",
            cost: new Decimal(10000),
            unlocked() {return player['+'].points.gte(10)}
        },
        16: {
            title: "OP, but with a twist...",
            description: "^1.02 point gain, but /15 mega gain",
            cost: new Decimal(50000),
            unlocked() {return player['+'].points.gte(10)}
        },
        17: {
            title: "OH MY GOODNESS",
            description: "x20 rebirth gain",
            cost: new Decimal(1e8),
            unlocked() {return player['+'].points.gte(10)}
        },
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('m', 16)) mult = mult.div(15)
        if (hasUpgrade('i', 12)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    automate() {
        if (hasMilestone('u', 0)) {
            buyUpgrade('m', 11)
            buyUpgrade('m', 12)
            buyUpgrade('m', 13)
            buyUpgrade('m', 14)
            buyUpgrade('m', 15)
            buyUpgrade('m', 16)
            buyUpgrade('m', 17)
        }
    },
    passiveGeneration() {
        if (hasUpgrade('i', 12)) return 0.25
        return 0
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for mega points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player['+'].points.gte(8)}},
    ],
    layerShown(){return player['+'].points.gte(8)}
})

addLayer("u", {
    name: "ultra", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    branches: "m",
    color: "#F0F",
    requires: new Decimal(30e9), // Can be a function that takes requirement increases into account
    resource: "ultra points", // Name of prestige currency
    baseResource: "mega points", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    milestones: {
        0: {
            requirementDescription: "5 ultra points",
            effectDescription: "Automate mega upgrades!",
            done() { return player.u.points.gte(5) }
        }
    },
    upgrades: {
        11: {
            title: "Big boost",
            description: "x20 point gain",
            cost: new Decimal(1),
            unlocked() {return player['+'].points.gte(11)}
        },
        12: {
            title: "Scaling boost",
            description: "Multiply point gain by rebirth points",
            cost: new Decimal(3),
            effect() {
                return player.r.points.add(1).pow(0.06)
            },
            effectDisplay() {return 'x' + format(upgradeEffect(this.layer, this.id))},
            tooltip: "(rebirthpoints+1)<sup>0.06</sup>",
            unlocked() {return player['+'].points.gte(11)}
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x).pow(15) },
            title: "Ultra Buyable!",
            display() { return "Amount: " +  format(getBuyableAmount(this.layer, this.id).floor()) + "\nCost: " + format(this.cost().floor()) + " ulra points\nEffect: x" + format(new Decimal(1).mul(this.cost().sub(1)).times(50).pow(0.9).add(1)) + " point gain"},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {return player['+'].points.gte(12)}
        },
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        if (hasUpgrade('i', 13)) return 0.05
        if (player['+'].points.gte(14)) return 0.01
        return 0
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset for ultra points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player['+'].points.gte(11)}},
    ],
    layerShown(){return player['+'].points.gte(11)}
})

addLayer("i", {
    name: "infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "∞", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    branches: "u",
    color: "#FFF",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "infinities", // Name of prestige currency
    baseResource: "ultra points", // Name of resource prestige is based on
    baseAmount() {return player.u.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    upgrades: {
        11: {
            title: "The infinity",
            description: "x50 point gain",
            cost: new Decimal(1),
            unlocked() {return player['+'].points.gte(19)}
        },
        12: {
            title: "Multi-boost",
            description: "x20 point gain, x10 prestige point gain, x5 rebirth point gain, x2 mega point gain, and you gain 25% mega points per second",
            cost: new Decimal(3),
            unlocked() {return player['+'].points.gte(19)}
        },
        13: {
            title: ":)",
            description: "Gain 5% of ultra points per second",
            cost: new Decimal(5),
            unlocked() {return player['+'].points.gte(19)}
        },
        14: {
            title: "The final upgrade for v0.3",
            description: "Nothing, just nothing",
            cost: new Decimal(10),
            unlocked() {return player['+'].points.gte(19)}
        },
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for infinity points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player['+'].points.gte(19)}},
    ],
    layerShown(){return player['+'].points.gte(19)}
})