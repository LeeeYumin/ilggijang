import AdminMainView from '../views/AdminMainView.vue';
import DashBoardView from '../views/DashBoardView.vue';
import UserListview from '../views/UserListview.vue';
import FileView from '../views/FileView.vue';
import NoticeView from '../views/NoticeView.vue';
import NoticeFormView from '../views/NoticeFormView.vue';
import NoticeInfoView from '../views/NoticeInfoView.vue';
import NoticeInsertView from '../views/NoticeInsertView.vue';
import NoticeUpdateView from '../views/NoticeUpdateView.vue';
import UserInfoview from '../views/UserInfoView.vue';
import UserFormView from '../views/UserFormView.vue';


export default {
    path: '/admin',
    name: 'admin',
    component: AdminMainView,
    redirect : '/admin/dashboard',
    children: [
      {
          path: 'dashboard',
          name: 'dashboard',
          component: DashBoardView
      },
      // 도승민
      {
        path: 'noticeForm',
        name: 'noticeForm',
        component: NoticeFormView
      },
      
      {
        path: 'notice',
        name: 'notice',
        component: NoticeView

      },
      {
        path: 'noticeInfo',
        name: 'noticeInfo',
        component: NoticeInfoView

      },
      {
        path: 'noticeInsert',
        name: 'noticeInsert',
        component: NoticeInsertView

      },
      {
        path: 'noticeInfo',
        name: 'noticeInfo',
        component: NoticeInfoView

      }, {
        path: 'noticeUpdate',
        name: 'noticeUpdate',
        component: NoticeUpdateView

      },
      {
        path: 'userList',
        name: 'userList',
        component: UserListview
      },
      {
        path: 'userInfo',
        name: 'userInfo',
        component: UserInfoview
      },
      {
        path: 'userForm',
        name: 'userForm',
        component: UserFormView
      },
      
      // 장효은
      {
        path: 'fileInfo',
        name: 'fileInfo',
        component: FileView
      },
   
    ]
  }