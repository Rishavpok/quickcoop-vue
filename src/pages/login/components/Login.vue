
<script setup>

import {onMounted, reactive, ref} from "vue";
import {getDetails, login} from "@/services/auth.service.js";
import {useRouter} from "vue-router";

// router setup

const router = useRouter();

const formSubmit = ref(false);
const isLoading = ref(false);
const error = ref("");



// form setup
const loginForm = reactive({
username: "", password: "",
})

// form submission

  async function handleLogin() {
  formSubmit.value = true;
  if(!loginForm.username.trim() || !loginForm.password.trim() ) {
    error.value = 'Please enter username and password'
    return ;
  }

  try {
    isLoading.value = true;
    const res = await login({
      username: loginForm.username,
      password: loginForm.password
    })
    isLoading.value = false;
    localStorage.setItem("auth_token", res.data['access_token'])
    localStorage.setItem("webhook_token", res.data['webhook_token'])
    const detail = await  getDetails();
    console.log(detail);
    localStorage.setItem("user_detail", JSON.stringify(detail.data))

    router.push({ name: 'dashboard' })
  } catch (e) {
    error.value = e.response?.data?.message || 'Login failed'
  } finally {
    isLoading.value = false;
  }

 }



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
           <form @submit.prevent="handleLogin" >
              <div class="form-group" >
                 <label for="email">Indtast Kardex</label>
                <input
                    type="text"
                    name="email"
                    v-model="loginForm.username"
                    placeholder="Kardex no" />
              </div>

             <p class="error-message" v-if="formSubmit && !loginForm.username" > Username is required </p>

             <div class="form-group" >
               <label for="email">Indast Kodeord</label>
               <input
                   type="password"
                   v-model="loginForm.password"
                   placeholder="Password" />
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

.form-group {
  margin-bottom: 20px;
  position: relative;

  label {
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: -0.2px;
    color: #1c1c1c;
    display: block;
  }

  input[type=text],[type=password] {
    transition: .3s all ease-in-out;
    font-size: 16px;
    appearance: none;
    position: relative;
    width: 100%;
    padding: 10px;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    outline: none;
  }

  .login-btn {
    transition: .3s all ease-in-out;
    font-size: 16px;
    letter-spacing: -0.02px;
    line-height: 19.26px;
    border: 0;
    width: 100%;
    text-align: center;
    padding: 11px 20px;
    position: relative;
    border-radius: 90px;
    display: block;
    margin-bottom: 15px;
    font-weight: 700;
  }

  .btn-black-login {
    background-color: #1c1c1c;
    color: #fff;
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
