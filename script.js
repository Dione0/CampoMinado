var linhas
var colunas
var dificuldade
var campo
var bombas
var numeros

function criar(linhas, colunas)
{
	const tabela = document.getElementById("campo").getElementsByTagName("tbody")[0]

	// declaração da matriz:
	let campo = []

	for (let i = 0; i < linhas; i++)
		campo[i] = []
	// ---------------------

	let k = 0

	for (let i = 0; i < linhas; i++) {
		const linha = document.createElement("tr")
		for (let j = 0; j < colunas; j++) {
			campo[i][j] = document.createElement("td")
			campo[i][j].id = `${i}_${j}`
			campo[i][j].className = "fechado"
			campo[i][j].setAttribute("onmousedown", "this.className='aberto'")
			campo[i][j].setAttribute("onmouseup", "this.className='fechado'")
			campo[i][j].setAttribute("onclick", "verificar(this)")
			campo[i][j].setAttribute("oncontextmenu", "bandeira(this); return false")
			linha.appendChild(campo[i][j])
		}
		tabela.appendChild(linha)
	}

	return campo
}

function espalhar(linhas, colunas, dificuldade)
{
	// declaração da matriz:
	let bombas = []

	for (let i = 0; i < linhas; i++)
		bombas[i] = []
	// ---------------------


	let linha
	let coluna
	let porcentagem

	switch (dificuldade) {
		case "facil":
			porcentagem = 0.4
			break
		case "medio":
			porcentagem = 0.6
			break
		case "dificil":
			porcentagem = 0.8
	}

	quantas = Math.round(linhas * colunas * porcentagem)

	while (quantas > 0) {
		do {
			linha = Math.floor(Math.random() * linhas)
			coluna = Math.floor(Math.random() * colunas)
		} while (bombas[linha][coluna] == 1)
		bombas[linha][coluna] = 1
		quantas--
	}

	return bombas
}

function contagem(campo, bombas, linhas, colunas)
{
	// declaração da matriz:
	let numeros = []

	for (let i = 0; i < linhas; i++)
		numeros[i] = []
	// ---------------------

	let contagem = 0

	for (let i = 0; i < linhas; i++) {
		for (let j = 0; j < colunas; j++) {
			if (bombas[i][j] != 1) {
				// superior esquerdo
				if (i - 1 >= 0 && j - 1 >= 0)
					if (bombas[i - 1][j - 1])
						contagem++

				// superior
				if (i - 1 >= 0)
					if (bombas[i - 1][j])
						contagem++

				// superior direito
				if (i - 1 >= 0 && j + 1 < colunas)
					if (bombas[i - 1][j + 1])
						contagem++

				// esquerda
				if (j - 1 >= 0)
					if (bombas[i][j - 1])
						contagem++

				// direita
				if (j + 1 < colunas)
					if (bombas[i][j + 1])
						contagem++

				// inferior esquerdo
				if (i + 1 < linhas && j - 1 >= 0)
					if (bombas[i + 1][j - 1])
						contagem++

				// inferior
				if (i + 1 < linhas)
					if (bombas[i + 1][j])
						contagem++

				// inferior direito
				if (i + 1 < linhas && j + 1 < colunas)
					if (bombas[i + 1][j + 1])
						contagem++

				if (contagem != 0)
					numeros[i][j] = contagem
				else
					numeros[i][j] = ""

				contagem = 0
			}
		}
	}

	return numeros
}

function abrir(celula, linha, coluna) {
	celula.className = "aberto"
	celula.innerText = numeros[linha][coluna]
	celula.removeAttribute("onmousedown")
	celula.removeAttribute("onmouseup")
	celula.removeAttribute("onclick")
	celula.removeAttribute("oncontextmenu")
}

function expandir(celula, linha, coluna)
{
	// superior esquerdo
	if (linha - 1 >= 0 && coluna - 1 >= 0)
		if (numeros[linha - 1][coluna - 1])
			abrir(campo[linha - 1][coluna - 1], linha - 1, coluna - 1)
		else
			expandir(campo[linha - 1][coluna - 1], linha - 1, coluna - 1)

	// superior
	if (linha - 1 >= 0)
		if (numeros[linha - 1][coluna])
			abrir(campo[linha - 1][coluna], linha - 1, coluna)
		else
			expandir(campo[linha - 1][coluna], linha - 1, coluna)

	// superior direito
	if (linha - 1 >= 0 && coluna + 1 < colunas)
		if (numeros[linha - 1][coluna + 1])
			abrir(campo[linha - 1][coluna + 1], linha - 1, coluna + 1)
		else
			expandir(campo[linha - 1][coluna + 1], linha - 1, coluna + 1)
/*
	// esquerda
	if (coluna - 1 >= 0)
		if (numeros[linha][coluna - 1])
			abrir(campo, , )
		else
			expandir(campo, , )

	// direita
	if (coluna + 1 < colunas)
		if (numeros[linha][coluna + 1])
			abrir(campo, , )
		else
			expandir(campo, , )

	// inferior esquerdo
	if (linha + 1 < linhas && coluna - 1 >= 0)
		if (numeros[linha + 1][coluna - 1])
			abrir(campo, , )
		else
			expandir(campo, , )

	// inferior
	if (linha + 1 < linhas)
		if (numeros[linha + 1][coluna])
			abrir(campo, , )
		else
			expandir(campo, , )

	// inferior direito
	if (linha + 1 < linhas && coluna + 1 < colunas)
		abrir(campo, , )
		else
			expandir(campo, , )
*/
}

function verificar(celula)
{
	let contagem = 0

	const pos = celula.id.split("_")

	const linha = pos[0]
	const coluna = pos[1]

	for (let i = 0; i < linhas; i++) {
		for (let j = 0; j < colunas; j++) {
			if (bombas[linha][coluna]) {
				for (let i = 0; i < linhas; i++)
					for (let j = 0; j < colunas; j++)
						if (bombas[i][j])
							campo[i][j].innerText = "💣"
				celula.innerText = "💥"
			} else if (!numeros[linha][coluna]) {
				abrir(celula, linha, coluna)
				expandir(celula, linha, coluna)
			} else {
				abrir(celula, linha, coluna)
			}
		}
	}
}

function bandeira(celula)
{

}

function iniciar(dificuldade, linhas, colunas)
{

}

onload = () => {
	linhas = document.getElementById("linhas").value
	colunas = document.getElementById("colunas").value
	dificuldade = document.getElementById("dificuldade").value

	campo = criar(linhas, colunas)
	bombas = espalhar(linhas, colunas, dificuldade)
	numeros = contagem(campo, bombas, linhas, colunas)
}