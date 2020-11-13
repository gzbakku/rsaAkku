

module.exports = (parent,data)=>{

	const lock = require("./lock");

	let locker = {
		password:'',
		book:{
			regDate:new Date().getTime(),
			vault:[]
		}
	};

	let controller = {
		functions:{
			get:()=>{return locker;},
			update_password:(p)=>{
				locker.password = lock.hash(p);
			},
      check_item:(tag)=>{
        if(locker.book.vault instanceof Array === false){
          locker.book.vault = [];
        }
        for(let i of locker.book.vault){
          if(i.tag === tag){return true;}
        }
        return false;
      },
			add_item:(item)=>{
        locker.book.vault.push(item);
        return lock.lock(JSON.stringify(locker.book),locker.password);
        // return true;
      },
      remove_item:(tag)=>{
        let index = 0;
        for(let i of locker.book.vault){
          if(i.tag === tag){break}else {index++;}
        }
        locker.book.vault.splice(index,1);
        return lock.lock(JSON.stringify(locker.book),locker.password);
      },
      save_text:(tag,data)=>{
        let index = 0,found = false;
        for(let i of locker.book.vault){
          if(i.tag === tag){found = true;break}else {index++;}
        }
        if(!found){return false;}
        locker.book.vault[index].data = data;
        return lock.lock(JSON.stringify(locker.book),locker.password);
      },
			lock:()=>{
				return lock.lock(JSON.stringify(locker.book),locker.password);
			},
			unlock:()=>{
				const work = lock.unlock(locker.password);
				if(!work){return false;}
				locker.book = work;
				return true;
			}
		}
	};

	engine.add.object("controller",controller);

	const main = engine.make.div({
		parent:parent,
		class:"lock-master",
	});

		const lock_master_logo = engine.make.div({
			parent:main,
			class:"lock-master-logo",
		});

			engine.make.image({
				parent:lock_master_logo,
				type:"local",
				location:"assets/images/lock.png",
				class:"lock-master-logo-logo",
			});

		const lock_master_info = engine.make.div({
			parent:main,
			class:"lock-master-info",
		});

			engine.make.div({
				parent:lock_master_info,
				text:"Rsa Akku",
				class:"lock-master-info-title",
			});

			engine.make.div({
				parent:lock_master_info,
				text:"this software is a rsa keys safe keep secured with a password, make sure your compter is not compromised, disconnect the internet while using this software for extra protection, use anti-virus with updated virus directories.",
				class:"lock-master-info-intro",
			});

		const lock_master_login = engine.make.div({
			parent:main,
			class:"lock-master-login",
		});

			const lock_master_login_cover = engine.make.div({
				parent:lock_master_login,
				class:"lock-master-login-cover",
			});

				const password_input = engine.make.input({
					parent:lock_master_login_cover,
					type:"password",
					class:"lock-master-login-cover-password",
					placeholder:'secure password',
					// value:'roku@1997'
				});

				let button_text = 'register';
				if(engine.data.get('masterBlaster','local')){
					button_text = 'login';
				}

				engine.make.div({
					parent:lock_master_login_cover,
					text:button_text,
					class:"lock-master-login-cover-button",
					function:()=>{
						let password = engine.binder.text(password_input);
						if(!password || password.length < 6){
							return engine.ui.getComp("commonUi","alertComp").init(parent,{
								message:'password should be atleast 6 characters long'
							});
						}
						controller.functions.update_password(password);
						if(button_text === "register"){
							require("./register")(controller);
						} else {
							require("./login")(controller);
						}
					}
				});

};
