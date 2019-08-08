const Place = function (woeid, name) {
    this.woeid = woeid,
        this.name = name,
        this.DOMTitle = `.${name} h2`,
        this.DOMDescription = `.${name} p`
    this.DOMDescription2 = `.${name} p + p`
    this.img = `.${name} img`
};

const Warsaw = new Place(523920, "warsaw");
const Montreal = new Place(3534, "montreal");

async function getWeatherAW(place) {

    try {

        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${place.woeid}/`);
        const data = await result.json();
        const today = data.consolidated_weather[0];
        const tomorrow = data.consolidated_weather[1];
        document.querySelector(place.DOMTitle).textContent = data.title;
        document.querySelector(place.DOMDescription).textContent = `Temperatures in ${data.title} stay between ${Math.round(today.min_temp)} and ${Math.round(today.max_temp)}°C. You can expect ${today.weather_state_name.toLowerCase()}.`;
        document.querySelector(place.DOMDescription2).textContent = `Tommorow they'll stay between ${Math.round(tomorrow.min_temp)} and ${Math.round(tomorrow.max_temp)}°C. You can expect ${tomorrow.weather_state_name.toLowerCase()}.`;

        const imgSrc = function () {
            switch (today.weather_state_abbr) {
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

        document.querySelector(place.img).src = imgSrc();


    } catch (error) {

        console.log(error);

    }
};

getWeatherAW(Warsaw);
getWeatherAW(Montreal);

// COMPARISON

async function getWeatherComparisonAW(warsaw, montreal) {

    try {

        const resultWarsaw = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${warsaw.woeid}/`);
        const resultMontreal = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${montreal.woeid}/`);
        const dataWarsaw = await resultWarsaw.json();
        const dataMontreal = await resultMontreal.json();
        const todayWarsaw = dataWarsaw.consolidated_weather[0];
        const todayMontreal = dataMontreal.consolidated_weather[0];
        const tomorrowWarsaw = dataWarsaw.consolidated_weather[1];
        const tomorrowMontreal = dataMontreal.consolidated_weather[1];

        document.querySelector("#summary p").textContent = `Today weather in ${dataWarsaw.title} is around ${Math.abs(Math.round(todayWarsaw.the_temp - todayMontreal.the_temp))}°C better than in ${dataMontreal.title}. Tomorrow it will be better around ${Math.abs(Math.round(tomorrowWarsaw.the_temp - tomorrowMontreal.the_temp))}°C.`
    } catch (error) {

        console.log(error);

    }
};

getWeatherComparisonAW(Warsaw, Montreal);

// PLANE from https://codepen.io/simonswiss/pen/qdmPGr

var plane = $('.plane'),
    planeWidth = plane.width();
screenWidth = $(window).width();

flight = new TimelineMax({
    repeat: -1
});

flight
    .fromTo(plane, 4, {
        x: -planeWidth,
        rotation: 0
    }, {
        x: screenWidth,
        rotation: -10,
        ease: Power4.easeIn
    })
    .fromTo(plane, 1, {
        y: 5
    }, {
        y: -200,
        ease: Power4.easeIn
    }, 3)
    .fromTo(plane, 1, {
        x: -planeWidth
    }, {
        x: screenWidth,
        ease: Power0.easeNone
    })
    .to(plane, .5, {
        y: -280,
        rotation: 0,
        ease: Power1.easeOut
    }, 4)
    .to(plane, .5, {
        y: -200,
        rotation: 18,
        ease: Power1.easeIn
    }, 4.5)
    .addLabel('landing')
    .fromTo(plane, 5, {
        x: -planeWidth,
        rotation: 18
    }, {
        x: screenWidth + planeWidth,
        rotation: 0,
        ease: Power4.easeOut
    })
    .to(plane, 2, {
        y: 5,
        ease: Power4.easeOut
    }, 'landing');