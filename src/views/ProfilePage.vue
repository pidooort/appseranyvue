<template>
  <ion-page id="profile-content">
    <ion-header>
      <ion-toolbar class="toolbar" color="primary">
        <ion-buttons>
          <ion-back-button defaultHref="/home" color="light"></ion-back-button>
        </ion-buttons>
        <ion-title>Edit Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="loading" class="loading-indicator">Loading...</div>

      <div v-else>
      <!-- Parallax Header -->
      <div class="parallax-container">
        <div class="parallax-image" style="background-image: url('/assets/serany1.jpg');">
          <div class="parallax-overlay"></div>
          <div class="parallax-text">
            <p>We choose to continue to provide medical, educational, and livelihood assistance to indigent families with the help of its partners, public and private sectors.</p>
          </div>
        </div>
      </div>
      <!-- End Parallax Header -->

        <div class="container">
          <div class="profile-container">

            <form @submit.prevent="updateProfile" class="profile-form">
              <div class="form-group">
                <ion-label for="first_name">First Name: </ion-label>
                <ion-item>
                  <ion-label v-model="first_name" readonly>{{ first_name }}</ion-label>
                </ion-item>
              </div>

              <div class="form-group">
                <ion-label for="middle_name">Middle Name:</ion-label>
                  <ion-item>
                    <ion-label v-model="middle_name" readonly>{{ middle_name }}</ion-label>
                  </ion-item>
              </div>
              <div class="form-group">
                <ion-label for="last_name">Last Name:</ion-label>
                <ion-item>
                  <ion-label v-model="last_name" readonly>{{ last_name }}</ion-label>
                </ion-item>
              </div>
              <div class="form-group">
                <ion-label for="phonenumber">Phone #:</ion-label>
                <ion-item>
                  <ion-label v-model="contact_number" readonly>{{ contact_number }}</ion-label>
                </ion-item>
              </div>

              <div class="form-group">
                <ion-label for="old_password">Old Password:</ion-label>
                <ion-item>
                <ion-input type="password" v-model="old_password" class="form-control" id="old_password" required minlength="8"></ion-input>
                </ion-item>
              </div>
              <div class="form-group">
                  <ion-label for="new_password">New Password:</ion-label>
                  <ion-item>
                  <ion-input type="password" v-model="new_password" class="form-control" id="new_password" required minlength="8"></ion-input>
                  </ion-item>
              </div>
              <ion-button type="submit" class="btn btn-primary" shape="round" expand="full">Update</ion-button>
            </form>

          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonButton } from '@ionic/vue';
import axios from 'axios';

export default {
  name: 'Profilepage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonButton
  },
  data() {
    return {
      isLoggedIn: false,
      first_name: '',
      middle_name: '',
      last_name: '',
      contact_number: '',
      old_password: '',
      new_password: ''
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.post('https://seranycare.com/api/fetchprofile_api.php', { userId });
        if (response.data.status === 'success') {
          this.isLoggedIn = true;
          this.first_name = response.data.first_name;
          this.middle_name = response.data.middle_name;
          this.last_name = response.data.last_name;
          this.contact_number = response.data.contact_number;
        } else {
          console.error('Fetch user data failed:', response.data.message);
        }
      } catch (error) {
        console.error('Fetch user data error:', error);
      }
    },

    async updateProfile() {
      const userId = localStorage.getItem('userId');
      console.log("User ID from localStorage:", userId);
      console.log("Type of user ID:", typeof userId);

      const userData = {
        id: userId,
        old_password: this.old_password,
        new_password: this.new_password,
        first_name: this.first_name,
        middle_name: this.middle_name,
        last_name: this.last_name,
        contact_number: this.contact_number
      };

      try {
        const response = await axios.post('https://seranycare.com/api/edit_api.php', userData);
        if (response.data.status === 'success') {
          alert(response.data.message);
          // Clear the new password field after successful update
          this.new_password = '';
        } else {
          console.error('Failed to update profile:', response.data.message);
        }
      } catch (error) {
        console.error('Update profile error:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Profile form styles */

.parallax-container {
  position: relative;
  height: 250px; /* Reduced height for better visibility of content */
  overflow: hidden;
}

.parallax-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.parallax-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Adjust opacity here */
  z-index: -1;
}

.parallax-text {
  margin-top: 70px;
  margin-right: 10px;
  margin-left: 10px;
  text-align: center;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
}


.loading-indicator {
  text-align: center;
  margin-top: 20px;
}

.container ion-item {
  --background: #f1f1f1;
  border-radius: 10px;
  margin-bottom: 16px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
}

.container{
  padding-top: 20px;
}

.profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
</style>
