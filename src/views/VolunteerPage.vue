<template>
    <ion-page id="volunteer-content">
      <ion-header>
        <ion-toolbar class="toolbar" color="primary">
          <ion-buttons>
            <ion-back-button defaultHref="/events"></ion-back-button>
          </ion-buttons> 
          <ion-title>Volunteer</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <div v-if="loading" class="loading-indicator">Loading...</div>
  
        <div v-else>
          <div class="content-title">
            <h2 class="page-title">Volunteering Form</h2>
          </div>

          <div class="container">
            <div class="volunteer-container">
              <form @submit.prevent="submitVolunteerForm" class="volunteer-form">
                <div class="form-group">
                  <ion-label class="label" for="email">Email: </ion-label>
                    <ion-item>
                      <ion-label v-model="email" readonly>{{ email }}</ion-label>
                    </ion-item>
                </div>
                <div class="form-group">
                  <ion-label class="label" for="first_name">First Name: </ion-label>
                    <ion-item>
                      <ion-label v-model="first_name" readonly>{{ first_name }}</ion-label>
                    </ion-item>
                </div>
                <div class="form-group">
                  <ion-label class="label" for="middle_name">Middle Name: </ion-label>
                    <ion-item>
                      <ion-label v-model="middle_name" readonly>{{ middle_name }}</ion-label>
                    </ion-item>
                </div>
                <div class="form-group">
                  <ion-label class="label" for="last_name">Last Name: </ion-label>
                    <ion-item>
                      <ion-label v-model="last_name" readonly>{{ last_name }}</ion-label>
                    </ion-item>
                </div>
                <div class="form-group">
                  <ion-label class="label" for="address">Address: </ion-label>
                    <ion-item>
                      <ion-label v-model="address" readonly>{{ address }}</ion-label>
                    </ion-item>
                </div>
                <div class="form-group">
                  <ion-label class="label" for="contact_number">Phone Number: </ion-label>
                    <ion-item>
                      <ion-label v-model="contact_number" readonly>{{ contact_number }}</ion-label>
                    </ion-item>
                </div>
                <div class="form-group">
                  <label class="label" for="role">Role:</label>
                  <select class="form-control" v-model="role" required>
                    <option selected disabled value="">Choose the type</option>
                    <option value="Event Setup Crew">Event Setup Crew</option>
                    <option value="Usher">Usher</option>
                    <option value="Any">Any</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div class="form-group" v-if="role === 'Other'">
                  <label class="label" for="other_role">Specify Other Role:</label>
                  <input type="text" class="form-control" v-model="other_role">
                </div>
                <ion-button type="submit" class="btn btn-primary" shape="round" expand="full" value="Submit">Submit</ion-button>
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
  
  export default {
    name: 'Volunteerpage',
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
        email: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        address: '',
        contact_number: '',
        event_id: '',
        event: '',
        event_date: '',
        event_venue: '',
        role: '',
        other_role: '',
        loading: true,
      };
    },
    mounted() {
      this.fetchVolunteerData();
      this.fetchEventData(this.$route.query.eventId);
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

  
      async fetchVolunteerData() {
        try {
          const userId = localStorage.getItem('userId');
          const response = await axios.post('https://seranycare.com/api/fetchprofile_api.php', { userId });
          if (response.data.status === 'success') {
            this.email = response.data.email;
            this.first_name = response.data.first_name;
            this.middle_name = response.data.middle_name;
            this.last_name = response.data.last_name;
            this.address = response.data.address;
            this.contact_number = response.data.contact_number;
          } else {
            console.error('Fetch volunteer data failed:', response.data.message);
          }
        } catch (error) {
          console.error('Fetch volunteer data error:', error);
        } finally {
          this.loading = false;
        }
      },
  
      async submitVolunteerForm() {
  // Extract necessary data from eventData
  const { id: event_id, title: event, date: event_date, venue: event_venue } = this.eventData;

  // Construct volunteerData object with extracted event details
  const volunteerData = {
    event_id, // Assign extracted event_id
    event,
    event_date,
    event_venue,
    email: this.email,
    first_name: this.first_name,
    middle_name: this.middle_name,
    last_name: this.last_name,
    address: this.address,
    contact_number: this.contact_number,
    role: this.role,
    other_role: this.other_role || ''
  };

  console.log('Volunteer Data:', volunteerData); // Check volunteerData before submission

  try {
    const response = await axios.post('https://seranycare.com/api/volunteer_api.php', volunteerData);
    if (response.data.status === 'success') {
      console.log('Volunteer data inserted successfully.');
    } else {
      console.error('Error inserting volunteer data:', response.data.message);
    }
  } catch (error) {
    console.error('Error inserting volunteer data:', error.message);
  }
}
    }
  };
  </script>
  
  <style scoped>
  /* Volunteer page styles */

  .content-title {
    text-align: center;
  }
  
  .page-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  
  .volunteer-container {
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
    border-radius: 5px;
    border: 1px solid #dcdcdc;
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
  
  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  
  select {
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #dcdcdc;
    font-size: 16px;
  }
  
  .form-control {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #a10101;
    font-size: 16px;
  }
  /* Optional: Add styles for other_role input when role is 'Other' */
  .form-group.other-role {
    display: none;
    transition: display 0.3s ease;
  }
  
  .form-group.other-role.show {
    display: block;
  }
  
  /* Apply container and ion-item styles */
  .container ion-item {
    --background: #f1f1f1;
    border-radius: 10px;
    border: 1px solid #a10101;
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
  