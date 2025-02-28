const readline = require('readline');

const rl = readline.createInterface({
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

const cal = (expression) => {
    const operators = []
    const operands = []
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }

    const tokens = expression.match(/\d+|[+\-*/]/g)

    for (i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        const isNumber = !isNaN(parseInt(token))
        if (isNumber) {
            operands.push(parseInt(token))
        } else {
            const hasHigherPrecedence =
                precedence[operators[operators.length - 1]] > precedence[token]
            while (operators.length && hasHigherPrecedence) {
                const a = operands.pop()
                const b = operands.pop()
                const operator = operators.pop()
                const result = getResult(operator, a, b)
                operands.push(result)
            }
            operators.push(token)
        }
    }
    while (operators.length > 0) {
        const a = operands.pop()
        const b = operands.pop()
        const operator = operators.pop()
        const result = getResult(operator, a, b)
        operands.push(result)
    }
    return result = operands.pop()
}

const askQuestions = () => {

    rl.question('Hello world! Please input\n', (expression) => {

        if (expression === 'exit') {
            rl.close()
        }
        console.log(`The result of ${expression} = ${cal(expression)}`);
    })
}

askQuestions()