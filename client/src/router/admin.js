import AdminMainView from '../views/AdminMainView.vue';
import DashBoardView from '../views/DashBoardView.vue';
import UserListview from '../views/UserListview.vue';
import FileView from '../views/FileView.vue';
import NoticeView from '../views/NoticeView.vue';
import NoticeFormView from '../views/NoticeFormView.vue';
import NoticeInfoView from '../views/NoticeInfoView.vue';
import NoticeInsertView from '../views/NoticeInsertView.vue';
import NoticeUpdateView from '../views/NoticeUpdateView.vue';
import UserInfoView from '../views/UserInfoView.vue';
import UserFormView from '../views/UserFormView.vue';
import ProductListView from '../views/ProductListView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import ProductInsertView from '../views/ProductInsertView.vue';
import UserUpdateView from '../views/UserUpdateView.vue';
import SalesListView from '../views/SalesListView.vue';
import SalesDetailView from '../views/SalesDetailView.vue';

export default {
    path: '/admin',
    name: 'admin',
    component: AdminMainView
  //   ,
  //   meta: {
  //     roles: ['ROLE_ADMIN'] // 관리자 권한이 있어야 접근 가능
  // }
  ,
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
        component: UserInfoView
      },
      {
        path: 'userForm',
        name: 'userForm',
        component: UserFormView
      },
      {
        path: 'userUpdate',
        name: 'userUpdate',
        component: UserUpdateView
      },

      // 장효은
      {
        path: 'fileInfo',
        name: 'fileInfo',
        component: FileView
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

      // 신수지
      {
        path: 'salesList',
        name: 'salesList',
        component: SalesListView
      }, 
      {
        path: 'salesDetail',
        name: 'salesDetail',
        component: SalesDetailView
      } 

    ]
    // router.beforeEach((to, from, next) => {
    //   let roleStatus = 'admin' // 권한 상태
    //   if (to.meta.roles && !to.meta.roles.includes(roleStatus)) {
    //     alert('해당 페이지에 접근 권한이 없습니다.')
    //     next(from)
    //   } else {
    //     next()
    //   }
  }