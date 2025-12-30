<template>
<div class="section-container" >
  <div class="section links link-container" >
    <div v-for="option in channel" >
       <a class="link-box"
          @click="channelSelect(option.channel)"
       >

         <div class="link-icon">
           <ion-icon class = "channel-icon" :name="option.iconOutline"  ></ion-icon>
         </div>

         <div class="link-text" >
           <h3> {{option.name}}</h3>
         </div>

         <div class="check icon-check-box" >
           <ion-icon name="square-outline" v-if="!selected.includes(option.channel)" class="checkbox-icon"></ion-icon>
           <ion-icon name="checkbox" class="checkbox-icon"  v-else ></ion-icon>
         </div>

       </a>
    </div>
  </div>

  <div class="btn-container" >
     <div class="login-btn btn-small btn-white-login" >
       <span>Vælg alle</span>
     </div>
    <div @click="saveChannel()" class="login-btn btn-small btn-black-login"  style="margin-left: 10px">
      <span>Gem</span>
    </div>
  </div>


</div>
</template>

<script  setup>

import {computed, onMounted, reactive, ref} from "vue";

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
     channel: 'web',
     iconOutline: 'globe-outline',
     iconFilled: 'globe',
     name: 'Web',
   },
 ])

const props = defineProps({
  channel: {
    type: Array,
    required: true
  }
})

const selected = ref([...props.channel])

const emit = defineEmits(['update:channel'])

  function channelSelect(channel){

   const index = selected.value.indexOf(channel)

    console.log(index, channel)

    if(index === -1){
      selected.value.push(channel)
    } else  {
      selected.value.splice(index, 1)
    }

    console.log(selected.value)
  }

  function saveChannel(){
    emit('update:channel', [...selected.value])
  }


 onMounted(() => {
   console.log(props.channel, 'from child')
 })

</script>


<style scoped>

.btn-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}



.section-container {
  background: $white;
  height: 100vh;
  margin-top: 20px;
  padding: 0 15px;
  position: relative;
}

.section-container .section {
  text-align: center;
  margin: 0;
}

.section-container .section .section-description p {
  text-align: center;
}

.section-container .section.links {
  padding-bottom: 0px;
}

.section-container .section.links .disabled-web {
  color: $disablegrey;
}

.section-container .section.links .disabled .red {
  opacity: 0.5;
}

.section-container .section.links .disabled .red i.icon-tick {
  color: $disablegrey;
}

.section-container .section.links .link-box {
  align-items: center;
  cursor: pointer;
  padding: 15px 0;
  border-top: 1px solid $lightgrey;
  justify-content: space-between;
  display: flex;
}

.section-container .section.links .link-box:only-child,
.section-container .section.links .link-box:last-child {
  border-bottom: 1px solid $lightgrey;
}

.section-container .section.links .link-box .link-icon,
.section-container .section.links .link-box .link-arrow {
  margin-top: 4px;
  text-align: center;
}

.section-container .section.links .link-box .link-icon {
  font-size: 1rem;
}

.section-container .section.links .link-box .link-icon img {
  width: 25px;
}

.section-container .section.links .link-box .link-text {
  width: calc(100% - 80px);
  text-align: left;
}

.section-container .section.links .link-box .link-text h3,
.section-container .section.links .link-box .link-text p {
  margin-bottom: 0;
  font-weight: $thinweight;
  font-size: 0.9rem;
}

.section-container .section.links .link-box .link-text p {
  font-size: 0.7rem;
}

.section-container .section.links .section-title {
  border-bottom: 0;
}

.section-container .section #panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  border-left: 22px solid #dbdbdb;
}

.section-container .section .icon-check-box {
  height: 20px;
  width: 20px;
}

.section-container .section .red {}

.section-container .channel-btn {
  width: 50%;
  max-width: 160px;
  margin: 10px auto 0 auto;
}

.section-container .disabled-option {
  background: $disablegrey !important;
  border: 1px solid $disablegrey;
}

.link-container {
  border: 1px solid #C5C5C7;
  border-radius: 8px;
  padding: 0 20px;
}

h5 {
  margin: 0;
}

.btn-container {
  margin: 20px 0 15px 0;
}


</style>