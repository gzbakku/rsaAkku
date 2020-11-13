

module.exports = (controller)=>{

  const hold = controller.functions.unlock();
  if(!controller.functions.unlock()){
    return engine.ui.getComp("commonUi","alertComp").init("page-router",{
      message:'login failed for some reson try again.'
    });
  }
  engine.router.navigate.to.page(engine.get.pageModule("mainPage"));

}
