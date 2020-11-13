

module.exports = (parent,data)=>{

	const main = engine.make.div({
		parent:parent,
		class:"alert-master",
	});

		engine.make.div({
			parent:main,
			class:"alert-master-background",
		});

		const alert_master_card = engine.make.div({
			parent:main,
			class:"alert-master-card",
		});

			engine.make.div({
				parent:alert_master_card,
				text:data.message,
				class:"alert-master-card-message",
			});

			const alert_master_card_buttons = engine.make.div({
				parent:alert_master_card,
				class:"alert-master-card-buttons",
			});

				if(!data.buttons){
					data.buttons = [{
						text:'ok',
						function:(d)=>{engine.view.remove(d);}
					}];
				}

				for(let item of data.buttons){
					engine.make.div({
						parent:alert_master_card_buttons,
						text:item["text"],
						class:"alert-master-card-buttons-buttons",
						function:()=>{
							item.function(main);
						}
					});
				}

};
