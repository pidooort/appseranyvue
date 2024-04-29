<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="container">
        <img src="/assets/serany.png" alt="Logo">
      </div>

      <div class="button">
        <ion-button @click="$router.push('/login')" shape="round" expand="full">Get Started</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
// Import Ion components
import { IonPage, IonContent, IonButton } from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonContent,
    IonButton
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 30%;
}

.button {
  margin-top: auto; /* Adjusted to center the button vertically */
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  display: flex; /* Added to center the button horizontally */
}
</style>
  