import { ISidebarItems } from './../../Interfaces/isidebar-items';

export const sidebarItems: ISidebarItems[] = [
    { routerUrl: '/wr', name: 'مدیریت کاربران', isClosable: false, isRefreshable: false, isOpenItems: false },
    { routerUrl: '/wr/foo', name: 'گزارش گیری', isClosable: true, isRefreshable: true, isOpenItems: false }
]