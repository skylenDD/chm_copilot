# 详情页面模板

## 模板信息
- **ID**: user-profile
- **分类**: form
- **版本**: 1.0.0
- **适用场景**: 详情展示

## 完整 Schema

```json
{
  "schemaType": "superform",
  "schemaVersion": "3.7.0",
  "pages": [
    {
      "id": "detail-page-id",
      "layout": {
        "componentName": "Root",
        "version": "1.0.2",
        "id": "node_root",
        "props": {
          "theme": "light",
          "pageStyle": ":root{\n  font-family: Microsoft YaHei,微软雅黑;\n  background-color: #f0f2f5;\n  padding: 12px 24px 24px;\n}",
          "style": {},
          "autoColumn": true,
          "autoLayoutRoot": true
        },
        "children": [
          {
            "componentName": "Block",
            "version": "1.0.4",
            "id": "node_block_basic",
            "props": {
              "fieldBehavior": "NORMAL",
              "backgroundType": "bgColor",
              "background": "#fff",
              "style": ":root {\n  padding: 0;\n  margin-bottom: 16px;\n}",
              "fieldId": "block_basic_info"
            },
            "children": [
              {
                "componentName": "Block",
                "version": "1.0.4",
                "id": "node_title_basic",
                "props": {
                  "fieldBehavior": "NORMAL",
                  "style": ":root {\n  padding-left: 12px;\n  padding-top: 8px;\n  padding-bottom: 12px;\n  display: flex;\n  align-items: center;\n}",
                  "fieldId": "block_title_basic"
                },
                "children": [
                  {
                    "componentName": "Text",
                    "version": "1.0.3",
                    "id": "node_text_decorator_basic",
                    "props": {
                      "isShowTitle": false,
                      "textContext": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": ""
                      },
                      "fontSize": 14,
                      "style": ":root {\n  border-left-style: solid;\n  height: 20px;\n  border-left-width: 4px;\n  border-left-color: #2985f7;\n}",
                      "fieldId": "text_decorator_basic"
                    }
                  },
                  {
                    "componentName": "Text",
                    "version": "1.0.3",
                    "id": "node_text_title_basic",
                    "props": {
                      "isShowTitle": false,
                      "textContext": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "基本信息"
                      },
                      "fontSize": 16,
                      "fontWeight": true,
                      "style": ":root {\n  margin-left: 12px;\n}",
                      "fieldId": "text_title_basic"
                    }
                  }
                ]
              },
              {
                "componentName": "Block",
                "version": "1.0.4",
                "id": "node_detail_content",
                "props": {
                  "fieldBehavior": "NORMAL",
                  "style": ":root {\n  padding: 0;\n}",
                  "fieldId": "block_detail_show"
                },
                "children": [
                  {
                    "componentName": "DetailShow",
                    "version": "1.0.2",
                    "id": "node_detail_show",
                    "props": {
                      "theme": "default",
                      "type": "card",
                      "titleBox": false,
                      "setRow": true,
                      "row": 3,
                      "column": 3,
                      "seriesData": [
                        {"key": "标题1", "value": "属性1"},
                        {"key": "标题2", "value": "属性2"},
                        {"key": "标题3", "value": "属性3"},
                        {"key": "标题4", "value": "属性4"},
                        {"key": "标题5", "value": "属性5"},
                        {"key": "标题6", "value": "属性6"}
                      ],
                      "dataEmpty": true,
                      "emptyContent": "--",
                      "style": ":root {\n  border: none;\n}",
                      "fieldId": "detail_show"
                    }
                  }
                ]
              }
            ]
          },
          {
            "componentName": "Block",
            "version": "1.0.4",
            "id": "node_block_list",
            "props": {
              "fieldBehavior": "NORMAL",
              "backgroundType": "bgColor",
              "background": "#fff",
              "style": ":root {\n  padding: 0;\n  margin-bottom: 16px;\n}",
              "fieldId": "block_table_list"
            },
            "children": [
              {
                "componentName": "Block",
                "version": "1.0.4",
                "id": "node_title_list",
                "props": {
                  "fieldBehavior": "NORMAL",
                  "style": ":root {\n  padding-left: 12px;\n  padding-top: 8px;\n  padding-bottom: 12px;\n  display: flex;\n  align-items: center;\n}",
                  "fieldId": "block_title_list"
                },
                "children": [
                  {
                    "componentName": "Text",
                    "version": "1.0.3",
                    "id": "node_text_decorator_list",
                    "props": {
                      "isShowTitle": false,
                      "textContext": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": ""
                      },
                      "fontSize": 14,
                      "style": ":root {\n  border-left-style: solid;\n  height: 20px;\n  border-left-width: 4px;\n  border-left-color: #2985f7;\n}",
                      "fieldId": "text_decorator_list"
                    }
                  },
                  {
                    "componentName": "Text",
                    "version": "1.0.3",
                    "id": "node_text_title_list",
                    "props": {
                      "isShowTitle": false,
                      "textContext": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "区块"
                      },
                      "fontSize": 16,
                      "fontWeight": true,
                      "style": ":root {\n  margin-left: 12px;\n}",
                      "fieldId": "text_title_list"
                    }
                  }
                ]
              },
              {
                "componentName": "Block",
                "version": "1.0.4",
                "id": "node_table_content",
                "props": {
                  "fieldBehavior": "NORMAL",
                  "style": ":root {\n  padding: 16px;\n}",
                  "fieldId": "block_datatable"
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
                        {"title": "列3", "data": "col3"}
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
                      "pageSize": 10,
                      "empty": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "暂无数据！"
                      },
                      "tableBodyData": [],
                      "style": ":root {position: relative;}",
                      "fieldId": "datatable_list"
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      "params": {
        "enTitle": "ai_detail",
        "groupId": "-1",
        "theme": "light",
        "title": "详情页模板"
      },
      "dataSource": {
        "offline": [],
        "globalConfig": {},
        "online": [
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
- **checkUsernameAvailability**: 实时检查用户名是否可用
- **validateEmail**: 验证邮箱格式有效性
- **formatPhoneNumber**: 自动格式化手机号输入
- **saveUserProfile**: 保存用户信息到服务器

## 数据源配置
- **userData**: 用户数据变量，初始值包含所有字段
- **departments**: 部门列表接口，用于动态填充选择器选项

## 使用说明
此模板适用于用户个人资料管理场景，包含完整的表单验证和数据保存逻辑，所有事件处理函数已预定义。