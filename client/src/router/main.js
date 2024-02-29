import CommonMainView from '../views/CommonMainView.vue';
import MainView from '../views/MainView.vue';
import GuideView from '../views/GuideView.vue';
import BookInfoView from '../views/BookInfoView.vue';


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
    {
        path: 'book',
        name: 'book',
        component: BookInfoView // 책 검색 후 도서 상세화면
    }
    ]
}
