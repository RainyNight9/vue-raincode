import Common from './common.js';

var ValidateForm = {
  validate(fields, attrName){
    {/*name value*/}
    for (var f in fields) {

      if (typeof ( fields[f]) == " function ") continue;
      var target = this.getTarget(f, attrName)
      if (target.length == 0)continue;
      var value = fields[f];
      var isOk = this.forEachTarget(target, f, value);
      if (!isOk)return false;
    }
    return true;
  },
  getTarget(f, attrName){
    attrName = attrName || "name";
    var str = "*[" + attrName + "='" + f + "']";
    return $(str);
  },
  forEachTarget(targets, f, v){
    for (var i = 0; i < targets.length; i++) {
      var target = $(targets[i]);
      var rules = this.getRules(target);
      var messages = this.getMessages(target);
      for (var j = 0; j < rules.length; j++) {
        var rule = rules[j];
        var message = (messages.length >= j && messages[j]) || "";
        var isOk = this.checkRule(target, rule, v, message);
        if (!isOk)return false;
      }
    }
    return true;
  },
  getRules(target){
    var rules = target.data("rules");
    return (rules && rules.split(',')) || [];
  },
  getMessages(target){
    var messages = target.data("messages");
    return (messages && messages.split('@#$')) || [];
  },
  checkRule(target, rule, value, message){
    if (rule == "required") {//判断是否为空
      message = message || "这是必填字段";
      var isEmpty = Common.getVerify().isEmpty(value, message);
      if (isEmpty) {
        target.focus();
        return false;
      }
    } else if(rule == "email"){//判断邮箱
      message = message || "请填写正确的邮箱";
      var isEmail =  Common.getVerify().isEmail(value,message);
      if(!isEmail){
        target.focus();
        return false;
      }
    } else if(rule == "card"){//判断身份证格式
      message = message || "身份证格式不正确";
      var isCard = Common.getVerify().isCard(value,message);
      if(!isCard){
        target.focus();
        return false;
      }
    } else if(rule == "phone"){//判断是否为手机号
      message = message || "手机号格式不正确";
      var isPhone = Common.getVerify().isPhone(value,message);
      if(!isPhone){
        target.focus();
        return false;
      }
    } else if(rule == "contactWay"){//判断联系方式(电话手机  传真)
      message = message || "请输入正确的联系方式";
      var isContactWay = Common.getVerify().isContactWay(value,message);
      if(isContactWay){
        target.focus();
        return false
      }
    } else if(rule == "nonnegative"){
      message = message || "请输入非负整数";
      var isNonnegative = Common.getVerify().isNegativeNum(value,message);
      if(!isNonnegative){
        target.focus();
        return false
      }
    }
    return true;
  }
}

export default ValidateForm;
