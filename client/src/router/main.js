import CommonMainView from '../views/CommonMainView.vue';
import MainView from '../views/MainView.vue';
import GuideView from '../views/GuideView.vue';
import BookInfoView from '../views/BookInfoView.vue';
import OrderView from '../views/OrderView.vue';
import CartView from '../views/CartView.vue';
import MainBookListView from '../views/MainBookListView.vue';
import BookListView from '../views/BookListView.vue';
import RecommendBookMenuView from '../views/navs/RecommendBookMenuView.vue';
import BestsellerBookMenuView from '../views/navs/BestsellerBookMenuView.vue';
import CategoryBookMenuView from '../views/navs/CategoryBookMenuView.vue';
import BookReviewView from '../views/BookReviewView.vue';
import RegisterModalView from '../views/RegisterModalView.vue';
import BookSearchListView from '../views/BookSearchListView.vue';
import OrderCompleteView from '../views/OrderCompleteView.vue';
import UserJoinView from '../views/UserJoinView.vue';
import UserInfoView from '../views/UserInfoView.vue';
import UserUpdateView from '../views/UserUpdateView.vue';
import OrderListView from '../views/OrderListView.vue';
import MypageView from '../views/MypageView.vue';
import UserNoticeView from '../views/UserNoticeView.vue';
import UserNoticeInfoView from '../views/UserNoticeInfoView.vue';




export default {
    path: '/',
    name: 'commonMain',
    component: CommonMainView, // header, footer 고정
    redirect : 'main', // '/'로 진입시 실제로 보여야하는 컴포넌트로 연결
    children: [
    {
        path: 'main',
        name: 'main',
        component: MainView
    },
    {
        path: 'guide',
        name: 'guide',
        component: GuideView
    },
    // 이유민
    {
        path: 'book',
        name: 'book',
        component: BookInfoView // 책 검색 후 도서 상세화면
    },
    {
        path: 'bookSearch',
        name: 'bookSearch',
        component: BookSearchListView // 검색하고 해당 도서 검색 결과 목록
    },
    // 신수지
    {
        path: 'order',
        name: 'order',
        component: OrderView
    },
    {
        path: 'complete',
        name: 'complete',
        component: OrderCompleteView

    },
    {
        path: 'cart',
        name: 'cart',
        component: CartView
    },
    {
        path: 'orderlist',
        name: 'orderlist',
        component: OrderListView
    },
    {
        path: 'mypage',
        name: 'mypage',
        component: MypageView
    },
    // 박지웅
    {
        path: 'mainBookList',
        name: 'mainBookList',
        component: MainBookListView
    },
    {
        path: 'recommendBookMenu',
        name: 'recommendBookMenu',
        component: RecommendBookMenuView
    },
    {
        path: 'bestsellerBookMenu',
        name: 'bestsellerBookMenu',
        component: BestsellerBookMenuView
    },
    {
        path: 'categoryBookMenu',
        name: 'categoryBookMenu',
        component: CategoryBookMenuView
    },
    {
        path: 'bookList',
        name: 'bookList',
        component: BookListView
    },
    {
        path: 'bookReview',
        name: 'bookReview',
        component: BookReviewView
    },
    {
        path: 'registerModal',
        name: 'registerModal',
        component: RegisterModalView
    },
    // 도승민
    {
        path: 'userjoin',
        component: UserJoinView
      },
      {
        path: '/userInfo',
        component: UserInfoView
      },
      {
        path: '/userUpdate',
        component: UserUpdateView
      },
      {
        path: '/userNotice',
        component: UserNoticeView
      },
      {
        path: '/userNoticeInfo',
        component: UserNoticeInfoView
      }
   

    
    

    // 장효은

    ]
}
