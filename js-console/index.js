[1, 2, 3, 4, 5].forEach((i) => console.log(fibonacci(i)));

function fibonacci(n) {
    if (n < 0) {
        throw new Error("Can't be less than 0");
    }
    if (n <= 2) return n;

    let prev = 0, curr = 1;

    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }

    return curr;
}