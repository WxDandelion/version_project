<style scoped>
  .add-button {
    margin-bottom: 10px;
  }

</style>
<template>
  <div>
    <Row>
      <Card>
        <v-point-map :data=this.data v-if="flag"  @onPushTo='pushTo'></v-point-map>
      </Card>
    </Row>
  </div>
</template>
<script>
  //  import moment from 'moment';
  import utils from '@/utils/utils.js';
  import vPointMap from '@/components/vPointMap.vue';
  import {siteTable, addSiteForm} from '@/services/staticData/dAddDevice.js';
  export default {
    data() {
      return {
        data: {},
        flag: false,

      }
    },
    components: {
      vPointMap,
    },
    watch: {
      '$route'(to, from){
        if (to.path == '/deviceLocMap') {
          this.init();

        }
      }
    },
    created() {
      this.init();
    },
    methods: {
      async init(){
        let data = {
          url: '/web/devicelist',
          params: {},
          method: 'post',
          isNeedSession: true,
        };
        let res = await utils.getData(data);
        this.data.lat = this.$route.query.lat;
        this.data.lng = this.$route.query.lng;
        this.data.zoom = 15;
        this.data.list = [];
        res.device.forEach((item) => {
          let loc1 = {
            "lng": item.position.lng,
            "lat": item.position.lat
          }
          this.data.list.push({
            "loc": loc1,
            "label": "设备名称："+item.devName,
            "devID":item.devID
          })
        });
        this.flag = true;
//        console.log(this.data);


      },
      pushTo(params){
        this.$router.push({
          path: "deviceDetail",
           query: {
             "devID": params.list[0].devID,
           }
        });
      }


    }
  };
</script>
