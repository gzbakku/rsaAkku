const builder = require("electron-builder");
const Platform = builder.Platform;

build();

async function build(){

  await builder.build({
    targets: Platform.WINDOWS.createTarget(),
    config: {
      "appId":"app.vegana.rsaakku",
      "productName":"RsaAkku Keys Manager",
      "copyright":"tejasav dutt",
      "directories":{
        "output":"build/electron"
      },
      "win":{
        "icon":"assets/images/lockit.png",
        "target":"portable"
      },
      "linux":{
        "target":"AppImage"
      }
    }
  })
  .then(()=>{
    return true;
  })
  .catch((e)=>{
    console.error(e);
    return false;
  });

}
