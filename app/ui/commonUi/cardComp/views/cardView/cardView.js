

module.exports = (parent,data)=>{

	const main = engine.make.div({
		parent:parent,
		class:"card-master",
	});

		const card_master_card = engine.make.div({
			parent:main,
			class:"card-master-card",
		});

			const card_master_card_header = engine.make.div({
				parent:card_master_card,
				class:"card-master-card-header",
			});

				for(let item of data.buttons){
					engine.make.div({
						parent:card_master_card_header,
						text:item["value"],
						class:"card-master-card-header-button",
						function:()=>{
							if(typeof(item.function) === "function"){
								item.function(main);
							}
						}
					});
				}

			const body = engine.make.div({
				parent:card_master_card,
				class:"card-master-card-body",
			});

	return {
		main:main,
		body:body
	};

};
