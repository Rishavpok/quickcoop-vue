<template>
<div class="section-container" >
  <div class="section links link-container" >
    <div v-for="option in channel" >
       <a class="link-box" >
          <div class="link-icon" >
            <ion-icon class = "channel-icon" name="{{ option.iconOutline }}"  *ngIf="!selectedOption[option.channel]"></ion-icon>
<!--            <ion-icon class = "channel-icon" name="{{ option.iconFilled }}"  *ngIf="selectedOption[option.channel]"></ion-icon>-->
          </div>
       </a>
    </div>
  </div>
</div>
</template>

<script  setup>

 import {reactive} from "vue";

 const channel = reactive([
   {
     channel: "coop",
     iconOutline: 'phone-portrait-outline',
     iconFilled:'phone-portrait',
     name : "Coop App",
   },
   {
     channel: "facebook",
     iconOutline: 'logo-facebook',
     iconFilled: 'logo-facebook',
     name : 'Facebook',
   },
   {
     channel: 'sms',
     iconOutline: 'chatbubble-ellipses-outline',
     iconFilled: 'chatbubble-ellipses',
     name: 'SMS',
   },
 ])

</script>