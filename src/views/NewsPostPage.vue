<template>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar class="toolbar" color="primary">
        <ion-buttons>
          <ion-back-button default-href="/news"></ion-back-button>
        </ion-buttons>
        <ion-title>Details</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="content-title">
        <h2 class="page-title">News and Stories Details</h2>
      </div>

      <div class="container" v-if="!loading && newsItem">
        <div class="news-container">
          <ion-card>
            <img :src="newsItem.image_url" class="news-image" />
            <ion-card-header>
              <ion-card-title>{{ newsItem.news_title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div class="news-content">
                <p class="news-summary">{{ newsItem.news_detail.replace(/<\/?p>/g, '') }}</p>
                <p class="news-date">Date Posted: {{ formatDate(newsItem.date) }}</p>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>

      <div v-else-if="loading">
        <div class="loading-indicator">Loading...</div>
      </div>

      <div v-else>
        <div class="error-message">Failed to fetch news post. Please try again later.</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import axios from 'axios';

export default {
  name: 'Newspostpage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  },
  data() {
    return {
      newsItem: null,
      loading: true
    };
  },
  mounted() {
    this.fetchNewsPost();
  },
  methods: {
    async fetchNewsPost() {
      try {
        const response = await axios.get('https://seranycare.com/api/news_post_api.php?id=' + this.$route.params.id);
        if (response.data.status === 'success') {
          this.newsItem = response.data.news;
        } else {
          console.error('Failed to fetch news post:', response.data.message);
          this.newsItem = {}; // Set newsItem to an empty object on failure
        }
      } catch (error) {
        console.error('Fetch news post error:', error);
        this.newsItem = {}; // Set newsItem to an empty object on error
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
.content-title {
  text-align: center;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.news-container {
  display: flex;
  justify-content: center;
}

.news-image {
  width: 100%;
  height: auto;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.news-summary {
  color: #555;
  margin-bottom: 10px;
}

.news-date {
  color: #999;
  margin-bottom: 15px;
}

.loading-indicator {
  text-align: center;
  margin-top: 20px;
}

.error-message {
  text-align: center;
  color: red;
  margin-top: 20px;
}
</style>
