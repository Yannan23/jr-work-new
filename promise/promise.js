const p = new Promise((resolve, reject) => {
    let x = 1 + 1;
    if (x === 3) {
        resolve("You are right")
    } else {
        reject("You are wrong")
    }
})

p.then((message) => {
    console.log(`This is from the then: ${message}`);
}).catch((message) => {
    console.log(`This is from the catch: ${message}`);
})