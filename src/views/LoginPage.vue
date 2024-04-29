<template>
  <ion-page>
    <ion-content :fullscreen="true" @ionRefresh="ionRefresh">
      <ion-refresher @ionRefresh="ionRefresh">
        <ion-refresher-content pulling-icon="arrow-down-circle-outline" refreshing-spinner="circular">
        </ion-refresher-content>
      </ion-refresher>

      <div class="header">
        <p class="title">Welcome Back</p>
        <p class="subTitle">Sign in to access your account</p>
      </div>

      <div id="container">
        <ion-item>
          <ion-input v-model="email" placeholder="Email" position="floating"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input type="password" v-model="password" placeholder="Password" position="floating"></ion-input>
        </ion-item>

        <ion-button class="button" @click="login" shape="round" expand="full">Login</ion-button>

        <div class="forgotPassword">
          <router-link to="/reset-password" style="text-decoration: none;">Forgot password?</router-link>
        </div>
        <div class="signupLink">
  <p>New member? <router-link to="/register" style="text-decoration: none;">Signup now</router-link></p>
</div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonItem, IonInput, IonButton, IonLoading, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { addIcons } from 'ionicons';
import { arrowDownCircleOutline } from 'ionicons/icons';
import axios from 'axios';

addIcons({
  'arrow-down-circle-outline': arrowDownCircleOutline
});

export default {
  name: 'LoginPage',
  components: {
    IonPage, IonContent, IonItem, IonInput, IonButton, IonLoading, IonRefresher, IonRefresherContent
  },
  data() {
    return {
      email: '',
      password: '',
      showLoading: false,
      arrowDownCircleOutline
    };
  },
  methods: {
    ionRefresh(event) {
    // Placeholder logic for handling the refresh event
    console.log('Refreshing...');
    
    // Simulate a delay (e.g., fetching new data from server)
    setTimeout(() => {
      console.log('Refresh completed.');
      event.detail.complete(); // Signal that the refresh is complete
    }, 2000); // Adjust the delay as needed
  },
  async login() {
  if (!this.email || !this.password) {
    alert('Email and password are required');
    return;
  }

  try {
    this.showLoading = true; // Show loading spinner
    const response = await axios.post('https://seranycare.com/api/login_api.php', {
      email: this.email,
      password: this.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.status === 'success') {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      alert('Login successful');
      // Use $nextTick to delay the navigation slightly after the alert is closed
      this.$nextTick(() => {
        // Redirect to homepage
        this.$router.push('/home');
      });
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error);
    alert('Login failed: ' + (error.response ? error.response.data.message : 'Network error'));
  } finally {
    this.showLoading = false; // Hide loading spinner
  }
}

  }
};
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

#container ion-item {
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

.forgotPassword {
  margin-top: 5%;
  margin-left: 60%;
}

.signupLink {
  display: flex;
  margin: auto;
  align-content: center;
  position: absolute;
  justify-content: center;
  left: 0;
  width: 80%;
  right: 0;
}
</style>
