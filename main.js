const iconeCarrinho = document.querySelector('.img-carrinho')
const carrinhoLista = document.querySelector('.carrinho-lista')
const itensCarrinho = document.querySelector('.itens-carrinho')
const conteudo = document.querySelector('.produtos')

const precoTexto = document.querySelector('.preco-total')
const vazioStyle = document.getElementById('vazio')
const totalTag = document.querySelector('.total')
const contadorCarrinho = document.querySelector('.contador-carrinho')

let arrayCarrinho = []
let precoTotal = 0
let contador = 0


function alterarDisplay(change = false) {
    if (change) {
        vazioStyle.style.display = 'none'
        totalTag.style.display = 'block'
    } else {
        vazioStyle.style.display = 'flex'
        totalTag.style.display = 'none'
    }
}

iconeCarrinho.addEventListener('click', () => {
    if(arrayCarrinho.length == 0){
        alterarDisplay()
    }

    carrinhoLista.classList.toggle('ativo')
})

conteudo.addEventListener('click', pegarItem)

carrinhoLista.addEventListener('click', removerProduto)

function pegarItem(e) {
    e.preventDefault()
    if (e.target.classList.contains('add-carrinho')) {
        const produto = e.target.parentElement

        alterarDisplay(true)
        lerProduto(produto)
    }
}

function lerProduto(produto) {
    const infoProduto = {
        imagem: produto.querySelector('.img-wrap img').src,
        titulo: produto.querySelector('.titulo-item').textContent,
        preco: produto.querySelector('.preco').textContent,
        id: produto.querySelector('a').getAttribute('data-id'),
        total: 1
    }

    precoTotal = parseFloat(precoTotal) + parseFloat(infoProduto.preco)

    const existe = arrayCarrinho.some(produto => produto.id === infoProduto.id)

    if (existe) {
        const p = arrayCarrinho.map(produto => {
            if (produto.id === infoProduto.id) {
                produto.total++
                return produto
            } else {
                return produto
            }
        })
        arrayCarrinho = [...p]
    } else {
        arrayCarrinho = [...arrayCarrinho, infoProduto]
        contador++
    }


    carregarHTML()
}

function carregarHTML() {
    limparHtml()
    arrayCarrinho.forEach(produto => {
        const { imagem, titulo, preco, total, id } = produto
        const div = document.createElement('div')

        div.classList.add('item')

        let precoInt = parseInt(preco)

        let precoConvertido = precoInt.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })


        div.innerHTML = `<img src="${imagem}" alt="Camisa">
        <div class="item-texto">
            <p>${titulo}</p>
            <p class="qtd">Qtd.<span>${total}</span></p>
            <p>${precoConvertido}</p>
        </div>
        <button class="btn-fechar" data-id="${id}">X</button>`

        itensCarrinho.appendChild(div)
    })


    precoTexto.innerHTML = precoTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    contadorCarrinho.innerHTML = contador

}


function limparHtml() {
    itensCarrinho.innerHTML = ''
}


function removerProduto(e) {
    if (e.target.classList.contains('btn-fechar')) {
        const produtoDeletado = e.target.getAttribute('data-id')

        arrayCarrinho.forEach(item => {
            if (item.id === produtoDeletado) {
                let totalProduto = parseFloat(item.preco) * parseFloat(item.total)

                precoTotal = precoTotal - totalProduto
            }
        })

        arrayCarrinho = arrayCarrinho.filter(produto => produto.id != produtoDeletado)
        if(arrayCarrinho.length == 0){
            alterarDisplay()
        }
        contador--
    }

    carregarHTML()
}


/* menu animação */

const btnMobile = document.getElementById('btn-mobile')

btnMobile.addEventListener('click', abrirMenu)

function abrirMenu(){
    const div = document.querySelector('.menu');
    div.classList.toggle('ativo');
}