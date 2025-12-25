// Задание 1
function pickPropArray(arr, prop) {
    const result = [];
    for (let obj of arr) {
        if (prop in obj) {
            result.push(obj[prop]);
        }
    }
    return result;
}
// Задание 2
function createCounter() {
    let count = 0;

    return function () {
        count++;
        console.log(count);
    }
}

// Задание 3
function spinWords(str) {
    const words = str.split(' ');
    const result = [];
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (word.length >= 5) {
            const letters = word.split('');
            const reversedLetters = letters.reverse();
            const reversedWord = reversedLetters.join('');
            result.push(reversedWord);
        } else {
            result.push(word);
        }
    }
    return result.join(' ');
}
// Задание 4
function findTarget(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

// Задание 5
function findPrefix(strs) {
    if (strs.length === 0) return "";
    const firstWord = strs[0];
    let result = "";
    for (let start = 0; start < firstWord.length; start++) {
        for (let end = start + 2; end <= firstWord.length; end++) {
            const candidate = firstWord.substring(start, end);
            let foundInAll = true;

            for (let i = 1; i < strs.length; i++) {
                if (!strs[i].includes(candidate)) {
                    foundInAll = false;
                    break;
                }
            }
            if (foundInAll && candidate.length > result.length) {
                result = candidate;
            }
        }
    }

    return result;
}
console.log(findPrefix(["цветок", "поток", "хлопок"])); // "ок"
console.log(findPrefix(["собака", "гоночная машина", "машина"])); // ""
console.log(findPrefix(["программирование", "программа", "грамотей"])); // "грам"