
//import all the pages here which you want to be in the app and use engine.get.pageModule api to get the page
const mainPage = require('./pages/mainPage/page');
const lockPage = require('./pages/lockPage/page');

//declare the first page module here
const startPage = lockPage;

/*set the base url to the native vegana cdn,
or if hosting on non native platform please
set the baseurl to where the files for the project are held*/
const baseHref = null;

//------------------------------------------------------------------------------
//dont fuck with anything below
engine.router.set.baseHref(baseHref);

engine.sketch.fonts.add('default','bigShoulders','assets/fonts/BigShouldersStencilText-Regular.ttf');

require('./ui/index.js');

if(false){
  let locker = {
		password:'',
		book:{
			regDate:new Date().getTime(),
			vault:[]
		}
	};
  const lock = require("./pages/lockPage/views/lockView/lock.js");
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
  controller.functions.update_password("test_password_here");
  controller.functions.unlock();
	engine.add.object("controller",controller);
}

if(engine.router.active.page == null){
  startPage.init();
}
