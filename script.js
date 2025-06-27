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

	let bombas = Math.round(quadrados.length * 0.8)

	while (bombas > 0) {
		aleatorio = Math.floor(Math.random() * quadrados.length)
		quadrados[aleatorio].innerText = "💣"
		bombas--
	}

	return
}

/* Verifica os quadrados próximos com base
no seguinte esquema:
X X X	(-1, +1)	(0, +1)		(+1, +1)
X 8 X	(-1, 0)		(i, j)		(+1, 0)
X X X	(-1, -1)	(0, -1) 	(+1, -1)
Se (i + x, j + y) igual à bomba, aumentar
contador. No fim, retornar o contador de
bombas. */
function contarBombas(quadrado)
{
	return
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

//	for (let i = 0; i < linhas; i++)
//		for (let j = 0; j < colunas; j++)
//			campo[i][j].innerText = contarBombas(campo[i][j])

	return console.log(campo)
}