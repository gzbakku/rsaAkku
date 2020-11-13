

module.exports = (controller)=>{

  if(!controller.functions.lock()){
    return engine.ui.getComp("commonUi","alertComp").init("page-router",{
      message:'registration failed for some reson try again.'
    });
  }

  engine.router.navigate.to.page(engine.get.pageModule("mainPage"));

}
