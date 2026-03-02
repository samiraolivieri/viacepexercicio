const btnBuscar = document.getElementById('btnBuscar');
const btnLimpar = document.getElementById('btnLimpar');
const cepInput = document.getElementById('cepInput');
const resultadoDiv = document.getElementById('resultado');

async function buscarCep() {
    const cep = cepInput.value.trim();

    if (cep.length !== 8) {
        alert("Digite um CEP com 8 números.");
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            resultadoDiv.innerHTML = "<p>CEP não encontrado.</p>";
        } else {
            // Montando o layout de texto conforme a imagem
            resultadoDiv.innerHTML = `
                <p>CEP: ${data.cep}</p>
                <p>Logradouro: ${data.logradouro}</p>
                <p>Bairro: ${data.bairro}</p>
                <p>Cidade: ${data.localidade}</p>
                <p>Estado: ${data.uf}</p>
            `;
        }
    } catch (error) {
        alert("Erro ao conectar na API.");
    }
}

btnBuscar.addEventListener('click', buscarCep);

btnLimpar.addEventListener('click', () => {
    cepInput.value = "";
    resultadoDiv.innerHTML = "";
});