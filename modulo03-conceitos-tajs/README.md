# Entendendo Mocks

*Mock* do inglês significa imitar, ou seja, algo que simula um comportamento ou ação. Simulação de exames é conhecido como *Mock Exam* como o erick comenta em sua aula.

Os conceitos como stubs, spies e fake times que será abordado a baixo fazem parte do conceito de mock também.

O conceito de mock é escencial para testes unitario, pois devem ser 100% offline e não devem ter qualquer interação externa, com os mocks podemos simular respostas ou interações externas que aquela nossa unidade de codigo teria, pois em testes unitarios já presupomos que as interações externas já funcionam.

## Entendendo Stubs

Stubs é uma das principais especilizações de um mock, com stubs podemos simular respostas que iremos receber para isolar o que está sendo testado.

**Exemplo:**
    - Você tem uma função que chama um serviço externo. Com os stubs, você substitui esse serviço por uma versão *falsa* que retorna um valor fixo, evitando a chamada real para esse serviço.

Com isso nossos testes ganham performace e se matem no cerne dos testes unitarios que continuam funcionando independente do mundo externo.

## Entendendo Spies

Spies são funções que espionam outras funções durante a execução dos testes. Diferente dos stubs, que apenas retornam um valor pré-definido, spieses monitoram o comportamento, registrando informações como :

- Se a função foi chamada
- Quantas vezes foi chamada
- Com quais argumentos
- Qual valor retornou (dependendo da biblioteca)

## Entendendo FakeTimers

Assim como stubs, os FakeTimers fazem a simulação de algo, mas focado na passagem de tempo, então conseguimos simluar a passagem de tempo para realizar testes onde envolvam agendamentos ou validação de ação com passagem de tempo.