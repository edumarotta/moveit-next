<h1> MOVEIT </h1>

<h2>Aplicação apresentada no NLW#4, da RocketSeat (https://app.rocketseat.com.br/dashboard), seguindo a trilha REACT-JS</h2>


O Moveit é uma aplicação criada para executar a técnica de pomodoro. Essa técnica é um método de gerenciamento de tempo desenvolvido por Francesco Cirillo no final dos anos 1980.
A técnica consiste na utilização de um cronômetro para dividir o trabalho em períodos de 25 minutos, separados por breves intervalos.
A técnica deriva seu nome da palavra italiana pomodoro (tomate), como referência ao popular cronômetro gastronômico na forma dessa fruta.
O método é baseado na ideia de que pausas frequentes podem aumentar a agilidade mental. 

Funcionamento da Aplicação

Quando o usuário clicar em "Iniciar novo Ciclo" uma contagem regressiva de 25 minutos começará. Quando ela terminar, sera exibido um alerta, dizendo que tem um novo desafio a ser cumprido. Caso o usuário cumpra o desafio, ele ganhará um valor em XP (Pontos de Experiência). Esses pontos são cumulativos. Quando o usuário atingir um determinado limites de pontos, ele subirá de nivel. Durante o ciclo, o usuário pode desistir. basta clicar em "Abandonar Ciclo"
Caso o usuário não cumpra, nada acontece.

 Técnologias que foram utilizadas na aplicação
 
<ul>
    <li> React.js </li>
    <li> Next.js </li>
    <li> Typescript</li>
</ul>

<h3> Site em produção </h3>

<h4>https://moveit-next-khaki-pi.vercel.app/</h4>

<h3> Como executar </h3>

<blockquote>

Você ja deve ter o Node.js instalado.
caso não tenha siga os passos em <span>https://nodejs.org/en/</span>

Aconselho também instalar o yarn, pois em toda sua criação foi utilizado o mesmo.
https://classic.yarnpkg.com/lang/en/

Faça um clone do repositório
<p>$ git clone https://github.com/edumarotta/moveit-next</p>

Abra a pasta do repositório
<p>$ cd moveit-next<p>

Para excutar o projeto basta executar o comando
<p>& yarn dev ou npx dev<p>
</<blockquote>
