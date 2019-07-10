<style scoped>
  .add-button {
    margin-bottom: 10px;
  }

</style>
<template>
  <div>
    <Spin fix v-if="spinShow"></Spin>
    <div class="row" style="margin-bottom:20px;">

      <div class="col-12 col-md-7">
        <Card>
          <v-bar-chart :data=classfyChart v-if="flag" ref="classfyChart"></v-bar-chart>
        </Card>
      </div>
      <div class="col-12 col-md-5">
        <Card>
          <v-bar-chart :data=classfyPie v-if="flag" ref="classfyPie"></v-bar-chart>
        </Card>
      </div>
    </div>


    <div class="row"  style="margin-bottom:20px;">
      <div class="col-12 col-md-7">
        <Card>
          <v-bar-chart :data=errorChart v-if="flag" ref="errorChart"></v-bar-chart>
        </Card>
      </div>
      <div class="col-12 col-md-5">
        <Card>
          <v-bar-chart :data=errorPie v-if="flag" ref="errorPie"></v-bar-chart>
        </Card>
      </div>
    </div>


    <div class="row">
      <div class="col-12 col-md-7">
        <Card>
          <v-bar-chart :data=warnErrorChart v-if="flag" ref="warnErrorChart"></v-bar-chart>

        </Card>
      </div>
      <div class="col-12 col-md-5">
        <Card>
          <v-bar-chart :data=warnErrorPie v-if="flag" ref="warnErrorPie"></v-bar-chart>
        </Card>
      </div>
    </div>

    <!--<Row>-->
      <!--<Card>-->
        <!--<v-bar-chart :data=classfyChart v-if="flag" ref="classfyChart"></v-bar-chart>-->
      <!--</Card>-->
      <!--<Card>-->
        <!--<v-bar-chart :data=errorChart v-if="flag" ref="errorChart"></v-bar-chart>-->
      <!--</Card>-->
      <!--<Card>-->
        <!--<v-bar-chart :data=warnErrorChart v-if="flag" ref="warnErrorChart"></v-bar-chart>-->
      <!--</Card>-->


    <!--</Row>-->
  </div>
</template>
<script>
  import utils from '@/utils/utils.js';
  import vBarChart from '@/components/vBarChart.vue';
  import {classfyChart, warnErrorChart, errorChart, classfyPie,errorPie,warnErrorPie} from '@/services/staticData/dDeviceHistoryVersion.js';
  export default {
    data() {
      return {
        classfyChart,
        errorChart,
        warnErrorChart,
        errorPie,
        classfyPie,
        warnErrorPie,
        flag: false,
        spinShow:true,
      }
    },

    components: {
      vBarChart
    },
    watch: {
      '$route'(to, from){
        if (to.path == '/deviceHistoryVersion') {
          this.init();
//          this.getRealData();
        }
      }
    },
    mounted() {
      this.init();
//      this.getRealData();
    },
    methods: {
      async init(){
        await Promise.all([
          this.getClassfyData(),
          this.getErrorData(),
          this.getWarnErrorData()
        ]);

        this.flag = true;
        this.spinShow = false;
      },
      async getClassfyData(){
        /*
        let params = {
          "assignToken": this.$route.query.assignToken,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
        };
        let data = {
          url: 'history/getWarnInfo',
          params: params,
          method: 'get',
          baseUrl: 'alert'
        };

        let res = await utils.getData(data);
        classfyChart.option.series[0].data = res.results.engineNum;
        classfyChart.option.series[1].data = res.results.outTempNum;
        classfyChart.option.series[2].data = res.results.inTempNum;
        classfyChart.option.series[3].data = res.results.gasPaNum;
        classfyChart.option.series[4].data = res.results.waterPaNum;

        let temp = classfyPie.option.series[0].data;
        for (let i = 0; i < temp.length; i++) {
          temp[i].value = res.results.sumNum[i];
        }
        */
        classfyChart.option.series[0].data = [0, 2, 1, 7, 6, 8, 20, 1, 7, 10, 0, 1];
        classfyChart.option.series[1].data = [7, 1, 1, 10, 5, 8, 1, 1, 5, 9, 0, 0];
        classfyChart.option.series[2].data = [8, 11, 9, 0, 5, 1, 2, 1, 7, 3, 0, 5];
        classfyChart.option.series[3].data = [0, 0, 1, 5, 2, 7, 2, 2, 4, 7, 1, 1];
        classfyChart.option.series[4].data = [5, 3, 4, 1, 7, 8, 2, 4, 8, 9, 11, 0];
        //饼图
        let arr = [20, 30, 50, 11, 6];
        let temp = classfyPie.option.series[0].data;
        for (let i = 0; i < temp.length; i++) {
          temp[i].value = arr[i];
        }

      },
      async getErrorData(){
        /*
        let params = {
          "assignToken": this.$route.query.assignToken,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
        };
        let data = {
          url: 'history/getErrorInfo',
          params: params,
          method: 'get',
          baseUrl: 'alert'
        };

        let res = await utils.getData(data);
        errorChart.option.series[0].data = res.results.engineNum;
        errorChart.option.series[1].data = res.results.outTempNum;
        errorChart.option.series[2].data = res.results.inTempNum;
        errorChart.option.series[3].data = res.results.gasPaNum;
        errorChart.option.series[4].data = res.results.waterPaNum;

        let temp = errorPie.option.series[0].data;
        for (let i = 0; i < temp.length; i++) {
          temp[i].value = res.results.sumNum[i];
        }
        */
        errorChart.option.series[0].data = [20, 60, 11, 78, 66, 18, 10, 9, 24, 10, 0, 19];
        errorChart.option.series[1].data = [10, 32, 10, 74, 69, 28, 0, 1, 17, 9, 10, 4];
        errorChart.option.series[2].data = [30, 21, 15, 37, 56, 48, 20, 12, 22, 7, 20, 11];
        errorChart.option.series[3].data = [11, 12, 31, 47, 26, 21, 7, 16, 17, 9, 11, 28];
        errorChart.option.series[4].data = [30, 22, 21, 17, 16, 18, 17, 23, 29, 15, 30, 8];
        let arr = [60, 90, 80, 40, 46];
        let temp = errorPie.option.series[0].data;
        for (let i = 0; i < temp.length; i++) {
          temp[i].value = arr[i];
        }
      },
      async getWarnErrorData(){
        /*
        let params = {
          "assignToken": this.$route.query.assignToken,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
        };
        let data = {
          url: 'history/getAllErrorOrWarn',
          params: params,
          method: 'get',
          baseUrl: 'alert'
        };

        let res = await utils.getData(data);
        warnErrorChart.option.series[0].data = res.results.warnNum;
        warnErrorChart.option.series[1].data = res.results.errorNum;

        let temp = warnErrorPie.option.series[0].data;
        for (let i = 0; i < temp.length; i++) {
          temp[i].value = res.results.sumNum[i];
        }
*/
        warnErrorChart.option.series[0].data = [60, 52, 71, 87, 36, 48, 27, 63, 39, 25, 40, 18];
        warnErrorChart.option.series[1].data = [40, 32, 21, 47, 66, 28, 57, 73, 39, 65, 10, 48];
        let arr = [30, 70];
        let temp = warnErrorPie.option.series[0].data;
        for (let i = 0; i < temp.length; i++) {
          temp[i].value = arr[i];
        }


      },


    }
  };
</script>
