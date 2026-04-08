# 数据列表页面模板

## 模板信息
- **ID**: data-list
- **分类**: list
- **版本**: 1.0.0
- **适用场景**: 数据展示、搜索和操作列表

## 完整 Schema

```json
{
  "schemaType": "superform",
  "schemaVersion": "3.2.0",
  "pages": [
    {
      "id": "list-page-id",
      "layout": {
        "componentName": "Root",
        "version": "1.0.2",
        "id": "node_root",
        "props": {
          "theme": "light",
          "pageStyle": ":root{\n  font-family: Microsoft YaHei,微软雅黑;\n  background-color: #c7d2ea;\n  padding: 12px 24px 24px;\n}",
          "style": {},
          "autoColumn": true,
          "autoLayoutRoot": true
        },
        "children": [
          {
            "componentName": "Block",
            "version": "1.0.4",
            "id": "node_block_filter",
            "props": {
              "fieldBehavior": "NORMAL",
              "backgroundType": "bgColor",
              "background": "#fff",
              "style": ":root {\n  margin-bottom: 16px;\n}",
              "fieldId": "block_filter"
            },
            "children": [
              {
                "componentName": "FilterUpContainer",
                "version": "1.0.6",
                "id": "node_filter_container",
                "props": {
                  "isResult": true,
                  "splitline": "solid",
                  "closeResult": false,
                  "searchBtn": true,
                  "btnPosition": "right",
                  "lightStyle": true,
                  "createUpword": true,
                  "style": {},
                  "fieldId": "filter_container",
                  "events": {
                    "onSearch": [
                      {
                        "id": "onSearch",
                        "name": "查询",
                        "params": {}
                      }
                    ]
                  }
                },
                "children": [
                  {
                    "componentName": "Block",
                    "version": "1.0.3",
                    "id": "node_filter_items",
                    "props": {
                      "fieldBehavior": "NORMAL",
                      "backgroundType": "bgNone",
                      "style": {},
                      "fieldId": "block_filter_items"
                    },
                    "children": [
                      {
                        "componentName": "Radios",
                        "version": "1.0.6",
                        "id": "node_radio_status",
                        "props": {
                          "isShowTitle": true,
                          "title": {
                            "type": "i18n",
                            "use": "zh_CN",
                            "zh_CN": "单选"
                          },
                          "layoutWay": "horizontalLeft",
                          "radioType": "card",
                          "showCardBorder": true,
                          "optionLayout": "horizontal",
                          "options": [
                            {"title": "选项一", "value": "1"},
                            {"title": "选项二", "value": "2"},
                            {"title": "选项三", "value": "3"}
                          ],
                          "style": {},
                          "fieldId": "radio_status",
                          "fieldName": "status"
                        }
                      },
                      {
                        "componentName": "Checkboxs",
                        "version": "1.0.6",
                        "id": "node_checkbox_type",
                        "props": {
                          "isShowTitle": true,
                          "title": {
                            "type": "i18n",
                            "use": "zh_CN",
                            "zh_CN": "多选"
                          },
                          "layoutWay": "horizontalLeft",
                          "checkboxType": "card",
                          "showCardBorder": true,
                          "optionLayout": "horizontal",
                          "isAllCheck": true,
                          "options": [
                            {"title": "选项一", "value": "1"},
                            {"title": "选项二", "value": "2"},
                            {"title": "选项三", "value": "3"}
                          ],
                          "style": {},
                          "fieldId": "checkbox_type",
                          "fieldName": "types"
                        }
                      },
                      {
                        "componentName": "TimeRange",
                        "version": "1.0.7",
                        "id": "node_time_range",
                        "props": {
                          "type": "normal",
                          "showCardBorder": true,
                          "isShowTitle": true,
                          "title": {
                            "type": "i18n",
                            "use": "zh_CN",
                            "zh_CN": "时间范围"
                          },
                          "layoutWay": "horizontalLeft",
                          "dateType": "date",
                          "options": [
                            {"title": "不限", "value": "all", "checked": true},
                            {"title": "近三天", "value": "threeDay"},
                            {"title": "近一周", "value": "week"},
                            {"title": "近一个月", "value": "month"}
                          ],
                          "startPlaceholder": {
                            "type": "i18n",
                            "use": "zh_CN",
                            "zh_CN": "开始时间"
                          },
                          "endPlaceholder": {
                            "type": "i18n",
                            "use": "zh_CN",
                            "zh_CN": "结束时间"
                          },
                          "style": {
                            "display": "inline-block"
                          },
                          "fieldId": "time_range",
                          "fieldName": "timeRange"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "componentName": "Block",
            "version": "1.0.4",
            "id": "node_block_table",
            "props": {
              "fieldBehavior": "NORMAL",
              "backgroundType": "bgColor",
              "background": "#fff",
              "style": ":root {\n  padding: 16px;\n}",
              "fieldId": "block_table"
            },
            "children": [
              {
                "componentName": "Datatables",
                "version": "2.0.5",
                "id": "node_datatable",
                "props": {
                  "title": false,
                  "cellWrap": false,
                  "autoWidth": false,
                  "isVirtual": true,
                  "columns": [
                    {"title": "列1", "data": "col1"},
                    {"title": "列2", "data": "col2"},
                    {"title": "列3", "data": "col3"},
                    {"title": "列4", "data": "col4"},
                    {"title": "列5", "data": "col5"}
                  ],
                  "optName": {
                    "type": "i18n",
                    "use": "zh_CN",
                    "zh_CN": "操作"
                  },
                  "optCol": [
                    {"title": "详情", "type": "detail"}
                  ],
                  "tableStyle": "default",
                  "stripe": true,
                  "checkBox": false,
                  "paging": true,
                  "pagingType": "default",
                  "serverPaging": true,
                  "pageSize": 10,
                  "pageLength": [10, 20, 50, 100],
                  "empty": {
                    "type": "i18n",
                    "use": "zh_CN",
                    "zh_CN": "暂无数据！"
                  },
                  "tableBodyData": [],
                  "style": ":root {\n  position: relative;\n}",
                  "fieldId": "datatable_list"
                }
              }
            ]
          }
        ]
      },
      "params": {
        "enTitle": "ai_list",
        "groupId": "-1",
        "theme": "light",
        "title": "列表页模板"
      },
      "dataSource": {
        "offline": [],
        "globalConfig": {},
        "online": [
          {
            "id": "",
            "name": "globalParams",
            "description": "全局变量",
            "formUuid": "template-id",
            "protocal": "GLOBAL",
            "isReadonly": true
          },
          {
            "id": "",
            "name": "userParams",
            "description": "用户信息",
            "formUuid": "template-id",
            "protocal": "USER",
            "isReadonly": true
          },
          {
            "id": "",
            "name": "pageParams",
            "description": "页面信息",
            "formUuid": "template-id",
            "protocal": "PAGE",
            "isReadonly": true
          },
          {
            "id": "",
            "name": "urlParams",
            "description": "URL参数",
            "formUuid": "template-id",
            "protocal": "URI",
            "isReadonly": true
          },
          {
            "id": "",
            "name": "tableList",
            "description": "表格数据",
            "formUuid": "template-id",
            "protocal": "VALUE",
            "isModified": true,
            "initialData": []
          }
        ],
        "list": [],
        "sync": true
      }
    }
  ],
  "actions": {
    "module": {
      "source": "/**\n * 私有的，可复用的函数\n */\n\n/**\n* 点击查询按钮时触发\n* @param data 组件键值数据\n* @param fullData 容器组件详细数据对象\n* @param fieldNameData 组件表单标识键值数据\n*/\nexport function onSearch(ctx, data, fullData, fieldNameData) {\n  console.log(data, fullData, fieldNameData);\n  // ctx.dp.exec('getList', fieldNameData).then((res) => {\n  //   if (res.code === 0) {\n  //     ctx.dp.setValue('tableList', res);\n  //   }\n  // });\n}\n",
      "compiled": "\"use strict\";\n\nexports.onSearch = onSearch;\n\nfunction onSearch(ctx, data, fullData, fieldNameData) {\n  console.log(data, fullData, fieldNameData);\n}\n",
      "type": "FUNCTION",
      "list": [
        {
          "id": "onSearch",
          "title": "查询"
        }
      ]
    },
    "introInfo": {
      "open": false,
      "steps": [],
      "introComponents": []
    }
  }
}
```

## 预定义事件处理
- **updateSearchKeyword**: 更新搜索关键词输入
- **performSearch**: 执行搜索操作，调用 API 获取数据
- **handleRowClick**: 处理表格行点击事件
- **refreshDataList**: 刷新数据列表

## 数据源配置
- **listData**: 远程数据接口，用于获取列表数据
- **searchParams**: 搜索参数变量，包含关键词、分页等信息

## 使用说明
此模板适用于数据列表展示场景，包含搜索、刷新和行操作功能，所有事件处理函数已预定义。