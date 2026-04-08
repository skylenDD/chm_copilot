# 基础表单页面模板

## 模板信息
- **ID**: basic-form
- **分类**: form
- **版本**: 1.0.0
- **适用场景**: 用户注册、登录、信息编辑等基础表单场景

## 完整 Schema

```json
{
  "schemaType": "superform",
  "schemaVersion": "3.2.0",
  "pages": [
    {
      "id": "form-page-id",
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
            "componentName": "Form",
            "version": "1.0.8",
            "id": "node_form",
            "props": {
              "maxWidth": 450,
              "submitVerify": true,
              "workflow": false,
              "formTable": false,
              "layout": "12:12",
              "setData": "opt",
              "formType": "add",
              "formItemLayout": "12:12",
              "style": ":root {\n  background-color: #fff;\n  padding: 16px;\n}",
              "fieldId": "form_main"
            },
            "children": [
              {
                "componentName": "Block",
                "version": "1.0.4",
                "id": "node_row_1",
                "props": {
                  "fieldBehavior": "NORMAL",
                  "style": ":root {\n  display: flex;\n}",
                  "fieldId": "block_row_1"
                },
                "children": [
                  {
                    "componentName": "Input",
                    "version": "1.0.4",
                    "id": "node_input_name",
                    "props": {
                      "isShowTitle": true,
                      "title": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "姓名"
                      },
                      "layoutWay": "horizontalLeft",
                      "inputPlaceholder": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "请输入内容"
                      },
                      "isWithIcon": false,
                      "size": "default",
                      "validation": [
                        {
                          "type": "required",
                          "checked": true
                        }
                      ],
                      "style": ":root {\n  padding-right: 24px;\n}",
                      "fieldId": "input_name",
                      "fieldName": "name"
                    }
                  },
                  {
                    "componentName": "Input",
                    "version": "1.0.4",
                    "id": "node_input_age",
                    "props": {
                      "isShowTitle": true,
                      "title": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "年龄"
                      },
                      "layoutWay": "horizontalLeft",
                      "inputPlaceholder": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "请输入内容"
                      },
                      "isWithIcon": false,
                      "size": "default",
                      "validation": [],
                      "style": {},
                      "fieldId": "input_age",
                      "fieldName": "age"
                    }
                  }
                ]
              },
              {
                "componentName": "Block",
                "version": "1.0.4",
                "id": "node_row_2",
                "props": {
                  "fieldBehavior": "NORMAL",
                  "style": ":root {\n  display: flex;\n}",
                  "fieldId": "block_row_2"
                },
                "children": [
                  {
                    "componentName": "Select2",
                    "version": "1.1.3",
                    "id": "node_select_sex",
                    "props": {
                      "isShowTitle": true,
                      "title": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "性别"
                      },
                      "layoutWay": "horizontalLeft",
                      "placeholder": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "请选择..."
                      },
                      "size": "middle",
                      "isCanSearch": false,
                      "isMultiple": false,
                      "data": [
                        {"label": "男", "value": 1},
                        {"label": "女", "value": 2}
                      ],
                      "validation": [
                        {
                          "type": "required",
                          "checked": true
                        }
                      ],
                      "style": ":root {\n  padding-right: 24px;\n}",
                      "fieldId": "select_sex",
                      "fieldName": "sex"
                    }
                  },
                  {
                    "componentName": "Select2",
                    "version": "1.1.3",
                    "id": "node_select_married",
                    "props": {
                      "isShowTitle": true,
                      "title": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "婚否"
                      },
                      "layoutWay": "horizontalLeft",
                      "placeholder": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "请选择..."
                      },
                      "size": "middle",
                      "isCanSearch": false,
                      "isMultiple": false,
                      "data": [
                        {"label": "已婚", "value": 1},
                        {"label": "未婚", "value": 2}
                      ],
                      "validation": [],
                      "style": {},
                      "fieldId": "select_married",
                      "fieldName": "isMarried"
                    }
                  }
                ]
              },
              {
                "componentName": "TextArea",
                "version": "1.0.4",
                "id": "node_textarea_brief",
                "props": {
                  "isShowTitle": true,
                  "title": {
                    "type": "i18n",
                    "use": "zh_CN",
                    "zh_CN": "简介"
                  },
                  "layoutWay": "horizontalLeft",
                  "textareaPlaceholder": {
                    "type": "i18n",
                    "use": "zh_CN",
                    "zh_CN": "请输入描述信息"
                  },
                  "rowsCount": 3,
                  "wordLimit": false,
                  "validation": [],
                  "style": {},
                  "fieldId": "textarea_brief",
                  "fieldName": "brief"
                }
              },
              {
                "componentName": "Block",
                "version": "1.0.4",
                "id": "node_button_box",
                "props": {
                  "isFormButtonBox": true,
                  "fieldBehavior": "NORMAL",
                  "style": ":root {\n  display: flex;\n  justify-content: flex-end;\n  padding-right: 16px;\n}",
                  "fieldId": "block_buttons"
                },
                "children": [
                  {
                    "componentName": "Button",
                    "version": "1.0.0",
                    "id": "node_button_reset",
                    "props": {
                      "type": "secondary",
                      "buttonType": "btn-default",
                      "content": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "重置"
                      },
                      "size": "btn-default",
                      "color": "default",
                      "style": {
                        "marginLeft": "0",
                        "display": "inline-block"
                      },
                      "fieldId": "button_reset",
                      "events": {
                        "onClick": [
                          {
                            "id": "__resetForm__",
                            "name": "重置表单"
                          }
                        ]
                      }
                    }
                  },
                  {
                    "componentName": "Button",
                    "version": "1.0.0",
                    "id": "node_button_submit",
                    "props": {
                      "buttonType": "btn-default",
                      "content": {
                        "type": "i18n",
                        "use": "zh_CN",
                        "zh_CN": "提交"
                      },
                      "size": "btn-default",
                      "color": "primary",
                      "style": {
                        "marginRight": "0",
                        "display": "inline-block"
                      },
                      "fieldId": "button_submit",
                      "events": {
                        "onClick": [
                          {
                            "id": "__submitForm__",
                            "name": "提交表单"
                          }
                        ]
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      "params": {
        "enTitle": "ai_form",
        "groupId": "-1",
        "theme": "light",
        "title": "表单模板页面"
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
- **handleSubmit**: 处理表单提交事件
- **validateForm**: 表单验证逻辑
- **resetForm**: 重置表单数据

## 数据源配置
- **formData**: 表单数据变量，用于存储和绑定表单字段值

## 使用说明
此模板适用于基础表单场景，包含用户名、密码输入框和提交按钮，所有事件处理函数已预定义。