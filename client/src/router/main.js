import CommonMainView from '../views/CommonMainView.vue';
import MainView from '../views/MainView.vue';
import GuideView from '../views/GuideView.vue';
import BookInfoView from '../views/BookInfoView.vue';
import OrderView from '../views/OrderView.vue';
import CartView from '../views/CartView.vue';
import MainBookListView from '../views/MainBookListView.vue';
import MenuBookListView from '../views/MenuBookListView.vue';
import BookSearchListView from '../views/BookSearchListView.vue';

import UserListview from '../views/UserListview.vue';



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
        path: 'cart',
        name: 'cart',
        component: CartView

    },
    // 박지웅
    {
        path: 'mainBookList',
        name: 'mainBookList',
        component: MainBookListView
    },
    {
        path: 'menuBookList',
        name: 'menuBookList',
        component: MenuBookListView
    },
    // 도승민
    {
        path: 'userList',
        name: 'userList',
        component: UserListview

    },

    // 장효은

    ]
}
