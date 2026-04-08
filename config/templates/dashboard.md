# 仪表盘页面模板

## 模板信息
- **ID**: dashboard
- **分类**: dashboard
- **版本**: 1.0.0
- **适用场景**: 数据统计、概览展示、KPI指标展示等仪表盘场景

## 完整 Schema

```json
{
  "schemaType": "superform",
  "schemaVersion": "3.2.0",
  "pages": [
    {
      "id": "chart-stats-page-id",
      "layout": {
        "componentName": "Root",
        "version": "1.0.2",
        "id": "node_root",
        "props": {
          "theme": "light",
          "pageStyle": ":root{\n  font-family: Microsoft YaHei,微软雅黑,Arial,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,sans-serif;\n  line-height: 1.618;\n  background-color: #c7d2ea;\n  padding: 12px 24px 24px;\n}",
          "style": {},
          "autoColumn": true,
          "autoLayoutRoot": true
        },
        "children": [
          {
            "componentName": "Block",
            "version": "1.0.4",
            "id": "node_block_header",
            "props": {
              "fieldBehavior": "NORMAL",
              "backgroundType": "bgColor",
              "background": "#fff",
              "style": ":root {\n  margin-bottom: 16px;\n}",
              "fieldId": "block_header"
            },
            "children": [
              {
                "componentName": "Block",
                "version": "1.0.4",
                "id": "node_block_header_inner",
                "props": {
                  "fieldBehavior": "NORMAL",
                  "backgroundType": "bgColor",
                  "background": "#fff",
                  "style": ":root {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  padding-left: 16px;\n  padding-right: 16px;\n}",
                  "fieldId": "block_header_inner"
                },
                "children": [
                  {
                    "componentName": "Text",
                    "version": "1.0.3",
                    "id": "node_title_decorator",
                    "props": {
                      "isShowTitle": false,
                      "textContext": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": ""
                      },
                      "fontSize": 14,
                      "fontColor": "#000",
                      "style": ":root {\n  border-left-style: solid;\n  border-left-color: #3c99d8;\n  height: 20px;\n}",
                      "fieldId": "text_decorator"
                    }
                  },
                  {
                    "componentName": "Text",
                    "version": "1.0.3",
                    "id": "node_title_text",
                    "props": {
                      "isShowTitle": false,
                      "textContext": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "统计"
                      },
                      "fontSize": 16,
                      "fontColor": "#000",
                      "fontWeight": true,
                      "style": ":root {\n  padding-left: 12px;\n  display: inline-block;\n}",
                      "fieldId": "text_title"
                    }
                  }
                ]
              },
              {
                "componentName": "Block",
                "version": "1.0.4",
                "id": "node_databoard_container",
                "props": {
                  "fieldBehavior": "NORMAL",
                  "backgroundType": "bgColor",
                  "background": "#fff",
                  "style": ":root {\n  padding-left: 16px;\n  padding-right: 16px;\n}",
                  "fieldId": "block_databoard"
                },
                "children": [
                  {
                    "componentName": "DataBoard",
                    "version": "1.0.3",
                    "id": "node_databoard",
                    "props": {
                      "type": "0",
                      "rootPrevSuffix": true,
                      "before": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "成功量"
                      },
                      "after": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "总量"
                      },
                      "cardWidth": "25",
                      "cardHeight": "150",
                      "icon": false,
                      "tips": false,
                      "contentIcon": false,
                      "color": "primary",
                      "info": true,
                      "data": [
                        {
                          "total": 0,
                          "value": 0,
                          "title": "指标名称",
                          "percentData": []
                        }
                      ],
                      "style": {
                        "display": "inline-block"
                      },
                      "fieldId": "databoard"
                    }
                  }
                ]
              }
            ]
          },
          {
            "componentName": "Block",
            "version": "1.0.4",
            "id": "node_charts_container",
            "props": {
              "fieldBehavior": "NORMAL",
              "backgroundType": "bgColor",
              "style": ":root {\n  display: flex;\n}",
              "fieldId": "block_charts"
            },
            "children": [
              {
                "componentName": "Block",
                "version": "1.0.4",
                "id": "node_bar_chart_block",
                "props": {
                  "fieldBehavior": "NORMAL",
                  "backgroundType": "bgColor",
                  "background": "#fff",
                  "style": ":root {\n  flex: 1;\n  margin-right: 16px;\n}",
                  "fieldId": "block_bar_chart"
                },
                "children": [
                  {
                    "componentName": "Block",
                    "version": "1.0.4",
                    "id": "node_bar_title_block",
                    "props": {
                      "fieldBehavior": "NORMAL",
                      "backgroundType": "bgColor",
                      "background": "#fff",
                      "style": ":root {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  padding-left: 16px;\n  padding-right: 16px;\n}",
                      "fieldId": "block_bar_title"
                    },
                    "children": [
                      {
                        "componentName": "Text",
                        "version": "1.0.3",
                        "id": "node_bar_decorator",
                        "props": {
                          "isShowTitle": false,
                          "textContext": {
                            "type": "i18n",
                            "use": "zh_CN",
                            "zh_CN": ""
                          },
                          "fontSize": 14,
                          "fontColor": "#000",
                          "style": ":root {\n  border-left-style: solid;\n  border-left-color: #3c99d8;\n  height: 20px;\n}",
                          "fieldId": "text_bar_decorator"
                        }
                      },
                      {
                        "componentName": "Text",
                        "version": "1.0.3",
                        "id": "node_bar_title",
                        "props": {
                          "isShowTitle": false,
                          "textContext": {
                            "type": "i18n",
                            "use": "zh_CN",
                            "zh_CN": "标题一"
                          },
                          "fontSize": 16,
                          "fontColor": "#000",
                          "fontWeight": true,
                          "style": ":root {\n  padding-left: 12px;\n  display: inline-block;\n}",
                          "fieldId": "text_bar_title"
                        }
                      }
                    ]
                  },
                  {
                    "componentName": "Block",
                    "version": "1.0.4",
                    "id": "node_bar_content_block",
                    "props": {
                      "fieldBehavior": "NORMAL",
                      "backgroundType": "bgColor",
                      "background": "#fff",
                      "style": ":root {\n  padding-left: 16px;\n}",
                      "fieldId": "block_bar_content"
                    },
                    "children": [
                      {
                        "componentName": "EchartsBar",
                        "version": "1.0.5",
                        "id": "node_echarts_bar",
                        "props": {
                          "theme": "default",
                          "isShowTitle": true,
                          "title": {
                            "type": "i18n",
                            "use": "zh_CN",
                            "zh_CN": "柱状图"
                          },
                          "titleColor": "#333",
                          "titleFontweight": true,
                          "titleFontsize": 18,
                          "titlePostion": "left",
                          "isShowSubhead": false,
                          "color1": "#216df5",
                          "color2": "#549df9",
                          "isShowLegend": true,
                          "legendHorizontalPostion": "right",
                          "gridTop": "20%",
                          "gridRight": "13%",
                          "barWidth": 20,
                          "isShowTooltip": true,
                          "tooltipTrigger": "axis",
                          "echartsData": {
                            "xAxisData": ["类目1", "类目2", "类目3", "类目4", "类目5"],
                            "seriesData": [
                              {
                                "name": "分类1",
                                "type": "bar",
                                "barWidth": 20,
                                "data": [0, 0, 0, 0, 0]
                              }
                            ]
                          },
                          "style": {
                            "width": "500px",
                            "height": "400px"
                          },
                          "fieldId": "echart_bar"
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "componentName": "Block",
                "version": "1.0.4",
                "id": "node_pie_chart_block",
                "props": {
                  "fieldBehavior": "NORMAL",
                  "backgroundType": "bgColor",
                  "background": "#fff",
                  "style": ":root {\n  flex:1;\n}",
                  "fieldId": "block_pie_chart"
                },
                "children": [
                  {
                    "componentName": "Block",
                    "version": "1.0.4",
                    "id": "node_pie_title_block",
                    "props": {
                      "fieldBehavior": "NORMAL",
                      "backgroundType": "bgColor",
                      "background": "#fff",
                      "style": ":root {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  padding-left: 16px;\n  padding-right: 16px;\n}",
                      "fieldId": "block_pie_title"
                    },
                    "children": [
                      {
                        "componentName": "Text",
                        "version": "1.0.3",
                        "id": "node_pie_decorator",
                        "props": {
                          "isShowTitle": false,
                          "textContext": {
                            "type": "i18n",
                            "use": "zh_CN",
                            "zh_CN": ""
                          },
                          "fontSize": 14,
                          "fontColor": "#000",
                          "style": ":root {\n  border-left-style: solid;\n  border-left-color: #3c99d8;\n  height: 20px;\n}",
                          "fieldId": "text_pie_decorator"
                        }
                      },
                      {
                        "componentName": "Text",
                        "version": "1.0.3",
                        "id": "node_pie_title",
                        "props": {
                          "isShowTitle": false,
                          "textContext": {
                            "type": "i18n",
                            "use": "zh_CN",
                            "zh_CN": "标题二"
                          },
                          "fontSize": 16,
                          "fontColor": "#000",
                          "fontWeight": true,
                          "style": ":root {\n  padding-left: 12px;\n  display: inline-block;\n}",
                          "fieldId": "text_pie_title"
                        }
                      }
                    ]
                  },
                  {
                    "componentName": "Block",
                    "version": "1.0.4",
                    "id": "node_pie_content_block",
                    "props": {
                      "fieldBehavior": "NORMAL",
                      "backgroundType": "bgColor",
                      "background": "#fff",
                      "style": ":root {\n  padding-left: 16px;\n}",
                      "fieldId": "block_pie_content"
                    },
                    "children": [
                      {
                        "componentName": "EchartsPie",
                        "version": "1.0.4",
                        "id": "node_echarts_pie",
                        "props": {
                          "theme": "default",
                          "isShowTitle": true,
                          "title": {
                            "type": "i18n",
                            "use": "zh_CN",
                            "zh_CN": "饼状图"
                          },
                          "titleColor": "#333",
                          "titleFontweight": true,
                          "titleFontsize": 18,
                          "titlePostion": "left",
                          "color1": "#2985f7",
                          "color2": "#00b050",
                          "color3": "#ff6600",
                          "isShowLegend": false,
                          "isShowLabel": true,
                          "labelPosition": "outside",
                          "seriesData": {
                            "seriesName": "系列名称",
                            "data": [
                              {"value": 0, "name": "分类1"},
                              {"value": 0, "name": "分类2"},
                              {"value": 0, "name": "分类3"}
                            ]
                          },
                          "style": {
                            "width": "500px",
                            "height": "400px"
                          },
                          "fieldId": "pie_chart"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      "params": {
        "enTitle": "chart_stats",
        "groupId": "-1",
        "theme": "light",
        "title": "图表统计"
      },
      "dataSource": {
        "offline": [],
        "globalConfig": {},
        "online": [
          {
            "id": "",
            "name": "globalParams",
            "description": "项目全局配置的变量",
            "formUuid": "template-id",
            "protocal": "GLOBAL",
            "isReadonly": true
          },
          {
            "id": "",
            "name": "userParams",
            "description": "当前用户信息",
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
            "description": "URL上querystring解析后的对象",
            "formUuid": "template-id",
            "protocal": "URI",
            "isReadonly": true
          }
        ],
        "list": [],
        "sync": true
      }
    }
  ],
  "actions": {
    "module": {
      "source": "/**\n * 私有的，可复用的函数\n */\nfunction customFunction() {\n  \n}\n",
      "compiled": "\"use strict\";\nfunction customFunction() {}\n",
      "type": "FUNCTION",
      "list": []
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
- **refreshDashboard**: 刷新仪表盘数据
- **exportDashboard**: 导出仪表盘数据
- **toggleTheme**: 切换仪表盘主题

## 数据源配置
- **dashboardData**: 仪表盘数据变量，包含统计数据、图表数据等

## 使用说明
此模板适用于仪表盘场景，包含统计卡片和图表组件，所有事件处理函数已预定义。