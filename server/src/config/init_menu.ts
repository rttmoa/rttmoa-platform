// * 初始化菜单
export const InitMenuConfig = {
	"code": 200,
	"msg": "成功",
	"data": [
		{
			"path": "/home/index",
			"element": "/home/index",
			"meta": {
				"key": "home",
				"icon": "HomeOutlined",
				"title": "首页",
				"isLink": "",
				"isHide": false,
				"isFull": false,
				"isAffix": true
			}
		},
		{
			"path": "/dataScreen/index",
			"element": "/dataScreen/index",
			"meta": {
				"key": "dataScreen",
				"icon": "PieChartOutlined",
				"title": "数据大屏",
				"isLink": "",
				"isHide": false,
				"isFull": true,
				"isAffix": false
			}
		},
		{
			"path": "/auth",
			"redirect": "/auth/page",
			"meta": {
				"key": "auth",
				"icon": "LockOutlined",
				"title": "权限管理",
				"isLink": "",
				"isHide": false,
				"isFull": false,
				"isAffix": false
			},
			"children": [
				{
					"path": "/auth/page",
					"element": "/auth/page/index",
					"meta": {
						"key": "pageMenu",
						"icon": "AppstoreOutlined",
						"title": "页面权限",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/auth/button",
					"element": "/auth/button/index",
					"meta": {
						"key": "authButton",
						"icon": "AppstoreOutlined",
						"title": "按钮权限",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				}
			]
		},
		{
			"path": "/assembly",
			"redirect": "/assembly/echarts",
			"meta": {
				"key": "assembly",
				"icon": "MedicineBoxOutlined",
				"title": "常用组件",
				"isLink": "",
				"isHide": false,
				"isFull": false,
				"isAffix": false
			},
			"children": [
				{
					"path": "/assembly/echarts",
					"element": "/assembly/echarts/index",
					"meta": {
						"key": "echarts",
						"icon": "AppstoreOutlined",
						"title": "ECharts",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/assembly/recharts",
					"element": "/assembly/recharts/index",
					"meta": {
						"key": "recharts",
						"icon": "AppstoreOutlined",
						"title": "Recharts",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/assembly/markdown",
					"element": "/assembly/markdown/index",
					"meta": {
						"key": "markdown",
						"icon": "AppstoreOutlined",
						"title": "Markdown",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/assembly/draft",
					"element": "/assembly/draft/index",
					"meta": {
						"key": "draft",
						"icon": "AppstoreOutlined",
						"title": "Wangeditor",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/assembly/svgIcon",
					"element": "/assembly/svgIcon/index",
					"meta": {
						"key": "svgIcon",
						"icon": "AppstoreOutlined",
						"title": "SvgIcon",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/assembly/statistic",
					"element": "/assembly/statistic/index",
					"meta": {
						"key": "statistic",
						"icon": "AppstoreOutlined",
						"title": "Statistic",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/assembly/qrCode",
					"element": "/assembly/qrCode/index",
					"meta": {
						"key": "qrCode",
						"icon": "AppstoreOutlined",
						"title": "QRCode",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/assembly/watermark",
					"element": "/assembly/watermark/index",
					"meta": {
						"key": "watermark",
						"icon": "AppstoreOutlined",
						"title": "Watermark",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/assembly/excel",
					"element": "/assembly/excel/index",
					"meta": {
						"key": "Excel",
						"icon": "AppstoreOutlined",
						"title": "Excel",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				}
			]
		},
		{
			"path": "/feat",
			"redirect": "/feat/tabs",
			"meta": {
				"key": "feat",
				"icon": "ControlOutlined",
				"title": "常用功能",
				"isLink": "",
				"isHide": false,
				"isFull": false,
				"isAffix": false
			},
			"children": [
				{
					"path": "/feat/tabs",
					"element": "/feat/tabs/index",
					"meta": {
						"key": "tabs",
						"icon": "AppstoreOutlined",
						"title": "标签栏",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					},
					"children": [
						{
							"path": "/feat/tabs/detail/:id",
							"element": "/feat/tabs/detail",
							"meta": {
								"key": "tabsDetail",
								"icon": "AppstoreOutlined",
								"title": "Tab 详情",
								"activeMenu": "/feat/tabs",
								"isLink": "",
								"isHide": true,
								"isFull": false,
								"isAffix": false
							}
						}
					]
				},
				{
					"path": "/feat/breadcrumb",
					"redirect": "/feat/breadcrumb/flat",
					"meta": {
						"key": "breadcrumb",
						"icon": "AppstoreOutlined",
						"title": "面包屑",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					},
					"children": [
						{
							"path": "/feat/breadcrumb/flat",
							"element": "/feat/breadcrumb/flat/index",
							"meta": {
								"key": "breadcrumbFlat",
								"icon": "AppstoreOutlined",
								"title": "平级模式",
								"isLink": "",
								"isHide": false,
								"isFull": false,
								"isAffix": false
							}
						},
						{
							"path": "/feat/breadcrumb/flatDetail",
							"element": "/feat/breadcrumb/flat/detail",
							"meta": {
								"key": "breadcrumbFlatDetail",
								"icon": "AppstoreOutlined",
								"title": "平级详情",
								"activeMenu": "/feat/breadcrumb/flat",
								"isLink": "",
								"isHide": true,
								"isFull": false,
								"isAffix": false
							}
						},
						{
							"path": "/feat/breadcrumb/children",
							"element": "/feat/breadcrumb/children/index",
							"meta": {
								"key": "breadcrumbChildren",
								"icon": "AppstoreOutlined",
								"title": "层级模式",
								"isLink": "",
								"isHide": false,
								"isFull": false,
								"isAffix": false
							},
							"children": [
								{
									"path": "/feat/breadcrumb/children/detail",
									"element": "/feat/breadcrumb/children/detail",
									"meta": {
										"key": "breadcrumbChildrenDetail",
										"icon": "AppstoreOutlined",
										"title": "层级详情",
										"activeMenu": "/feat/breadcrumb/children",
										"isLink": "",
										"isHide": true,
										"isFull": false,
										"isAffix": false
									}
								}
							]
						}
					]
				},
				{
					"path": "/feat/globalization",
					"element": "/feat/globalization/index",
					"meta": {
						"key": "globalization",
						"icon": "AppstoreOutlined",
						"title": "国际化",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/feat/clipboard",
					"element": "/feat/clipboard/index",
					"meta": {
						"key": "clipboard",
						"icon": "AppstoreOutlined",
						"title": "剪贴板",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/feat/colorPicker",
					"element": "/feat/colorPicker/index",
					"meta": {
						"key": "colorPicker",
						"icon": "AppstoreOutlined",
						"title": "取色器",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/feat/crypto",
					"element": "/feat/crypto/index",
					"meta": {
						"key": "crypto",
						"icon": "AppstoreOutlined",
						"title": "加密解密",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/feat/demo",
					"element": "/feat/demo/index",
					"meta": {
						"key": "demo",
						"icon": "AppstoreOutlined",
						"title": "演示",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/feat/parallax",
					"element": "/feat/parallax/index",
					"meta": {
						"key": "parallax",
						"icon": "AppstoreOutlined",
						"title": "parallax",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/feat/codeMirror",
					"element": "/feat/codeMirror/index",
					"meta": {
						"key": "codeMirror",
						"icon": "AppstoreOutlined",
						"title": "CodeMirror",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/feat/music",
					"element": "/feat/music/index",
					"meta": {
						"key": "music",
						"icon": "AppstoreOutlined",
						"title": "Music",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				}, 
				{
					"path": "/feat/three",
					"element": "/feat/three/index",
					"meta": {
						"key": "three",
						"icon": "AppstoreOutlined",
						"title": "Three",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/feat/mermaid",
					"element": "/feat/mermaid/index",
					"meta": {
						"key": "mermaid",
						"icon": "AppstoreOutlined",
						"title": "Mermaid",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				}
			]
		},
		{
			"path": "/menu",
			"redirect": "/menu/menu1",
			"meta": {
				"key": "menu",
				"icon": "ProfileOutlined",
				"title": "菜单嵌套",
				"isLink": "",
				"isHide": false,
				"isFull": false,
				"isAffix": false
			},
			"children": [
				{
					"path": "/menu/menu1",
					"element": "/menu/menu1/index",
					"meta": {
						"key": "menu1",
						"icon": "AppstoreOutlined",
						"title": "菜单1",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/menu/menu2",
					"redirect": "/menu/menu2/menu21",
					"meta": {
						"key": "menu2",
						"icon": "AppstoreOutlined",
						"title": "菜单2",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					},
					"children": [
						{
							"path": "/menu/menu2/menu21",
							"element": "/menu/menu2/menu21/index",
							"meta": {
								"key": "menu21",
								"icon": "AppstoreOutlined",
								"title": "菜单2-1",
								"isLink": "",
								"isHide": false,
								"isFull": false,
								"isAffix": false
							}
						},
						{
							"path": "/menu/menu2/menu22",
							"redirect": "/menu/menu2/menu22/menu221",
							"meta": {
								"key": "menu22",
								"icon": "AppstoreOutlined",
								"title": "菜单2-2",
								"isLink": "",
								"isHide": false,
								"isFull": false,
								"isAffix": false
							},
							"children": [
								{
									"path": "/menu/menu2/menu22/menu221",
									"element": "/menu/menu2/menu22/menu221/index",
									"meta": {
										"key": "menu221",
										"icon": "AppstoreOutlined",
										"title": "菜单2-2-1",
										"isLink": "",
										"isHide": false,
										"isFull": false,
										"isAffix": false
									}
								},
								{
									"path": "/menu/menu2/menu22/menu222",
									"element": "/menu/menu2/menu22/menu222/index",
									"meta": {
										"key": "menu222",
										"icon": "AppstoreOutlined",
										"title": "菜单2-2-2",
										"isLink": "",
										"isHide": false,
										"isFull": false,
										"isAffix": false
									}
								}
							]
						},
						{
							"path": "/menu/menu2/menu23",
							"element": "/menu/menu2/menu23/index",
							"meta": {
								"key": "menu23",
								"icon": "AppstoreOutlined",
								"title": "菜单2-3",
								"isLink": "",
								"isHide": false,
								"isFull": false,
								"isAffix": false
							}
						}
					]
				},
				{
					"path": "/menu/menu3",
					"element": "/menu/menu3/index",
					"meta": {
						"key": "menu3",
						"icon": "AppstoreOutlined",
						"title": "菜单3",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				}
			]
		},
		{
			"path": "/database",
			"redirect": "/database/basicDetail",
			"meta": {
				"key": "database",
				"icon": "ProfileOutlined",
				"title": "数据展示",
				"isLink": "",
				"isHide": false,
				"isFull": false,
				"isAffix": false
			},
			"children": [
				{
					"path": "/database/basicDetail",
					"element": "/database/basicDetail/index",
					"meta": {
						"key": "basicDetail",
						"icon": "AppstoreOutlined",
						"title": "数据详情页",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/database/catDetail",
					"element": "/database/catDetail/index",
					"meta": {
						"key": "catDetail",
						"icon": "AppstoreOutlined",
						"title": "小猫页",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				}
			]
		},
		{
			"path": "/form",
			"redirect": "/form/basicForm",
			"meta": {
				"key": "form",
				"icon": "FormOutlined",
				"title": "表单页面",
				"isLink": "",
				"isHide": false,
				"isFull": false,
				"isAffix": false
			},
			"children": [
				{
					"path": "/form/basicForm",
					"element": "/form/basicForm/index",
					"meta": {
						"key": "basicForm",
						"icon": "AppstoreOutlined",
						"title": "基础表单 Form",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/form/proForm",
					"element": "/form/proForm/index",
					"meta": {
						"key": "proForm",
						"icon": "AppstoreOutlined",
						"title": "高级表单 proForm",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/form/proForms",
					"element": "/form/proForms/index",
					"meta": {
						"key": "proForms",
						"icon": "AppstoreOutlined",
						"title": "高级表单 proForm",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/form/advancedForm",
					"element": "/form/advancedForm/index",
					"meta": {
						"key": "advancedForm",
						"icon": "AppstoreOutlined",
						"title": "高级表单",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				}
			]
		},
		{
			"path": "/list",
			"redirect": "/list/basicTable",
			"meta": {
				"key": "list",
				"icon": "TableOutlined",
				"title": "列表页面",
				"isLink": "",
				"isHide": false,
				"isFull": false,
				"isAffix": false
			},
			"children": [
				{
					"path": "/list/basicTable",
					"element": "/list/basicTable/index",
					"meta": {
						"key": "basicTable",
						"icon": "AppstoreOutlined",
						"title": "使用 Table",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/list/useProTable",
					"element": "/list/useProTable/index",
					"meta": {
						"key": "useProTable",
						"icon": "AppstoreOutlined",
						"title": "使用 ProTable",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/list/useEditTable",
					"element": "/list/useEditTable/index",
					"meta": {
						"key": "useEditTable",
						"icon": "AppstoreOutlined",
						"title": "使用 EditTable",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/list/useDragTable",
					"element": "/list/useDragTable/index",
					"meta": {
						"key": "useDragTable",
						"icon": "AppstoreOutlined",
						"title": "使用 DragTable",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/list/useProList",
					"element": "/list/useProList/index",
					"meta": {
						"key": "useProList",
						"icon": "AppstoreOutlined",
						"title": "使用 高级列表",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/list/usePorDesciptions",
					"element": "/list/usePorDesciptions/index",
					"meta": {
						"key": "usePorDesciptions",
						"icon": "AppstoreOutlined",
						"title": "使用 定义列表",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				}
			]
		},

		{
			"path": "/module",
			"redirect": "/module/product",
			"meta": {
				"key": "module",
				"icon": "ScheduleOutlined",
				"title": "功能模块",
				"isLink": "",
				"isHide": false,
				"isFull": false,
				"isAffix": false
			},
			"children": [
				{
					"path": "/module/product",
					"element": "/module/product/index",
					"meta": {
						"key": "product",
						"icon": "AppstoreOutlined",
						"title": "商品管理",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					},
					"children": [
						{
							"path": "/module/product/detail",
							"element": "/module/product/detail",
							"meta": {
								"key": "productDetail",
								"icon": "AppstoreOutlined",
								"title": "商品详情",
								"activeMenu": "/module/product",
								"isLink": "",
								"isHide": true,
								"isFull": false,
								"isAffix": false
							}
						}
					]
				},
				{
					"path": "/module/category",
					"element": "/module/category/index",
					"meta": {
						"key": "category",
						"icon": "AppstoreOutlined",
						"title": "分类管理",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/module/scadaHarbin",
					"element": "/module/scadaHarbin/index",
					"meta": {
						"key": "scadaHarbin",
						"icon": "AppstoreOutlined",
						"title": "Scada Harbin",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},

				{
					"path": "/module/scadaNb",
					"element": "/module/scadaNb/index",
					"meta": {
						"key": "scadaNb",
						"icon": "AppstoreOutlined",
						"title": "Scada Ningbo",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/module/storage",
					"element": "/module/storage/index",
					"meta": {
						"key": "storage",
						"icon": "AppstoreOutlined",
						"title": "库位库存报表",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/module/shelf",
					"element": "/module/shelf/index",
					"meta": {
						"key": "shelf",
						"icon": "AppstoreOutlined",
						"title": "仓库货架表",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				}
			]
		},
		{
			"path": "/system",
			"redirect": "/system/userManage",
			"meta": {
				"key": "system",
				"icon": "SettingOutlined",
				"title": "系统管理",
				"isLink": "",
				"isHide": false,
				"isFull": false,
				"isAffix": false
			},
			"children": [
				{
					"path": "/system/userManage",
					"element": "/system/userManage/index",
					"meta": {
						"key": "userManage",
						"icon": "AppstoreOutlined",
						"title": "用户管理",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/system/userManage2",
					"element": "/system/userManage2/index",
					"meta": {
						"key": "userManage2",
						"icon": "AppstoreOutlined",
						"title": "用户管理",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/system/roleManage",
					"element": "/system/roleManage/index",
					"meta": {
						"key": "roleManage",
						"icon": "AppstoreOutlined",
						"title": "角色管理",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/system/accountManage",
					"element": "/system/accountManage/index",
					"meta": {
						"key": "accountManage",
						"icon": "AppstoreOutlined",
						"title": "账号管理",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				},
				{
					"path": "/system/menuMange",
					"element": "/system/menuMange/index",
					"meta": {
						"key": "menuMange",
						"icon": "AppstoreOutlined",
						"title": "菜单管理",
						"isLink": "",
						"isHide": false,
						"isFull": false,
						"isAffix": false
					}
				}
			]
		},
		{
			"path": "/isHide/person/index",
			"element": "/isHide/person/index",
			"meta": {
				"key": "person",
				"icon": "ExclamationCircleOutlined",
				"title": "个人信息",
				"isLink": "",
				"isHide": true,
				"isFull": false,
				"isAffix": false
			}
		},
		{
			"path": "/isHide/about/index",
			"element": "/isHide/about/index",
			"meta": {
				"key": "about",
				"icon": "ExclamationCircleOutlined",
				"title": "关于项目",
				"isLink": "",
				"isHide": false,
				"isFull": false,
				"isAffix": false
			}
		},
		{
			"path": "/isHide/noLayout/index",
			"element": "/isHide/noLayout/index",
			"meta": {
				"key": "noLayout",
				"icon": "SelectOutlined",
				"title": "No Layout",
				"isLink": "",
				"isHide": true,
				"isFull": true,
				"isAffix": false
			}
		}
	]
}
