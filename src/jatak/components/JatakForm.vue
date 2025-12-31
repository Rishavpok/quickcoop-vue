

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

    <div class="page-container"  style="margin-top: 20px" >
      <form @submit.prevent="onSubmit" >
        <div class="section-wrapper">
          <div class="title" >
            Varianter
          </div>

          <div class="form-group varient-toggle" >
            <div class="text" >
              <p>Flere varianter af produktet</p>
            </div>

            <div class="height-27 toggle-btn" >
              <label class="switch">
                <input @click="toggleVariant($event)" type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>

          </div>

        </div>

        <div v-if="showVariant" >
          <div
              class="varient-list"
              v-for="(variant, index) in jatakForm.variants"
              :key="variant.id" >
             <div class="title-wrapper" >
               <div class="title" >
                 <p class="variant-title" > Variant {{ index + 1 }}</p>
               </div>

               <div
                   @click="removeVariant(index)"
                   v-if="jatakForm.variants.length > 1 && index > 0"
                   class="delete" >
                 <ion-icon name="close" style="font-size: 24px"></ion-icon>
               </div>
             </div>

            <hr/>

            <div class="form-group" >
              <label>Variant navn</label>
              <input
                  type="text"
                  v-model="variant.title"
                  placeholder="Fx. str. 37, farve rød mm."
              />
            </div>

            <div class="form-group" >
              <label>Unik variant nøgleord</label>
              <div class="row" >
                <input
                    type="text"
                    v-model="variant.keyword"
                    style="padding-left: 75px"
                    placeholder="Dit unikke søgeord"
                />
                <span class="jatak-prefix">JA TAK</span>
              </div>
            </div>

            <div class="form-group" >
              <label>VAntal varer til salg</label>

              <input
              type="text"
              v-model="variant.quantity"
              placeholder="Hvor mange varer på denne variant sælger du?"
              />

            </div>

            <div class="form-group" >
              <label>
                Prisoplysninger:
              </label>

              <div class="price-description-wrapper" >
                <div class="price-container" >
                   <div>
                     <input
                         type="text"
                         min="0"
                         v-model="variant.price"
                         placeholder="Pris"
                     />
                   </div>

                  <div style="margin:10px;min-width: fit-content">
                    kr. pr.
                  </div>
                </div>

                <div class="price-description-container" >
                  <div style="margin-right: 10px;flex-basis: 65%" >
                    <input
                        type="text"
                        v-model="variant.priceDescription"
                        min="0"
                        placeholder="vægt/mængde"
                    />
                  </div>

                  <div class="price-limit" >
                    <select>
                      <option v-for="item in priceDescription" :value="variant.uom" >{{ item }}</option>
                    </select>
                  </div>

                </div>


              </div>

            </div>

          </div>

          <div class="hr" >

          </div>

        </div>

        <div class="section-wrapper" >
          <div class="title" >
            Post tekst
          </div>

          <div class="form-group" >
            <label>Overskrift</label>
            <input
            type="text"
            placeholder="Indsæt JA TAK overskrift"
            v-model="title"
            />
            <span>{{ titleError }}</span>
          </div>

          <div class="form-group" >
            <label>JA TAK tekst*</label>
            <input
            type="text"
            v-model="description"
            placeholder="Indsæt JA TAK tilbudstekst"
            />

            <span>{{ descriptionError }}</span>
          </div>

        </div>

        <div class="form-group" >
          <input
              type="submit"
              value="Submit"
              class="login-btn btn-black-login" />

        </div>

      </form>
    </div>

  </section>



</template>
<script setup lang="ts">

// imports

import PageHeader from "@/components/shared/components/PageHeader.vue";
import ChannelSelect from "@/components/shared/components/ChannelSelect.vue";
import {computed, reactive, ref} from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";


// variable declaration
const showChannelSelect = ref<boolean>(false);
const channels = ref(['coop', 'facebook'])
const showVariant = ref<boolean>(false);
const computedVariantLength = computed(() => {
 return   jatakForm.variants.length
})
const priceDescription = ref<string[]>(
    [
      'stk',
      'kg',
      'g',
      'liter',
      'ml',
      'pakke',
      'pakker',
      'sæt',
      'kasse',
      'kasser',
      'ramme',
      'rammer',
    ]
);

function toggleChannelSelect() {
  showChannelSelect.value = !showChannelSelect.value;
}

function getSelectedChannel(event: Event) {
  channels.value = event
  showChannelSelect.value = false
}

function toggleVariant(event: Event) {
  showVariant.value = event.target['checked'];
  handleVariantToggle()
}

function handleVariantToggle() {
  jatakForm.isVariant = showVariant.value;
  if(showVariant.value) {
    while (jatakForm.variants.length < 2) {
      jatakForm.variants.push(createVariantForm());
    }
  }

}

function removeVariant(index) {
  if (jatakForm.variants.length <= 2) {
    alert("Minimum 2 variants required");
    return;
  }
  if(computedVariantLength.value > 2) {
    jatakForm.variants.splice(index, 1);
  }

}

// form validation

const schema = yup.object({
      title : yup.string().required("Title is required"),
      description : yup.string().required("Description is required"),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const { value : title , errorMessage : titleError } = useField("title");
const { value : description , errorMessage : descriptionError } = useField("description");


const onSubmit = handleSubmit((values) => {
     console.log(values);
} )

// form setup
const jatakForm = reactive({
  id : "",
  saveTemplateId : "",
  parentId : "",
  kardex : "",
  tags : "",
  title : "",
  description : "",
  isVariant : false,
  variants : [],
})

 function createVariantForm() {
  return  reactive({
     id : "",
     title :"",
     keyword : "",
     quantity : "",
     price : "",
     priceDescription : "",
     uom : "stk"
   })
 }

</script>

<style scoped>
.varient-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #C5C5C7;
  background-color: #F5F5F5;
  padding: 15px;
  border-radius: 8px;
}

.text p {
  margin-bottom: 0;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.4px;
  color: #1c1c1c;
}

.switch {
  position: relative;
  display: inline-block;
  width: 48px !important;
  height: 27px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #D1D1D6;;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 23px;
  width: 24px;
  left: 2px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #00D082;
}


input:focus + .slider {
  box-shadow: 0 0 1px #00D082;
}

input:checked + .slider:before {
  -webkit-transform: translateX(19px);
  -ms-transform: translateX(26px);
  transform: translateX(19px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.toggle-btn label {
  margin-bottom: 0px !important;
}

.varient-list {
  border: 1px solid #C5C5C7;
  background-color: #fff;
  padding: 20px 17px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.varient-list hr {
  margin: 15px 0px;
  border-top: 1px solid #BDBDBD;
}

.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .title{
    p{
      font-size: 16px;
      font-weight: 700;
    }

  }

  p {
    font-size: 12px;
    font-weight: 400;
    line-height: 16.74px;
    letter-spacing: 0.12px;
    color: #1c1c1c;
    margin-bottom: 0;
  }
}


.jatak-prefix {
  position: absolute;
  border-right: 1px solid #BDBDBD;
  left: 0px;
  font-size: 13px;
  padding: 11px 11px;
}


</style>