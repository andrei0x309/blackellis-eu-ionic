<template>
  <ion-menu menu-id="menu" content-id="ion-router-outlet">
    <ion-header>
      <ion-toolbar>
        <ion-title
          >Menu
          <ion-menu-toggle :auto-hide="false" style="position: absolute; right: 2rem;top: 0.2rem;">
            <!-- <span v-show="version" class="mx-1 text-[0.95rem]"
              ><span class="text-[0.75rem]">v</span>{{ version }}</span
            > -->
            <ion-icon :icon="closeCircleOutline" />
          </ion-menu-toggle>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item button @click="goTo(`/`)">
          <ion-icon :icon="home" class="w-5 mr-4 ml-4" /> Latest Articles
        </ion-item>
      </ion-list>

      <ion-list class="mt-2">
        <ion-item>
          <ion-icon :icon="ellipse" class="w-5 mr-4" /> Categories
        </ion-item>
        <ion-item v-for="cat of Object.values(CONSTANTS.categories)" button @click="goTo(`/category/${cat.id}`)">
          <ion-icon :icon="chevronForward" class="w-5 mr-4 ml-4" /> {{ cat.title }}
        </ion-item>
        
        <!-- <ion-item button @click="openSettings">
          <ion-icon :icon="settingsOutline" class="w-5 mr-4" /> Settings
        </ion-item>
        <ion-item button @click="goTo('/tabs/search')">
          <ion-icon :icon="searchOutline" class="w-5 mr-4" /> Search
        </ion-item>
        <ion-item button @click="goTo('/tabs/metrics')">
          <ion-icon :icon="podiumOutline" class="w-5 mr-4" /> General Metrics
        </ion-item>
        <ion-item button @click="goTo('/tabs/live')">
          <ActivityIcon class="w-5 mr-4" /> Live Activity
        </ion-item>
        <ion-item button @click="goTo('/tabs/meetings')">
          <ion-icon :icon="listOutline" class="w-5 mr-4" /> Community Meetings
        </ion-item>
        <ion-item button @click="goTo(`/tabs/score/${store.userData?.address}`)">
          <ScoreIcon class="w-5 mr-4" /> Yup Score
        </ion-item>
        <ion-item button @click="goTo('/tabs/stake')">
          <StakeIcon class="w-5 mr-4" /> Stake
        </ion-item>
        <ion-item button @click="goTo('/tabs/info')">
          <InfoIcon class="w-5 mr-4" /> About & Info
        </ion-item> -->


      </ion-list>

      <ion-list class="mt-2">
        <ion-item button @click="goTo(`/contact`)">
          <ion-icon :icon="mail" class="w-5 mr-4 ml-4" /> Contact
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonMenu,
  IonTitle,
  IonContent,
  IonMenuToggle,
  IonIcon,
  IonItem,
  IonList,
  menuController,
  modalController
} from "@ionic/vue";
import {
  closeCircleOutline,
  podiumOutline,
  searchOutline,
  listOutline,
  settingsOutline,
  ellipse,
  chevronForward,
  home,
  mail
} from "ionicons/icons";
import { storage } from "@/utils/storage";
import { useMainStore } from "@/store/main";
import { useRouter } from "vue-router";
// import LogOutIcon from "icons/src/logout.vue";
// import ActivityIcon from "@/icons/activity.vue";
// import InfoIcon from "icons/src/infoIcon.vue";
// import ScoreIcon from "icons/src/score.vue";
// import StakeIcon from "icons/src/stake.vue";
// import { walletDisconnect } from "shared/src/utils/login-signup";
// import SettingsModal from "@/views/SettingsModal.vue";

import { CONSTANTS } from "@/store/constants";

export default defineComponent({
  name: "HeaderMenu",
  components: {
    IonHeader,
    IonToolbar,
    IonMenu,
    IonTitle,
    IonContent,
    IonMenuToggle,
    IonIcon,
    IonItem,
    IonList,
    // LogOutIcon,
    // ActivityIcon,
    // InfoIcon,
    // ScoreIcon,
    // StakeIcon,
  },
  props: {
    text: {
      type: String,
      default: "",
    },
    menu: {
      type: Boolean,
      default: false,
    },
    userData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const store = useMainStore();
    const router = useRouter();
    // const version = ref(store.version);

    // const doLogOut = async () => {
    //   await menuController.close("menu");
    //   await storage.clear();
    //   try {
    //     await walletDisconnect();
    //   } catch (e) {
    //     console.error(e);
    //   }
    //   window?.localStorage?.clear();
    //   try {
    //   } catch (e) {
    //     console.error(e);
    //   }
    //   store.isLoggedIn = false;
    //   await router.replace("/");
    // };

    const goTo = (path: string) => {
      router.push(path);
      menuController.isOpen().then((isOpen) => {
        if (isOpen) {
          menuController.close("menu");
        }
      });
    };

    // const openSettings = async () => {
    //   const modal = await modalController.create({
    //     component: SettingsModal,
    //     componentProps: {
    //       userData: props.userData,
    //     },
    //   });
    //   modal.present();
    //   const { role } = await modal.onWillDismiss();
    //   if (role === "confirm") return true;
    //   return false;
    // };

    return {
      closeCircleOutline,
      // doLogOut,
      goTo,
      podiumOutline,
      searchOutline,
      listOutline,
      settingsOutline,
      store,
      CONSTANTS,
      ellipse,
      chevronForward,
      home,
      mail
      // version,
      // openSettings,
    };
  },
});
</script>

<style></style>
