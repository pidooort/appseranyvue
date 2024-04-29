<template>
  <ion-page id="main-content">
    <!-- Header and toolbar code -->
    <ion-header>
      <ion-toolbar class="toolbar" color="primary">
        <ion-buttons>
          <ion-back-button defaultHref="/donation"></ion-back-button>
          <ion-title>Donation</ion-title>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="content-title">
        <h2 class="page-title">{{ eventData.title }}</h2>
      </div>

      <div class="container">
        <div class="news-container">
          <!-- Event details card -->
          <ion-card>
            <img :src="eventData.image_url" class="news-image" />
            <ion-card-header>
              <ion-card-title>{{ eventData.title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p class="news-summary">{{ stripHtmlTags(eventData.detail) }}</p>
              <p class="news-date">Date: {{ formatDate(eventData.date) }}</p>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- Donation type selection dropdown -->
        <div class="news-container">
          <ion-card>
            <ion-card-content>
              <h3 class="news-title">Select Donation Type</h3>
              <ion-select v-model="selectedDonationType" class="news-select">
                <ion-select-option value="inkind">In-Kind Donation</ion-select-option>
                <ion-select-option value="cash">Cash Donation</ion-select-option>
              </ion-select>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- Submit button -->
              <ion-button @click="$router.push({ path: '/inkind', query: { eventId: eventData.id } })" shape="round" expand="full">Proceed</ion-button>
          
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import axios from 'axios';

export default {
  name: 'DonationPostPage',
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
    IonSelect,
    IonSelectOption,
    IonButton
  },
  data() {
    return {
      eventData: {},
      selectedDonationType: 'inkind' // Default selected donation type
    };
  },
  mounted() {
    this.fetchEventData();
  },
  methods: {
    async fetchEventData() {
      try {
        const id = this.$route.params.id;
        const response = await axios.get(`https://seranycare.com/api/fd_post_api.php?id=${id}`);
        if (response.data.status === 'success') {
          this.eventData = response.data.event;
        } else {
          console.error('Failed to fetch event data:', response.data.message);
        }
      } catch (error) {
        console.error('Fetch event data error:', error.message);
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    stripHtmlTags(html) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    },
    submitDonation() {
      // Redirect based on selected donation type
      if (this.selectedDonationType === 'inkind') {
        // Redirect to the in-kind donation page
        window.location.href = 'http://localhost:8100/inkind';
      } else if (this.selectedDonationType === 'cash') {
        // Redirect to the cash donation page
        window.location.href = 'http://localhost:8100/cash';
      }
    }
  }
};
</script>

<style scoped>
/* Your CSS styles */
.toolbar {
  --ion-color-base: white;
}

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
  margin-bottom: 20px;
}

.news-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.news-summary {
  color: #555;
  margin-bottom: 10px;
}

.news-date {
  color: #999;
}

.news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
</style>
