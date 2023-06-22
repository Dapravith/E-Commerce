<template>
  <div class="w-[400px] mx-auto p-6 my-16">
    <h2 class="text-2xl font-semibold text-center mb-5">
      Login to your account
    </h2>
    <p class="text-center text-gray-500 mb-6">
      or
      <a href="{{ route('register') }}" class="text-sm text-purple-700 hover:text-purple-600">
        create new account
      </a>
    </p>

    <!-- Session Status -->
    <AuthSessionStatus :status="sessionStatus" class="mb-4" />

    <form @submit.prevent="login">
      <!-- CSRF Token -->
      <input type="hidden" name="_token" :value="csrfToken" />

      <div class="mb-4">
        <Input type="email" name="email" placeholder="Your email address" v-model="email" />
      </div>
      <div class="mb-4">
        <Input type="password" name="password" placeholder="Your password" v-model="password" />
      </div>
      <div class="flex justify-between items-center mb-5">
        <div class="flex items-center">
          <input id="loginRememberMe" type="checkbox" class="mr-3 rounded border-gray-300 text-purple-500 focus:ring-purple-500" v-model="remember" />
          <label for="loginRememberMe">Remember Me</label>
        </div>
        <a v-if="passwordResetRoute" :href="passwordResetRoute" class="text-sm text-purple-700 hover:text-purple-600">
          Forgot Password?
        </a>
      </div>
      <button class="btn-primary bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 w-full">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import AuthSessionStatus from './AuthSessionStatus.vue';
import Input from './Input.vue';

export default {
  components: {
    AuthSessionStatus,
    Input
  },
  data() {
    return {
      csrfToken: '', // Assign CSRF token value here
      email: '',
      password: '',
      remember: false,
      passwordResetRoute: '{{ route('password.request') }}'
    };
  },
  computed: {
    sessionStatus() {
      // Get session status from the backend and return it
    }
  },
  methods: {
    login() {
      // Perform login logic
    }
  }
};
</script>
