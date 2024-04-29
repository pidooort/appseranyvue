<template>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar class="toolbar" color="primary">
        <ion-buttons>
          <ion-back-button defaultHref="/events"></ion-back-button>
        </ion-buttons>
        <ion-title>Event Detail</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="content-title">
        <h2 class="page-title">Event Detail</h2>
      </div>

      <div class="container" v-if="!loading && eventData">
        <div class="event-container">
          <ion-card>
            <img :src="eventData.image_url" class="event-image" />
            <ion-card-header>
              <ion-card-title>{{ eventData.title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p class="event-summary">{{ eventData.detail.replace(/<\/?p>/g, '') }}</p>
              <ul class="info-table">
                <li class="icon-item"><img src="/assets/calendar.png" alt="Calendar icon"> <strong>Date:</strong> {{ formatDate(eventData.date) }}</li>
                <li class="icon-item"><img src="/assets/clock.png" alt="Clock icon"> <strong>Time:</strong> {{ eventData.time }}</li>
                <li class="icon-item"><img src="/assets/map.png" alt="Map marker icon"> <strong>Venue:</strong> {{ eventData.venue }}</li>
                <li class="icon-item"><img src="/assets/contact.png" alt="Phone icon"> <strong>Contact#:</strong> {{ eventData.phone }}</li>
              </ul>
            </ion-card-content>
          </ion-card>
          <div class="button-container">
            <ion-button @click="$router.push({ path: '/volunteer', query: { eventId: eventData.id } })" shape="round" expand="full">Volunteer Now!</ion-button>
            <ion-button @click="$router.push('/donation')" shape="round" color="secondary" expand="full">Support A Cause</ion-button>
          </div>
        </div>
      </div>

      <div v-else-if="loading">
        <div class="loading-indicator">Loading...</div>
      </div>

      <div v-else>
        <div class="error-message">Failed to fetch event details. Please try again later.</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue';
import axios from 'axios';

export default {
  name: 'Eventpostpage',
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
      eventData: null,
      loading: true
    };
  },
  mounted() {
    this.fetchEventData();
  },
  methods: {
    async fetchEventData() {
      try {
        const response = await axios.get('https://seranycare.com/api/event-detail_api.php?id=' + this.$route.params.id);
        if (response.data.status === 'success') {
          this.eventData = response.data.event;
        } else {
          console.error('Failed to fetch event details:', response.data.message);
          this.eventData = {}; // Set eventData to an empty object on failure
        }
      } catch (error) {
        console.error('Fetch event details error:', error);
        this.eventData = {}; // Set eventData to an empty object on error
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
    margin-bottom: 20px; /* Increased spacing for better separation */
  }

  .page-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  .event-container ion-card-title {
    font-size: 18px; /* Increased font size for better readability */
    font-weight: bold; /* Added bold font weight */
  }

  .event-summary {
    color: #555;
    margin-bottom: 10px;
  }

  .info-table {
    padding-left: 0;
    margin-top: 5px;
  }

  .icon-item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .icon-item img {
    width: 20px;
    height: auto;
    margin-right: 5px;
  }

  .event-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .loading-indicator {
    text-align: center;
    margin-top: 20px;
  }

  .error-message {
    text-align: center;
    margin-top: 20px;
    color: red;
  }

  /* Additional styles for the info table */
  .info-table .icon-item:nth-child(3) {
    /* Adjust margin-bottom to give more space to the venue part */
    margin-bottom: 20px;
  }
</style>
