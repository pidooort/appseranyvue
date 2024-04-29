<template>
  <ion-page id="main-content">
    <ion-header> 
      <ion-toolbar class="toolbar" color="primary">
        <ion-buttons>
          <ion-back-button defaultHref="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Events</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="content-title">
        <h2 class="page-title">Events</h2>
        <p class="page-description">Make a difference in the lives of those in need. Our events bring together compassionate volunteers dedicated to aiding the less fortunate.</p>
      </div>
      
      <div class="container">
        <div class="events-container">
          <ion-card v-for="eventItem in eventItems" :key="eventItem.id" class="event-card">
            <img :src="eventItem.image_url" class="event-image" />
            <ion-card-header>
              <ion-card-title>{{ eventItem.title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p class="event-date">Event Date: {{ formatDate(eventItem.date) }}</p>
              <div class="button-container">
                <ion-button @click="$router.push('/events_post/' + eventItem.id)" shape="round" color="secondary" expand="full" class="read-more-btn">
                  Read More
                </ion-button>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue';
import axios from 'axios';

export default {
  name: 'Eventspage',
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
    IonCardContent,
    IonButton
  },
  data() {
    return {
      eventItems: [],
      loading: true
    };
  },
  mounted() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get('https://seranycare.com/api/events_api.php');
        if (response.data.status === 'success') {
          this.eventItems = response.data.events;
        } else {
          console.error('Failed to fetch events:', response.data.message);
        }
      } catch (error) {
        console.error('Fetch events error:', error);
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

/* Events card styles */
.events-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px; /* Added gap between cards */
}

.event-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease; /* Added smooth transition effect */
}

.event-card:hover {
  transform: translateY(-5px); /* Lift card slightly on hover */
}

.event-card ion-card-title {
  font-size: 18px; /* Increased font size for better readability */
  font-weight: bold; /* Added bold font weight */
}

.event-date {
  color: #999;
  margin-bottom: 15px;
}

.event-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.read-more-btn {
  margin-top: 10px;
}
</style>
