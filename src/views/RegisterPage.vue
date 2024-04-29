<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <div class="header">
        <p class="title">Welcome</p>
        <p class="subTitle">Sign Up to create your account</p>
      </div>

      <div class="container">
        <ion-item>
          <ion-input v-model="userData.first_name" placeholder="First Name" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="userData.middle_name" placeholder="Middle Name" required></ion-input>
        </ion-item>  
        <ion-item>
          <ion-input v-model="userData.last_name" placeholder="Last Name" required></ion-input>
        </ion-item> 
        <ion-item>
          <ion-input v-model="userData.address" placeholder="Address" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="userData.contact_number" placeholder="Contact Number" required></ion-input>
        </ion-item>  
        <ion-item>
          <ion-input v-model="userData.email" type="email" placeholder="Email" required></ion-input>
        </ion-item>  
        <ion-item>
          <ion-input v-model="userData.password" type="password" placeholder="Password" required></ion-input>
        </ion-item>  
        <ion-item>
          <ion-input v-model="confirmPassword" type="password" placeholder="Confirm Password" required></ion-input>
        </ion-item>  
      </div>

      <ion-button class="button" shape="round" expand="full" @click="register">Register</ion-button>

      <div class="signupLink">
        <p> Already a member?<router-link to="/login" style="text-decoration: none;">Sign in now</router-link></p>
      </div>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonItem, IonInput, IonButton } from '@ionic/vue'; // Import Ion components
import axios from 'axios';

export default {
  components: {
    IonPage,
    IonContent,
    IonItem,
    IonInput,
    IonButton
  },
  data() {
    return {
      userData: {
        first_name: '',
        middle_name: '',
        last_name: '',
        address: '',
        contact_number: '',
        email: '',
        password: '',
      },
      confirmPassword: ''
    };
  },
  methods: {
    register() {
      if (this.userData.password !== this.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      axios.post('https://seranycare.com/api/register_api.php', {
        ...this.userData,
        confirm_password: this.confirmPassword, // Include confirm_password field
        register: true // This is to mimic the 'isset($_POST["register"])' check in PHP
      })
      .then(response => {
        if (response.data.status === 'success') {
          alert("Successfully created an account!");
          this.$router.push('/login'); // Redirect to login page or dashboard
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.error("There was an error in the registration process:", error);
      });
    }
  }
}
</script>

<style scoped>
.header {
  margin-top: 100px;
  margin-bottom: 80px;
  text-align: center;
}

.header .subTitle {
  color: gray;
  font-size: 0.9rem;
}

.header .title {
  font-size: 2rem;
}

.container ion-item {
  --background: #f1f1f1;
  border-radius: 10px;
  margin-bottom: 16px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
}

.button {
  margin-top: 10%;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
}

.signupLink {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
