export enum ENURLs {
    DEFAULT = 'https://37.191.92.157/kontoriNew',
    ESF = 'https://37.191.92.157/kontoriNew',
    TEH_ZONE4 = 'http://81.12.106.167:8081/kontoriNew',
    TEH_SE = 'http://5.160.85.228:9098/kontoriNew',
    TEH_SE_LOCAL = 'http://172.28.5.40/kontoriNew'
}
export enum ENOSMUrls {
    DEFAULT = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ESF = 'http://172.18.12.242/osm_tiles/{z}/{x}/{y}.png',
    TEH_ZONE4 = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    TEH_SE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    TEH_SE_LOCAL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
}
export enum ENSatteliteAccessToken {
    DEFAULT = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
    ESF = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
    TEH_ZONE4 = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
    TEH_SE = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=',
    TEH_SE_LOCAL = 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token='
}
export enum ENSatelliteToken {
    DEFAULT = 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
    ESF = 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
    TEH_ZONE4 = 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
    TEH_SE = 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg',
    TEH_SE_LOCAL = 'pk.eyJ1IjoiYmFiYWsxMDAxIiwiYSI6ImNrZmh4MGdpMzBwY2kycW1zZDQyMnppeDAifQ.8mflOcV96Qf3DGSYcn3zbg'
}
export enum ENActivateProvinceTitle {
    DEFAULT = '',
    ESF = 'اصفهان',
    TEH = 'تهران',
    TEH_ZONE4 = 'منطقه 4 تهران',
    TEH_SE = 'جنوب شرقی تهران',
    TEH_SE_LOCAL = 'جنوب شرقی تهران'
}
export interface IENV_BROWSER_SETUP {
    alert: number,
    normal: number
}
export interface IBrowserVersions {
    Desktop: {
        Chrome: IENV_BROWSER_SETUP,
        Firefox: IENV_BROWSER_SETUP,
        IE: IENV_BROWSER_SETUP,
        opera: IENV_BROWSER_SETUP,
        safari: IENV_BROWSER_SETUP,
    }
    Touch: {
        Chrome: IENV_BROWSER_SETUP,
        Firefox: IENV_BROWSER_SETUP,
        IE: IENV_BROWSER_SETUP,
        opera: IENV_BROWSER_SETUP,
        safari: IENV_BROWSER_SETUP,
    }
}
export interface IENV {
    headerProvinceTitle: string,
    API_URL: string,
    OSMmapBoxUrl: string,
    SATELLITEMapBoxUrl: string,
    SATELLITEMapAccessToken: string,
    hasNextBazdid: boolean,
    mapCenter: [number, number],
    browserVersions: IBrowserVersions
}
export class ENMapCenter {
    static readonly DEFAULT = new ENMapCenter([32.669, 51.664]);
    static readonly ESF = new ENMapCenter([32.669, 51.664]);
    static readonly TEH = new ENMapCenter([35.7501, 51.5255]);
    static readonly TEH_ZONE4 = new ENMapCenter([35.656051, 51.315435]);
    static readonly TEH_SE = new ENMapCenter([35.656051, 51.315435]);
    static readonly TEH_SE_LOCAL = new ENMapCenter([35.656051, 51.315435]);

    private constructor(public readonly value: [number, number]) {
    }
}
export class ENHasNextBazdid {
    static readonly DEFAULT = new ENHasNextBazdid(false);
    static readonly ESF = new ENHasNextBazdid(false);
    static readonly TEH = new ENHasNextBazdid(true);
    static readonly TEH_ZONE4 = new ENHasNextBazdid(true);
    static readonly TEH_SE = new ENHasNextBazdid(true);
    static readonly TEH_SE_LOCAL = new ENHasNextBazdid(true);

    private constructor(public readonly value: boolean) {
    }
}
export class BrowserVersions {
    static readonly DEFAULT = new BrowserVersions({
        Desktop: {
            Chrome: { alert: 70, normal: 86 },
            Firefox: { alert: 72, normal: 83 },
            IE: { alert: 0, normal: 0 },
            opera: { alert: 73, normal: 78 },
            safari: { alert: 10, normal: 10 },
        },
        Touch: {
            Chrome: { alert: 10, normal: 10 },
            Firefox: { alert: 10, normal: 10 },
            IE: { alert: 10, normal: 10 },
            opera: { alert: 55, normal: 63 },
            safari: { alert: 11, normal: 13 },
        }
    });
    static readonly ESF = new BrowserVersions({
        Desktop: {
            Chrome: { alert: 70, normal: 86 },
            Firefox: { alert: 72, normal: 83 },
            IE: { alert: 0, normal: 0 },
            opera: { alert: 73, normal: 78 },
            safari: { alert: 10, normal: 10 },
        },
        Touch: {
            Chrome: { alert: 10, normal: 10 },
            Firefox: { alert: 10, normal: 10 },
            IE: { alert: 10, normal: 10 },
            opera: { alert: 55, normal: 63 },
            safari: { alert: 11, normal: 13 },
        }
    });
    static readonly TEH = new BrowserVersions({
        Desktop: {
            Chrome: { alert: 70, normal: 86 },
            Firefox: { alert: 72, normal: 83 },
            IE: { alert: 0, normal: 0 },
            opera: { alert: 73, normal: 78 },
            safari: { alert: 10, normal: 10 },
        },
        Touch: {
            Chrome: { alert: 10, normal: 10 },
            Firefox: { alert: 10, normal: 10 },
            IE: { alert: 10, normal: 10 },
            opera: { alert: 55, normal: 63 },
            safari: { alert: 11, normal: 13 },
        }
    });
    static readonly TEH_ZONE4 = new BrowserVersions({
        Desktop: {
            Chrome: { alert: 70, normal: 86 },
            Firefox: { alert: 72, normal: 83 },
            IE: { alert: 0, normal: 0 },
            opera: { alert: 73, normal: 78 },
            safari: { alert: 10, normal: 10 },
        },
        Touch: {
            Chrome: { alert: 10, normal: 10 },
            Firefox: { alert: 10, normal: 10 },
            IE: { alert: 10, normal: 10 },
            opera: { alert: 55, normal: 63 },
            safari: { alert: 11, normal: 13 },
        }
    });
    static readonly TEH_SE = new BrowserVersions({
        Desktop: {
            Chrome: { alert: 70, normal: 86 },
            Firefox: { alert: 72, normal: 83 },
            IE: { alert: 0, normal: 0 },
            opera: { alert: 73, normal: 78 },
            safari: { alert: 10, normal: 10 },
        },
        Touch: {
            Chrome: { alert: 10, normal: 10 },
            Firefox: { alert: 10, normal: 10 },
            IE: { alert: 10, normal: 10 },
            opera: { alert: 55, normal: 63 },
            safari: { alert: 11, normal: 13 },
        }
    });
    static readonly TEH_SE_LOCAL = new BrowserVersions({
        Desktop: {
            Chrome: { alert: 70, normal: 86 },
            Firefox: { alert: 72, normal: 83 },
            IE: { alert: 0, normal: 0 },
            opera: { alert: 73, normal: 78 },
            safari: { alert: 10, normal: 10 },
        },
        Touch: {
            Chrome: { alert: 10, normal: 10 },
            Firefox: { alert: 10, normal: 10 },
            IE: { alert: 10, normal: 10 },
            opera: { alert: 55, normal: 63 },
            safari: { alert: 11, normal: 13 },
        }
    });

    private constructor(public readonly value: IBrowserVersions) {
    }
}