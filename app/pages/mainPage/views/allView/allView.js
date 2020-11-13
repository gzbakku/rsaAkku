module.exports = (parent,data)=>{

	const main = engine.make.div({
		parent:parent,
		class:"allView-master",
	});

		//***************************************
		//menu section

		// const allView_master_menu = engine.make.div({
		// 	parent:main,
		// 	class:"allView-master-menu",
		// });
		//
		// 	engine.make.image({
		// 		parent:allView_master_menu,
		// 		type:"local",
		// 		location:"assets/images/close.png",
		// 		class:"allView-master-menu-close",
		// 	});

		//***************************************
		//logo section

		const allView_master_logo = engine.make.div({
			parent:main,
			class:"allView-master-logo",
		});

			engine.make.image({
				parent:allView_master_logo,
				type:"local",
				location:"assets/images/lock.png",
				class:"allView-master-logo-lock",
			});

		//***************************************
		//add section

		const allView_master_new = engine.make.div({
			parent:main,
			class:"allView-master-new",
		});

			const allView_master_new_box = engine.make.div({
				parent:allView_master_new,
				class:"allView-master-new-box",
			});

				const typeInput = engine.make.select({
					parent:allView_master_new_box,
					type:"select",
					options:[
						{text:'rsa keys',value:'rsa'},
						{text:'text document',value:'text'}
					],
					class:"allView-master-new-box-type",
				});

				const nameInput = engine.make.input({
					parent:allView_master_new_box,
					type:"string",
					placeholder:"name",
					class:"allView-master-new-box-tag",
					// value:'one'
				});

				const sizeInput = engine.make.input({
					parent:allView_master_new_box,
					type:"number",
					placeholder:"key size",
					class:"allView-master-new-box-size",
					value:128
				});

				const keypair = require('keypair');

				engine.make.div({
					parent:allView_master_new_box,
					text:"add",
					class:"allView-master-new-box-button",
					function:()=>{

						const type = engine.binder.text(typeInput);
						const name = engine.binder.text(nameInput);
						const size = engine.binder.number(sizeInput);

						if(!type){
							return engine.ui.getComp("commonUi","alertComp").init(parent,{
								message:'please provide a valid type'
							});
						}
						if(!name){
							return engine.ui.getComp("commonUi","alertComp").init(parent,{
								message:'please provide a valid name'
							});
						}
						if(!size && type === "rsa"){
							return engine.ui.getComp("commonUi","alertComp").init(parent,{
								message:'please provide a key size'
							});
						}

						if(engine.global.object.controller.functions.check_item(name)){
							return engine.ui.getComp("commonUi","alertComp").init(parent,{
								message:'item with this name already exists try another name.'
							});
						}
						let build;
						if(type === "rsa"){
							build = {
								tag:name,
								type:'rsa',
								key:keypair(size)
							};
						} else {
							build = {
								tag:name,
								type:'text',
								data:null
							};
						}

						if(!engine.global.object.controller.functions.add_item(build)){
							return engine.ui.getComp("commonUi","alertComp").init(parent,{
								message:'failed to add this item try again.'
							});
						} else {
							make_list_item(build,true);
						}
					}
				});

		//***************************************
		//list section

		// engine.ui.getComp("commonUi","cardComp").init(parent,{
		// 	buttons:[
		// 		{value:'close',function:(m)=>{engine.view.remove(m);}}
		// 	]
		// });

		const allView_master_list = engine.make.div({
			parent:main,
			class:"allView-master-list",
		});

			const allView_master_list_box = engine.make.div({
				parent:allView_master_list,
				class:"allView-master-list-box",
			});

				let locker = engine.global.object.controller.functions.get();
				let items = [];
				if(locker){
					items = locker.book.vault;
				}

				function open(item){
					if(!item){console.log(item);return;}
					if(item.type === "rsa"){
						engine.ui.getComp("commonUi","rsaComp").init(parent,{
							keys:item.key
						});
					} else {
						engine.ui.getComp("commonUi","textComp").init(parent,{
							data:item.data,
							tag:item.tag
						});
					}
				}

				for(let item of items){
					if(item){make_list_item(item);}
				}//item loop

				function make_list_item(item,do_open){

					if(do_open){
						open(item);
					}

					const allView_master_list_box_item = engine.make.div({
						parent:allView_master_list_box,
						class:"allView-master-list-box-item",
					});

						engine.make.div({
							parent:allView_master_list_box_item,
							text:item.tag,
							class:"allView-master-list-box-item-type",
							function:()=>{open(item);}
						});

						engine.make.div({
							parent:allView_master_list_box_item,
							text:item.type,
							class:"allView-master-list-box-item-name",
							function:()=>{open(item);}
						});

						const allView_master_list_box_item_delete = engine.make.div({
							parent:allView_master_list_box_item,
							class:"allView-master-list-box-item-delete",
						});

							engine.make.image({
								parent:allView_master_list_box_item_delete,
								type:"url",
								location:"assets/images/delete.png",
								class:"allView-master-list-box-item-delete-delete",
								function:()=>{
									if(engine.global.object.controller.functions.remove_item(item.tag)){
										engine.view.remove(allView_master_list_box_item);
									}
								}
							});

				}

};
