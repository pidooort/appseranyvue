<template>
    <ion-page>
      <ion-header>
        <ion-toolbar class="toolbar">
          <ion-buttons>
            <ion-back-button default-href="/donation"></ion-back-button>
          </ion-buttons>
          <ion-title>Cash Donation</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content class="ion-padding form">
        <!-- Cash Donation Form -->
        <form @submit.prevent="submitDonation">
          <!-- Donation Form -->
          <ion-item class="form-item">
            <ion-label position="stacked">Name:</ion-label>
            <ion-input v-model="donorName" placeholder="Enter your name" required></ion-input>
          </ion-item>
  
          <ion-item class="form-item">
            <ion-label position="stacked">Email:</ion-label>
            <ion-input v-model="email" type="email" placeholder="Enter your email" required></ion-input>
          </ion-item>
  
          <ion-item class="form-item">
            <ion-label position="stacked">Phone Number:</ion-label>
            <ion-input v-model="phoneNumber" type="tel" placeholder="Enter your number" required></ion-input>
          </ion-item>
  
          <ion-item class="form-item">
            <ion-label position="stacked">Amount:</ion-label>
            <ion-input v-model="amount" type="number" placeholder="Enter Amount" required></ion-input>
          </ion-item>
  
          <div class="ion-text-center ion-margin-top">
            <ion-button type="submit">Submit</ion-button>
          </div>
        </form>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
  
  export default {
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonButtons,
      IonBackButton,
      IonTitle,
      IonContent,
      IonItem,
      IonLabel,
      IonInput,
      IonButton
    },
    data() {
      return {
        donorName: '',
        email: '',
        phoneNumber: '',
        amount: ''
      };
    },
    methods: {
      validateAmount() {
        const amount = parseFloat(this.amount.replace(/[^0-9.]/g, ''));
        
        if (isNaN(amount)) {
          this.showError('Please enter a valid number.');
          return false;
        }
  
        if (amount < 100) {
          this.showError('Amount must be at least ₱100.00.');
          return false;
        }
  
        if (amount > 100000) {
          this.showError('Amount cannot exceed ₱100,000.00.');
          return false;
        }
  
        return true;
      },
      showError(message) {
        // Handle error display in your app
        console.error(message);
        // You can use Ionic's toast or alert to show error messages
      },
      submitDonation() {
        if (this.validateAmount()) {
          // Handle form submission logic here
          // For example, send form data to the server
          console.log('Form submitted:', {
            donorName: this.donorName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            amount: this.amount
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .toolbar {
    --ion-color-base: white;
  }
  
  .form {
    max-width: 400px;
    margin: auto;
  }
  
  .form-item {
    margin-bottom: 20px;
  }
  
  .submit-btn {
    margin-top: 20px;
  }
  </style>
  