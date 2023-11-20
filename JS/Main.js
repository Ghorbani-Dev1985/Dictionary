const $ = document;
const DicWordInput = $.querySelector("#DicWordInput")
const DicResultContainer = $.querySelector("#DicResultContainer")
const DicDefinitions = $.querySelector("#DicDefinitions")

function GetDicData(){
    let getUserWord = DicWordInput.value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${getUserWord}`)
    .then((res) => res.json())
    .then((data) => {
        ShowWordTranslate(data);
    })
}



function ShowWordTranslate(data){
    // console.log(data[1].meanings[0].partOfSpeech);
    DicResultContainer.innerHTML = "";
    let WordNum = 0;
    data.forEach(dicData => {
        console.log(dicData);
        WordNum ++;
        DicResultContainer.insertAdjacentHTML('beforeend' , `
        <p class="DicWord">${WordNum}- ${dicData.word}</p>
        <p class="DicPartOfSpeech">${dicData.meanings[0].partOfSpeech}</p>
        <div class="flex-center">
        UK
        <audio id="UkAudio" src=${dicData.phonetics[0].audio}></audio>
        <div onClick="PlayUkAudio()"><img src="./../Images/audio.svg" alt="ghorbani-dev.ir"/></div>
        ${dicData.phonetics[0].text}
        US
        <audio id="UsAudio" src=${dicData.phonetics[1].audio}></audio>
        <div onClick="PlayUsAudio()"><img src="./../Images/audio.svg" alt="ghorbani-dev.ir"/></div>
        ${dicData.phonetics[1].text}
        </div>
        `)
    });
}

// ${dicData.meanings[0].definitions.forEach(meaning => {
//     `${meaning.definition}
//     ${meaning.example}`
     
     
//      console.log(meaning);
//   })}

function PlayUkAudio(){
    let UkAudio = $.querySelector('#UkAudio');
    UkAudio.play();
}

function PlayUsAudio(){
    let UsAudio = $.querySelector('#UsAudio');
    UsAudio.play();
}



DicWordInput.addEventListener("keypress" , (e) => {
    if(e.keyCode === 13){
        GetDicData();
    }
})