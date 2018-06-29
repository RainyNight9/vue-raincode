const notify = require('msg-notify');
const verify = require('./verify');
const moment = require('moment');


const common = {
  showMsgSuccess(msg){
    notify(msg, 'success')
  },
  showMsgError(msg){
    try {
      // notify(msg, 'error')
      notify({msg: msg, type: 'error'})
    } catch (e) {
      console.log(e);
    }
  },
  showMsgInfo(msg){
    notify(msg, 'info')
  },
  showMsgWarning(msg){
    notify(msg, 'warning')
  },
  setLabelFloat(){
    if (!$) return;
    $(".form-control").each(function () {
      const $this = $(this);
      const txt = $("input", $this).val();
      if (txt !== "") {
        $this.removeClass("empty");
      }
    });
  },
  getParaTime: function (first) {
    if (first)
      return "_t=" + new Date().getTime();
    else
      return "&_t=" + new Date().getTime();
  },
  checkImgExtension(fileName){
    let ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (ext.toUpperCase() === "PNG" || ext.toUpperCase() === "JPG" ||
      ext.toUpperCase() === "JPEG" || ext.toUpperCase() === "GIF") {
      return true;
    }
    return false;
  },
  checkExcelExtension(fileName){
    let ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (ext.toUpperCase() == "XLS" || ext.toUpperCase() == "XLSX") {
      return true;
    }
    return false;
  },
  checkPdfExtension(fileName){
    let ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (ext.toUpperCase() == "PDF") {
      return true;
    }
    return false;
  },
  checkWordExtension(fileName){
    let ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (ext.toUpperCase() == "DOC" || ext.toUpperCase() == "DOCX") {
      return true;
    }
    return false;
  },
  checkPptExtension(fileName){
    let ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (ext.toUpperCase() == "PPT" || ext.toUpperCase() == "PPTX") {
      return true;
    }
    return false;
  },
  isPreview(fileName){
    fileName = fileName || "";
    let ext = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (ext.toUpperCase() == "PDF" || ext.toUpperCase() == "DOC" || ext.toUpperCase() == "DOCX" ||
      ext.toUpperCase() == "XLS" || ext.toUpperCase() == "XLSX") {
      return true
    }
    return false;
  },
  isImgSizeTooLarge(size){
    return size > 1024 * 1024 * 4;
  },
  getHost(){
    let host = (location.origin !== resourceConfig.api2)
      ? "http://120.27.5.58:8080/eWallet"
      : location.origin;
    return host;
  },
  getTime(time){
    if (!time)return "";
    let i = parseInt(time);
    if (isNaN(i))return "";
    return moment(i).format("YYYY-MM-DD HH:mm");
  },
  getTime2(time){
    if (!time)return "";
    let i = parseInt(time);
    if (isNaN(i))return "";
    return moment(i).format("YYYY-MM-DD");
  },
  getTime3(time){
    if (!time)return "";
    let i = parseInt(time);
    if (isNaN(i))return "";
    return moment(i).format("MMDD");
  },
  getTime4(time){
    if (!time)return "";
    let i = parseInt(time);
    if (isNaN(i))return "";
    return moment(i).format("YYYY-MM-DD HH:mm");
  },
  fmtDate(obj){
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
  },
  getVerify(){
    verify._showResult = function (errorMessage) {
      this.showMsgError(errorMessage);
    }.bind(this);
    return verify;
  },
  DateAdd(interval, number, date) {
    switch (interval) {
      case "y ": {
        date.setFullYear(date.getFullYear() + number);
        return date;
        break;
      }
      case "q ": {
        date.setMonth(date.getMonth() + number * 3);
        return date;
        break;
      }
      case "m ": {
        date.setMonth(date.getMonth() + number);
        return date;
        break;
      }
      case "w ": {
        date.setDate(date.getDate() + number * 7);
        return date;
        break;
      }
      case "d ": {
        date.setDate(date.getDate() + number);
        return date;
        break;
      }
      case "h ": {
        date.setHours(date.getHours() + number);
        return date;
        break;
      }
      case "m ": {
        date.setMinutes(date.getMinutes() + number);
        return date;
        break;
      }
      case "s ": {
        date.setSeconds(date.getSeconds() + number);
        return date;
        break;
      }
      default: {
        date.setDate(d.getDate() + number);
        return date;
        break;
      }
    }
  },
  variable(){//今日增加二十天
    let now = new Date();
    let newDate = this.DateAdd("d ", 20, now);
    newDate = newDate.toLocaleDateString();
    let reg = new RegExp("/", "g"); //创建正则RegExp对象
    newDate = newDate.replace(reg, "-");
    return newDate;
  },
  today(){//今天
    let now = new Date();
    now = now.toLocaleDateString();
    let reg = new RegExp("/", "g"); //创建正则RegExp对象
    now = now.replace(reg, "-");
    return now;
  },
  today2(){//今天
    let day2 = new Date();
    day2 = day2.getTime();
    return this.getTime2(day2);
  },
  isJSON(str) {
    if (typeof str == 'string') {
      try {
        let obj = JSON.parse(str);
        if (str.indexOf('{') > -1) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  },
  transition(obj){
    let arr = [];
    for (let i in obj) {
      let obj2 = {
        name: "",
        value: ""
      };
      obj2.name = i;
      obj2.value = obj[i];
      arr.push(obj2);
    }
    return arr;
  },
}


module.exports = common;
