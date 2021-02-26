<template>
	<div class="container shadow col-md-4 col-md-offset-6">
		<div v-if="!this.$route.params.id">
			<h1>Add gallery</h1>
		</div>
		<div v-else>
			<h1>Edit gallery</h1>
		</div>

		<form class="form-gallery" @submit.prevent="handleAddGallery">
			<div class="form-group row">
				<label for="name" class="col-sm-3 col-form-label">Name</label>
				<div class="col-sm-9">
					<input
						v-model="formData.name"
						type="text"
						id="name"
						class="form-control"
						placeholder="Gallery name"
						required
						autofocus
					/>
				</div>
			</div>
			<div class="form-group row">
				<label class="col-sm-3 col-form-label" for="description"
					>Description</label
				>
				<div class="col-sm-9">
					<textarea
						v-model="formData.description"
						type="text"
						id="description"
						class="form-control"
						placeholder="Description"
						autofocus
					/>
				</div>
			</div>

			<p v-if="failed" class="error-message">Something went wrong</p>
			<button class="btn btn-lg btn-primary btn-block" type="submit">
				Submit
			</button>

			<p class="mt-5 mb-3 text-muted">&copy; by Ranka</p>
		</form>
	</div>
</template>

<script>
import galleryService from "../services/GalleryService";
export default {
	name: "create",

	data() {
		return {
			failed: false,
			formData: {
				name: "",
				description: "",
				user_id: localStorage.getItem("user_id"),
			},

			image: {
				imageURL: "",
			},
		};
	},

	methods: {
		async handleAddGallery() {
			if(!this.$route.params.id){
						this.failed = false;
					try {
						await galleryService.createGallery(this.formData);
						this.$router.push("/galleries");
					} catch {
						this.failed = true;
					}

			} else {
				await galleryService.updateGallery(this.$route.params.id, this.formData);
        this.$router.push('/galleries');
			}

			
		},
	},

	async mounted() {
		if (this.$route.name !== "add-gallery") {
			const data = await galleryService.getGallery(this.$route.params.id);
			this.formData = data;
		}
	},
};
</script>
<style>
</style>