const DicWordInput = document.querySelector("#DicWordInput")
const DicResultContainer = document.querySelector("#DicResultContainer")


function GetDicData(){
    let getUserWord = DicWordInput.value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${getUserWord}`)
    .then((res) => res.json())
    .then((data) => {
        ShowWordTranslate();
        console.log(data);
    })
}



function ShowWordTranslate(){

}






DicWordInput.addEventListener("keypress" , (e) => {
    if(e.keyCode === 13){
        GetDicData();
    }
})