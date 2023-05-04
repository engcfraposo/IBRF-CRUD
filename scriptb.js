const url = 'http://localhost:3000/products';
const productTable = document.getElementById("product-table");

class Product {
    constructor(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price;
    }
    async create(){
        try {
            const response = await axios.post(url, {
                name: this.name,
                price: this.price,
            });
            addProductToTable(response.data);
        } catch (error) {
            console.error('Erro ao criar o produto:', error);
        }
    }
    async update(){
       try {
        await axios.put(
            `${url}/${this.id}`, 
            {
                name: this.name,
                price: this.price,
            }
        );   
        location.reload();
       } catch (error) {
        console.error(`Erro ao modificar o produto ${this.id}:`, error); 
       }
    }
    async delete(){
        try {
            await axios.delete(`${url}/${this.id}`)
            location.reload();
        } catch (error) {
            console.error(`Erro ao carregar o produto ${this.id}:`, error);
        }
    }

    async fetch() {
        try {
         const response = await axios.get(url);
         response.data.forEach(addProductToTable)
        } catch (error) {
         console.error('Erro ao carregar os produtos:', error);
        }
     }
}

document
    .getElementById("product-form")
    .addEventListener('submit', async (event)=> {
        event.preventDefault();
        const id = document.getElementById("productId").value;
        const name = document.getElementById("productName").value;
        const price = document.getElementById("productPrice").value;
        //alert(JSON.stringify({id, name, price}, null, 2))
        const product = new Product(id, name, price)
        if(id){
            await product.update();
        } else {
            await product.create();
        }
    });

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

        const product = new Product(id, name, price)

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
            .addEventListener("click", () => product.delete());
        linha.appendChild(deleteButton)

        productTable
            .querySelector("tbody")
            .appendChild(linha);
    }

    const product = new Product()
    product.fetch()