<template>
	<div class="">
		<div class="container shadow">
			<form class="form-signin" @submit.prevent="handleSubmit">
				<h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
				<div class="form-group row">
					<label for="email">Email address</label>
					<input
						v-model="credentials.email"
						type="email"
						id="email"
						class="form-control"
						placeholder="name@example.com"
						required
						autofocus
					/>
				</div>
				<div class="form-group row">
					<label for="password">Password</label>
					<input
						v-model="credentials.password"
						type="password"
						id="password"
						class="form-control"
						placeholder="Password"
						required
					/>
				</div>
        <div class="form-group row">
				<p v-if="loginFailed" class="error-message">Something went wrong</p>
				<button class="btn btn-lg btn-primary btn-block" type="submit">
					Sign in
				</button>
        </div>
				<p class="mt-5 mb-3 text-muted">&copy; by Ranka</p>
			</form>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "register",
	data() {
		return {
			loginFailed: false,
			credentials: {
				email: "",
				password: "",
			},
		};
	},

	methods: {
		async handleSubmit() {
			this.loginFailed = false;
			try {
				await this.login(this.credentials);
				this.$router.push("/");
			} catch {
				this.loginFailed = true;
			}
		},
		...mapActions("auth", ["login"]),
	},
};
</script>

<style>
</style>