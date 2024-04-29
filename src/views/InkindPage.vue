<template>
  <ion-page id="inkind-content">
    <ion-header>
      <ion-toolbar class="toolbar" color="primary">
        <ion-buttons>
          <ion-back-button defaultHref="/donation"></ion-back-button>
        </ion-buttons>
        <ion-title>In-Kind Donation Form</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div v-if="loading" class="loading-indicator">Loading...</div>
  
  <div v-else>
    <div class="content-title">
      <h2 class="page-title">Inkind Form</h2>
    </div>
        <div class="container">
          <div class="inkind-container">
            <form @submit.prevent="submitForm" class="inkind-form">
              <div class="form-group">
                  <ion-label class="label" for="email">Name of Donor: </ion-label>
                    <ion-item>
                      <ion-label v-model="donor" readonly>{{ donor }}</ion-label>
                    </ion-item>
              </div>
              <div class="form-group">
                  <ion-label class="label" for="email">Email: </ion-label>
                    <ion-item>
                      <ion-label v-model="email" readonly>{{ email }}</ion-label>
                    </ion-item>
              </div>
              <div class="form-group">
                  <ion-label class="label" for="phone number">Phone Number: </ion-label>
                    <ion-item>
                      <ion-label v-model="phone_number" readonly>{{ phone_number }}</ion-label>
                    </ion-item>
              </div>
              <div class="form-group">
                <label for="donationType">Type of Donation:</label>
                <select class="form-control" v-model="donationType" required>
                  <option value="Clothing">Clothing</option>
                  <option value="Food">Food</option>
                  <option value="Toiletries">Toiletries</option>
                  <option value="School Supplies">School Supplies</option>
                  <option value="Medical Supplies">Medical Supplies</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div class="form-group">
                <label for="quantity">Quantity/Weight:</label>
                <input type="number" v-model="quantity" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="quantityType">Quantity Type:</label>
                <select class="form-control" v-model="quantityType" required>
                  <option value="pieces">Piece/s</option>
                  <option value="kilos">Kilo/s</option>
                  <option value="units">Unit/s</option>
                  <option value="pairs">Pair/s</option>
                </select>
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textarea v-model="description" class="form-control" rows="3" required></textarea>
              </div>
              <div class="form-group">
                <label for="donateDate">Date of Drop-off:</label>
                <input type="date" v-model="donateDate" class="form-control" required>
              </div>
              <div class="form-group text-center">
                <ion-button type="submit" class="btn btn-primary" shape="round" expand="full" value="Submit">Submit</ion-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent } from '@ionic/vue';
import axios from 'axios';
import { alertController } from '@ionic/vue';

export default {
  name: 'InKindDonationForm',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent
  },
  data() {
    return {
      donor: '',
      email: '',
      phone_number: '',
      donationType: '',
      quantity: '',
      quantityType: '',
      description: '',
      donateDate: '',
      event_id: '', // Initialize event_id
      event: '',
      loading: true,
    };
  },
  mounted() {
    this.fetchUserProfile();
    this.fetchEventData(this.$route.query.eventId); // Fetch event data
  },
  methods: {
    async fetchEventData(eventId) {
      if (eventId) {
        try {
          const response = await axios.get(`https://seranycare.com/api/event-detail_api.php?id=${eventId}`);
          if (response.data.status === 'success') {
            this.eventData = { ...response.data.event };
          } else {
            console.error('Fetch event data failed:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching event data:', error);
        }
      }
    },

    async fetchUserProfile() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.post('https://seranycare.com/api/fetchprofile_api.php', { userId });
        if (response.data.status === 'success') {
          this.donor = response.data.first_name;
          this.email = response.data.email;
          this.phone_number = response.data.contact_number;
        } else {
          console.error('Error fetching user profile data:', response.data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    },

    async submitForm() {
  const { id: event_id, title: event, date: event_date, venue: event_venue } = this.eventData;

  const postData = {
    event_id,
    event,
    donor: this.donor,
    email: this.email,
    phone_number: this.phone_number,
    type: this.donationType,
    quantity: this.quantity,
    quantity_type: this.quantityType,
    description: this.description,
    inkind_donate_date: this.donateDate,
  };

  console.log('Post Data:', postData); // Check volunteerData before submission

  try {
    const response = await axios.post('https://seranycare.com/api/inkind_api.php', postData);
    if (response.data.status === 'success') {
      console.log('In-kind donation data inserted successfully.');
      // Show ion-alert
      this.showAlert('Success', 'In-kind donation data inserted successfully.');
    } else {
      console.error('Error inserting in-kind donation data:', response.data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
},

showAlert(title, message) {
  const alertController = this.$ionic.alertController; // Import the alertController directly from @ionic/vue
  const alert = alertController.create({
    header: title,
    message: message,
    buttons: ['OK']
  });
  alert.present();
},

  }
}
</script>

<style scoped>
  /* In-Kind Donation page styles */

  .content-title {
    text-align: center;
  }

  .page-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }

  .inkind-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 25px;
  }

  .form-control {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #a10101;
    font-size: 16px;
  }

  .label {
    font-weight: 600;
    display: block;
    margin-bottom: 8px;
    color: #333;
  }

  .loading-indicator {
    text-align: center;
    margin-top: 50px;
    font-size: 18px;
    color: #666;
  }

  select {
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #dcdcdc;
    font-size: 16px;
  }

  /* Apply container and ion-item styles */
  .container ion-item {
    --background: #f1f1f1;
    border: 1px solid #a10101;
    border-radius: 10px;
    margin-bottom: 16px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
  }

  .container {
    padding-top: 20px;
  }
</style>
