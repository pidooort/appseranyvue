import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import LandingPage from '../views/LandingPage.vue';
import NewsPage from '../views/NewsPage.vue';
import NewsPostPage from '../views/NewsPostPage.vue';
import EventsPage from '../views/EventsPage.vue';
import EventsPostPage from '../views/EventsPostPage.vue';
import VolunteerPage from '../views/VolunteerPage.vue';
import DonationPage from '../views/DonationPage.vue';
import DonationPostPage from '../views/DonationPostPage.vue';
import CashPage from '../views/CashPage.vue';
import InkindPage from '../views/InkindPage.vue';
import WhoWeAarePage from '../views/WhoWeArePage.vue';
import WhatWeDoPage from '../views/WhatWeDoPage.vue';
import ContactPage from '../views/ContactPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/landing'
  },
  {
    path: '/landing',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage
  },
  {
    path: '/news',
    name: 'News',
    component: NewsPage
  },
  {
    path: '/news_post/:id',
    name: 'NewsPost',
    component: NewsPostPage
  },
  {
    path: '/events',
    name: 'Events',
    component: EventsPage
  },
  {
    path: '/events_post/:id',
    name: 'EventsPost',
    component: EventsPostPage
  },
  {
    path: '/volunteer',
    name: 'Volunteer',
    component: VolunteerPage
  },  
  {
    path: '/donation',
    name: 'Donation',
    component: DonationPage
  },
  {
    path: '/donation_post/:id',
    name: 'DonationPost',
    component: DonationPostPage
  },
  {
    path: '/cash',
    name: 'Cash',
    component: CashPage
  },
  {
    path: '/inkind',
    name: 'Inkind',
    component: InkindPage
  },
  {
    path: '/who',
    name: 'Who',
    component: WhoWeAarePage
  },
  {
    path: '/what',
    name: 'What',
    component: WhatWeDoPage 
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage 
  }
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
