Vue.component('text-input', {
	props: ['id', 'label'],
	template: `
		<div class="form-group">
            <label v-bind:for="id">{{ label }}</label>
            <input class="form-control" type="text" v-bind:id="id">
        </div>

	`
})

Vue.component('section-title', {
	props: ['title'],
	template: `
		<section>
			<div class="container align-self-center">
				<div class="row letter-payment">
					<div class="col-md-8 offset-2 label-2 pl-4 pr-4">
						{{ title }}
					</div>
					<div class="dividing-line"></div>
				</div>
			</div>
		</section>
	`
})
