import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'employee-dashboard',
        icon: 'dashboard',
        label: 'Dashboard',
    },
    {
        routeLink: 'employee-stats',
        icon: 'insert_chart_outlined',
        label: 'Stats',
    },
    {
        routeLink: 'employee-documents',
        icon: 'folder_open',
        label: 'Documents',
    },
    {
        routeLink: 'employee-calculator',
        icon: 'money',
        label: 'Calculator',
    },
    {
        routeLink: 'employee-settings',
        icon: 'settings',
        label: 'Settings',
        items: [
            {
                routeLink: 'employee-settings/general-settings',
                label: 'General Settings'
            },
            {
                routeLink: 'employee-settings/account-settings',
                label: 'Account Settings'
            }
        ]
    },
    {
        routeLink: 'employee-profile',
        icon: 'person',
        label: 'Profile',
    },
];
