<script>
  import Common from '../components/common/common.js';
  import Config from '../components/common/config.js';

  const apiConf = {
    fetch: false,
    api: {  // 使用 例子 get post link
      host: 'http://115.28.110.211:3001/p',
      methods: [{
        name: 'queryDisplay',
        method: 'GET',
        path: '/me/display',
        traditional: true,
      }, {
        name: 'logout',
        method: 'LINK',
        path: '/logout',
        traditional: true,
      }, {
        name: 'changeLang',
        method: 'POST',
        path: '/lang/:lang  ',
        traditional: true,
      }],
    },
    homePage: {
      host: resourceConfig.api,
      methods: [
        {
          name: 'getIsLogined',
          method: 'POST',
          path: '/zhzwpt/isLogin',
          traditional: true,
        },
        {
          name: 'getUserInfo',
          method: 'GET',
          path: '/zhzwpt/userinfo',
          traditional: true,
        }
      ]
    },
    userCenter: {
      host: resourceConfig.api,
      methods: [
        {
          name: 'handleLogin',
          method: 'POST',
          path: '/auth/zwwsuser/login',
          traditional: true,
        },
        {
          name: 'Logout',
          method: 'GET',
          path: '/zhzwpt/logout',
          traditional: true,
        },
        {
          name: 'getUserInfo',
          method: 'GET',
          path: '/zhzwpt/userinfo',
          traditional: true,
        },
        {
          name: 'getIsLogined',
          method: 'POST',
          path: '/zhzwpt/isLogin',
          traditional: true,
        },
      ]
    },
  }

  const _Api = function (key, conf) {
    let _self = this;
    this.key = key;
    this.conf = conf;
    this.getParaTime = function (first) {
      if (first)
        return "_t=" + new Date().getTime();
      else
        return "&_t=" + new Date().getTime();
    };
    this.registerFun = function (_method) {
      return function (params, el) {
        if (params && params.localName == 'form') {
          params = $(params).serialize();
          let _params = {};
          params = params.split('&');
          for (let i = 0; i < params.length; i++) {
            let _param = params[i].split('=');
            if (_param && _param.length == 2) {
              _params[_param[0]] = _param[1];
            }
          }
          params = _params;
        } else if (typeof params == 'string' && params.match('=')) {
          //console.log(params);
          let _params = {};
          params = params.split('?');
          params = params.length == 2 ? params[1] : params[0];
          params = params.split('&');
          for (let i = 0; i < params.length; i++) {
            let _param = params[i].split('=');
            if (_param && _param.length == 2) {
//              console.log(_param[1]);
              _params[_param[0]] = _param[1];
            }
          }
          params = _params;
//          console.log(params);
        }
        if (_method.method == 'LINK' || _method.method == 'JUMP') {
          params = params || {};
          if (el && $(el)) {
            let data = $(el).data()['linkParams'];
            if (data) {
              try {
                data = JSON.parse(data);
                for (let i in data) {
                  if (Object.prototype.hasOwnProperty.call(data, i)) {
                    params[i] = data[i];
                  }
                }
              } catch (e) {

              }
            }
          }
          let url = _self.conf.host + _method.path;
          let _params = [];
          for (let i in params) {
            if (Object.prototype.hasOwnProperty.call(params, i)) {
              _params.push(i + '=' + encodeURIComponent($.trim(params[i])));
              url = url.replace(':' + i, params[i]);
            }
          }
          if (_params.length > 0) {
            url += '?' + _params.join('&');
          }
          if (_method.method == 'LINK') {
            return url;
          } else {
            location.href = url;
          }
        } else {
          let jQuery = $;
          let _def = jQuery.Deferred();
          let url = _self.conf.host + _method.path;
          let data = {};
          let _params = [];
//          console.log(params);
          if (params) {
            for (let i in params) {
              if (Object.prototype.hasOwnProperty.call(params, i)) {
                data[i] = params[i];
                _params.push(i + '=' + encodeURIComponent(params[i]));
                url = url.replace(':' + i, params[i]);
              }
            }
          }
//          console.log(url);
          let ajaxParam = {
            type: _method.method,
            url: url,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded',
          };
          if (_method.method == 'GET') {
            if (_params.length > 0) {
              ajaxParam.url += '?' + _params.join('&');
            }
          } else {
            console.log(data);
            ajaxParam.processData = data;
            ajaxParam.data = data;
          }
          //
          if (ajaxParam.url.indexOf("?") >= 0) ajaxParam.url += this.getParaTime();
          else ajaxParam.url += "?" + this.getParaTime(true);
          //
          if (_method.traditional) {
            ajaxParam.xhrFields = {
              withCredentials: true,
            };
          }

          //加入进度条
          NProgress && NProgress.start();
          $('.md-refresh').addClass('spin');

          $.ajax(ajaxParam).done(function (result) {


            if (result.return_code == 0) {
              _def.resolve(result.data, result);
            } else {
              if (result.return_code == -100039 && _method.traditional) {
                // 还需要清除缓存
                location.href = result.data.loginUrl;
              } else {
                let e = new Error(result.return_message);
                e.errCode = result.return_code;
                //提示信息
                // Common.showMsgError(result.return_message);
                //
                _def.reject(e, result);

              }
            }
          }).error(function (e, errText) {
            e.message = '请求失败 [' + e.status + ']';
//              console.log(e.statusCode(e.readyState))
//              console.log(arguments);

            //提示信息
            Common.showMsgError(e.message);
            _def.reject(e, errText);

          }).complete(function () {
            NProgress && NProgress.done();
            $('.md-refresh').removeClass('spin');
//              console.log(arguments);
          });
          return _def;
        }
      };
    };
    for (let i = 0; i < conf.methods.length; i++) {
      let method = conf.methods[i];
      if (method && method.name) {
        _self[method.name] = this.registerFun(method);
      }
    }
  };

  const api = {};
  for (let j in apiConf) {
    if (Object.prototype.hasOwnProperty.call(apiConf, j)) {
      let conf = apiConf[j];
      if (conf && conf.host) {
        api[j] = new _Api(j, conf);
      }
    }
  }
  ;
  api.socketApi = {
    host: 'http://115.28.128.210:3001/'
//    host: 'http://localhost:3001/'
  };
  export default api;

</script>
