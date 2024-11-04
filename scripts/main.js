document.addEventListener('DOMContentLoaded', () => {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    window.adicionarProduto = function() {
        const titulo = document.getElementById('titulo').value;
        const artista = document.getElementById('artista').value;
        const genero = document.getElementById('genero').value;
        const ano = document.getElementById('ano').value;
        const preco = document.getElementById('preco').value;
        const imagemInput = document.getElementById('imagem');

        if (titulo && artista && genero && ano && preco && imagemInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imagem = event.target.result; // Base64 da imagem

                // Adiciona o produto ao array
                produtos.push({ titulo, artista, genero, ano, preco, imagem });
                localStorage.setItem('produtos', JSON.stringify(produtos));
                alert('Produto cadastrado com sucesso!');
                document.getElementById('formCadastro').reset();
            };
            reader.readAsDataURL(imagemInput.files[0]);
        } else {
            alert('Por favor, preencha todos os campos e selecione uma imagem.');
        }
    };

    window.atualizarLista = function() {
        const listaProdutos = document.getElementById('listaProdutos');
        if (listaProdutos) {
            listaProdutos.innerHTML = '';
            produtos.forEach((produto, index) => {
                const produtoDiv = document.createElement('div');
                produtoDiv.className = 'w3-card w3-margin w3-padding';
                produtoDiv.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.titulo}" class="w3-image w3-margin-bottom" style="max-width:200px;">
                    <h3>${produto.titulo} - ${produto.artista}</h3>
                    <p>Gênero: ${produto.genero}</p>
                    <p>Ano: ${produto.ano}</p>
                    <p>Preço: R$${produto.preco}</p>
                    <button onclick="removerProduto(${index})" class="w3-button w3-red">Remover</button>
                `;
                listaProdutos.appendChild(produtoDiv);
            });
        }
    };

    window.removerProduto = function(index) {
        produtos.splice(index, 1);
        localStorage.setItem('produtos', JSON.stringify(produtos));
        atualizarLista();
    };

    window.atualizarLista = function() {
        const listaProdutos = document.getElementById('listaProdutos');
        if (listaProdutos) {
            listaProdutos.innerHTML = '';
            produtos.forEach((produto, index) => {
                const produtoDiv = document.createElement('div');
                produtoDiv.className = 'w3-col s6 m4 l2 w3-padding';
    
                produtoDiv.innerHTML = `
                <div class="w3-card-4 w3-white w3-center" style="padding: 16px;">
                    <img src="${produto.imagem}" alt="${produto.titulo}" class="w3-image w3-round" style="width:100%; max-width:150px; height:auto;">
                    <h3 class="w3-medium">${produto.titulo}</h3>
                    <p class="w3-text-gray">${produto.artista}</p>
                    <p class="w3-large w3-text-black" style="font-weight: bold;">
                        ${Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <button onclick="removerProduto(${index})" class="w3-button w3-red w3-margin-top">Remover</button>
                </div>
            `;
            
    
                listaProdutos.appendChild(produtoDiv);
            });
        }
    };
    
    

    if (document.getElementById('listaProdutos')) {
        atualizarLista();
    }
});
