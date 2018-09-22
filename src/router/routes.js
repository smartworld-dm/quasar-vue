import MainLayout from 'layouts/main-layout'

export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '/', component: () => import('pages/Spreadsheet') },
      { path: '/Claimable', component: () => import('pages/Claimable') },
      { path: '/Companies', component: () => import('pages/Companies') },
      { path: '/Account', component: () => import('pages/Account') },
      { path: '/Roles', component: () => import('pages/Roles') },
      { path: '/Users', component: () => import('pages/Users') },
      { path: '/Logs', component: () => import('pages/Logs') },
      { path: '/CalendarPicker', component: () => import('pages/elements/CalendarPicker') }
    ]
  },
  { path: '/Forgot', component: () => import('pages/Forgot') },
  { path: '/Login', component: () => import('pages/Login') },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
