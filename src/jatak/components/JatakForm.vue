

<template>

  <section class="app-page  page-with-fixed-header-and-tab " >
    <div class="fixed-header-bug-fix" >
      <PageHeader></PageHeader>
    </div>

    <div class="fixed-header-content" >
      <div class="tab-container" >
         <div class="flex-display tab-container-wrap" >
           <ul v-for="channel in channels" style="list-style:none;" >
             <li class="tab-option active">{{ channel }}</li>
           </ul>

           <div class="clearfix" ></div>

           <div @click="toggleChannelSelect()" class="channel-selection-btn" >
             <span class="channel-margin-5" >Kanal</span>
             <ion-icon name="chevron-down-outline" class="font-18"></ion-icon>
           </div>

         </div>


        <ChannelSelect
            v-if="showChannelSelect"
            :channel=channels
            @update:channel="getSelectedChannel($event)"
        ></ChannelSelect>

      </div>
    </div>

  </section>



</template>
<script setup lang="ts">
import PageHeader from "@/components/shared/components/PageHeader.vue";
import ChannelSelect from "@/components/shared/components/ChannelSelect.vue";
import {ref} from "vue";


const showChannelSelect = ref<boolean>(false);

const channels = ref(['coop', 'facebook'])

function toggleChannelSelect() {
  showChannelSelect.value = !showChannelSelect.value;
}

function getSelectedChannel(event: Event) {
  console.log(event, 'from parent');
  channels.value = event
  showChannelSelect.value = false
}

</script>