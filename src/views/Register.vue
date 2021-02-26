<template>
	<div class="container shadow">
		<form class="form-signin" @submit.prevent="handleSubmit">
			<h1 class="h3 mb-3 font-weight-normal">Register</h1>
			<div class="form-group row">
			<label for="first_name"  >First Name</label>
			<input
				v-model="userData.first_name"
				type="text"
				id="first_name"
				class="form-control"
				required
			/>
			</div>
			<div class="form-group row">
			<label for="last_name" >Last Name</label>
			<input
				v-model="userData.last_name"
				type="text"
				id="last_name"
				class="form-control"
				required
			/>
			</div>
			<div class="form-group row">
				<label for="email" >Email address</label>
				<input
					v-model="userData.email"
					type="email"
					id="email"
					class="form-control"
					placeholder="name@example.com"
					required
					autofocus
				/>
				
			</div>
			<div class="form-group row">
			<label for="password" >Password</label>
			<input
				v-model="userData.password"
				type="password"
				id="password"
				class="form-control"
				required
			/>
			
			</div>
			<div class="form-group row">
			<label for="password_confirmation" 
				>Confirm password</label>
			<input
				v-model="userData.password_confirmation"
				type="password"
				id="password_confirmation"
				class="form-control"
				required
			/>
			</div>
			
			<div class="form-group">
				<input v-model="userData.terms_and_conditions" class="form-check-input" type="checkbox" value="" id="terms_and_conditions">
				<label class="form-check-label" for="terms_and_conditions">
					Accept terms and conditions
				</label>
			</div>

			<div class="form-group row">
      <p v-if="registerFailed" class="error-message">Something went wrong</p>
			<button class="btn btn-lg btn-primary btn-block" type="submit">
				Register
			</button>
			</div>
			<p class="mt-5 mb-3 text-muted">&copy; by Ranka</p>
		</form>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
 name: 'register',
  data() {
    return {
      registerFailed: false,
      userData: {
        first_name: '',
				last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
				terms_and_conditions: ''
      },
    };
  },

  methods: {
    async handleSubmit() {
      this.registerFailed = false;
      try {
        await this.register(this.userData);
        this.$router.push('/');
      } catch {
        this.registerFailed = true;
      }
    },
    ...mapActions('auth', ['register']),
  },
};
</script>

<style>
.shadow {
	background-color: white;
	padding: 50px;
	max-width: 500px !important;
	max-height: 800px !important;
	position:relative;
  -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.form-signin {
  width: 100%;
  max-width: 300px;
  padding: 12px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 14px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"],
 input[type="text"],
  input[type="password"] {
  margin-bottom: 8px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.error-message {
  color: red;
}
</style>