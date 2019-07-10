//allDeviceList需要的数据
import utils from '../../utils/utils.js';
import store from '../../store/';
import router from '../../main.js';
export const deviceColumn = {
  columns: [{
    'title': '设备ID',
    'key': 'devID',
    'width': 200
  }, {
    'title': '设备名称',
    'key': 'devName',
    'minWidth': 100
  }, {
    title: '运行状态',
    key: 'devStatus',
    'minWidth': 100,
    render: (h, params) => {
      const row = params.row;
      const color = row.devStatus !=="已停用" ? 'blue' :  'red';
      const text = row.devStatus !=="已停用" ? '运行中' : "已停用";

      return h('Tag', {
        props: {
          type: 'dot',
          color: color
        }
      }, text);
    }
  }, {
    'title': '所在城市',
    'key': 'locationCity',
    'minWidth': 100
  }, {
    'title': '详细地址',
    'key': 'locationDetail',
    'minWidth': 100
  }, {
    'title': '设备类别',
    'key': 'devType',
    'minWidth': 100
  }, {
    'title': '组合设备信息',
    'key': 'infraName',
    'minWidth': 100
  },

    {
      'title': '操作',
      'key': 'action',
      'width': 200,
      render: (h, params) => {
        switch (router.history.current.query.kind) {
          case "1":
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click: () => {
                    router.push({
                      path: "deviceTemper",
                      query: {
                        "devID": params.row.devID
                      }
                    });
                  }
                }
              }, '温度监控')
            ]);
            break;
          case "2":
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click: () => {
                    router.push({
                      path: "devicePa",
                      query: {
                        "devID": params.row.devID
                      }
                    });
                  }
                }
              }, '压力监控')
            ]);
            break;
          case "3":
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click: () => {
                    router.push({
                      path: "warnData",
                      query: {
                        "devID": params.row.devID
                      }
                    });
                  }
                }
              }, '告警统计')
            ]);
            break;
          case "4":
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click: () => {
                    router.push({
                      path: "ErrorData",
                      query: {
                        "assignToken": params.row.assignToken
                      }
                    });
                  }
                }
              }, '停用统计')
            ]);
            break;
          case "5":
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click: () => {
                    router.push({
                      path: "deviceHistoryVersion",
                      query: {
                        "assignToken": params.row.assignToken
                      }
                    });
                  }
                }
              }, '告警可视化')
            ]);
            break;
          case "6":
            if (params.row.devStatus == "运行中") {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    loading: false
                  },
                  on: {
                    click: async () => {
                      /*
                      let params1 = {
                        "specToken": params.row.specToken,
                        "sitewhereToken": localStorage.getItem("sitewhereToken")
                      };
                      let data1 = {
                        url: 'device/getSpecCommond',
                        params: params1,
                        method: 'get',
                        baseUrl: "device"
                      };
                      let specComres = await utils.getData(data1);
                      let specStopCommond = specComres.results[0].commands[1].token;

                      let params2 = {
                        "eventDate": new Date(),
                        "updateState": false,
                        "initiator": "REST",
                        "initiatorId": "admin",
                        "target": "Assignment",
                        "commandToken": specStopCommond,
                        "parameterValues": {
                          "p1": "stop"
                        },
                        "assignToken": params.row.assignToken,
                        "sitewhereToken": localStorage.getItem("sitewhereToken"),
                        "hardwareId": params.row.hardwareId
                      };
                      let data2 = {
                        url: 'eventSource/postStopCommond',
                        params: params2,
                        method: 'post',
                      };
                      let res = await utils.getData(data2);
                      if (res) {
                        store.state.allDeviceList.getData();

                      }
                      */
                      console.log('22222');
                    }
                  }
                }, '停用设备')
              ]);
            } else if (params.row.devStatus == "已停用") {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    loading: false
                  },
                  on: {
                    click: async () => {
                      /*
                      let params1 = {
                        "specToken": params.row.specToken,
                        "sitewhereToken": localStorage.getItem("sitewhereToken")
                      };
                      let data1 = {
                        url: 'device/getSpecCommond',
                        params: params1,
                        method: 'get',
                        baseUrl: "device"
                      };
                      let specComres = await utils.getData(data1);
                      let specStopCommond = specComres.results[0].commands[0].token;

                      let params2 = {
                        "eventDate": new Date(),
                        "updateState": false,
                        "initiator": "REST",
                        "initiatorId": "admin",
                        "target": "Assignment",
                        "commandToken": specStopCommond,
                        "parameterValues": {
                          "p1": "start"
                        },
                        "assignToken": params.row.assignToken,
                        "sitewhereToken": localStorage.getItem("sitewhereToken"),
                        "hardwareId": params.row.hardwareId
                      };
                      let data2 = {
                        url: 'eventSource/postStartCommond',
                        params: params2,
                        method: 'post',
                      };
                      let res = await utils.getData(data2);
                      if (res) {
                        store.state.allDeviceList.getData();
                      }
                    */
                      console.log('11111');
                    }
                  }
                }, '启动设备')
              ]);
            }

            break;


          default:
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  loading: false
                },
                on: {
                  click: () => {
                    router.push({
                      path: "devicePa",
                      query: {
                        "token": params.row.assignToken
                      }
                    });
                  }
                }
              }, '压力监控')
            ]);
        }


      }
    }
  ],
}
