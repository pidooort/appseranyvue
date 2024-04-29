import { createApp } from 'vue';
import App  from './App.vue';
import router from './router'; // Import router

import { IonicVue } from '@ionic/vue';

// Import Ionic CSS and theme variables
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import './theme/variables.css';

const app = createApp(App);

app.use(IonicVue as any); // Use IonicVue plugin
app.use(router as any); // Use router plugin

router.isReady().then(() => {
  console.log('Router is ready!');
  app.mount('#app');
}).catch((error) => {
  console.error('Router initialization error:', error);
});
