function buscarCampo(quadrados, linhas, colunas)
{
	let campo = []

	for (let i = 0; i < linhas; i++)
		campo[i] = [];

	let k = 0

	for (let i = 0; i < linhas; i++)
		for (let j = 0; j < colunas; j++) {
			campo[i][j] = quadrados[k]
			k++
		}

	return campo
}

function espalharBombas(quadrados, dificuldade)
{
	let aleatorio
	let bombas

	bombas = Math.round(quadrados.length * 0.8)

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
function contarBombas(campo, linhas, colunas)
{
	let contagem = 0

	for (let i = 0; i < linhas; i++) {
		for (let j = 0; j < colunas; j++) {
			if (campo[i][j].innerText == "") {
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
function clique()
{
	return
}

/* Atrelar aos quadrados através do atributo
"oncontextmenu". Colocar/remover bandeira;
adicionar/remover "onclick" e alterar cursor para
"pointer"/"default". */
function bandeira()
{

}

function iniciar(dificuldade, linhas, colunas)
{
	const quadrados = document.getElementById("campo").getElementsByTagName("td")
	const campo = buscarCampo(quadrados, linhas, colunas)

	espalharBombas(quadrados, dificuldade)
	contarBombas(campo, linhas, colunas)

//	for (let i = 0; i < linhas; i++)
//		for (let j = 0; j < colunas; j++)
//			campo[i][j].innerText = contarBombas(campo[i][j])

	return console.log(campo)
}