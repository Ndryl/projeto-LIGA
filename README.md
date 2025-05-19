📋 Como Executar o Projeto

1. Buildar a Imagem Docker
   bash

docker build -t projeto-liga .

2. Rodar o Container
   bash

docker run -p [PORTA_LOCAL]:[PORTA_CONTAINER] projeto-liga

(Substitua [PORTA_LOCAL] e [PORTA_CONTAINER] conforme necessário.)
⚙️ Funcionalidades Principais
📅 Área de Gerenciamento de Disponibilidade

    Adicionar Disponibilidade:
    Preencha o formulário para definir horários em que um médico estará disponível.

    Cards de Disponibilidade:
    Cada horário cadastrado gera um card clicável com as informações do médico.

⏰ Marcação de Consultas

    Selecione um Card → Veja os horários disponíveis.

    Escolha um Horário → Preencha o formulário de agendamento.

    Confirme → A consulta será registrada.

📌 Kanban de Acompanhamento

    Consultas agendadas aparecem no Kanban na área de "Consultas".

    Visualização simplificada para gestão de atendimentos.
