const budget = {
  // 首页
  home: r => require.ensure([], () => r(require('@/views/home/index')), 'home'),
  notice: r => require.ensure([], () => r(require('@/views/home/notice')),'notice'),
  quotaWarehouse: r => require.ensure([], () => r(require('@/views/budget/quotaWarehouse')), 'quotaWarehouse'),
  budgetGuide: r => require.ensure([], () => r(require('@/views/budget/budgetGuide')), 'budgetGuide'),
  seeGuide: r => require.ensure([], () => r(require('@/views/budget/guide/seeGuide')), 'seeGuide'),
  buildGuide: r => require.ensure([], () => r(require('@/views/budget/guide/buildGuide')), 'seeGuide'),
  correctGuide: r => require.ensure([], () => r(require('@/views/budget/guide/correctGuide')), 'correctGuide'),
  forecastVerification: r => require.ensure([], () => r(require('@/views/budget/organization/forecastVerification')), 'forecastVerification'),
  upToDownOrganization: r => require.ensure([], () => r(require('@/views/budget/organization/upToDownOrganization')), 'upToDownOrganization'),
  newUpToDownOrganization: r => require.ensure([], () => r(require('@/views/budget/organization/newUpToDownOrganization')), 'newUpToDownOrganization'),
  newUpToDownOrganizationRecord: r => require.ensure([], () => r(require('@/views/budget/organization/newUpToDownOrganization/newUpToDownOrganizationRecord')), 'newUpToDownOrganizationRecord'),
  recordRead: r => require.ensure([], () => r(require('@/views/budget/organization/newUpToDownOrganization/recordRead')), 'recordRead'),
  TOB: r => require.ensure([], () => r(require('@/views/budget/TOBTOC/toBtoC')), 'toBtoC'),
  seeOrganization: r => require.ensure([], () => r(require('@/views/budget/organization/upToDownOrganization/seeOrganization')), 'seeOrganization'),
  correctOrganization: r => require.ensure([], () => r(require('@/views/budget/organization/upToDownOrganization/correctOrganization')), 'correctOrganization'),
  examOrganization: r => require.ensure([], () => r(require('@/views/budget/organization/upToDownOrganization/examOrganization')), 'examOrganization'),
  buildOrganization: r => require.ensure([], () => r(require('@/views/budget/organization/upToDownOrganization/buildOrganization')), 'buildOrganization'),
  budgetDecomposition: r => require.ensure([], () => r(require('@/views/budget/organization/budgetDecomposition')), 'budgetDecomposition'),
  upToDownTrend: r => require.ensure([],() => r(require('@/views/budget/organization/upToDownTrend')),'upToDownTrend'),
  buildDecompose: r => require.ensure([], () => r(require('@/views/budget/organization/buildDecompose')), 'buildDecompose'),
  forecastVerificationCreate: r => require.ensure([], () => r(require('@/views/budget/organization/forecastVerification/create')), 'forecastVerificationCreate'),
  forecastVerificationRead: r => require.ensure([], () => r(require('@/views/budget/organization/forecastVerification/read')), 'forecastVerificationRead'),
  forecastVerificationUpdate: r => require.ensure([], () => r(require('@/views/budget/organization/forecastVerification/update')), 'forecastVerificationUpdate'),
  budgetDelivery: r => require.ensure([], () => r(require('@/views/budget/budgetDelivery')), 'budgetDelivery'),
  budgetDeliveryRecord: r => require.ensure([], () => r(require('@/views/budget/budgetDelivery/budgetDeliveryRecord')), 'budgetDeliveryRecord'),
  trafficIndicators: r => require.ensure([], () => r(require('@/views/budget/tracking/trafficIndicators')), 'trafficIndicators'),
  operationEvaluation: r => require.ensure([], () => r(require('@/views/budget/tracking/operationEvaluation')), 'operationEvaluation'),
  groupChannel: r => require.ensure([],()=>r(require('@/views/budget/tracking/groupChannel/groupChannel')), 'groupChannel'),
  incomeTracking: r => require.ensure([], () => r(require('@/views/budget/tracking/incomeTracking/incomeTracking')), 'incomeTracking'),
  sellTracking: r => require.ensure([], () => r(require('@/views/budget/tracking/sellTracking')),'sellTracking'),
  detailTable: r => require.ensure([], () => r(require('@/views/budget/detailTable/detailTable')),'detailTable'),
  compilationSummary: r => require.ensure([], () => r(require('@/views/budget/compilationSummary/compilationSummary')),'compilationSummary'),
  pointMeal: r=> require.ensure([],()=>r(require('@/views/budget/tracking/pointMeal')),'pointMeal'),
  incomeForecast: r=> require.ensure([],()=>r(require('@/views/budget/incomeForecast/incomeForecast')),'incomeForecast'),
  chargeSystem: r => require.ensure([], () => r(require('@/views/budget/incomeForecast/chargeSystem')),'chargeSystem'),
  forecastImport: r => require.ensure([], () => r(require('@/views/budget/incomeForecast/forecastImport')),'foreImport'),
  forecastImportRecord: r => require.ensure([], () => r(require('@/views/budget/incomeForecast/forecastImport/record')),'forecastImportRecord')
};


// 系统管理
const budgetRouter = [
  {
    path: 'home',
    name: 'home',
    component: budget.home,
    meta: {
      title: '个人工作台'
    }
  },
  {
    path: 'notice',
    name: 'notice',
    component: budget.notice,
    meta: {
      title: '公告'
    }
  },
  {
    path: 'quotaWarehouse',
    name: 'quotaWarehouse',
    component: budget.quotaWarehouse,
    meta: {
      title: '指标库'
    }
  },{
    path: 'budgetGuide',
    name: 'budgetGuide',
    component: budget.budgetGuide,
    meta: {
      title: '预算指引'
    }
  },
  {
    path: 'seeGuide',
    name: 'seeGuide',
    component: budget.seeGuide,
    meta: {
      title: '查看指引'
    }
  },
  {
    path: 'buildGuide',
    name: 'buildGuide',
    component: budget.buildGuide,
    meta: {
      title: '新建指引'
    }
  },
  {
    path: 'correctGuide',
    name: 'correctGuide',
    component: budget.correctGuide,
    meta: {
      title: '修改指引'
    }
  },

  {
    path: 'upToDownOrganization',
    name: 'upToDownOrganization',
    component: budget.upToDownOrganization,
    meta: {
      title: '自下而上的空间编制'
    }
  },
  {
    path: 'newUpToDownOrganization',
    name: 'newUpToDownOrganization',
    component: budget.newUpToDownOrganization,
    meta: {
      title: '自下而上的编制'
    }
  },
  {
    path: 'TOBTOC',
    name: 'TOBTOC',
    component: budget.TOB,
    meta: {
      title: 'TOB-TOC 预算编制'
    }
  },
  {
    path: 'newUpToDownOrganizationRecord',
    name: 'newUpToDownOrganizationRecord',
    component: budget.newUpToDownOrganizationRecord,
    meta: {
      title: '编制记录',
      // keepAlive: true
    }
  },
  {
    path: 'recordRead',
    name: 'recordRead',
    component: budget.recordRead,
    meta: {
      title: "编制记录查看",
      // keepAlive: false
    }
  },
  {
    path: 'seeOrganization',
    name: 'seeOrganization',
    component: budget.seeOrganization,
    meta: {
      title: '查看编制'
    }
  },
  {
    path: 'correctOrganization',
    name: 'correctOrganization',
    component: budget.correctOrganization,
    meta: {
      title: '修改编制'
    }
  },
  {
    path: 'examOrganization',
    name: 'examOrganization',
    component: budget.examOrganization,
    meta: {
      title: '预算审核'
    }
  },
  {
    path: 'buildOrganization',
    name: 'buildOrganization',
    component: budget.buildOrganization,
    meta: {
      title: '新建编制'
    }
  },
  {
    path: 'forecastVerification',
    name: 'forecastVerification',
    component: budget.forecastVerification,
    meta: {
      title: '预测验证'
    }
  },{
    path: 'forecastVerificationCreate',
    name: 'forecastVerificationCreate',
    component: budget.forecastVerificationCreate,
    meta: {
      title: '预测验证'
    }
  },{
    path: 'forecastVerificationRead',
    name: 'forecastVerificationRead',
    component: budget.forecastVerificationRead,
    meta: {
      title: '预测验证'
    }
  },{
    path: 'forecastVerificationUpdate',
    name: 'forecastVerificationUpdate',
    component: budget.forecastVerificationUpdate,
    meta: {
      title: '预测验证'
    }
  },{
    path: 'budgetDecomposition',
    name: 'budgetDecomposition',
    component: budget.budgetDecomposition,
    meta: {
      title: '自上而下的空间预测'
    }
  },{
    path: 'upToDownTrend',
    name: 'upToDownTrend',
    component: budget.upToDownTrend,
    meta: {
      title: '自上而下趋势预测'
    }
  },{
    path: 'buildDecompose',
    name: 'buildDecompose',
    component: budget.buildDecompose,
    meta: {
      title: '新建分解'
    }
  },
  {
    path: 'budgetDelivery',
    name: 'budgetDelivery',
    component: budget.budgetDelivery,
    meta: {
      title: '预算下达'
    }
  },
  {
    path: 'budgetDeliveryRecord',
    name: 'budgetDeliveryRecord',
    component: budget.budgetDeliveryRecord,
    meta: {
      title: '下达记录'
    }
  },
  {
    path: 'trafficIndicators',
    name: 'trafficIndicators',
    component: budget.trafficIndicators,
    meta: {
      title: '业务量指标'
    }
  },
  {

    path: 'operationEvaluation',
    name: 'operationEvaluation',
    component: budget.operationEvaluation,
    meta: {
      title: '总体经营评价'
    }
  },
  {
    path: 'groupChannel',
    name: 'groupChannel',
    component: budget.groupChannel,
    meta: {
      title: '分渠道'
    }
  },
  {
    path: 'incomeTracking',
    name: 'incomeTracking',
    component: budget.incomeTracking,
    meta: {
      title: '收入跟踪'
    }
  },
  {
    path: 'sellTracking',
    name: 'sellTracking',
    component: budget.sellTracking,
    meta: {
      title: '销售费用跟踪'
    }
  },
  {
    path: 'detailTable',
    name: 'detailTable',
    component: budget.detailTable,
    meta: {
      title: '通信主业明细表（新方案）'
    }
  },
  {
    path: 'compilationSummary',
    name: 'compilationSummary',
    component: budget.compilationSummary,
    meta: {
      title: '预算编制汇总'
    }
  },
  {
    path: 'pointMeal',
    name: 'pointMeal',
    component: budget.pointMeal,
    meta: {
      title:'分套餐收入跟踪'
    }
  },{
    path: 'incomeForecast',
    name: 'incomeForecast',
    component: budget.incomeForecast,
    meta: {
      title: '收入预估'
    }
  },{
    path: 'chargeSystem',
    name: 'chargeSystem',
    component: budget.chargeSystem,
    meta: {
      title: '计费系统日账'
    }
  },
  {
    path: 'forecastImport',
    name: 'forecastImport',
    component: budget.forecastImport,
    meta: {
      title: '预估导入'
    }
  },
  {
    path: 'forecastImportRecord',
    name: 'forecastImportRecord',
    component: budget.forecastImportRecord,
    meta: {
      title: '预估导入'
    }
  },
]
export default budgetRouter
