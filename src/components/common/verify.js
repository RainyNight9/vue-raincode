//验证

var verify = {
    _showResult: null,
    showResult: function (errorMessage) {
        if (errorMessage) {
            if (this._showResult)
                this._showResult(errorMessage);
        }
    },
    GotFocus: function (ID) {
        $("#" + ID).focus();
    },
    trim: function (ostr) {
        if (!ostr.replace)return ostr;
        return ostr.replace(/^\s+|\s+$/g, "");
    },
    isDiscountNum(value, errorMessage){//是否为0-1,不包括0和1，且只有两位小数
        value = this.trim(value);
        value = Number(value);
        if (isNaN(value) || (value < 0 || value > 1) || (value.toString().length > 4)) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isPositiveNum(value, errorMessage){//是否为正整数
        value = this.trim(value);
        var re = /^[0-9]*[1-9][0-9]*$/;
        if (!re.test(value)) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isNegativeNum(value, errorMessage){//是否为非负整数
        value = this.trim(value);
        var re = /^(0|[1-9]\d*)$/;
        if (!re.test(value)) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isChntiveNum: function (value,errorMessage){// 判断是否包含汉字
        value = this.trim(value);
        var re = /^[u4E00-u9FA5]+$/;
          if(!re.test(value)){
            this.showResult(errorMessage);
            return false;
          }
          return true;
    },
    isName: function (value, errorMessage) {//判断是否是名字（必须是汉字和字母）
        value = this.trim(value);
        var re = /^([A-Za-z]|[\u4E00-\u9FA5])+$/;
        if (!re.test(value)) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isContactWay: function (value, errorMessage) {//判断是否是联系方式(固话，手机，传真)
        value = this.trim(value);
        var re = /(^(\d{3,4}-)?\d{7,8})$|^((1[0-9][0-9]\d{8}$))/;
        if (!re.test(value)) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isEmpty: function (value, errorMessage) {//判断是否为空
        value = this.trim(value);
        if (value == "") {
            this.showResult(errorMessage);
            return true;
        }
        return false;
    },
    isEmpty2: function (value, errorMessage, ID) {//判断是否为空
        value = this.trim(value);
        if (value == "") {
            this.showResult(errorMessage);
            this.GotFocus(ID);
            return true;
        }
        return false;
    },
    isMinLength: function (value, errorMessage, length) {//最小长度
        value = this.trim(value);
        if (value.length < length) {
            this.showResult(errorMessage);
            return true;
        }
        return false;
    },
    isMaxLength: function (value, errorMessage, length) {//最大长度
        value = this.trim(value);
        if (value.length > length) {
            this.showResult(errorMessage);
            return true;
        }
        return false;
    },
    isEquals: function (value1, value2, errorMessage) {//是否相等
        value1 = this.trim(value1);
        value2 = this.trim(value2);
        if (value1 != value2) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isEqualLength: function (value, length, errorMessage) {
        value = this.trim(value);
        if (value.length != length) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isPhone: function (value, errorMessage) {//是否为手机号
        value = this.trim(value);
        var re = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        if (!re.test(value)) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isQQ: function (value, errorMessage) {//是否为QQ
        value = this.trim(value);
        var re = /^[1-9][0-9]{4,14}$/;
        if (!re.test(value)) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isEmail: function (value, errorMessage) {//是否为邮箱
        value = this.trim(value);
        var re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!re.test(value)) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isCard: function (value, errorMessage) {//是否为身份证
        value = this.trim(value);
        var re = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (!re.test(value)) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isNumber: function (value, errorMessage) {//是否为数字
        value = this.trim(value);
        if (isNaN(value)) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isCommonMobile: function (value, errorMessage) {//校验普通电话、传真号码：可以“+”或数字开头，可含有“-” 和 “ ”
        value = this.trim(value);
        var re = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
        if (!re.test(value)) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isNumOrAlphabet: function (value, errorMessage) {//校验 是否为 数字或者字母
        value = this.trim(value);
        var re = /^[A-Za-z0-9]+$/;
        if (!re.test(value)) {
            this.showResult(errorMessage);
            return true;
        }
        return false;
    },
    isPrice: function (value, errorMessage) {//是否为价格
        value = this.trim(value);
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (!reg.test(value)) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isAgeIn18to99: function (value, errorMessage) { //通过身份证验证年龄是否为18-90

        /*获取身份证出生日期的时间戳，1970年以前的为负数(已测试)*/
        try {
            var value = value.trim();
            var year = parseInt(value.slice(6, 10));
            var month = parseInt(value.slice(10, 12));
            var day = parseInt(value.slice(12, 14));
            var birthTime = new Date().setFullYear(year, month, day);

            var d = new Date();
            var age90 = d.setFullYear(d.getFullYear() - 90); //年龄的时间戳差
            d = new Date();
            var age18 = d.setFullYear(d.getFullYear() - 18); //年龄的时间戳差

            if (birthTime >= age90 && birthTime <= age18) {
                return true;
            }
        } catch (e) {
        }
        this.showResult(errorMessage);
        return false;
    },
    isOrganizationCode: function (value, errorMessage) {//判断组织机构代码证
        value = this.trim(value);
        var re = /^[0-9A-Z]{8}[0-9X]{1}$/;   //组织机构代码只可为数字或大写拉丁字母 9位
                                            //组织机构代码最后一位只可为只可为数字或大写拉丁字母:X.
        if (!re.test(value)) {
            this.showResult(errorMessage);
            return false;
        }
        return true;
    },
    isTaxpayerNum(value, errorMessage){//纳税人识别号验证
      value = this.trim(value);
      var re = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/; //企业税号由大写字母与数字组成
      if (!re.test(value)) {
        this.showResult(errorMessage);
        return false;
      }
      return true;
    },
    isBusinessNum(value, errorMessage){//验证工商注册号
      value = this.trim(value);
      if(value.length == 15){
        var sum = 0;
        var s = [];
        var p = [];
        var a = [];
        var m = 10;
        p[0] = m;
        for(var i=0;i<value.length;i++){
          a[i] = parseInt(value.substring(i,i+1),m)
          s[i] = (p[i]%(m+1))+a[i]
          if(0 == s[i]%m){
            p[i+1]=10*2
          }else{
            p[i+1]=(s[i]%m)*2
          }
        }
        if(1 == (s[14]%m)){
          return true;
        }else {
          this.showResult(errorMessage);
          return false;
        }
      }else {
        this.showResult(errorMessage);
        return false;
      }
    },
    isNumLetter: function (value,errorMessage){// 只是数字和字母
      value = this.trim(value);
      var re = /^[0-9A-Za-z]$/;
      if(!re.test(value)){
        this.showResult(errorMessage);
        return false;
      }
      return true;
    },
    isSocialCode:function (value,errorMessage){// 社会信用代码
      value = this.trim(value);
      var re = /^([^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10})$/;
      if(!re.test(value)){
        this.showResult(errorMessage);
        return false;
      }
      return true;
    },
}
module.exports = verify;
