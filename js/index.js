var vm = new Vue({
	el: '#v-container',
	data: {
		pages: ['Lista', 'Cadastro'],
		currentPage: 'Cadastro',
		inputName: '',
		inputEmail: '',
		inputCpf: '',
		inputAddress: '',
		inputState: '',
		inputCity: '',
		inputCep: '',
		paymentPicked: 'Credit Card',
		inputCardName: '',
		inputCardMonth: '',
		inputCardYear: '',
		inputCardNumber: '',
		inputCardCode: '',
		invalidInputs: [],
		invalidInputMessage: 'Campo Inválido',
		clientNameFilter: '',
		clients: []
	},
	computed: {
		filteredClients: function () {
			var nameFilter = this.clientNameFilter;
			return this.clients.filter(function (client) {
				return client.name.includes(nameFilter);
			})
		},
		isCadastroPage: function () {
			return this.isCurrentPage('Cadastro');
		},
		isListaPage: function () {
			return this.isCurrentPage('Lista');
		},
		cardMonthOptions: function() {
			return [...Array(12).keys()].map(i => String(i + 1).padStart(2, '0'));
		},
		cardYearOptions: function() {
			var currentDate = new Date();
			return [...Array(10).keys()].map(i => currentDate.getFullYear() + i);
		},
		isCreditCardPicked: function () {
			return this.paymentPicked == 'Credit Card';
		},
		stateOptions: function () {
			var stateData = JSON.parse(estados);
			return stateData.map(data => data.nome);
		},
		cityOptions: function () {
			var currentState = this.inputState;
			var stateData = JSON.parse(estados);

			var filtered = stateData.filter(function (state) {
				return state.nome == currentState;
			});

			if (filtered.length == 1) {
				return filtered[0].cidades;
			}

			return ['Fail'];
		}
	},
	methods: {
		registerClient: function () {
			this.invalidInputs = [];

			this.checkInputName();
			this.checkInputEmail();
			this.checkInputCpf();
			this.checkInputAddress();
			this.checkInputState();
			this.checkInputCity();
			this.checkInputCep();
			this.checkInputCardName();
			this.checkInputCardMonth();
			this.checkInputCardYear();
			this.checkInputCardNumber();
			this.checkInputCardCode();

			if (this.invalidInputs.length == 0) {
				var currentDate = new Date();
				var dd = String(currentDate.getDate()).padStart(2, '0');
				var mm = String(currentDate.getMonth() + 1).padStart(2, '0');
				var yyyy = currentDate.getFullYear();

				this.clients.push({
					name: this.inputName,
					email: this.inputEmail,
					cpf: this.inputCpf,
					date: dd + '-' + mm + '-' + yyyy
				});

				this.clearAllInputs();
				alert('Cadastro realizado com sucesso!');
			}
		},
		updatePage: function (targetPage) {
			this.currentPage = targetPage;
		},
		isCurrentPage: function (desiredPage) {
			return this.currentPage == desiredPage;
		},
		clearAllInputs: function () {
			this.inputName = '';
			this.inputEmail = '';
			this.inputCpf = '';
			this.inputAddress = '';
			this.inputState = '';
			this.inputCity = '';
			this.inputCep = '';
			this.paymentPicked = 'Credit Card';
			this.inputCardName = '';
			this.inputCardMonth = '';
			this.inputCardYear = '';
			this.inputCardNumber = '';
			this.inputCardCode = '';
		},
		isInvalidInput: function (inputId) {
			return this.invalidInputs.includes(inputId);
		},
		checkInputName: function () {
			if (this.inputName.length == 0) {
				this.invalidInputs.push('inputName');
			}
		},
		checkInputEmail: function () {
			var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!re.test(this.inputEmail)) {
				this.invalidInputs.push('inputEmail');
			}
		},
		checkInputCpf: function () {
			var re = /^(([0-9]{3})\.*([0-9]{3})\.*([0-9]{3})-*([0-9]{2}))$/;
			if (!re.test(this.inputCpf)) {
				this.invalidInputs.push('inputCpf');
			}
		},
		checkInputAddress: function () {
			if (this.inputAddress.length == 0) {
				this.invalidInputs.push('inputAddress');
			}
		},
		checkInputState: function () {
			if (this.inputState.length == 0) {
				this.invalidInputs.push('inputState');
			}
		},
		checkInputCity: function () {
			if (this.inputCity.length == 0) {
				this.invalidInputs.push('inputCity');
			}
		},
		checkInputCep: function () {
			var re = /^([\d]{2})\.*([\d]{3})-*([\d]{3})$/;
			if (!re.test(this.inputCep)) {
				this.invalidInputs.push('inputCep');
			}
		},
		checkInputCardName: function () {
			if (this.paymentPicked != 'Credit Card') return;

			if (this.inputCardName.length == 0) {
				this.invalidInputs.push('inputCardName');
			}
		},
		checkInputCardMonth: function () {
			if (this.paymentPicked != 'Credit Card') return;

			if (this.inputCardMonth.length == 0) {
				this.invalidInputs.push('inputCardMonth');
			}
		},
		checkInputCardYear: function () {
			if (this.paymentPicked != 'Credit Card') return;

			if (this.inputCardYear.length == 0) {
				this.invalidInputs.push('inputCardYear');
			}
		},
		checkInputCardNumber: function () {
			if (this.paymentPicked != 'Credit Card') return;

			var re = /^([\d]{16})$/;
			if (!re.test(this.inputCardNumber)) {
				this.invalidInputs.push('inputCardNumber');
			}
		},
		checkInputCardCode: function () {
			if (this.paymentPicked != 'Credit Card') return;

			var re = /^([\d]{3})$/;
			if (!re.test(this.inputCardCode)) {
				this.invalidInputs.push('inputCardCode');
			}
		},
	}
})