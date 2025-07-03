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
			porcentagem = 0.2
			break
		case "medio":
			porcentagem = 0.4
			break
		case "dificil":
			porcentagem = 0.6
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
			const sup = i - 1
			const inf = i + 1
			const esq = j - 1
			const drt = j + 1

			if (bombas[i][j] != 1) {
				// superior esquerdo
				if (sup >= 0 && esq >= 0)
					if (bombas[sup][esq])
						contagem++

				// superior
				if (sup >= 0)
					if (bombas[sup][j])
						contagem++

				// superior direito
				if (sup >= 0 && j + 1 < colunas)
					if (bombas[sup][drt])
						contagem++

				// esquerda
				if (esq >= 0)
					if (bombas[i][esq])
						contagem++

				// direita
				if (drt < colunas)
					if (bombas[i][drt])
						contagem++

				// inferior esquerdo
				if (inf < linhas && esq >= 0)
					if (bombas[inf][esq])
						contagem++

				// inferior
				if (inf < linhas)
					if (bombas[inf][j])
						contagem++

				// inferior direito
				if (inf < linhas && drt < colunas)
					if (bombas[inf][drt])
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

function redefinir(celula)
{
	celula.removeAttribute("onmousedown")
	celula.removeAttribute("onmouseup")
	celula.removeAttribute("onclick")
	celula.removeAttribute("oncontextmenu")
}

function abrir(celula, linha, coluna) {
	celula.className = "aberto"
	celula.innerText = numeros[linha][coluna]
	redefinir(celula)
}

function expandir(celula, linha, coluna)
{
	const sup = linha - 1
	const inf = linha + 1
	const esq = coluna - 1
	const drt = coluna + 1

	abrir(celula, linha, coluna)

	// superior esquerdo
	if (sup >= 0 && esq >= 0)
		if (numeros[sup][esq])
			abrir(campo[sup][esq], sup, esq)
		else if (campo[sup][esq].className != "aberto")
			expandir(campo[sup][esq], sup, esq)

	// superior
	if (sup >= 0)
		if (numeros[sup][coluna])
			abrir(campo[sup][coluna], sup, coluna)
		else if (campo[sup][coluna].className != "aberto")
			expandir(campo[sup][coluna], sup, coluna)

	// superior direito
	if (sup >= 0 && drt < colunas)
		if (numeros[sup][drt])
			abrir(campo[sup][drt], sup, drt)
		else if (campo[sup][drt].className != "aberto")
			expandir(campo[sup][drt], sup, drt)

	// esquerda
	if (esq >= 0)
		if (numeros[linha][esq])
			abrir(campo[linha][esq], linha, esq)
		else if (campo[linha][esq].className != "aberto")
			expandir(campo[linha][esq], linha, esq)

	// direita
	if (drt < colunas)
		if (numeros[linha][drt])
			abrir(campo[linha][drt], linha, drt)
		else if (campo[linha][drt].className != "aberto")
			expandir(campo[linha][drt], linha, drt)

	// inferior esquerdo
	if (inf < linhas && esq >= 0)
		if (numeros[inf][esq])
			abrir(campo[inf][esq], inf, esq)
		else if (campo[inf][esq].className != "aberto")
			expandir(campo[inf][esq], inf, esq)

	// inferior
	if (inf < linhas)
		if (numeros[inf][coluna])
			abrir(campo[inf][coluna], inf, coluna)
		else if (campo[inf][coluna].className != "aberto")
			expandir(campo[inf][coluna], inf, coluna)

	// inferior direito
	if (inf < linhas && drt < colunas)
		if (numeros[inf][drt])
			abrir(campo[inf][drt], inf, drt)
		else if (campo[inf][drt].className != "aberto")
			expandir(campo[inf][drt], inf, drt)
}

function verificar(celula)
{
	let contagem = 0

	const pos = celula.id.split("_")

	const linha = Number(pos[0])
	const coluna = Number(pos[1])

	for (let i = 0; i < linhas; i++) {
		for (let j = 0; j < colunas; j++) {
			if (bombas[linha][coluna]) {
				for (let i = 0; i < linhas; i++)
					for (let j = 0; j < colunas; j++) {
						if (bombas[i][j]) {
							campo[i][j].innerText = "💣"
							campo[i][j].style.cursor = "default"
						} else
							abrir(campo[i][j], i, j)
						redefinir(campo[i][j])
					}
				celula.innerText = "💥"
			} else if (!numeros[linha][coluna]) {
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

function iniciar()
{
	const antigo = document.getElementById("campo")

	antigo.getElementsByTagName("tbody")[0].remove()

	antigo.appendChild(document.createElement("tbody"))

	linhas = document.getElementById("linhas").value
	colunas = document.getElementById("colunas").value
	dificuldade = document.getElementById("dificuldade").value

	campo = criar(linhas, colunas)
	bombas = espalhar(linhas, colunas, dificuldade)
	numeros = contagem(campo, bombas, linhas, colunas)
}

onload = () => {
	iniciar()
}