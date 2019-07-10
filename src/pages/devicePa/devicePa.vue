<style scoped>
  .add-button {
    margin-bottom: 10px;
  }

</style>
<template>
  <div>
    <Row>
      <Card>
        <v-visite-volume :data=gasPaChart v-if="flag" ref="gasPaChart"></v-visite-volume>
      </Card>
      <Card>
        <v-visite-volume :data=waterPaChart v-if="flag" ref="waterPaChart"></v-visite-volume>
      </Card>

    </Row>
    <Modal v-model="isModalVisible" title="设备最新数据" @on-ok="onOk" @on-cancel="onCancel">
      <p>设备运行状态：{{dataList.devReady}}</p>
      <p>设备开关：{{dataList.switch}}</p>
      <p>设备档位：{{dataList.workMode}}</p>
      <p>设定温度：{{dataList.tempSet}}</p>
      <p>空气温度：{{dataList.airTemp}}</p>
      <p>汽化温度：{{dataList.waterBack}}</p>
      <p>出水温度：{{dataList.waterOut}}</p>
      <p>温度：{{dataList.temp}}</p>
      <p>湿度：{{dataList.shi}}</p>
    </Modal>
  </div>
</template>
<script>
  import utils from '@/utils/utils.js';
  import vVisiteVolume from '@/components/vVisiteVolume.vue';
  import {waterPaChart, gasPaChart} from '@/services/staticData/dPaChart.js';
  export default {
    data() {
      return {
        waterPaChart,
        gasPaChart,
        flag: false,
        dataList: {},
        isModalVisible: true,
      }
    },

    components: {
      vVisiteVolume
    },
    watch: {
      '$route'(to, from){
        if (to.path == '/deviceTemper') {
          this.init();
          //this.getRealData();
        }
      }
    },
    mounted() {
      this.init();
      //this.getRealData();
    },
    methods: {
      onOk: () => {
        this.isModalVisible = false;
      },
      onCancel: () => {
        this.isModalVisible = false;
      },
      async init(){
        let oneHour = 3600 * 1000;
        let startDate = new Date(new Date() - oneHour);
        let data = {
          url: '/web/deviceqry',
          params: {
            'devID': this.$route.query.devID,
          },
          method: 'post',
          isNeedSession: true,
        };
        let res = await utils.getData(data);
        console.log(res);
        res = res.CDATA;
        this.dataList.airTemp = res.AIRTEMP + '度';
        this.dataList.steamTemp = res.STEAMTEMP + '度';
        this.dataList.tempSet = res.TEMPSET + '度';
        this.dataList.waterBack = res.WATERBACK + '度';
        this.dataList.waterOut = res.WATEROUT + '度';
        this.dataList.temp = res.wendu + '度';
        this.dataList.shi = res.shidu + '%';
        this.dataList.devReady = res.devReady === '1' ? '设备工作正常' : '设备工作不正常';
        this.dataList.switch = res.switch === '1' ? '开' : '关';
        this.dataList.workMode = res.workMode >= 20 ? '强档' : '中档';
        /*
        let res = await utils.getData(data);
        let result = this.changeData(res);
        waterPaChart.option.series[0].data = result.resultWater;
        gasPaChart.option.series[0].data = result.resultGas;
        */
        this.flag = true;

      },

      async getRealData(){
        if (this.flag == true) {
          let oneMinu = 10000;
          let params = {
            "startDate": new Date(new Date() - oneMinu),
            "sitewhereToken": localStorage.getItem("sitewhereToken"),
            "assignToken": this.$route.query.token,
          };
          let data = {
            url: '/measure/getStartMeasures',
            params: params,
            method: 'get',
            baseUrl:'realTime'
          };
          let res = await utils.getData(data);
          this.pushNewData(res);
          this.$refs.gasPaChart.getNew();
          this.$refs.waterPaChart.getNew();
        }
        let self = this;
        if (self && !self._isDestroyed) {
          setTimeout(() => {
            if (self && !self._isDestroyed) {
              self.getRealData();
            }
          }, 20000);
        }
      },
      //改变数据格式
      changeData(res){
        let result = {};
        let resultGas = [];
        let resultWater = [];
        res.forEach((item) => {
          if (item.measurementId == "gas.Pa") {
            item.entries.forEach((val) => {
              let date = val.measurementDate.replace(/T/, " ");
              resultGas.push({
                "name": val.measurementDate,
                "value": [date, val.value]
              })
            })
          } else if (item.measurementId == "water.Pa") {
            item.entries.forEach((val) => {
              let date = val.measurementDate.replace(/T/, " ");
              resultWater.push({
                "name": val.measurementDate,
                "value": [date, val.value]
              })
            })
          }
        });
        result = {
          "resultGas": resultGas,
          "resultWater": resultWater,
        }
        return result;

      },
      //动态加入删除数据
      pushNewData(res){
        res.forEach((item) => {
          if (item.measurementId == "gas.Pa") {
            item.entries.forEach((val) => {
              let date = val.measurementDate.replace(/T/, " ");
              gasPaChart.option.series[0].data.push({
                "name": val.measurementDate,
                "value": [date, val.value]
              });
              gasPaChart.option.series[0].data.shift();
            });
          } else if (item.measurementId == "water.Pa") {
            item.entries.forEach((val) => {
              let date = val.measurementDate.replace(/T/, " ");
              waterPaChart.option.series[0].data.push({
                "name": val.measurementDate,
                "value": [date, val.value]
              });
              waterPaChart.option.series[0].data.shift();
            });
          }
        });

      },


    }
  };
</script>
