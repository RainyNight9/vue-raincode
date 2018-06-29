<template>
  <div class="page">
    <h3 class="title">{{ msg }}</h3>
    <div class="amap-wrapper">
      <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '车程分享',
        estimateDistance: {
          origins: '',
          results: [
            {
              duration: '11',
              distance: '22'
            }
          ],
          serverType: '', //  0(高德)、1(百度)、2（弧线预估)
        },
        orderStatus: {
          status: '',
          factDateTip: '', //其他订单状态的上部分提示语
          factEndDateTip: '', // 已结算、已完成、待支付 的下部分提示语
        },
        orderFunction: null,
        xy: {
          status: '',
          driver: {lng: '', lat: ''}, // 司机位置
          aboard: {lng: '', lat: ''}, // 上车地址
          debus: {lng: '', lat: ''}	// 下车地址
        },
        driving: '', // 驾车导航
        passedPolyline: '', // 小车过后的划线
        lineArr: [],
        marker: '',
        start_xy: '', // start
        end_xy: '', // end
        driver_xy: '', // poi
      };
    },
    computed: {
    },
    created: function () {
    },
    mounted: function () {
    },
    watch: {
      // 监控司机位置 、订单状态

      // 'xy': {
      //   handler: function (curVal, oldVal) {
      //     if(curVal.status !== oldVal.status){
      //       window.map.clearMap() // clear Map
      //     }
      //     //
      //     if (curVal.status === 15) { // 待服务
      //       this.start_xy = new AMap.LngLat(curVal.aboard.lng, curVal.aboard.lat);
      //       // var _img = 'https://img.yun.01zhuanche.com/statics/H5pic/H5Vue/poi.png';
      //       var _img = '//monline.01zhuanche.com/tripSharing/images/poi.png';
      //       this.getOnPoi(curVal.aboard.lng, curVal.aboard.lat, _img)
      //     } else if (curVal.status === 20) { // 已出发
      //       this.start_xy = this.driver_xy = new AMap.LngLat(curVal.driver.lng, curVal.driver.lat)
      //       this.end_xy = new AMap.LngLat(curVal.aboard.lng, curVal.aboard.lat)
      //       if (!isNaN(this.start_xy.lat) && !isNaN(this.start_xy.lng) && !isNaN(this.end_xy.lat) && !isNaN(this.end_xy.lng) && this.end_xy.lat !== 0 && this.end_xy.lng !== 0) {
      //         this.driving_route()
      //       } else {
      //         window.map.setFitView()
      //       }
      //       this.driveDrawFoldline(this.start_xy)
      //       // var _img = 'https://img.yun.01zhuanche.com/statics/H5pic/H5Vue/start.png';
      //       var _img = '//monline.01zhuanche.com/tripSharing/images/start.png';
      //
      //       this.getOnPoi(curVal.aboard.lng, curVal.aboard.lat, _img, true)
      //     } else if (curVal.status === 25) { // 已到达
      //       this.start_xy = new AMap.LngLat(curVal.aboard.lng, curVal.aboard.lat)
      //       // var _img = 'https://img.yun.01zhuanche.com/statics/H5pic/H5Vue/start.png';
      //       var _img = '//monline.01zhuanche.com/tripSharing/images/start.png';
      //       this.getOnPoi(curVal.aboard.lng, curVal.aboard.lat, _img)
      //       this.driveDrawFoldline(this.start_xy)
      //     } else if (curVal.status === 30 || curVal.status === 40) { // 服务中；待结算
      //       this.start_xy = new AMap.LngLat(curVal.aboard.lng, curVal.aboard.lat);
      //       this.end_xy = new AMap.LngLat(curVal.debus.lng, curVal.debus.lat);
      //       if (curVal.driver.lng !== '' && curVal.driver.lat !== '') {
      //         this.driver_xy = new AMap.LngLat(curVal.driver.lng, curVal.driver.lat)
      //       }
      //       if (!isNaN(this.start_xy.lat) && !isNaN(this.start_xy.lng) && !isNaN(this.end_xy.lat) && !isNaN(this.end_xy.lng) && this.end_xy.lat !== 0 && this.end_xy.lng !== 0) {
      //         this.driving_route()
      //       } else {
      //         window.map.setFitView()
      //       }
      //       this.driveDrawFoldline(this.driver_xy);
      //       // var _img = 'https://img.yun.01zhuanche.com/statics/H5pic/H5Vue/end.png'
      //       var _img = '//monline.01zhuanche.com/tripSharing/images/end.png'
      //       this.getOnPoi(curVal.debus.lng, curVal.debus.lat, _img, true)
      //     } else if (curVal.status === 43 || curVal.status === 44 || curVal.status === 45 || curVal.status === 50) { // 扣款中；待支付；已结算；已完成
      //       this.getTrajectoryCorrection();
      //       window.clearInterval(this.orderFunction);
      //     } else if (curVal.status === 60) { // 已取消
      //       this.canceled();
      //     }
      //   },
      //   deep: true
      // }
    },
    methods: {
      // 初始化设置地图
      setMap: function () {
        var bookingStartPoint = this.setCoordinate(this.shareData.bookingStartPoint);
        var bookingEndPoint = this.setCoordinate(this.shareData.bookingEndPoint);
        window.map = new AMap.Map('container', {
          mapStyle: 'amap://styles/fdf6203b12114be53bee9fd2924bba60',
          // zoom: 15,
          // center: [bookingStartPoint[0], bookingStartPoint[1]],
          resizeEnable: true,
        });
        //构造路线导航类
        this.driving = new AMap.Driving({
          //驾车策略，包括 LEAST_TIME，LEAST_FEE, LEAST_DISTANCE,REAL_TRAFFIC 最短时间、最少费用、最短路径、规避拥堵
          policy: AMap.DrivingPolicy.LEAST_TIME,
          map: window.map,
        });
        // var startLngLat = new AMap.LngLat(bookingStartPoint[0],bookingStartPoint[1]);
        // var endLngLat = new AMap.LngLat(bookingEndPoint[0], bookingEndPoint[1]);
        // // 根据起终点经纬度规划驾车导航路线
        // this.driving.search(startLngLat, endLngLat);
      },
      // 构建marker
      getOnPoi: function (lng, lat, img, noSetView) {
        var icon = new AMap.Icon({
          image: img, //24px*24px
          //icon可缺省，缺省时为默认的蓝色水滴图标，
          size: new AMap.Size(40, 40)
        });
        var marker = new AMap.Marker({
          icon: icon, //24px*24px
          position: [lng, lat],
          offset: new AMap.Pixel(-20, -20),
          map: window.map
        })
        if (!noSetView) {
          window.map.setFitView()
        }
      },
      // 驾车导航 路线规划
      driving_route: function () {
        // 根据起终点坐标规划驾车路线 waypoints:路线重新规划
        if (!isNaN(this.driver_xy.lat) && !isNaN(this.driver_xy.lng)) {
          this.driving.search(this.driver_xy, this.end_xy, {waypoints: [this.driver_xy]})
        } else {
          this.driving.search(this.driver_xy, this.end_xy)
        }
        // var _img = 'https://img.yun.01zhuanche.com/statics/H5pic/H5Vue/start.png';
        // var _img2 = 'https://img.yun.01zhuanche.com/statics/H5pic/H5Vue/end.png';
        // var icon = new AMap.Icon({
        //     image: _img,
        //     size: new AMap.Size(40, 40)
        // });
        // var icon2 = new AMap.Icon({
        //     image: _img2,
        //     size: new AMap.Size(40, 40)
        // });
        // var marker1 = new AMap.Marker({
        //     icon: icon,
        //     offset: new AMap.Pixel(-20, -20),
        //     map: window.map
        // })
        // var marker2 = new AMap.Marker({
        //     icon: icon2,
        //     offset: new AMap.Pixel(-20, -20),
        //     map: window.map
        // })
        // marker1.pointType = '1';//起点
        // marker2.pointType = '3';//终点
      },
      // 绘制轨迹
      driveDrawFoldline: function (poi) {
        var _this = this;
        if (!isNaN(poi.lat) && !isNaN(poi.lng)) {
          // 地图里的小车初始化
          if (this.marker) {
            this.marker.setMap(null)
            this.marker = null
          }
          this.marker = new AMap.Marker({
            map: window.map,
            position: [poi.lng, poi.lat],
            icon: 'https://img.yun.01zhuanche.com/statics/H5pic/H5Vue/car.png',
            offset: new AMap.Pixel(-26, -10),  // [小车图标宽度/2 * -1, 小车图标长度 / 3 * 2 * -1]
            autoRotation: true
          })
          this.lineArr.push(poi)
          if (this.lineArr.length > 2) {
            for (var i = 0; i <= (this.lineArr.length - 2); i++) {
              this.lineArr.shift()
            }
          }
          // 小车过后的划线，不需要刻意透明。
          this.passedPolyline = new AMap.Polyline({
            map: window.map,
            // path: lineArr,
            strokeColor: '#F00',  //线颜色
            strokeOpacity: 0, //线透明度
            strokeWeight: 3, //线宽
            strokeStyle: 'solid'  //线样式
          })
          // 移动小车的位置回调
          this.marker.on('moving', function (e) {
            _this.passedPolyline.setPath(e.passedPath)
          })
          if (this.lineArr.length > 0) {
            this.marker.moveAlong(this.lineArr, 500) // 播放动画。number越大动画越快
          }
        }
      },
      // 历史轨迹
      historicalTrack: function (lineArr) {
        // var _img = 'https://img.yun.01zhuanche.com/statics/H5pic/H5Vue/start.png';
        var _img = '//monline.01zhuanche.com/tripSharing/images/start.png';
        // var _img2 = 'https://img.yun.01zhuanche.com/statics/H5pic/H5Vue/end.png';
        var _img2 = '//monline.01zhuanche.com/tripSharing/images/end.png';
        var icon = new AMap.Icon({
          image: _img,
          size: new AMap.Size(40, 40)
        });
        var icon2 = new AMap.Icon({
          image: _img2,
          size: new AMap.Size(40, 40)
        });
        var marker1 = new AMap.Marker({
          icon: icon,
          position: [lineArr[0][0], lineArr[0][1]],
          offset: new AMap.Pixel(-20, -20),
          map: window.map
        })
        var marker2 = new AMap.Marker({
          icon: icon2,
          position: [lineArr[lineArr.length - 1][0], lineArr[lineArr.length - 1][1]],
          offset: new AMap.Pixel(-20, -20),
          map: window.map
        })
        var polyline = new AMap.Polyline({
          path: lineArr,
          strokeColor: '#cbcbcb',
          strokeOpacity: 1,
          strokeWeight: 8,
          strokeStyle: 'solid',
          strokeDasharray: [10, 5],
          geodesic: true
        });
        polyline.setMap(map);
        window.map.setFitView();
      },
      // 已取消 显示上下车大头针
      canceled: function () {
        var _this = this;
        // var _img = 'https://img.yun.01zhuanche.com/statics/H5pic/H5Vue/start.png';
        var _img = '//monline.01zhuanche.com/tripSharing/images/start.png';
        // var _img2 = 'https://img.yun.01zhuanche.com/statics/H5pic/H5Vue/end.png';
        var _img2 = '//monline.01zhuanche.com/tripSharing/images/end.png';
        var icon = new AMap.Icon({
          image: _img,
          size: new AMap.Size(40, 40)
        });
        var icon2 = new AMap.Icon({
          image: _img2,
          size: new AMap.Size(40, 40)
        });
        var marker1 = new AMap.Marker({
          icon: icon,
          position: [_this.xy.aboard.lng, _this.xy.aboard.lat],
          offset: new AMap.Pixel(-20, -20),
          map: window.map
        })
        var marker2 = new AMap.Marker({
          icon: icon2,
          position: [_this.xy.debus.lng, _this.xy.debus.lat],
          offset: new AMap.Pixel(-20, -20),
          map: window.map
        })
        window.map.setFitView()
      },
      // 司机动态信息
      getEstimateDistance: function () {
        var _this = this;
        var url = baseUrl + '/tripshare/getEstimateDistance'
        var data = {
          driverId: _this.shareData.driverId,
          destination: _this.shareData.bookingEndPoint,  //目的地
          coordType: 'mars',  //坐标类型
          platform: '1'    //设备类型
        };
        this.sendRequest(url, data, "post", function (res) {
          if (res.code == 0) {
            _this.estimateDistance = res.data;
            var driver = _this.setCoordinate(res.data.origins)
            _this.xy.driver.lng = driver[0];
            _this.xy.driver.lat = driver[1];
          } else {
            swal({
              title: "",
              text: res.msg,
              html: true
            });
          }
        });
      },
      getTrajectoryCorrection: function () {
        var _this = this;
        var url = baseUrl + '/tripshare/getTrajectoryCorrection'
        var data = {
          startDate: _this.shareData.factDate,
          endDate: _this.shareData.factEndDate,
          driverId: _this.shareData.driverId,
          orderNo: _this.shareData.orderNo,
        };
        this.sendRequest(url, data, "post", function (res) {
          if (res.code == 0) {
            _this.setLineArr(res.data);
          } else {
            swal({
              title: "",
              text: res.msg,
              html: true
            });
          }
        });
      },
      setLineArr: function (data) {
        var lineArr = [];
        if (data && data.points) {
          for (var i = 0; i < data.points.length; i++) {
            var poi = [];
            poi.push(data.points[i].x);
            poi.push(data.points[i].y);
            lineArr.push(poi)
          }
        }
        this.historicalTrack(lineArr);
      },
      getOrderStatus: function () {
        var _this = this;
        var url = baseUrl + '/tripshare/getOrderStatus';
        var data = {
          orderNo: _this.shareData.orderNo,
        };
        this.sendRequest(url, data, "post", function (res) {
          if (res.code == 0) {
            // 40待结算；43扣款中；44待支付；45已结算；50已完成
            var status = res.data && res.data.status;
            if (status != 43 && status != 44 && status != 45 && status != 50) {
              _this.getEstimateDistance();
            }
            _this.orderStatus = res.data;
            _this.xy.status = res.data.status;
          } else {
            swal({
              title: "",
              text: res.msg,
              html: true
            });
          }
        });
      },
      sendRequest: function (url, data, type, successCallback, failureCallback) {
        $.sendRequest({
          type: type || "post",
          url: url,
          data: data,
          dataType: "json",
          success: function (res) {
            if (successCallback)
              successCallback(res)
          },
          error: function (res) {
            if (failureCallback)
              failureCallback(res)
            console.log('ajax错误');
            console.log(res, 'res')
          }
        });
      },
      setCoordinate: function (parameter) {
        return parameter && parameter.split(',') || [];
      },
    },

  };
</script>

<style>
  .amap-wrapper {
    width: 100%;
    height: 500px;
  }
</style>
