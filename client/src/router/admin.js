import AdminMainView from '../views/AdminMainView.vue';
import DashBoardView from '../views/DashBoardView.vue';
import UserListview from '../views/UserListview.vue';
import BookInsertView from '../views/BookInsertView.vue';
import NoticeView from '../views/NoticeView.vue';
import NoticeFormView from '../views/NoticeFormView.vue';
import NoticeInfoView from '../views/NoticeInfoView.vue';


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
      
      {// admin 에 넣어야함
        path: 'notice',
        name: 'notice',
        component: NoticeView

      },
      {// admin 에 넣어야함
        path: 'noticeInfo',
        name: 'noticeInfo',
        component: NoticeInfoView

      },
      {
        path: 'userList',
        name: 'userList',
        component: UserListview
      },
      
      // 장효은
      {
        path: 'bookInsert',
        name: 'bookInsert',
        component: BookInsertView
      },
   
    ]
  }