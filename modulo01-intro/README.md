# Introdução ao testes automatizados

- Não tocar no código enquanto você não estiver 100% satisfeito que entendeu o problema e o passo a passo para solução.
- Adorei a ideia de criar uma prova real, rabiscar Entrada, processamento e Saida.
    - Entrada: Dados/informações que vão entrar no sistema. (ex: nome e cpf)
    - Processamento: procedimento de ação no meu sistema.(ex: inserir o cliente no bd, se ele não existir)
    - Saida: Retorno do sistema.(ex: uma mensagem de sucesso se cadastrado o cliente corretamente)

## Tipos de testes

- Testes que curso foca:

    - **Testes unitários:** Validam o comportamento isolado de uma função ou componente, sem depender de banco de dados ou serviços externos. O foco é garantir que cada unidade da aplicação funcione corretamente de forma independente.

    - **Testes de integração:** Verificam se diferentes partes do sistema funcionam bem juntas. Por exemplo, em uma API, testar se uma chamada a um endpoint retorna o status e os dados esperados, considerando as integrações com banco de dados e outros serviços.

    - **Testes E2E (End-to-End):** Simulam o comportamento do usuário e validam o fluxo completo da aplicação. Um exemplo seria, em um sistema web, adicionar um item via POST e verificar via GET se ele aparece na lista, garantindo que todas as camadas estão funcionando em conjunto.

## Pirâmide de testes
é um conceito que ajuda a estruturar uma estratégia eficiente de testes de software. Ela sugere como distribuir os diferentes tipos de testes (unitários, de integração, E2E) com base em quantidade, custo e velocidade de execução.A pirâmide tem três camadas principais:

### 🟩 Base: Testes Unitários
- Maior quantidade.
- São rápidos, baratos e isolam funcionalidades específicas.
- Valem para funções, métodos ou componentes isolados.
- Exemplo: testar se uma função de cálculo retorna o valor esperado.

### 🟨 Meio: Testes de Integração
- Quantidade moderada.
- Testam a comunicação entre partes da aplicação, como entre o backend e o banco de dados.
- Um pouco mais lentos e custosos.
- Exemplo: verificar se um endpoint da API salva dados corretamente no banco.

### 🟥 Topo: Testes End-to-End (E2E)
- Menor quantidade.
- Mais lentos, complexos e caros.
- Simulam o comportamento real do usuário, testando o sistema de ponta a ponta.
- Exemplo: abrir a aplicação, fazer login, adicionar um item a uma lista e verificar se ele aparece.

> Erick Wendel:
>> Ele não acredita que isso seja um conceito aplicavel no dia a dia principalmente se o time não tem cutura de testes.