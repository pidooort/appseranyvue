<template>
    <ion-page id="main-content">
      <ion-header>
        <ion-toolbar class="toolbar" color="primary">
          <ion-buttons>
            <ion-back-button default-href="/home"></ion-back-button>
          </ion-buttons>
          <ion-title>Who We Are</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <div v-if="loading" class="loading-indicator">Loading...</div>
  
        <div v-else>
          <div class="content-title">
            <h2 class="page-title">Who We Are</h2>

            <p class="page-description">We are a non-profitable foundation. Volunteer & donation-based located in Rizal.
   We provide assistance We are choosing to continue to provide medical, educational and livelihood assistance to indigent families with the help of its partners, public and private sectors.</p>

          </div>
          
          <div class="container">
            <ion-card class="whoweare-card">
              <ion-card-content>
                <p v-html="whoweare.body"></p>
              </ion-card-content>
            </ion-card>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonCard, IonCardContent } from '@ionic/vue';
  import axios from 'axios';
  
  export default {
    name: 'Whowearepage',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonButtons,
      IonBackButton,
      IonTitle,
      IonContent,
      IonCard,
      IonCardContent
    },
    data() {
      return {
        whoweare: {
          body: ''
        },
        loading: true
      };
    },
    mounted() {
      this.fetchWhoWeAre();
    },
    methods: {
      async fetchWhoWeAre() {
        try {
          const response = await axios.get('https://seranycare.com/api/whoweare_api.php');
          if (response.data.status === 'success') {
            this.whoweare = response.data.data[0]; // Assuming there's only one row in the tbl_about table
          } else {
            console.error('Failed to fetch Who We Are:', response.data.message);
          }
        } catch (error) {
          console.error('Fetch Who We Are error:', error);
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


  </style>
  