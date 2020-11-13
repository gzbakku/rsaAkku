const comps = {
	"alertComp":require("./alertComp/comp.js"),
	"cardComp":require("./cardComp/comp.js"),
	"menuComp":require("./menuComp/comp.js"),
	"rsaComp":require("./rsaComp/comp.js"),
	"textComp":require("./textComp/comp.js"),
};

engine.ui.add("commonUi",comps);