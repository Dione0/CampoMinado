var linhas
var colunas
var dificuldade

var campo
var bombas
var numeros

var temporizador
var total
var tempo = 0
var livres
var vitoria = 0
var mensagem

function definir(celula)
{
	celula.setAttribute("onmousedown", "this.className='aberto'")
	celula.setAttribute("onmouseup", "this.className='fechado'")
	celula.setAttribute("onclick", "verificar(this)")
	celula.setAttribute("oncontextmenu", "bandeira(this); return false")
}

function redefinir(celula)
{
	celula.removeAttribute("onmousedown")
	celula.removeAttribute("onmouseup")
	celula.removeAttribute("onclick")
	celula.removeAttribute("oncontextmenu")
}

function abrir(celula, linha, coluna)
{
	let cor

	if (celula.className == "fechado")
		livres--

	celula.className = "aberto"
	celula.innerText = numeros[linha][coluna]

	for (let i = 0; i < numeros[linha][coluna]; i++) {
		celula.style.color = `hsl(${255 - i * 40}, 100%, 30%)`
	}

	redefinir(celula)
}

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
			definir(campo[i][j])
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

	total = quantas

	livres = linhas * colunas - quantas

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

function expandir(celula, linha, coluna)
{
	const sup = linha - 1
	const inf = linha + 1
	const esq = coluna - 1
	const drt = coluna + 1

	abrir(celula, linha, coluna)

	// superior esquerdo
	if (sup >= 0 && esq >= 0)
		if (campo[sup][esq].innerText != "🚩")
			if (numeros[sup][esq])
				abrir(campo[sup][esq], sup, esq)
			else if (campo[sup][esq].className != "aberto")
				expandir(campo[sup][esq], sup, esq)

	// superior
	if (sup >= 0)
		if (campo[sup][coluna].innerText != "🚩")
			if (numeros[sup][coluna])
				abrir(campo[sup][coluna], sup, coluna)
			else if (campo[sup][coluna].className != "aberto")
				expandir(campo[sup][coluna], sup, coluna)

	// superior direito
	if (sup >= 0 && drt < colunas)
		if (campo[sup][drt].innerText != "🚩")
			if (numeros[sup][drt])
				abrir(campo[sup][drt], sup, drt)
			else if (campo[sup][drt].className != "aberto")
				expandir(campo[sup][drt], sup, drt)

	// esquerda
	if (esq >= 0)
		if (campo[linha][esq].innerText != "🚩")
			if (numeros[linha][esq])
				abrir(campo[linha][esq], linha, esq)
			else if (campo[linha][esq].className != "aberto")
				expandir(campo[linha][esq], linha, esq)

	// direita
	if (drt < colunas)
		if (campo[linha][drt].innerText != "🚩")
			if (numeros[linha][drt])
				abrir(campo[linha][drt], linha, drt)
			else if (campo[linha][drt].className != "aberto")
				expandir(campo[linha][drt], linha, drt)

	// inferior esquerdo
	if (inf < linhas && esq >= 0)
		if (campo[inf][esq].innerText != "🚩")
			if (numeros[inf][esq])
				abrir(campo[inf][esq], inf, esq)
			else if (campo[inf][esq].className != "aberto")
				expandir(campo[inf][esq], inf, esq)

	// inferior
	if (inf < linhas)
		if (campo[inf][coluna].innerText != "🚩")
			if (numeros[inf][coluna])
				abrir(campo[inf][coluna], inf, coluna)
			else if (campo[inf][coluna].className != "aberto")
				expandir(campo[inf][coluna], inf, coluna)

	// inferior direito
	if (inf < linhas && drt < colunas)
		if (campo[inf][drt].innerText != "🚩")
			if (numeros[inf][drt])
				abrir(campo[inf][drt], inf, drt)
			else if (campo[inf][drt].className != "aberto")
				expandir(campo[inf][drt], inf, drt)
}

function fim()
{
	let c
	let ct

	for (let i = 0; i < linhas; i++)
		for (let j = 0; j < colunas; j++) {

			c  = campo[i][j]
			ct = c.innerText

			if (bombas[i][j]) {
				if (ct == "🚩") {
					c.innerText = "✅"
				} else {
					c.innerText = "💣"
				}
			} else if (ct == "🚩") {
				c.innerText = "❌";
			} else {
				abrir(c, i, j)
			}

			if (vitoria) {
				c.className = "vitoria"
			}

			c.style.cursor = "default"
			redefinir(c)
		}
}

function verificar(celula)
{
	let contagem = 0

	const pos = celula.id.split("_")

	const linha = Number(pos[0])
	const coluna = Number(pos[1])

	if (bombas[linha][coluna]) {
		fim()
		celula.innerText = "💥"
		celula.className = "explodiu"
		clearInterval(temporizador)
		return mensagem.innerText = "Que pena! Não foi desta vez!"
	} else if (!numeros[linha][coluna]) {
		expandir(celula, linha, coluna)
	} else {
		abrir(celula, linha, coluna)
	}

	if (livres == 0) {
		vitoria = 1
		fim()
		clearInterval(temporizador)
		return mensagem.innerText = "Você venceu!"
	}
}

function bandeira(celula)
{
	if (celula.innerText != "🚩") {
		total--
		celula.innerText = "🚩"
		celula.removeAttribute("onclick")
		escrever(total, tempo)
	} else {
		total++
		celula.innerText = ""
		definir(celula)
		escrever(total, tempo)
	}
}

function iniciar()
{
	clearInterval(temporizador)
	tempo = 0
	iniciarTemporizador()

	vitoria = 0

	const antigo = document.getElementById("campo")
	antigo.getElementsByTagName("tbody")[0].remove()
	antigo.appendChild(document.createElement("tbody"))

	mensagem = document.getElementById("mensagem")
	mensagem.innerText = ""

	linhas = document.getElementById("linhas").value
	colunas = document.getElementById("colunas").value
	dificuldade = document.getElementById("dificuldade").value

	campo = criar(linhas, colunas)
	bombas = espalhar(linhas, colunas, dificuldade)
	numeros = contagem(campo, bombas, linhas, colunas)

	escrever(total, tempo)
}

function escrever(total, tempo)
{
	estatisticas.innerText = `💣: ${total} ⏱️: ${tempo}`
}

function iniciarTemporizador()
{
	temporizador = setInterval(() => {
		tempo++
		escrever(total, tempo)
	}, 1000);
}

onload = () => {
	iniciar()
	escrever(total, tempo)
}