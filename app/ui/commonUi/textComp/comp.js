//controllers
const log = false;                        //turn on to log engine.common.tell string inputs
const compRef = '-comp-textComp';             //dont worry about this
const type = 'comp';                      //type of app

//ids
var parentId;
var compId;

const init = (pid,data) => {         //pid referes to the parentPageId, pass this var when you init thiscomp.

  if(pid == null || pid == undefined){
    return engine.common.error('no_parent_page_ref_found'); //common error logger
  }

  parentId = pid;               //set parent page ref
  compId = parentId + compRef;  //set comp id
  engine.make.init.comp(compId,parentId,'comp');
  build(data);                      //start build you can also start fetch here.

}

function build(data){

  if(!data.data){data.data = {};}

  const card = engine.ui.getComp("commonUi","cardComp").init(compId,{
		buttons:[
      {value:'save',function:async (m)=>{
        const saver = await editor.save()
        .then((d)=>{
          return d;
        }).catch(()=>{
          return false;
        });
        if(!saver){
          return engine.ui.getComp("commonUi","alertComp").init(compId,{
            message:'failed to save this document, please try again.'
          });
        }
        const save = engine.global.object.controller.functions.save_text(data.tag,saver);
        if(!save){
          return engine.ui.getComp("commonUi","alertComp").init(compId,{
            message:'failed to save this document, please try again.'
          });
        } else {
          return engine.ui.getComp("commonUi","alertComp").init(compId,{
            message:'document saved successfully.'
          });
        }
      }},
			{value:'close',function:(m)=>{engine.view.remove(m);}}
		]
	});

  const editorObject = require("@editorjs/editorjs");
  const editor = new editorObject({
    inlineToolbar: ['link', 'marker', 'bold', 'italic'],
    holder:card.body,
    autofocus: true,
    placeholder: 'Let`s write an awesome story!',
    data:data.data,
    tools: {
      header: require("@editorjs/header"),
      list: require("@editorjs/list")
    }
  });

}

module.exports = {init:init,ref:compRef,type:type}
