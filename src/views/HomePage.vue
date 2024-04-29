<template>
  <ion-menu side="end" content-id="main-content" menuId="main-menu">
    <ion-content class="menu">
      <ion-header>
        <ion-toolbar class="toolbar" color="primary">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item>
          <router-link to="/profile" class="menu-link">Profile</router-link>
        </ion-item>
        <ion-item>
          <router-link to="/home" class="menu-link">Home</router-link>
        </ion-item>
        <ion-item>
          <router-link to="/news" class="menu-link">News and Stories</router-link>
        </ion-item>
        <ion-item>
          <router-link to="/events" class="menu-link">Events</router-link>
        </ion-item>
        <ion-item>
          <router-link to="/donation" class="menu-link">Support A Cause</router-link>
        </ion-item>
        <ion-item>
          <router-link to="/who" class="menu-link">Who We Are</router-link>
        </ion-item>
        <ion-item>
          <router-link to="/what" class="menu-link">What We Do</router-link>
        </ion-item>
        <ion-item>
          <router-link to="/contact" class="menu-link">Contact Us</router-link>
        </ion-item>
        <!-- Donation button and Logout button -->
        <div class="menu-button">
          <ion-button shape="round" @click="logout" expand="full">Logout</ion-button>
        </div>
      </ion-list>
    </ion-content>
  </ion-menu>

  <!-- Main content -->
  <ion-page id="main-content">
    <ion-router-outlet></ion-router-outlet>
    <ion-content class="ion-padding">
      <div class="container">
        <div v-if="isLoggedIn">
          <p>Hi <span style="color: #a10101;">{{ first_name }}</span>!</p>
          <h2>Welcome back!</h2>
        </div>
        <div v-else>
          <h2>Welcome to SeranyCare!</h2>
          <p>Please log in to access more features.</p>
        </div>
        <ion-buttons class="menu">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </div>

      <div>
        <h4 class="section-heading">We Provide</h4>
        <ion-grid class="image-grid">
          <ion-row class="image-row">
            <ion-col size="3">
              <img src="/assets/1.png" class="image" />
            </ion-col>
            <ion-col size="3">
              <img src="/assets/2.png" class="image" />
            </ion-col>
            <ion-col size="3">
              <img src="/assets/3.png" class="image" />
            </ion-col>
            <ion-col size="3">
              <img src="/assets/4.png" class="image" />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <!-- News and Stories card -->
      <div class="news">
        <h4 class="section-heading" style="display: flex; justify-content: space-between;">
          <span>News and Stories</span>
          <router-link to="/news" style="color: #a10101; text-decoration: none;" class="link">See all</router-link>
        </h4>
        <!-- Sliding news cards -->
        <div class="card-slider">
          <div class="card-container" ref="newsContainer">
            <div class="card" v-for="(newsItem, index) in newsItems" :key="index">
              <ion-card class="news-card">
                <img :src="newsItem.image_url" class="news-image" />
                <ion-card-header>
                  <ion-card-title>{{ newsItem.news_title }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <p class="date-section">Date: {{ formatDate(newsItem.date) }}
                    <router-link :to="'/news_post/' + newsItem.id" style="color: #a10101; text-decoration: none;" class="link">Read more</router-link>
                  </p>
                </ion-card-content>
              </ion-card>
            </div>
          </div>
        </div>
      </div>

      <!-- Events card -->
      <div class="events">
        <h4 class="section-heading" style="display: flex; justify-content: space-between;">
          <span>Events</span>
          <router-link to="/events" style="color: #a10101; text-decoration: none;" class="link">See all</router-link>
        </h4>
        <!-- Sliding news cards -->
        <div class="card-slider">
          <div class="card-container" ref="eventsContainer">
            <div class="card" v-for="(eventItem, index) in events" :key="index">
              <ion-card class="event-card">
                <img :src="eventItem.image_url" class="event-image" />
                <ion-card-header>
                  <ion-card-title>{{ eventItem.title }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <p class="date-section">Date: {{ formatDate(eventItem.date) }}
                    <router-link :to="'/event_post/' + eventItem.id" style="color: #a10101; text-decoration: none;" class="link" >Read more</router-link>
                  </p>
                </ion-card-content>
              </ion-card>
            </div>
          </div>
        </div>
      </div>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonMenuButton, IonCol, IonRow, IonGrid, IonButton, IonMenu, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonRouterOutlet } from '@ionic/vue';
import axios from 'axios';

export default {
  name: 'HomePage',
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButtons,
    IonMenuButton,
    IonCol,
    IonRow,
    IonGrid,
    IonButton,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonRouterOutlet
  },
  data() {
    return {
      isLoggedIn: false,
      first_name: '',
      newsItems: [],
      events: []
    };
  },
  mounted() {
    this.fetchUserData();
    this.fetchNews();
    this.fetchEvents();
  },
  methods: {
    async fetchUserData() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.post('https://seranycare.com/api/fetchprofile_api.php', { userId });
        if (response.data.status === 'success') {
          this.isLoggedIn = true;
          this.first_name = response.data.first_name;
        } else {
          console.error('Fetch user data failed:', response.data.message);
        }
      } catch (error) {
        console.error('Fetch user data error:', error);
      }
    },
    async fetchNews() {
      try {
        const response = await axios.get('https://seranycare.com/api/news-updates_api.php');
        if (response.data.status === 'success') {
          this.newsItems = response.data.news.slice(0, 3);
        } else {
          console.error('Failed to fetch news:', response.data.message);
        }
      } catch (error) {
        console.error('Fetch news error:', error);
      }
    },
    async fetchEvents() {
      try {
        const response = await axios.get('https://seranycare.com/api/events_api.php');
        if (response.data.status === 'success') {
          this.events = response.data.events.slice(0, 3);
        } else {
          console.error('Failed to fetch events:', response.data.message);
        }
      } catch (error) {
        console.error('Fetch events error:', error);
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    prevNewsCard() {
      const slider = this.$refs.newsContainer;
      slider.scrollLeft -= 330;
    },
    nextNewsCard() {
      const slider = this.$refs.newsContainer;
      slider.scrollLeft += 330;
    },
    prevEventsCard() {
      const slider = this.$refs.eventsContainer;
      slider.scrollLeft -= 330;
    },
    nextEventsCard() {
      const slider = this.$refs.eventsContainer;
      slider.scrollLeft += 330;
    },
    logout() {
  // Clear user data from local storage
  localStorage.removeItem('userId');
  // Redirect to the login page
  this.$router.push('/login');
}
  }
};
</script>


<style scoped>
/* Logged In Styles */
.container{
  padding-left: 5px;
}

.container div:nth-child(1) {
  margin-bottom: 20px; /* Add space below the logged-in message */
}

.container div:nth-child(1) p {
  font-weight: 500; /* Adjusted font weight */
  font-size: larger;
  margin-bottom: 5px; /* Added margin for better spacing */
}

.container div:nth-child(1) h2 {
  font-weight: 550; /* Adjusted font weight */
  margin-top: 1px;
  margin-bottom: 20px; /* Added margin for better spacing */
}

/* Logged Out Styles */
.container div:nth-child(2) h2 {
  font-weight: 600; /* Adjusted font weight */
  margin-bottom: 10px; /* Added margin for better spacing */
}

/* Menu Styles */
.menu {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10; /* Ensure menu appears above other content */
}

.menu ion-menu-button {
  margin-right: 10px;
  margin-top: 30px;
}

.menu-link {
  font-weight: bold;
  text-decoration: none;  
}

/* Link Styles */
.link {
  font-size: 16px;
  color: #a10101;
  text-decoration: none;
  margin-top: 5px;
}

.link:hover {
  text-decoration: underline;
}

/* Image Grid Styles */
.image-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  border-radius: 10px;
}

.section-heading {
  font-weight: 500;
  margin-bottom: 10px;
}

.image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

/* Card Slider Styles */
.card-slider {
  overflow: hidden;
}

.card-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.card {
  flex: 0 0 auto;
  width: 80%; /* Adjusted for better mobile view */
  margin-right: 10px;
  scroll-snap-align: start;
}

/* News & Event Card Styles */
.news-card,
.event-card {
  height: 250px;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
}

.news-card img,
.event-card img {
  width: 100%;
  height: 55%;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.news-card ion-card-content,
.event-card ion-card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-card ion-card-title,
.event-card ion-card-title {
  font-size: 16px;
}

/* Date Section Styles */
.date-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.date-section span {
  font-weight: bold;
  margin-right: 10px;
}

/* Buttons */
ion-button {
  --background: #a10101;
  --border-radius: 30px;
  --padding-end: 20px;
  --padding-start: 20px;
  color: white;
  font-weight: bold;
}

/* Media Queries for Responsive Design */
@media (max-width: 768px) {
  .image-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .card {
    width: 90%;
  }
}

@media (max-width: 480px) {
  .image-grid {
    grid-template-columns: 1fr;
  }

  .card {
    width: 100%;
  }
}
</style>
