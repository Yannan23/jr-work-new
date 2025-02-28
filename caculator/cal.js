const readline = require('readline')

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const getResult = (operator, a, b) => {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b
    }
}

function cal(expression) {
    const operators = [];
    const operands = [];
    const precedence = {
        '*': 2,
        '/': 2,
        '+': 1,
        '-': 1
    }

    const tokens = expression.match(/\d+|[+\-*/]/g)

    for (i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const isNumber = !isNaN(parseInt(token))

        if (isNumber) {
            operands.push(parseInt(token));
        } else {
            // operators.push(token)
            const hasHigherPrecedence =
                precedence[operators[operators.length - 1]] > precedence[token]

            console.log(
                precedence[operators[operators.length - 1]],
                precedence[token],
                operators[operators.length - 1],
                token,
                hasHigherPrecedence,
                // operators
            );

            while (operators.length && hasHigherPrecedence) {
                const a = operands.pop();
                const b = operands.pop();
                const operator = operators.pop()
                const result = getResult(operator, a, b)
                operands.push(result)
            }
            operators.push(token)
        }
    }

    while (operators.length > 0) {
        const a = operands.pop();
        const b = operands.pop();
        const operator = operators.pop()
        const result = getResult(operator, a, b)
        operands.push(result)
    }
    return operands.pop()
}


const askQuestions = () => {
    rl.question((
        '*************************** \n Welcome to the Calculator! \n*************************** \n'),
        (expression) => {
            if (expression.toLowerCase() === 'exit') {
                rl.close()
            }

            const result = cal(expression);
            // console.log(result);
            console.log(`The result of ${expression} is ${result}`);

            askQuestions()
        })
}

askQuestions()