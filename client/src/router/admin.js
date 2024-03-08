import AdminMainView from '../views/AdminMainView.vue';
import DashBoardView from '../views/DashBoardView.vue';
import UserListview from '../views/UserListview.vue';
import BookInsertView from '../views/BookInsertView.vue';
import NoticeView from '../views/NoticeView.vue';
import NoticeFormView from '../views/NoticeFormView.vue';
import NoticeInfoView from '../views/NoticeInfoView.vue';
import UserInfoview from '../views/UserInfoView.vue';
import UserFormView from '../views/UserFormView.vue';
import ProductListView from '../views/ProductListView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import ProductInsertView from '../views/ProductInsertView.vue';


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
        path: 'bookInsert',
        name: 'bookInsert',
        component: BookInsertView
      },

      // 이유민
      {
        path: 'productList',
        name: 'productList',
        component: ProductListView
      },
      {
        path: 'productDetail',
        name: 'productDetail',
        component: ProductDetailView
      },
      {
        path: 'productInsert',
        name: 'productInsert',
        component: ProductInsertView
      },

    ]
  }