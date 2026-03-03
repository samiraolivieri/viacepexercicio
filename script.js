
const btnBuscar = document.querySelector('#btnBuscar');
const btnLimpar = document.querySelector('#btnLimpar');
const cepInput = document.querySelector('#cepInput');
const resultadoDiv = document.querySelector('#resultado');


async function buscarCep() {
   
    const cep = cepInput.value.replace(/\D/g, '');

    
    if (cep.length !== 8) {
        alert("Por favor, digite um CEP válido com 8 dígitos.");
        return;
    }

    try {
        
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        
       
        const data = await response.json();

        
        if (data.erro) {
            resultadoDiv.innerHTML = "<p style='color: red;'>CEP não encontrado!</p>";
        } else {
            
            resultadoDiv.innerHTML = `
                <div class="info-cep">
                    <p>CEP: ${data.cep}</p>
                    <p>Logradouro: ${data.logradouro}</p>
                    <p>Bairro: ${data.bairro}</p>
                    <p>Cidade: ${data.localidade}</p>
                    <p>Estado: ${data.uf}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao buscar o CEP. Verifique sua conexão.");
    }
}


btnBuscar.addEventListener('click', buscarCep);


btnLimpar.addEventListener('click', () => {
    cepInput.value = "";
    resultadoDiv.innerHTML = "";
});