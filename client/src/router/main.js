import HomeView from '../views/HomeView.vue';
import GuideView from '../views/GuideView.vue';

export default {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
    {
        path: '/guide',
        name: 'guide',
        component: GuideView
    }
    ]
}
    