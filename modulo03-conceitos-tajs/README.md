# Entendendo Mocks

*Mock* do inglês significa imitar, ou seja, algo que simula um comportamento ou ação. Simulação de exames é conhecido como *Mock Exam* como o erick comenta em sua aula.

Os conceitos como stubs, spies e fake times que será abordado a baixo fazem parte do conceito de mock também.

O conceito de mock é escencial para testes unitario, pois devem ser 100% offline e não devem ter qualquer interação externa, com os mocks podemos simular respostas ou interações externas que aquela nossa unidade de codigo teria, pois em testes unitarios já presupomos que as interações externas já funcionam.