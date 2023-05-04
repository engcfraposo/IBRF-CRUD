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
            await updateProduct(product);
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

    async function updateProduct(product){
        try {
            await axios.put(
                `${url}/${product.id}`, 
                product
            );   
            location.reload();
        } catch (error) {
            console.error(`Erro ao modificar o produto ${id}:`, error); 
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

    async function deleteProduct(id){
        try {
            await axios.delete(`${url}/${id}`)
            location.reload();
        } catch (error) {
            console.error(`Erro ao carregar o produto ${id}:`, error);
        }
    }

    function updateForm(id, name, price){
        document.getElementById("productId").value = id;
        document.getElementById("productName").value = name;
        document.getElementById("productPrice").value = price;
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

        const updateButton = document.createElement("button");
        updateButton.textContent = "Editar";
        updateButton
            .classList
            .add("btn", "btn-success", "mr-2")
        updateButton
            .addEventListener("click", () => updateForm(id, name, price));
        linha.appendChild(updateButton)

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton
            .classList
            .add("btn", "btn-danger")
        deleteButton
            .addEventListener("click", () => deleteProduct(id));
        linha.appendChild(deleteButton)

        productTable
            .querySelector("tbody")
            .appendChild(linha);
    }

    fetchProducts()