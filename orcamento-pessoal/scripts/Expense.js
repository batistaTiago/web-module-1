/* Modelo de despesa a ser armazenado no banco de dados */

class Expense {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	// semelhante a variaveis computadas
	get isValid() {
		//percorre os atributos do objeto (cada um armazenado na variavel attribute)
		for (let attribute in this) {
			if (this.tipo == "Tipo" || 
				this[attribute] == undefined || 
				this[attribute] == null || 
				this[attribute] == "") {
					return false
			}
		}
		return true
	}
}