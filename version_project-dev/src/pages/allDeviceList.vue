<style scoped>
  .margin-top-10 {
    margin-top: 10px;
  }

</style>
<template>
  <div class='todo'>
    <Row>
      <Card>
        <Row>
          <label>站点：</label>
          <Select v-model="chooseSite" style="width:200px" clearable>
            <Option v-for="item in siteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <label>设备状态：</label>
          <Select v-model="chooseState" style="width:200px" clearable>
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>

          <span @click="getData(1)" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
        </Row>
        <Row class="margin-top-10">
          <Table :loading="loading" :columns="deviceColumn.columns" :data="deviceList"></Table>
          <div style="float: right;">
            <Page
              :total="total"
              show-total
              @on-change="changePage"
              :current="currentPage"
              size="small"
              show-elevator
              :page-size="15">
            </Page>
          </div>
        </Row>

      </Card>
    </Row>
  </div>
</template>
<script>
  import utils from '../utils/utils.js';
  import {deviceColumn} from '@/services/staticData/dAllDeviceList';
  export default {
    data() {
      return {
        deviceColumn,
        deviceList: [],
        siteList: [],
        chooseSite: '',
        loading: true,
        total: 0,
        currentPage: 1,
        chooseState:'',
        stateList:[{
            "label":"已停用",
          "value":"true",
        },{
          "label":"运行中",
          "value":"false",
        }]
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/allDeviceList') {
          this.getData();
          this.$store.state["allDeviceList"] = this;
        }
      }
    },

    mounted() {
      this.getData();
      this.$store.state["allDeviceList"] = this;


    },
    methods: {
      async getData(page){
        this.loading = true;
        this.deviceList = [];

        let params = {
          "pageSize": 15,
          "page": page || 1,
          "siteToken": this.chooseSite,
          "sitewhereToken": localStorage.getItem("sitewhereToken"),
          "deleted":this.chooseState,

        };
        let data = {
          url: 'device/getAllDeviceList',
          params: params,
          method: 'get'
        };
        if (this.chooseSite !== '') {
          data.url = 'device/getSiteDeviceList'
        }
        /*
        let res = await utils.getData(data);
        this.total = res.numResults;
        let result = res.data ? res.data : res.results;
        switch(this.chooseState)
        {
          case "true":
            result.forEach((item) => {
                if(item.comments == "已停用"){
                  this.deviceList.push({
                    "hardwareId": item.hardwareId,
                    "assetName": item.specification.assetName,
                    "locationCity": item.metadata.locationCity,
                    "locationDetial": item.metadata.locationDetial,
                    "name": item.assignment.assetName,
                    "id": item.assignment.assetId,
                    "emailAddress": item.assignment.emailAddress,
                    "siteToken": item.siteToken,
                    "metadata": item.metadata,
                    "assignToken": item.assignment.token,
                    "deleted":item.comments=="已停用"?"已停用":"运行中",
                    "specToken":item.specification.token
                  });
                }
            });
            break;
          case "false":
            result.forEach((item) => {
              if(item.comments !== "已停用"){
                this.deviceList.push({
                  "hardwareId": item.hardwareId,
                  "assetName": item.specification.assetName,
                  "locationCity": item.metadata.locationCity,
                  "locationDetial": item.metadata.locationDetial,
                  "name": item.assignment.assetName,
                  "id": item.assignment.assetId,
                  "emailAddress": item.assignment.emailAddress,
                  "siteToken": item.siteToken,
                  "metadata": item.metadata,
                  "assignToken": item.assignment.token,
                  "deleted":item.comments=="已停用"?"已停用":"运行中",
                  "specToken":item.specification.token
                });
              }
            });
            break;
          default:
            this.makeTabeltable(result);
        }
        */
        this.loading = false;
        this.deviceList = [{
          hardwareId: 'hardware1',
          assetName: '设备1',
          locationCity: '北京市',
          locationDetial: '海淀区',
          name: '锅炉',
          id: '11112',
          emailAddress: '784288200@qq.com',
          siteToken: '111',
          metadata: "wowo",
          assignToken: "upuo",
          deleted: "已停用",
          specToken: '1111'
        }, {
          hardwareId: 'hardware2',
          assetName: '设备2',
          locationCity: '北京市',
          locationDetial: '海淀区',
          name: '锅炉',
          id: '111123',
          emailAddress: '784288200@qq.com',
          siteToken: '1112',
          metadata: "wowo",
          assignToken: "upuo",
          deleted: "已停用",
          specToken: '11112'
        }, {
          hardwareId: 'hardware3',
          assetName: '设备3',
          locationCity: '北京市',
          locationDetial: '海淀区',
          name: '锅炉',
          id: '1111233',
          emailAddress: '784288200@qq.com',
          siteToken: '11133',
          metadata: "wowo",
          assignToken: "upuo",
          deleted: "已停用",
          specToken: '111133'
        }]
      },
      makeTabeltable(result){
        result.forEach((item) => {
          this.deviceList.push({
            "hardwareId": item.hardwareId,
            "assetName": item.specification.assetName,
            "locationCity": item.metadata.locationCity,
            "locationDetial": item.metadata.locationDetial,
            "name": item.assignment.assetName,
            "id": item.assignment.assetId,
            "emailAddress": item.assignment.emailAddress,
            "siteToken": item.siteToken,
            "metadata": item.metadata,
            "assignToken": item.assignment.token,
            "deleted":item.comments=="已停用"?"已停用":"运行中",
            "specToken":item.specification.token
          });
        });

      },

      changePage(page){
        this.currentPage = page;
        this.getData(page);
      }

    }
  };
</script>
