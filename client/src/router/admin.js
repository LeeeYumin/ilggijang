import AdminMainView from '../views/AdminMainView.vue';
import DashBoardView from '../views/DashBoardView.vue';
import UserListview from '../views/UserListview.vue';
import NoticeView from '../views/NoticeView.vue';

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
      {// admin 에 넣어야함
        path: 'userList',
        name: 'userList',
        component: UserListview
      },
      {// admin 에 넣어야함
        path: 'notice',
        name: 'notice',
        component: NoticeView
      }
    ]
  }