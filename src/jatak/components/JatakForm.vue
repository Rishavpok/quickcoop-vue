

<template>

  <section class="app-page  page-with-fixed-header-and-tab " >
    <div class="fixed-header-bug-fix" >
      <PageHeader></PageHeader>
    </div>

    <div class="fixed-header-content" >
      <div class="tab-container" >
         <div class="flex-display tab-container-wrap" >
           <ul>
             <li class="tab-option active">Facebook</li>
<!--             <li class="tab-option active">Facebook</li>-->

           </ul>

           <div class="clearfix" ></div>

           <div class="channel-selection-btn" >
             <span class="channel-margin-5" >Kanal</span>
             <ion-icon name="chevron-down-outline" class="font-18"></ion-icon>
           </div>

         </div>
      </div>
    </div>

  </section>



</template>
<script setup lang="ts">
import PageHeader from "@/components/shared/components/PageHeader.vue";
</script>