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
                    function() { if (player['+'].points.gte(9)) {return "- +1 Upgrades for mega layer"} },],
            ],
        },
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 21)) mult = mult.div(2)
        if (hasUpgrade('p', 22)) mult = mult.div(1.5)
        if (hasUpgrade('r', 21)) mult = mult.div(5)
        if (hasUpgrade('m', 13)) mult = mult.div(100)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
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
            description: "2x addition gain",
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
                    return "1.5x addition gain"
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
        if (hasUpgrade('r', 17)) mult = mult.pow(1.05)
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
                return player.p.points.add(1).pow(0.3)
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
                return player.p.points.add(1).pow(0.1)
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
            description: "x5 addition gain",
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
            description: "x100 addition gain, and multiply points by mega points",
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
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for mega points", onPress(){if (canReset(this.layer)) doReset(this.layer)}, unlocked() {return player['+'].points.gte(8)}},
    ],
    layerShown(){return player['+'].points.gte(8)}
})