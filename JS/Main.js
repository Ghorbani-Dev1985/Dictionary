const $ = document;
const DicWordInput = $.querySelector("#DicWordInput");
const DicContainerDetails = $.querySelector("#DicContainerDetails");

function GetDicData() {
  let getUserWord = DicWordInput.value;
  DicContainerDetails.classList.add("flex-center")
  DicContainerDetails.innerHTML = `<img src="./../Images/loading.svg" alt="ghorbani-dev.ir" />`
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${getUserWord}`)
    .then((res) => res.json())
    .then((data) => {
      ShowWordTranslate(data);
    })
    .catch(err =>{
        ShowError();
        console.log(err);
    })
}

function ShowWordTranslate(data) {
  DicWordInput.value = "";
  DicContainerDetails.classList.remove('error')
  DicContainerDetails.classList.remove("flex-center")
  DicContainerDetails.innerHTML = "";
  let WordNum = 0;
      data.forEach((dicData) => {
        console.log(dicData);
        WordNum++;
        DicContainerDetails.insertAdjacentHTML(
          "beforeend",
          `
            <p class="DicWord">${WordNum}- ${dicData.word}</p>
            <p class="DicPartOfSpeech">${dicData.meanings[0].partOfSpeech}</p>
            <div class="flex-start">
            ${dicData.phonetics[0] !== undefined ? `
             UK
            <audio id="UkAudio" src=${dicData.phonetics[0].audio}></audio>
            <div class="Audio" onClick="PlayUkAudio()"><img src="./../Images/audio.svg" alt="ghorbani-dev.ir"/></div>
            ${dicData.phonetics[0].text !== undefined ? dicData.phonetics[0].text : ""}
            ` : ""}
           
            ${dicData.phonetics[1] !== undefined ? `  US
            <audio id="UsAudio" src=${dicData.phonetics[1].audio}></audio>
            <div class="Audio" onClick="PlayUsAudio()"><img src="./../Images/audio.svg" alt="ghorbani-dev.ir"/></div>${dicData.phonetics[1].text !== undefined ? dicData.phonetics[1].text : ""}` : ""}
            </div>
            <p class="DicDefinition">${dicData.meanings[0].definitions[0].definition}</p>
            ${dicData.meanings[0].definitions[0].example !== undefined ? `
              <ul><li>${ dicData.meanings[0].definitions[0].example }</li></ul>` : ""
            }
          
            `
        );
      });

}


function ShowError(){
    DicContainerDetails.classList.add('error')
    DicContainerDetails.innerHTML = "Sorry! Your word not found ...."
}

function PlayUkAudio() {
  let UkAudio = $.querySelector("#UkAudio");
  UkAudio.play();
}

function PlayUsAudio() {
  let UsAudio = $.querySelector("#UsAudio");
  UsAudio.play();
}

DicWordInput.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    GetDicData();
  }
});
