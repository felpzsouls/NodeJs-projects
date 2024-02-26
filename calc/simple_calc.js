const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function dnv() {
    console.log('Gostaria de fazer outro calculo? S/N')
    rl.question('', (question) => {
        switch (question.toLowerCase()) {
            case 's' || 'y':
                calc();
                break;
            case 'n':
                console.log('até mais!')
                rl.close();
        }
    })
}

function calc() {
    console.log('Bem vindo a programação com Felpz');
    console.log('por favor me fale qual sera a operação(+ - * /)!')

    rl.question('Operação:', (operador) => {
        console.log('Agora me fale o primeiro numero')

        rl.question('Primeiro numero:', (num1) => {
            console.log('Agora me fale o segundo numero')

            rl.question('Segundo numero:', (num2) => {
                num1 = parseFloat(num1)
                num2 = parseFloat(num2)

                let result;

                switch (operador) {
                    case '+':
                        result = num1 + num2;
                        break;
                    case '-':
                        result = num1 - num2;
                        break;
                    case '*':
                        result = num1 * num2;
                        break;
                    case '/':
                        if (num2 === '0') {
                            console.log('Erro: divisão por zero');
                            return rl.close();
                        }
                        result = num1 / num2;
                        break;
                    default:
                        console.log('operador invalido');
                        return dnv()
                }

                console.log(`${num1} ${operador} ${num2} = ${result}`);
                dnv();
            });
        });
    });
};

calc()