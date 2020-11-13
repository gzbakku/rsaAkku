const CryptoJS = require("crypto-js");

module.exports = {

  unlock:(password)=>{

    let master = engine.data.get('masterBlaster','local');
    if(!master || typeof(master) !== "object"){
      return engine.ui.getComp("commonUi","alertComp").init("page-router",{
        message:'master collection is corrupted.'
      });
    }
    let cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(master.ct)
    });
    cipherParams.iv = CryptoJS.enc.Base64.parse(master.iv);
    cipherParams.salt = CryptoJS.enc.Base64.parse(master.salt);
    let dework = CryptoJS.AES.decrypt(cipherParams,password);
    try{
      if(!dework.toString(CryptoJS.enc.Utf8)){
        return false;
      }
      let parse = JSON.parse(dework.toString(CryptoJS.enc.Utf8));
      return parse;
    } catch(_){
      return engine.ui.getComp("commonUi","alertComp").init("page-router",{
        message:'master collection is corrupted.'
      });
    }

  },

  lock:(keys,password)=>{
    let work = CryptoJS.AES.encrypt(keys,password);
    let collect = {
      iv:work.iv.toString(CryptoJS.enc.Base64),
      salt:work.salt.toString(CryptoJS.enc.Base64),
      ct:work.ciphertext.toString(CryptoJS.enc.Base64),
    };
    return engine.data.reset('masterBlaster',collect,'local');
  },

  hash:(p)=>{
    let c = '------+++fg3434gvg+++-----------';
    for(let i of p){c += i + "df098908d09f8d09f8";}
    c += '------+++f4556345gfg5+++-----------';
    return CryptoJS.SHA256(c).toString(CryptoJS.enc.Base64);
  }

}
