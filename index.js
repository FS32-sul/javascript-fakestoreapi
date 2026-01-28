let produtos = [];
let produtosFiltrados = [];

async function buscarProdutos() {
    const request = await fetch("https://fakestoreapi.com/products");
    if (request.status == 400) {
        alert("Ocorreu algum problema no servidor")
        return;
    }
    const response = await request.json();
    produtos = response;
    listarProdutos(produtos);
}

buscarProdutos();

function listarProdutos(arrayDeProdutos) {
    let lista = document.querySelector("#lista");
    lista.innerHTML = "";
    arrayDeProdutos.map(produto => {
        lista.innerHTML += `
                <a href="">
                    <div class="bg-white rounded-lg relative hover:scale-105 duration-200" title="${produto.title}">
                        <div class="absolute top-4 right-4 flex gap-1 px-1 shadow fill-white bg-orange-500 text-white rounded">
                            <box-icon type='solid' name='star' class="w-4"></box-icon>
                            <h6>${produto.rating.rate}</h6>
                        </div>
                        <img src="${produto.image}" class="h-[250px] object-contain m-auto p-6" />
                        <div class="p-4">
                            <h6 class="text-lg line-clamp-1">${produto.title}</h6>
                            <h6 class="text-xs font-bold">${produto.category}</h6>
                            <h6 class="text-right text-2xl text-orange-500 font-bold">R$ ${produto.price.toFixed(2)}</h6>
                        </div>
                    </div>
                </a>
            `;
    })
}

function filtrarPorCategoria(categoria) {
    if (categoria == "todos") {
        produtosFiltrados = [];
        listarProdutos(produtos);
        return
    }

    produtosFiltrados = produtos.filter(produto => produto.category == categoria);
    listarProdutos(produtosFiltrados);
}

function ordenarProdutos(tipoDeOrdenacao) {
    let produtosOrdenados = [];
    if(produtosFiltrados.length > 0){
        if (tipoDeOrdenacao == "preco") {
            produtosOrdenados = produtosFiltrados.toSorted((a, b) => a.price - b.price);
        } else {
            produtosOrdenados = produtosFiltrados.toSorted((a, b) => b.rating.rate - a.rating.rate);
        }
    }else{
        if (tipoDeOrdenacao == "preco") {
            produtosOrdenados = produtos.toSorted((a, b) => a.price - b.price);
        } else {
            produtosOrdenados = produtos.toSorted((a, b) => b.rating.rate - a.rating.rate);
        }
    }
    listarProdutos(produtosOrdenados);
}

function pesquisarProduto(pesquisa){
    let produtosPesquisados = produtos.filter(produto => produto.title.toLowerCase().includes(pesquisa.toLowerCase()));
    listarProdutos(produtosPesquisados);
}