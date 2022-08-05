//Inputtaki arama geçmişini kapattım
document.querySelector(".search-input").setAttribute("autocomplete","off");

//Buton efekti ve inputa yazılan bilgi btna tıklandığında fonk gider
var buton = document.querySelector(".search_btn");
buton.addEventListener("click",function btnAktif(){
        buton.classList.add("btnaffect");
        country = searchinput.value;
        document.querySelector(".neighbors-card").classList.add("neighbors-card-bg");
        document.querySelector(".neighbors-card").innerHTML = "";
        getCountry(country);
        setTimeout(()=>{
            buton.classList.remove("btnaffect");
        },4000);
})
const searchinput = document.querySelector(".search-input");

//veriler alındı ve alert 
function getCountry(country) {
fetch("https://restcountries.com/v2/name/" + country).then((Response) => Response.json())
.then( (json) => json.forEach(item => {
    console.log(item)
     countryinfo(item)

      //komşu ülkelerin verileri  alındı
     let neighbors = item.borders.toString();
     fetch("https://restcountries.com/v3.1/alpha?codes=" + neighbors)
     .then((Response) => {
        return Response.json();
     })
     .then((data) =>{
        countryNeighbors(data)
     })

})).catch((err) =>{
    alert("Aradığınız ülke bulunamıyor")
    searchinput.value ="";
    document.querySelector(".neighbors-card").innerHTML = "";
    document.querySelector(".contry_info").innerHTML = "";  

})
}


//ülkelerin bilgilerinin html de göster ilk kısım
function countryinfo(item) {
    let html = `
    <div class="card">
    <div class="row-info">
        <div class="ctry_img"><img src="${item.flags.png}" alt=""></div>
        <div class="ctry_info">
            <h3 class="card-title">${item.name}</h3>
            <div class="row">
                <div class="col-4">Nüfus</div>
                <div class="col-8">${((item.population)/1000000).toFixed(1)}</div>
            </div>
            <div class="row">
                <div class="col-4">resmi dili</div>
                <div class="col-8">${Object.values(item.languages)[0].name}</div>
            </div>
            <div class="row">
                <div class="col-4">Başkent</div>
                <div class="col-8">${item.capital}</div>
            </div>
            <div class="row">
                <div class="col-4">Para birimi</div>
                <div class="col-8">${Object.values(item.currencies)[0].name}</div>
            </div>
        </div>
    </div>
</div>
`;
document.querySelector(".contry_info").innerHTML = html;    
}
//komşu ülkelerin alınması
let html = "";
function countryNeighbors(data) {

    for(let ctry of data){
        console.log(ctry)
    let html = `
    <div class="contry_neighbors">
        <div class="row_neighbors">
            <div><img src="${ctry.flags.png}"></div>
                <div class="neighborsinfo">
                <h3>${ctry.name.common}</h3>
                </div>
        </div>
    </div> 
        `;
        document.querySelector(".neighbors-card").innerHTML += html;
    }
}

