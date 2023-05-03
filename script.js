const url = 'http://localhost:3000/products';
const productTable = document.getElementById("product-table");

document
    .getElementById("product-form")
    .addEventListener('submit', async (event)=> {
        event.preventDefault();
        const id = document.getElementById("productId").value;
        const name = document.getElementById("productName").value;
        const price = document.getElementById("productPrice").value;
        //alert(JSON.stringify({id, name, price}, null, 2))
        const product = { id, name, price };
        if(id){
            //await updateProduct(product);
        } else {
            await createProduct(product);
        }
    });

    async function createProduct(product){
       try {
        const response = await axios.post(url, product);
        addProductToTable(response.data);
       } catch (error) {
        console.error('Erro ao criar o produto:', error);
       }
    }

    async function fetchProducts() {
       try {
        const response = await axios.get(url);
        response.data.forEach(addProductToTable)
       } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
       }
    }

    function addProductToTable({ id, name, price }){
        const linha = document.createElement("tr")
        const colunas = [
            id,
            name,
            price,
        ]

        for(const coluna of colunas){
            const celula = document.createElement("td");
            celula.textContent = coluna;
            linha.appendChild(celula)
        }

        productTable.querySelector("tbody").appendChild(linha);
    }

    fetchProducts()