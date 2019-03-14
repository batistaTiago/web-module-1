/* Classe de Interface entre o Local Storage do browser com a aplicação */


class SDataBase {

	constructor() {}

	getUniqueIndex() {
		let index = localStorage.getItem('id')
		return parseInt(index) + 1
	}

	write(d) {

		//JSON.stringify(object) => converte object para string em notação JSON
		//JSON.parse(string) => converte string em notação JSON para objeto
		if (d.isValid) {
			let newIndex = this.getUniqueIndex()
			localStorage.setItem(`expense${newIndex}`, JSON.stringify(d))
			localStorage.setItem('id', newIndex)
			setupModal(true)
			clearForm()
		} else {
			setupModal(false)
		}

		$('#feedback-dialog').modal('show')
	}

	retrieveData() {
		let data = []

		let dataCount = localStorage.getItem('id')
		for (let i = 1; i <= dataCount; i++) {
			//JSON.stringify(object) => converte object para string em notação JSON
			//JSON.parse(string) => converte string em notação JSON para objeto
			let expense = JSON.parse(localStorage.getItem(`expense${i}`))
			if (expense === null) { 
				continue
			}

			expense.dbId = i

			data.push(expense)
		}

		return data
	}

	search(filterParameters) {
		let filteredData = this.retrieveData()

		if (filterParameters.ano != "") {
			console.log('filtrando por ano')
			filteredData = filteredData.filter(f => f.ano === filterParameters.ano)			
		}

		if (filterParameters.mes != "") {
			console.log('filtrando por mes')
			filteredData = filteredData.filter(f => f.mes === filterParameters.mes)			
		}

		if (filterParameters.dia != "") {
			console.log('filtrando por dia')
			filteredData = filteredData.filter(f => f.dia === filterParameters.dia)			
		}

		if (filterParameters.tipo != "") {
			console.log('filtrando por tipo: ' + filterParameters.tipo)
			filteredData = filteredData.filter(f => f.tipo === filterParameters.tipo)			
		}

		if (filterParameters.descricao != "") {
			console.log('filtrando por descricao')
			filteredData = filteredData.filter(f => f.descricao === filterParameters.descricao)			
		}

		if (filterParameters.valor != "") {
			console.log('filtrando por valor')
			filteredData = filteredData.filter(f => f.valor === filterParameters.valor)			
		}

		console.log(filteredData)

		return filteredData
	}

	removeEntry(id) {
		localStorage.removeItem(id)
	}
}