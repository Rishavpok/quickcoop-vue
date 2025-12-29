<template>
  <header class="app-header" :class="{ white : props.isBackgroundWhite }" >
    <div class="wrapper" >
      <div style="width: 80px;cursor: pointer" >
         <span class="back-btn not-print" >
             <ion-icon name="arrow-back-outline"></ion-icon>
         </span>
      </div>
      <div class="page-titles" >
           <h1 class="page-title"> Ja tak  </h1>
      </div>

    </div>
  </header>
</template>


<script setup>

import { withDefaults, defineProps } from 'vue'


const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  isBackgroundWhite: {
    type: Boolean,
    default: false
  }
})

</script>

<style scoped>
.wrapper {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;

  .page-titles {
    text-align: center;
  }

  ion-icon {
    font-size: 24px;
  }
}

.white {
  background-color : #fff !important;
}

.app-header {
  position: relative;
  background: #d10a11;
  width: 100%;
  padding: 15px 0;
  z-index: 100;
  color: #FFFFFF;
  border-radius: 0 0 8px 8px;



  .back-btn {
    position: absolute;
    transform: translateX(-50%);
    cursor: pointer;
    font-size: 14px;

    i {
      font-weight: bolder;
    }
  }

  .page-title,
  .page-subtitle {
    font-size: 18px;
    font-weight: 700;
    line-height: 21.78px;
    letter-spacing: -0.02px;
    text-align: center;
    margin-bottom: 0;
  }
}

</style>

