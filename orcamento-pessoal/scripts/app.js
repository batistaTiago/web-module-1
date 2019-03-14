/* variaveis globais */
let db = new SDataBase()
let anoControl = document.getElementById('ano')
let mesControl = document.getElementById('mes')
let diaControl = document.getElementById('dia')
let tipoControl = document.getElementById('tipo')
let descricaoControl = document.getElementById('descricao')
let valorControl = document.getElementById('valor')
let nAttributes = 0


/* resposta ao click no botão de + */
function addExpenseClick() {
	let novaDespesa = new Expense(anoControl.value, 
		mesControl.value, 
		diaControl.value, 
		tipoControl.selectedOptions[0].text, //pega o texto do primeiro item selecionado(indice 0)
		descricaoControl.value, 
		valorControl.value)

	db.write(novaDespesa)
}


/* configura a modal para sucesso/erro ao adicionar registro no banco */
function setupModal(success) {

	let dialogTitle = document.getElementById('modal-dialog-title')
	let dialogButton = document.getElementById('modal-dialog-ok-button')

	let dialogHeader = document.getElementsByClassName('modal-header')[0]
	let dialogBody = document.getElementsByClassName('modal-body')[0]

	if (success === true) {
			//configura a div com mensagem de sucesso
			dialogTitle.innerHTML = 'Sucesso'
			dialogBody.innerHTML = 'Registro adicionado com sucesso'

			dialogHeader.className += ' text-success'
			dialogButton.className += ' btn-success'
			dialogButton.innerHTML = 'Ok'
		} 
		else if (success === false) {
			//configura a div com mensagem de erro
			dialogTitle.innerHTML = 'Erro'
			dialogBody.innerHTML = 'Dados inválidos - verifique os dados.'

			dialogHeader.className += ' text-danger'
			dialogButton.className += ' btn-danger'
			dialogButton.innerHTML = 'Voltar e Corrigir'
	}
}

function clearForm() {
	anoControl.value = ""
	mesControl.value = ""
	diaControl.value = ""
	tipoControl.value = ""
	descricaoControl.value = ""
	valorControl.value = ""
}



/* */
function getExpenseList() {
	let expenses = db.retrieveData()
	populateTable(expenses)
}

function populateTable(expenses) {
	var tableBody = document.getElementById('table-body')

	tableBody.innerHTML = ""

	expenses.forEach(expense => {
		// cria uma tr dentro do elemento com id table-body
		let newLine = tableBody.insertRow()

		//cada despesa tem 4 atributos 
		newLine.insertCell(0).innerHTML = `${expense.dia}/${expense.mes}/${expense.ano}`
		newLine.insertCell(1).innerHTML = expense.tipo
		newLine.insertCell(2).innerHTML = expense.descricao
		newLine.insertCell(3).innerHTML = expense.valor


		// botão de delete
		// cria um elemento html botão
		let deleteButton = document.createElement("button")
		deleteButton.className = 'btn btn-danger'
		deleteButton.innerHTML = '<i class="fas fa-times"></i>'
		deleteButton.id = `deleteButton-${expense.dbId}`
		deleteButton.onclick = function() {

			let id = this.id.replace('deleteButton-', '')

			db.removeEntry(id)

			//atualiza a página
			window.location.reload()
		}

		//adiciona celula com botão dentro
		newLine.insertCell(4).append(deleteButton)
	})
}



/* Filtrando despesas */
function searchForExpensesClick() {
	let ano = anoControl.value
	let mes = mesControl.value
	let dia = diaControl.value 
	let tipo = tipoControl.selectedOptions[0].text
	let descricao = descricaoControl.value
	let valor = valorControl.value

	if (ano === "" && mes === "" && dia === "" && tipo === "Tipo" && descricao === "" && valor === "") {
		getExpenseList()
	} else {
		tipo = tipo === "Tipo" ? "" : tipo
		let filterParameters = new Expense(ano, mes, dia, tipo, descricao, valor)
		populateTable(db.search(filterParameters))
	}
}

/* start configs */
function setupApp() {
	startDatabase()
	countTableColumns()
}

function startDatabase() {
	let id = localStorage.getItem('id')

	if (id === null || id === undefined || id === NaN) {
		localStorage.setItem('id', 0)
	}
}

function countTableColumns() {
	let d = new Expense()
	let propertyCount = 0
	Object.prototype.d = '!_'; // add property to foo that won't be counted
	for (let attr in d) {
		if (d.hasOwnProperty(attr)) {
			propertyCount++
		}
	}

	return propertyCount - 2 // dia/mes/ano contam em uma coluna só
}

/* 'main' */

setupApp()