//controllers
const log = false;
const type = 'page';

//ids
const pageId = "page-lock";
const pageName = 'lockPage';

//init page
const init = () => {
  engine.make.init.page(pageId,"page");  //init page
  build();                               //start build
}

//these trackers will be triggered when this module is routed
const trackers = {
  title:'sample page title',
  meta:[
    {
      name:'description',
      content:'this is a sample page description'
    },
    {
      name:'keywords',
      content:'page,vegana'
    }
  ],
  function_data:{},
  //function will be triggered with the function data as input when the module is routed to.
  function:(function_data)=>{}
};

//build page
function build(){

  engine.ui.getComp("commonUi","menuComp").init(pageId);

  require('./views/lockView/lockView.js')(pageId);

}

//do not change current exports you are free to add your own though.
let pageControllers = {
  init:init,
  ref:pageId,
  type:type,
  name:pageName,
  contModules:{},
  contList:{},
  trackers:trackers
};
module.exports = pageControllers;
window.pageModules[pageName] = pageControllers;
