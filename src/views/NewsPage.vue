<!-- newspage.vue -->
<template>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar class="toolbar" color="primary">
        <ion-buttons>
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>News and Stories</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="loading" class="loading-indicator">Loading...</div>

      <div v-else>
        <div class="content-title">
          <h2 class="page-title">NEWS AND STORIES</h2>
          <p class="page-description">Empowering Change, Transforming Futures: Unveiling the Stories Behind Foundations</p>
        </div>
        
        <div class="container">
          <div class="news-container">
            <ion-card v-for="newsItem in newsItems" :key="newsItem.id" class="news-card">
              <img :src="newsItem.image_url" class="news-image" />
              <ion-card-header>
                <ion-card-title>{{ newsItem.news_title }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <p class="news-date">Date: {{ formatDate(newsItem.date) }}</p>
                <ion-button @click="$router.push('/news_post/' + newsItem.id)" expand="full" shape="round" color="secondary" class="read-more-btn">
                  Continue Reading
                </ion-button>
              </ion-card-content>
            </ion-card>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue';
import axios from 'axios';

export default {
  name: 'Newspage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  },
  data() {
    return {
      newsItems: [],
      loading: true
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      try {
        const response = await axios.get('https://seranycare.com/api/news-updates_api.php');
        if (response.data.status === 'success') {
          this.newsItems = response.data.news;
        } else {
          console.error('Failed to fetch news:', response.data.message);
        }
      } catch (error) {
        console.error('Fetch news error:', error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.toolbar {
  --ion-color-base: white;
}

.content-title {
  text-align: center;
  margin-bottom: 20px; /* Increased spacing for better separation */
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.page-description {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px; /* Increased spacing for better separation */
}

/* News card styles */
.news-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.news-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease; /* Added smooth transition effect */
}

.news-card:hover {
  transform: translateY(-5px); /* Lift card slightly on hover */
}

.news-card ion-card-title {
  font-size: 18px; /* Increased font size for better readability */
  font-weight: bold; /* Added bold font weight */
}

.news-summary {
  color: #555;
  margin-bottom: 10px;
}

.news-date {
  color: #999;
  margin-bottom: 15px;
}

.read-more-btn {
  margin-top: 10px;
}

.news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.loading-indicator {
  text-align: center;
  margin-top: 20px;
}
</style>
