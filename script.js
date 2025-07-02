function criar(linhas, colunas)
{
	const tabela = document.getElementById("campo").getElementsByTagName("tbody")[0]

	// declaração da matriz:
	let campo = []

	for (let i = 0; i < linhas; i++)
		campo[i] = [];
	// ---------------------

	let k = 0

	for (let i = 0; i < linhas; i++) {
		const linha = document.createElement("tr")
		for (let j = 0; j < colunas; j++) {
			campo[i][j] = document.createElement("td")
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

function espalhar(bombas, dificuldade)
{
	let linha
	let coluna
	let porcentagem

	switch (dificuldade) {
		case 'Médio':
			porcentagem = 0.8
	}

	bombas = Math.round(quadrados.length * porcentagem)

	while (bombas > 0) {
		aleatorio = Math.floor(Math.random() * quadrados.length)
		quadrados[aleatorio].innerText = "💣"
		bombas--
	}
}

/*
X X X	(-1, -1)	(-1, 0)		(-1, +1)
X 8 X	( 0, -1)	( i, j)		( 0, +1)
X X X	(+1, -1)	(+1, 0) 	(+1, +1)
*/
function verificar(celula)
{
	for (let i = 0; i < linhas; i++) {
		for (let j = 0; j < colunas; j++) {
			if (celula) {
				// superior esquerdo
				if (i - 1 >= 0 && j - 1 >= 0)
					if (campo[i - 1][j - 1].innerText == "💣")
						contagem++

				// superior
				if (i - 1 >= 0)
					if (campo[i - 1][j].innerText == "💣")
						contagem++

				// superior direito
				if (i - 1 >= 0 && j + 1 < colunas)
					if (campo[i - 1][j + 1].innerText == "💣")
						contagem++

				// esquerda
				if (j - 1 >= 0)
					if (campo[i][j - 1].innerText == "💣")
						contagem++

				// direita
				if (j + 1 < colunas)
					if (campo[i][j + 1].innerText == "💣")
						contagem++

				// inferior esquerdo
				if (i + 1 < linhas && j - 1 >= 0)
					if (campo[i + 1][j - 1].innerText == "💣")
						contagem++

				// inferior
				if (i + 1 < linhas)
					if (campo[i + 1][j].innerText == "💣")
						contagem++

				// inferior direito
				if (i + 1 < linhas && j + 1 < colunas)
					if (campo[i + 1][j + 1].innerText == "💣")
						contagem++

				if (contagem > 0)
					campo[i][j].innerText = contagem

				contagem = 0
			}
		}
	}
}

/* Atrelar aos quadrados através do atributo
"onclick". Retorna "fim()" ou "vitoria()". */
function verificar(celula)
{
	return
}

/* Atrelar aos quadrados através do atributo
"oncontextmenu". Colocar/remover bandeira;
adicionar/remover "onclick" e alterar cursor para
"pointer"/"default". */
function bandeira(celula)
{

}

function iniciar(dificuldade, linhas, colunas)
{

}

onload = () => {
	campo = criar(
		document.getElementById("linhas").value,
		document.getElementById("colunas").value
	)

	bombas = espalhar(
		bombas,
		document.getElementById("dificuldade").value
	)
}