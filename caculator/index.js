const readline = require('readline');

const rl = readline.createInterface({
    input: stdin,
    output: stdout
})

const cal = () => {
    const operators = []
    const operands = []
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }


}

const askQuestions = () => {

    rl.question('Hello world! Please input', (expression) => {
        console.log(`The result of ${expression} = ${cal()}`);
    })
    rl.close()
}