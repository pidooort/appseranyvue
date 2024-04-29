<template>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar class="toolbar" color="primary">
        <ion-buttons>
          <ion-back-button default-href="/home" color="light"></ion-back-button>
        </ion-buttons>
        <ion-title>Contact Us</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Parallax Header -->
      <div class="parallax-container">
        <div class="parallax-image" style="background-image: url('/assets/serany1.jpg');">
          <div class="parallax-overlay"></div>
          <div class="parallax-text">
            <p>If you'd like to connect with us, please use the provided contact details. Whether you have inquiries or wish to learn more about our charitable initiatives, feel free to contact us through these channels.</p>
          </div>
        </div>
      </div>
      <!-- End Parallax Header -->
      
      <!-- Contact Section -->
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row gy-4">
          <div class="col-lg col-md-4">
            <div class="info-item">
              <img src="/assets/calendar.png" alt="Calendar icon" class="contact-icon">
              <h3>Our Address</h3>
              <p>725-A J Ynares Extension, Brgy. San Carlos 1940 Binangonan, Philippines</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-4">
            <div class="info-item">
              <img src="/assets/gmail.png" alt="Gmail icon" class="contact-icon">
              <h3>Email</h3>
              <p>seranyfoundationinc@gmail.com</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-4">
            <div class="info-item">
              <img src="/assets/contact.png" alt="Phone icon" class="contact-icon">
              <h3>Number</h3>
              <p>+63 917 152 9351</p>
            </div>
          </div>
        </div>

        <div class="row gy-4 mt-1">
          <div class="col-lg-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3862.487717457554!2d121.1645174244449!3d14.514072485962085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s725-A%20J%20Ynares%20Extension%2C%20Brgy.%20San%20Carlos%201940%20Binangonan%2C%20Philippines!5e0!3m2!1sen!2sph!4v1711822655810!5m2!1sen!2sph"
              frameborder="0" style="border:0; width: 100%; height: 300px;" allowfullscreen></iframe>
          </div>
        </div>
      </div>
      <!-- End Contact Section -->
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonBackButton } from '@ionic/vue';
import { mapOutline, mailOutline, callOutline } from 'ionicons/icons';

export default {
  name: 'ContactPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonButtons,
    IonBackButton
  },
};
</script>

<style scoped>
.toolbar {
  --ion-color-base: #3880ff; /* Primary color */
}

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

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-item {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  border-radius: 8px;
  text-align: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;
}

.info-item:hover {
  background-color: #f5f5f5; /* Light background on hover */
}

.info-item h3 {
  font-size: 18px;
  color: #333;
  font-weight: 600;
  margin: 10px 0;
}

.info-item p {
  padding: 0;
  font-size: 14px;
  margin-bottom: 0;
  color: #777;
}

.contact-icon {
  width: 25px;
  height: auto;
  margin-bottom: 10px;
}
</style>
