/* Pega pelo ID o campo, pega os "td"s dentro
dele e transforma em uma matriz que é
retornada. */
function buscarCampo()
{
	return campo
}

/* Recebe uma matriz "campo" e a dificuldade
desejada:
- Fácil: 20% bombas;
- Médio: 50% bombas;
- Difícil: 80% bombas. */
function espalharBombas(campo, dificuldade)
{
	return
}

/* Verifica os quadrados próximos com base
no seguinte esquema:
X X X	(-1, +1)	(0, +1)		(+1, +1)
X 8 X	(-1, 0)		(x, y)		(+1, 0)
X X X	(-1, -1)	(0, -1) 	(+1, -1)
Se (x + i, y + j) igual à bomba, aumentar
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

/* "iniciar" atribuído ao respectivo botão que passa
os valores de dificuldade, largura e altura no momento
que é clicado. */
function iniciar(dificuldade, largura, altura)
{
//	campo = buscarCampo()

//	espalharBombas(campo, dificuldade)

//	for (let i = 0; i < largura; i++)
//		for (let j = 0; j < altura; j++)
//			campo[i][j].innerText = contarBombas(campo[i][j])
//
//
//

	quadrados = document.getElementById("campo").getElementsByTagName("td")

	quadrados[0].innerText = "💣"

	return console.log(quadrados)
}