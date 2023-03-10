// Необхідно відтворити функціонал як на відео Cenzor, а саме:
// При кліку на ADD добавляти заборонене слово, яке відображатиметься в списку “Bad words”
// Якщо поле для добавлення слова не заповнене виводити відповідне повідомлення
// При кліку на Cenzor перевіряється чи є в textarea заборонене слово, якщо так його заміняє на *, причому на ту кількість яка довжина слова
// Якщо textarea порожня виводити повыдолення про заповнення поля
const badWords = document.querySelector(".badWords")?.children[1];
const inputText = document.querySelector(".input-text");
const btnAdd = document.querySelector(".btn-Add");
const btnReset = document.querySelector(".btn-Reset");
const cenzor = document.querySelector(".cenzor");
const textareaFild = document.querySelector(".textarea-fild");
let arrBadWords = [];
btnAdd.addEventListener("click", function () {
    missingValue(inputText);
    if (inputText.value !== "") {
        inputText.classList.remove("red");
        upDataBadWord(inputText.value.trim());
    }
    inputText.value = "";
});
function upDataBadWord(newValue) {
    if (newValue) {
        arrBadWords.push(newValue.toLocaleLowerCase());
    }
    else {
        arrBadWords = [];
    }
    badWords.textContent = arrBadWords.join(', ');
}
btnReset.addEventListener("click", function () {
    textareaFild.value = "";
    upDataBadWord();
    inputText.classList.remove("red");
    textareaFild.classList.remove("red");
});
function missingValue(elem) {
    elem.value === "" ? elem.classList.add("red") : elem.classList.remove("red");
}
cenzor.addEventListener("click", function () {
    missingValue(textareaFild);
    let arrText = textareaFild.value.split(" ");
    const lettersRegExp = new RegExp("^[a-zA-Z0-9]+$");
    const regExp = new RegExp('(^[^a-zA-Z0-9]*)([a-zA-Z0-9]+)([^a-zA-Z0-9]*)$');
    for (const i in arrText) {
        const elem = arrText[i];
        if (!lettersRegExp.test(elem)) {
            const newElem = elem.replace(regExp, "$2");
            if (arrBadWords.includes(newElem.toLowerCase())) {
                arrText[i] = elem.replace(regExp, `$1${createStars(newElem)}$3`);
            }
        }
        if (arrBadWords.includes(elem.toLowerCase())) {
            arrText[i] = createStars(elem);
        }
    }
    textareaFild.value = arrText.join(" ");
});
function createStars(elem) {
    return "*".repeat(elem.length);
}
