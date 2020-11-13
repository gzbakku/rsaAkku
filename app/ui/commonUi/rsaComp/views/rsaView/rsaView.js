

module.exports = (parent,data)=>{

	const card = engine.ui.getComp("commonUi","cardComp").init(parent,{
		buttons:[
			{value:'close',function:(m)=>{engine.view.remove(m);}}
		]
	});

	const main = engine.make.div({
		parent:card.body,
		class:"rsa-master",
	});

		engine.make.div({
			parent:main,
			text:clean_string(data.keys.private),
			class:"rsa-master-private",
		});

		engine.make.div({
			parent:main,
			text:clean_string(data.keys.public),
			class:"rsa-master-public",
		});

};

function clean_string(s){
	while (s.indexOf("\n") >= 0) {
		s = s.replace("\n","<br>");
	}
	return s;
}
