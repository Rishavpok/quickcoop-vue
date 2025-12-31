
<script setup>

import {onMounted, reactive, ref} from "vue";
import {getDetails, login} from "@/services/auth.service.js";
import {useRouter} from "vue-router";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

// router setup
const router = useRouter();


// variable declaration
const formSubmit = ref(false);
const isLoading = ref(false);
const error = ref("");

// form validation

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const { value: username, errorMessage: usernameError } = useField("username");
const { value: password, errorMessage: passwordError } = useField("password");


// form setup
const loginForm = reactive({
username: "", password: "",
})


const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const res = await login({
      username: values.username,
      password: values.password
    })
    isLoading.value = false;
    localStorage.setItem("auth_token", res.data['access_token'])
    localStorage.setItem("webhook_token", res.data['webhook_token'])
    const detail = await  getDetails();
    localStorage.setItem("user_detail", JSON.stringify(detail.data))
    router.push({ name: 'dashboard' })
  } catch (e) {
    error.value = e.response?.data?.message || 'Login failed'
  } finally {
    isLoading.value = false;
  }
    }
)

// form submission

</script>

<template>
  <div class="app-login" >
    <div class="wrapper" >
      <div class="form-container">
         <figure class="app-logo">
           <img
               class="logo"
               src="/src/assets/logo/logo.svg"
               alt="logo"
               width="50" />
         </figure>
        <h1 class="login-title" >Log ind</h1>
        <p class="login-intro">
          Velkommen til QuickCoop.<br/>
          Hvordan ønsker du at fortsætte?
        </p>

        <div class="login-desc" >
           <form @submit.prevent="onSubmit" >
              <div class="form-group" >
                 <label for="email">Indtast Kardex</label>
                <input
                    type="text"
                    name="email"
                    v-model="username"
                    placeholder="Kardex no" />

                <span>{{ usernameError }}</span>

              </div>

             <p class="error-message" v-if="formSubmit && !loginForm.username" > Username is required </p>

             <div class="form-group" >
               <label for="email">Indast Kodeord</label>
               <input
                   type="password"
                   v-model="password"
                   placeholder="Password" />

               <span>{{ passwordError }}</span>
             </div>

             <p class="error-message" v-if="formSubmit && !loginForm.password" > Password is required </p>

             <div class="form-group" >
                <input v-if="!isLoading" type="submit"  value="Log Ind" class="login-btn btn-black-login" />
               <span v-if="isLoading" class="loader"></span>
             </div>

           </form>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

.app-login{
  padding: 40px 20px;
  z-index: 10;
}

.wrapper {
  height: 100%;
}

.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: #fff;
  max-width: 400px;
  box-shadow:  0 0 13px 2px #0000001a;
  width: 100%;
  //text-align: center;
}

.app-logo {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;
}

img {
  width: 50px;
}

.login-title {
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
}


.login-intro {
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.4px;
  color: #1c1c1c;
  text-align: center;
}

.login-desc {
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.4px;

  form {
    width: 100%;
  }
}




.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-message {
  text-align: center;
  color: red;
  margin: 0;
}

</style>
