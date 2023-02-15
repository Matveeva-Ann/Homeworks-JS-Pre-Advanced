// Необхідно відтворити функціонал як на відео Cenzor, а саме:
// При кліку на ADD добавляти заборонене слово, яке відображатиметься в списку “Bad words”
// Якщо поле для добавлення слова не заповнене виводити відповідне повідомлення
// При кліку на Cenzor перевіряється чи є в textarea заборонене слово, якщо так його заміняє на *, причому на ту кількість яка довжина слова
// Якщо textarea порожня виводити повыдолення про заповнення поля

const badWords = document.querySelector(".badWords")?.children[1] as HTMLBodyElement;
const inputText = document.querySelector(".input-text") as HTMLInputElement;
const btnAdd: any = document.querySelector(".btn-Add") as HTMLButtonElement;
const btnReset: any = document.querySelector(".btn-Reset") as HTMLButtonElement;
const cenzor: any = document.querySelector(".cenzor") as HTMLButtonElement;
const textareaFild: any = document.querySelector(".textarea-fild") as HTMLInputElement;
let arrBadWords: string[] = [];

btnAdd.addEventListener("click", function () {
  missingValue(inputText);
  if (inputText.value !== "") {
    inputText.classList.remove("red");
    upDataBadWord(inputText.value.trim());
  }
  inputText.value = "";
});

function upDataBadWord (newValue?: string){
  if (newValue){
    arrBadWords.push(newValue.toLocaleLowerCase());
  } else{
    arrBadWords = []
  }
  badWords.textContent = arrBadWords.join(', ');
}

btnReset.addEventListener("click", function () {
  textareaFild.value = "";
  upDataBadWord();
  inputText.classList.remove("red");
  textareaFild.classList.remove("red");
});

function missingValue(elem: any): void {
  elem.value === "" ? elem.classList.add("red") : elem.classList.remove("red");
}

cenzor.addEventListener("click", function () {
  missingValue(textareaFild);
  let arrText: string[] = textareaFild.value.split(" ");
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

function createStars(elem: string): string {
  return "*".repeat(elem.length);
}

