
interface PlaceInfo {
    woeid: number;
    name: string;
    DOMTitle: string;
    DOMDescription: string;
    img: string;
}

interface Subject{
    registerObserver(o: Observer) : any;
    removeObserver(o: Observer) : any;
    notifyObservers() : any;
}

interface Observer{
    update(temperature: Temperature) : any;
}

interface Temperature {
    place1: Place;
    place2: Place;
    temp: {temp1: number; temp2: number};
    tempAbsolute: number;
    tempState: {state1: string; state2: string};
    weatherAbbr: {abbr1: string; abbr2: string};
    }



    class Place implements PlaceInfo{
        public woeid: number;
        public name: string;
        public DOMTitle: string;
        public DOMDescription: string;
        public img: string;
       
        constructor(woeid: number, name: string){
        this.woeid = woeid,
        this.name = name,  
        this.DOMTitle = `.${this.name.toLowerCase()} h2`,
        this.DOMDescription = `.${this.name.toLowerCase()} p`
        this.img = `.${this.name.toLowerCase()} img`}
    };
    

// ------------------------------------------------------
class WeatherStation implements Subject {
    private observers: Observer[] = [];
    private temperature: any;

    registerObserver(o: Observer) {
        this.observers.push(o);
    }

    removeObserver(o: Observer) {
        let index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    }

    notifyObservers() {
        for (let observer of this.observers) {
            observer.update(this.temperature);
        }
    }

    async setTemperature(temp: Promise<Temperature>) {
        await temp;
        temp.then((res: Temperature)=>{this.temperature = res; this.notifyObservers();})        
    }
}

// ------------------------------------------------------
class TemperatureDisplay implements Observer {
    private subject: Subject;

    constructor(weatherStation: Subject) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }

    findImgSrc(temperature: Temperature, abbrNumber: number) {
        const getAbbr = ()=>{
            if(abbrNumber === 1){
                return temperature.weatherAbbr.abbr1;
            } 
            else if(abbrNumber === 2){
                return temperature.weatherAbbr.abbr2;
            }
        }
        switch (getAbbr()) {
            case 'sn':
                return "snow.svg";
                break;
            case 'sl':
                return "sleet.svg";
                break;
            case 'h':
                return "hail.svg";
                break;
            case 't':
                return "thunderstorm.svg";
                break;
            case 'hr':
                return "heavyrain.svg";
                break;
            case 'lr':
                return "lightrain.svg";
                break;
            case 's':
                return "showers.svg";
                break;
            case 'hc':
                return "heavycloud.svg";
                break;
            case 'lc':
                return "lightcloud.svg";
                break;
            case 'c':
                return "clear.svg";
                break;
            default:
                return "";
        }
    }

    async update(temperature: Temperature) {
    const DOMTitle1 = document.querySelector(temperature.place1.DOMTitle);
    const DOMTitle2 = document.querySelector(temperature.place2.DOMTitle);
    const DOMDescription1 = document.querySelector(temperature.place1.DOMDescription);
    const DOMDescription2 = document.querySelector(temperature.place2.DOMDescription);
    const DOMImg1 : HTMLImageElement | null  = document.querySelector(temperature.place1.img)
    const DOMImg2 : HTMLImageElement | null = document.querySelector(temperature.place2.img)
    const DOMSummary = document.querySelector("#summary + p")

    if (DOMTitle1 && DOMTitle2 && DOMDescription1 && DOMDescription2 && DOMSummary && DOMImg1 && DOMImg2){
    DOMTitle1.textContent = temperature.place1.name;
    DOMTitle2.textContent = temperature.place2.name;
    DOMDescription1.textContent = `Temperatures in ${temperature.place1.name} stay around ${temperature.temp.temp1}°C. You can expect ${temperature.tempState.state1}.`
    DOMDescription2.textContent =`Temperatures in ${temperature.place2.name} stay around ${temperature.temp.temp2}°C. You can expect ${temperature.tempState.state2}.`;
    DOMImg1.src = this.findImgSrc(temperature, 1);
    DOMImg2.src = this.findImgSrc(temperature, 2);
    DOMSummary.textContent = `Today weather in ${temperature.place1.name} is around ${temperature.tempAbsolute}°C better than in ${temperature.place2.name}.`
    }
    }
}

async function getWeatherAW(place1: Place, place2: Place) : Promise<any>{

    try {
        const resultPlace1 = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${place1.woeid}/`);
        const dataPlace1 = (await resultPlace1.json()).consolidated_weather[0];
        const resultPlace2 = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${place2.woeid}/`);
        const dataPlace2 = (await resultPlace2.json()).consolidated_weather[0];
        
        const temp = {temp1: dataPlace1.the_temp, temp2: dataPlace2.the_temp} ;
        const tempState = {state1: dataPlace1.weather_state_name.toLowerCase(), state2: dataPlace1.weather_state_name.toLowerCase()};
        const tempAbsolute = Math.abs(Math.round(temp.temp1 - temp.temp2));
        const weatherAbbr = {abbr1: dataPlace1.weather_state_abbr, abbr2: dataPlace2.weather_state_abbr};
            
        return {
            place1,
            place2,
            temp, 
            tempAbsolute,
            tempState,
            weatherAbbr
            }
    } catch (error) {

        console.log(error);

    };
}


let weatherStation = new WeatherStation();
let tempDisplay = new TemperatureDisplay(weatherStation);
const Warsaw = new Place(523920, "Warsaw");
const Montreal = new Place(3534, "Montreal");
weatherStation.setTemperature(getWeatherAW(Warsaw, Montreal));
