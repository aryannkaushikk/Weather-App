const searchbar = document.getElementById("search-box");
const button = document.getElementById("search").children[1];


const city = document.getElementById("mwthr").children[0];
const sc = document.getElementById("sc");
const temp = document.getElementById("mwthr").children[2];
const wc = document.getElementById("mwthr").children[3];

const rh = document.getElementById("relhum").children[1];
const at = document.getElementById("apptemp").children[1];

const ws = document.getElementById("sdata").children[0].children[1];
const wd = document.getElementById("sdata").children[1].children[1];
const wg = document.getElementById("sdata").children[2].children[1];
const aqi = document.getElementById("sdata").children[3].children[1];

const days = document.getElementById("info").children[1].children[0].children[1];
const mintemp = document.getElementById("info").children[1].children[0].children[2];
const maxtemp = document.getElementById("info").children[1].children[0].children[3];
const sunrise = document.getElementById("info").children[1].children[0].children[4];
const sunset = document.getElementById("info").children[1].children[0].children[5];
const daydur = document.getElementById("info").children[1].children[0].children[6];

function dayset(response){

    var date = response.date;
    const daylist = response.daylist;
    for (let i = 2; i < 8; i++) {
        date++;
        days.children[i].innerHTML = daylist[date];
        if (date==6){
            date=-1;
        }
    }
}

function minset(response){
    for(let i = 1; i<8; i++){
        mintemp.children[i].innerHTML = response.mintemp[i-1]+"°C";
    }
}

function maxset(response){
    for(let i = 1; i<8; i++){
        maxtemp.children[i].innerHTML = response.maxtemp[i-1]+"°C";
    }
}

function sunriseset(response){
    for(let i = 1; i<8; i++){
        var hr = 5+parseInt(response.sunrise[i-1].substring(11,13));
        var min = 30+parseInt(response.sunrise[i-1].substring(14,16)); 
        if(min>60){
            hr = Math.floor(hr+(min/60));
            min = min%60;
        }

        if (min<10){
            sunrise.children[i].innerHTML = hr+":0"+min+" AM";
        }
        else{
            sunrise.children[i].innerHTML = hr+":"+min+" AM";
        }
        
    }
}

function sunsetset(response){
    for(let i = 1; i<8; i++){
        var hr = parseInt(response.sunset[i-1].substring(11,13))-7;
        var min = 30+parseInt(response.sunset[i-1].substring(14,16)); 
        if(min>60){
            hr = Math.floor(hr+(min/60));
            min = min%60;
        }

        if (min<10){
            sunset.children[i].innerHTML = hr+":0"+min+" PM";
        }
        else{
            sunset.children[i].innerHTML = hr+":"+min+" PM";
        }
        
    }
}

function daydurset(response){
    for(let i = 1; i<8; i++){
        var hr = Math.floor(response.daydur[i-1]/3600);
        var min = Math.ceil(((response.daydur[i-1])-(hr*3600))/60);
        daydur.children[i].innerHTML = hr+" Hr "+min+" Mins";
    }
}


const site = "https://weather-app-seven-woad-89.vercel.app";

document.addEventListener("DOMContentLoaded", ()=>{
    getdat();
});

button.addEventListener("click",()=>{
    postdat(searchbar.value);
})



async function getdat (){
    try {
        
        const response = (await(axios.get(site+'/'))).data;
        
        city.innerHTML = response.city;
        sc.innerHTML = response.state+", "+response.country;    
        temp.innerHTML = response.temp+"°C";
        wc.innerHTML = response.wc;

        rh.innerHTML = response.rh+"%";
        at.innerHTML = response.at+"°C";

        ws.innerHTML = response.ws+" km/h";
        wd.innerHTML = response.wd+"°";
        wg.innerHTML = response.wg+" km/h";
        aqi.innerHTML = response.aqi+" EAQI";

        dayset(response);
        minset(response);
        maxset(response);
        sunriseset(response);
        sunsetset(response);
        daydurset(response);

        document.documentElement.style.setProperty('--color', response.color);
        document.documentElement.style.setProperty('--bimage', "url("+response.bimage+")");
    
    } catch (error) {
        console.log(error);
    }
}


async function postdat (data){
    try {

        const response = (await(axios.post(site+'/search', ({city:data})))).data;
        
        city.innerHTML = response.city;
        sc.innerHTML = response.state+", "+response.country;    
        temp.innerHTML = response.temp+"°C";
        wc.innerHTML = response.wc;

        rh.innerHTML = response.rh+"%";
        at.innerHTML = response.at+"°C";

        ws.innerHTML = response.ws+" km/h";
        wd.innerHTML = response.wd+"°";
        wg.innerHTML = response.wg+" km/h";
        aqi.innerHTML = response.aqi+" EAQI";

        dayset(response);
        minset(response);
        maxset(response);
        sunriseset(response);
        sunsetset(response);
        daydurset(response);

        document.documentElement.style.setProperty('--color', response.color);
        document.documentElement.style.setProperty('--bimage', "url("+response.bimage+")");
        
    
    } catch (error) {
        console.log(error);
    }
}