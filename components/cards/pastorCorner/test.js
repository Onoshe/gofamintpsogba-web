function getRandomNumber(min, max) {
    if (min > max) {
        [min, max] = [max, min]; // Swap if min is greater than max
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  console.log(getRandomNumber(0, 5))