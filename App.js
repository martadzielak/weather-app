var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Place = /** @class */ (function () {
    function Place(woeid, name) {
        this.woeid = woeid,
            this.name = name,
            this.DOMTitle = "." + this.name.toLowerCase() + " h2",
            this.DOMDescription = "." + this.name.toLowerCase() + " p";
        this.img = "." + this.name.toLowerCase() + " img";
    }
    return Place;
}());
;
// ------------------------------------------------------
var WeatherStation = /** @class */ (function () {
    function WeatherStation() {
        this.observers = [];
    }
    WeatherStation.prototype.registerObserver = function (o) {
        this.observers.push(o);
    };
    WeatherStation.prototype.removeObserver = function (o) {
        var index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    };
    WeatherStation.prototype.notifyObservers = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this.temperature);
        }
    };
    WeatherStation.prototype.setTemperature = function (temp) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, temp];
                    case 1:
                        _a.sent();
                        temp.then(function (res) { _this.temperature = res; _this.notifyObservers(); });
                        return [2 /*return*/];
                }
            });
        });
    };
    return WeatherStation;
}());
// ------------------------------------------------------
var TemperatureDisplay = /** @class */ (function () {
    function TemperatureDisplay(weatherStation) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }
    TemperatureDisplay.prototype.findImgSrc = function (temperature, abbrNumber) {
        var getAbbr = function () {
            if (abbrNumber === 1) {
                return temperature.weatherAbbr.abbr1;
            }
            else if (abbrNumber === 2) {
                return temperature.weatherAbbr.abbr2;
            }
        };
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
    };
    TemperatureDisplay.prototype.update = function (temperature) {
        return __awaiter(this, void 0, void 0, function () {
            var DOMTitle1, DOMTitle2, DOMDescription1, DOMDescription2, DOMImg1, DOMImg2, DOMSummary;
            return __generator(this, function (_a) {
                DOMTitle1 = document.querySelector(temperature.place1.DOMTitle);
                DOMTitle2 = document.querySelector(temperature.place2.DOMTitle);
                DOMDescription1 = document.querySelector(temperature.place1.DOMDescription);
                DOMDescription2 = document.querySelector(temperature.place2.DOMDescription);
                DOMImg1 = document.querySelector(temperature.place1.img);
                DOMImg2 = document.querySelector(temperature.place2.img);
                DOMSummary = document.querySelector("#summary + p");
                if (DOMTitle1 && DOMTitle2 && DOMDescription1 && DOMDescription2 && DOMSummary && DOMImg1 && DOMImg2) {
                    DOMTitle1.textContent = temperature.place1.name;
                    DOMTitle2.textContent = temperature.place2.name;
                    DOMDescription1.textContent = "Temperatures in " + temperature.place1.name + " stay around " + temperature.temp.temp1 + "\u00B0C. You can expect " + temperature.tempState.state1 + ".";
                    DOMDescription2.textContent = "Temperatures in " + temperature.place2.name + " stay around " + temperature.temp.temp2 + "\u00B0C. You can expect " + temperature.tempState.state2 + ".";
                    DOMImg1.src = this.findImgSrc(temperature, 1);
                    DOMImg2.src = this.findImgSrc(temperature, 2);
                    DOMSummary.textContent = "Today weather in " + temperature.place1.name + " is around " + temperature.tempAbsolute + "\u00B0C better than in " + temperature.place2.name + ".";
                }
                return [2 /*return*/];
            });
        });
    };
    return TemperatureDisplay;
}());
function getWeatherAW(place1, place2) {
    return __awaiter(this, void 0, void 0, function () {
        var resultPlace1, dataPlace1, resultPlace2, dataPlace2, temp, tempState, tempAbsolute, weatherAbbr, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch("https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/" + place1.woeid + "/")];
                case 1:
                    resultPlace1 = _a.sent();
                    return [4 /*yield*/, resultPlace1.json()];
                case 2:
                    dataPlace1 = (_a.sent()).consolidated_weather[0];
                    return [4 /*yield*/, fetch("https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/" + place2.woeid + "/")];
                case 3:
                    resultPlace2 = _a.sent();
                    return [4 /*yield*/, resultPlace2.json()];
                case 4:
                    dataPlace2 = (_a.sent()).consolidated_weather[0];
                    temp = { temp1: dataPlace1.the_temp, temp2: dataPlace2.the_temp };
                    tempState = { state1: dataPlace1.weather_state_name.toLowerCase(), state2: dataPlace1.weather_state_name.toLowerCase() };
                    tempAbsolute = Math.abs(Math.round(temp.temp1 - temp.temp2));
                    weatherAbbr = { abbr1: dataPlace1.weather_state_abbr, abbr2: dataPlace2.weather_state_abbr };
                    return [2 /*return*/, {
                            place1: place1,
                            place2: place2,
                            temp: temp,
                            tempAbsolute: tempAbsolute,
                            tempState: tempState,
                            weatherAbbr: weatherAbbr
                        }];
                case 5:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 6];
                case 6:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
var weatherStation = new WeatherStation();
var tempDisplay = new TemperatureDisplay(weatherStation);
var Warsaw = new Place(523920, "Warsaw");
var Montreal = new Place(3534, "Montreal");
weatherStation.setTemperature(getWeatherAW(Warsaw, Montreal));
