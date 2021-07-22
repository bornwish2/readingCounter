export enum ENInterfaces {
    AuthLevel4GET = 'V1/AuthLevel4/all',
    AuthLevel4DICTIONARY = 'V1/AuthLevel4/Dictionary',
    AuthLevel4REMOVE = 'V1/AuthLevel4/Remove',
    AuthLevel4EDIT = 'V1/AuthLevel4/Edit',
    AuthLevel4ADD = 'V1/AuthLevel4/Add',

    AuthLevel3GET = 'V1/AuthLevel3/all',
    AuthLevel3DICTIONARY = 'V1/AuthLevel3/Dictionary',
    AuthLevel3REMOVE = 'V1/AuthLevel3/Remove',
    AuthLevel3EDIT = 'V1/AuthLevel3/Edit',
    AuthLevel3ADD = 'V1/AuthLevel3/Add',

    AuthLevel2GET = 'V1/AuthLevel2/all',
    AuthLevel2DICTIONARY = 'V1/AuthLevel2/Dictionary',
    AuthLevel2REMOVE = 'V1/AuthLevel2/Remove',
    AuthLevel2EDIT = 'V1/AuthLevel2/Edit',
    AuthLevel2ADD = 'V1/AuthLevel2/Add',

    AuthLevel1GET = 'V1/AuthLevel1/all',
    AuthLevel1DICTIONARY = 'V1/AuthLevel1/Dictionary',
    AuthLevel1REMOVE = 'V1/AuthLevel1/Remove',
    AuthLevel1EDIT = 'V1/AuthLevel1/Edit',
    AuthLevel1ADD = 'V1/AuthLevel1/Add',

    ZoneBoundGET = 'V1/ZoneBound/All',
    ZoneBoundDICTIONARY = 'V1/ZoneBound/Dictionary',
    ZoneBoundREMOVE = 'V1/ZoneBound/Remove',
    ZoneBoundEDIT = 'V1/ZoneBound/Edit',
    ZoneBoundADD = 'V1/ZoneBound/Add',

    ZoneGET = 'V1/Zone/All',
    ZoneDICTIONARY = 'V1/Zone/Dictionary',
    ZoneREMOVE = 'V1/Zone/Remove',
    ZoneEDIT = 'V1/Zone/Edit',
    ZoneADD = 'V1/Zone/Add',

    RegionGET = 'V1/Region/All',
    RegionDICTIONARY = 'V1/Region/Dictionary',
    RegionREMOVE = 'V1/Region/Remove',
    RegionEDIT = 'V1/Region/Edit',
    RegionADD = 'V1/Region/Add',

    ProvinceGET = 'V1/Province/All',
    ProvinceDICTIONARY = 'V1/Province/Dictionary',
    ProvinceREMOVE = 'V1/Province/Remove',
    ProvinceEDIT = 'V1/Province/Edit',
    ProvinceADD = 'V1/Province/Add',

    CountryGET = 'V1/Country/All',
    CountryDICTIONARY = 'V1/Country/Dictionary',
    CountryREMOVE = 'V1/Country/Remove',
    CountryEDIT = 'V1/Country/Edit',
    CountryADD = 'V1/Country/Add',

    RoleGET = 'V1/Role/All',
    RoleDICTIONARY = 'V1/Role/Dictionary',
    RoleREMOVE = 'V1/Role/Remove',
    RoleEDIT = 'V1/Role/Edit',
    RoleADD = 'V1/Role/Add',

    downloadFileGET = 'V1/Download/File',
    downloadFileInfo = 'V1/Download/File/info',
    downloadFileForbidden = 'V1/Download/File/forbidden',

    ReadingConfigALL = 'V1/ReadingConfigDefault/All',
    ReadingConfigGET = 'V1/ReadingConfigDefault/Get',
    ReadingConfigREMOVE = 'V1/ReadingConfigDefault/Remove',
    ReadingConfigEDIT = 'V1/ReadingConfigDefault/Edit',
    ReadingConfigADD = 'V1/ReadingConfigDefault/Add',
    readingConfigDefaultByZoneId = `V1/ReadingConfigDefault/Get/`,

    FormulaWaterAll = 'V1/AbBahaFormula/All',
    FormulaWaterEdit = 'V1/AbBahaFormula/Edit',
    FormulaWaterExcelSample = 'v1/abbahaformula/excelsample',
    FormulaWaterAdd = 'V1/AbBahaFormula/Add',
    FormulaWaterAddExcel = 'V1/AbBahaFormula/AddExcel',
    FormulaWaterRemove = 'V1/AbBahaFormula/Remove',

    FormulaBudgetAll = 'V1/BudgetFormula/All',
    FormulaBudgetEdit = 'V1/BudgetFormula/Edit',
    FormulaBudgetExcelSample = 'V1/BudgetFormula/ExcelSample',
    FormulaBudgetAdd = 'V1/BudgetFormula/Add',
    FormulaBudgetAddExcel = 'V1/BudgetFormula/AddExcel',
    FormulaBudgetRemove = 'V1/BudgetFormula/Remove',

    FormulaTabsare2All = 'V1/Tabsare2Formula/All',
    FormulaTabsare2Edit = 'V1/Tabsare2Formula/Edit',
    FormulaTabsare2Add = 'V1/Tabsare2Formula/Add',
    FormulaTabsare2Remove = 'V1/Tabsare2Formula/Remove',

    FormulaTabsare3All = 'V1/Tabsare3Formula/All',
    FormulaTabsare3ExcelSample = 'V1/Tabsare3Formula/ExcelSample',
    FormulaTabsare3Edit = 'V1/Tabsare3Formula/Edit',
    FormulaTabsare3Add = 'V1/Tabsare3Formula/Add',
    FormulaTabsare3AddExcel = 'V1/Tabsare3Formula/AddExcel',
    FormulaTabsare3Remove = 'V1/Tabsare3Formula/Remove',

    textOutputGET = 'V1/TextOutputField/All',
    textOutputRemove = 'V1/TextOutputField/Remove',
    textOutputAdd = 'V1/TextOutputField/Add',
    textOutputEdit = 'V1/TextOutputField/Edit',

    userGET = 'V1/User/All',
    userEDIT = 'V1/user/Edit',
    userADD = 'V1/user/Add',
    userLOGINS = 'V1/User/Logins',
    userRESETPASS = 'V1/User/ResetPassword',
    userACTIVATE = 'V1/User/Activate',
    userDEACTIVATE = 'V1/User/Deactivate',

    fragmentMASTERALL = 'V1/Fragment/Master/All',
    fragmentMASTERREMOVE = 'V1/Fragment/Master/Remove',
    fragmentMASTEREDIT = 'V1/Fragment/Master/Edit',
    fragmentMASTERADD = 'V1/Fragment/Master/Add',
    fragmentMASTERVALIDATE = 'V1/Fragment/Master/Validate',
    fragmentMasterInZone = `V1/Fragment/Master/InZone/`,
    fragmentDETAILSDETAILS = 'V1/Fragment/Details',
    fragmentDETAILSREMOVE = 'V1/Fragment/Detials/Remove',
    fragmentDETAILSEDIT = 'V1/Fragment/Details/Edit',
    fragmentDETAILSADD = 'V1/Fragment/Details/Add',

    OutputDBF = 'V1/Output/Dbf',
    OutputSINGLE = 'V1/Output/single',
    forbidden = 'V1/Forbidden/ByParam',

    trackingIMPORTED = 'V1/Tracking/Imported',
    trackingLOADED = 'V1/Tracking/Loaded',
    trackingREADING = 'V1/Tracking/Reading',
    trackingOFFLOADED = 'V1/Tracking/Offloaded',
    trackingFINISHED = 'V1/Tracking/Finished',
    trackingLASTSTATES = 'V1/Tracking/LastStates',
    trackingEDIT = 'V1/Tracking/Edit',
    trackingToIMPORTED = 'V1/Tracking/ToImported',
    trackingToREADING = 'V1/Tracking/ToReading',
    trackingToOFFLOADED = 'V1/Tracking/ToOffloaded',
    trackingPRE = 'V1/Tracking/Pre',
    trackingFinishReadiED = 'V1/Tracking/FinishReading',
    trackingREMOVE = 'V1/Tracking/Remove',
    trackingFOLLOWUP = 'V1/Tracking/FollowUp/?trackNumber=',
    trackingAnalyzeByParam = 'V1/Tracking/Analyze/ByParam',
    trackingPostOffloadModify = 'V1/OffLoad/Modify',

    ListSearchMoshtarak = 'V1/List/Search/Moshtarak',
    ListSearchPro = 'V1/List/Search/Pro',
    ListTraverse = 'V1/List/Offloaded/Traverse',
    ListTraverseDifferential = 'V1/List/Offloaded/TraverseDifferential',
    ListTraverseDifferentialDictionary = 'V1/List/TraverseDifferential/Dictionary',
    ListOFFKarkard = 'V1/List/Offloaded/Karkard',
    ListKarkardChart = 'V1/List/Offloaded/KarkardChart',
    ListTraverseDifferntialChart = 'V1/List/Offloaded/TraverseDifferntialChart',
    ListOffloadedPERDAY = `V1/List/OffLoaded/PerDay/`,
    ListOffloadedALL = `V1/List/OffLoaded/All/`,
    ListDictionary = 'V1/List/TraverseDifferential/Dictionary',
    ListKarkardDaily = 'V1/List/Offloaded/KarkardDaily',
    ListToGis = 'V1/List/Offloaded/Gis',
    ListDispersalHours = 'V1/List/Offloaded/DispersalHours',
    ListDispersalChart = 'V1/List/Offloaded/DispersalChart',
    ListPerDayXY = 'V1/List/OffLoaded/PerDayXY',


    readingPeriodAll = 'V1/readingPeriod/All',
    readingPeriodEdit = 'V1/readingPeriod/Edit',
    readingPeriodAdd = 'V1/readingPeriod/Add',
    readingPeriodRemove = 'V1/readingPeriod/Remove',
    readingPeriodKindAll = 'V1/readingPeriodKind/All',
    readingPeriodKindDictionary = 'V1/readingPeriodKind/Dictionary',
    readingPeriodDictionaryByZoneIdAndKindId = `V1/readingPeriod/Dictionary/`,
    readingPeriodByKindDictionary = `V1/ReadingPeriod/DictionaryByKind/`,
    readingPeriodKindEdit = 'V1/readingPeriodKind/Edit',
    readingPeriodKindAdd = 'V1/readingPeriodKind/Add',
    readingPeriodKindRemove = 'V1/readingPeriodKind/Remove',

    KarbariAll = 'V1/Karbari/All',
    KarbariDictionary = 'V1/Karbari/Dictionary',
    KarbariDictionaryCode = 'V1/Karbari/DictionaryCode',
    KarbariRemove = 'V1/Karbari/Remove',
    KarbariEdit = 'V1/Karbari/Edit',
    KarbariAdd = 'V1/Karbari/Add',

    counterStateAll = 'V1/CounterState/All',
    counterStateDictionary = 'V1/CounterState/Dictionary',
    counterStateDictionaryByZoneId = `V1/CounterState/DictionaryByZoneId/`,
    counterStateDictionaryByCode = `V1/CounterState/DictionaryByCode/`,
    counterStateGridFriendly = 'V1/CounterState/GridFriendly',
    counterStateRemove = 'V1/CounterState/Remove',
    counterStateEdit = 'V1/CounterState/Edit',
    counterStateAdd = 'V1/CounterState/Add',

    CounterReportAll = 'V1/CounterReport/All',
    CounterReportGet = 'V1/CounterReport/Get',
    CounterReportRemove = 'V1/CounterReport/Remove',
    CounterReportEdit = 'V1/CounterReport/Edit',
    CounterReportAdd = 'V1/CounterReport/Add',
    CounterReportDICTIONARY = 'V1/CounterReport/Dictionary',
    CounterReportByZoneIdDICTIONARY = `/V1/CounterReport/DictionaryByZoneId/`,

    counterReadersByZoneId = `V1/User/CounterReaders/`,

    ReadingReportMasterWithParam = 'V1/ReadingReport/Master/WithParam',
    ReadingReportDETAILSWithParam = 'V1/ReadingReport/Details/WithParam',

    APKPreList = 'V1/APK/PreList',
    APKLast = 'V1/APK/Last',
    APKUpload = 'V1/APK/Upload',

    QotrAll = 'V1/Qotr/All',
    QotrDictionary = 'V1/Qotr/Dictionary',
    QotrRemove = 'V1/Qotr/Remove',
    QotrEdit = 'V1/Qotr/Edit',
    QotrAdd = 'V1/Qotr/Add',


    /* NON MANAGER INTERFACES */
    getPolicies = `V1.Test/Policy/Active/`,
    editPolicies = 'V1.Test/Policy/Edit', //post body
    addPolicies = 'V1.Test/Policy/Add',
    getSideBar = 'V1/User/SideBar',
    changePassword = 'V1/Account/ChangePassword',
    getMyProfile = 'V1/Account/MyInfo',

    postImportData = 'V1/Import/Dynamic',
    postImportDynamicCount = 'V1/Import/DynamicCount',
    postSimafaReadingProgram = 'V1/Import/Simafa/ReadingPrograms',
    postSimafaBatch = 'V1/Import/Simafa/Batch',
    postSimafaSingle = 'V1/Import/Simafa/single',
    postSimafaAssessPre = 'V1/Import/Simafa/AssessPre',
    postSimafaAssessAdd = 'V1​/Import​/Simafa​/AssessAdd',

    getDashboardDispersalRateTimed = 'V1/List/Dashboard/DispersalRate/Timed',
    getDashboardTraverseTimed = 'V1/List/Dashboard/Traverse/Timed',
    getDashboardCountInStates = 'V1/Tracking/Dashboard/CountInStates',
    getDashboardKarkardTimed = 'V1/List/Dashboard/Karkard/Timed',
    getDashboardMediaTimed = 'V1/List/Dashboard/Media/Timed',
    getDashboardReadingReportTimed = 'V1/ReadingReport/Dashboard/Timed',
    getDashboardReadTimed = 'V1/List/Dashboard/Read/Timed',
    getDashboardForbiddenTimed = 'V1/Forbidden/Dashboard/Timed',
    getDashboardReadDaily = 'V1/List/Dashboard/Read/Daily',
    postDashboardAnalyzePerformance = 'V1/Tracking/Dashboard/Analyze/Performance',
    getDashboardUsersOverall = 'V1/User/Dashboard/Overall',
}
