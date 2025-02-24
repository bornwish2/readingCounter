export interface IReadingReportChartDisposeRes {
    inProvince: IRRChartResWrapper,
    inRegion: IRRChartResWrapper,
    inZone: IRRChartResWrapper
}
export interface IReadingReportKarkard {
    offloadDayalali: string,
    fromEshterak: string,
    toEshterak: string,
    counterReaderName: string,
    fromTime: string,
    toTime: string,
    duration: number,
    overalCount: number,
    adiCount: number,
    faqedCount: number,
    maneCount: number,
    xarabCount: number,
    tavizCount: number,
    saierCount: number,
    areaTitle?: string,
    zoneId: number,
    zoneTitle: string,
    trackNumber: number
}
export interface IReadingReportChartKarkard {
    inProvince: IReadingReportKarkard,
    inRegion: IReadingReportKarkard,
    inZone: IReadingReportKarkard
}
export interface IReadingReportReq {
    zoneId?: number,
    fromDate: string,
    toDate: string,
    counterReaderId: string,
    readingPeriodId: number,
    reportCode: number,
    year: number
}
export interface IReadingReportGISReq {
    zoneId: number,
    isCounterState: boolean,
    counterStateId: number,
    isKarbariChange: boolean,
    isAhadChange: boolean,
    isForbidden: boolean,
    readingPeriodId: number,
    year: number,
    fromDate: string,
    toDate: string,
    isCluster: boolean
}
export interface IReadingReportGISResponse {
    x: string,
    y: string,
    gisAccuracy: string,
    info1: string,
    info2: string,
    info3: string
}
export interface IReadingReportMaster {
    zoneId: number,
    zoneTitle: string,
    reportId: number,
    reportTitle: string,
    itemCount: number
}
export interface IReadingReportDetails {
    id: string,
    billId: number,
    radif: number,
    eshterak: number,
    fulName: string,
    address: string,
    karbariCode: number,
    possibleKarbariCode: number,
    ahadMaskooniOrAsli: number,
    possibleAhadMaskooniOrAsli: number,
    ahadTejariOrFari: number,
    possibleAhadTejariOrFari: number,
    ahadSaierOrAbBaha: number,
    possibleSaierOrAbBaha: number,
    reportTitle: string,
    counterReaderName: string,
    offloadDateJalali: string,
    counterSerial: string,
    possibleCounterSerial: string
}
export interface IReadingReportTraverse {
    id: string
    billId: string,
    radif: number,
    eshterak: string,
    fulName: string,
    address: string,
    karbariCode: number,
    possibleKarbariCode: number,
    ahadMaskooniOrAsli: number,
    possibleAhadMaskooniOrAsli: number,
    ahadTejariOrFari: number,
    possibleAhadTejariOrFari: number,
    ahadSaierOrAbBaha: number,
    possibleSaierOrAbBaha: number,
    counterReaderName: string,
    offloadDateJalali: string,
    counterSerial: string,
    possibleCounterSerial: string,
    possibleAddress: string,
    mobile: string,
    possibleMobile: string,
    possibleEmpty: number
}

export interface IReadingReportChartTraverseDifferential {
    inProvince: {
        ahadCount: number,
        karbariCount: number,
        mobileCount: number,
        counterSerialCount: number,
        emptyCount: number,
        areaTitle: string
    }
    inRegion: {
        ahadCount: number,
        karbariCount: number,
        mobileCount: number,
        counterSerialCount: number,
        emptyCount: number,
        areaTitle: string
    }
    inZone: {
        ahadCount: number,
        karbariCount: number,
        mobileCount: number,
        counterSerialCount: number,
        emptyCount: number,
        areaTitle: string
    }
}

export interface IReadingReportChartReq {
    zoneId: number,
    fromDate: string,
    toDate: string,
    counterReaderId: string,
    readingPeriodId: number,
    year: number,
    reportCode: number,
    zoneIds: [
        number
    ]
}
export interface IReadingReportTraverseDifferentialRes {
    id: string,
    billId: string,
    radif: number,
    eshterak: string,
    fulName: string,
    address: string,
    offloadDateJalali: string,
    description: string,
    value: string,
    newValue: string
}
export interface IReadingReportTraverseDifferentialReq {
    zoneId: number,
    fromDate: string,
    toDate: string,
    readingPeriodId: number,
    year: number,
    traverseType: number,
    zoneIds: [
        number
    ]
}
export interface IRRChartResWrapper {
    dayJalali: string,
    fromEshterak: string,
    toEshterak: string,
    counterReaderName: string,
    overalCount: number,
    _8To10: number,
    _10To12: number,
    _12To14: number,
    _14To16: number,
    _16To18: number,
    saierCount: number,
    areaTitle?: string
}
export interface IImageUrlAndInfos {
    fileRepositorayId: string,
    onOffLoadId: string,
    radif: number,
    eshterak: string,
    firstName: string,
    sureName: string,
    imageDescription: string,
    sizeInByte: number,
    imageUrl?: any
}
export interface IImageUrlInfoWrapper {
    trackNumber: number,
    itemCount: number,
    imageCount: number,
    distinctImageCount: number,
    imageUrlAndInfos: IImageUrlAndInfos[]
}