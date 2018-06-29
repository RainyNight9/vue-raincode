const config = {
  getHost(localUrl){
    let host="";
    const myOrigin = location.protocol + "//" + location.host;
    if(myOrigin.indexOf("localhost") >= 0){//本地调试时
      host = localUrl;
    }else if(myOrigin.indexOf(".cn") < 0){//服务器ip时
      //host = myOrigin+"/eWallet";    //临时为 收发文去掉
      host = myOrigin;
    }else{//服务器域名时
      host = myOrigin;
    }
    if (resourceConfig.oaSupport) {
      host=resourceConfig.appApiOA;
    }
    return host;
  }
};
module.exports = config;
