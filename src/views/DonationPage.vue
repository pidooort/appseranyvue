<template>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar class="toolbar" color="primary">
        <ion-buttons>
          <ion-back-button defaultHref="/home"></ion-back-button>
          <ion-title>Donation</ion-title>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="content-title">
        <h2 class="page-title">Support a Cause</h2>
        <p class="page-description">Join us in making a difference by supporting our cause, whether through monetary donations or in-kind contributions, as together we strive to create positive change within our community.</p>
      </div>

      <div class="container mt-5">
        <div class="row">
          <ion-card v-for="cause in causes" :key="cause.id" class="col-xl-4 col-md-7 mb-5">
            <img :src="cause.image_url" class="news-image" alt="Cause Image">
            
            <ion-card-header>
              <ion-card-title>{{ cause.title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div class="meta d-flex align-items-center pb-3">
                <p class="news-summary">{{ cause.detail.replace(/<\/?p>/g, '') }}...</p>
              </div>
              <p><b>Total Amount Raised:</b> ₱ {{ cause.total_amount_raised }}</p>
              <div class="button-container">
                <ion-button @click="$router.push('/donation_post/' + cause.id)" shape="round"  expand="full">Proceed</ion-button>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue';
import axios from 'axios';

export default {
  name: 'DonationPage',
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
      causes: [],
      loading: true
    };
  },
  mounted() {
    this.fetchCauses();
  },
  methods: {
    async fetchCauses() {
      try {
        const response = await axios.get('https://seranycare.com/api/donate_api.php');
        if (response.data.status === 'success') {
          this.causes = response.data.causes;
        } else {
          console.error('Failed to fetch causes:', response.data.message);
        }
      } catch (error) {
        console.error('Fetch causes error:', error);
      } finally {
        this.loading = false;
      }
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
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.page-description {
  font-size: 16px;
  color: #666;
}

/* Donation card styles */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

ion-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

ion-card ion-card-title {
  font-size: 16px;
}

.news-summary {
  color: #555;
  margin-bottom: 10px;
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

.error-message {
  text-align: center;
  margin-top: 20px;
  color: red;
}
</style>
