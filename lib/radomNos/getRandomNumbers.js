

export function getRandomNumbers(min, max, length){
    const randomNumbers = [];
    for (let index = 0; index < length; index++) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomNumbers.push(randomNumber)
    }
    return randomNumbers;
}


export function getUniqueRandomNumbers(min, max, length, type) {
    if (max - min + 1 < length) {
        throw new Error("Cannot generate unique numbers with the given range and length.");
    }

    const uniqueNumbers = new Set();

    while (uniqueNumbers.size < length) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        uniqueNumbers.add(randomNumber);
    }

    return type? Array.from(uniqueNumbers).join("").toString() : Array.from(uniqueNumbers);
}



function generateUniqueFigure(existingFigures) {
    while (true) {
        //const newFigure = Math.floor(Math.random() * 9000000) + 1000000;  // Generate a random 7-digit number
        const newFigure = Math.floor(Math.random() * 9) + 1;  // Generate a random 7-digit number
        if (!existingFigures.has(newFigure)) {
            existingFigures.add(newFigure);
            return newFigure;
        }
    }
}