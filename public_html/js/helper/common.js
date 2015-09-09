    /*
     *  test
     */


    var DaysEnum = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"

    ];

    function dayofweek(date, type) {

        return type ? DaysEnum[date].slice(0, 3) : DaysEnum[date];
//                return DaysEnum[date];

    }


    function degToCompass(num) {
        while (num < 0)
            num += 360;
        while (num >= 360)
            num -= 360;
        val = Math.round((num - 11.25) / 22.5);
        arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE",
            "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[ Math.abs(val) ];
    }

    function gDate2(date) {
        var now = new Date();
        var hours = (new Date(date * 1000)).getHours();
        var date = now.getDate();
        var month = now.getMonth();
        var d = new Date(2015, month, date, hours, 0, 0, 0);
        return d;
    }

    function gDate(date) {
        return new Date(date * 1000);
    }

    function gdt(date) {
        return date.toLocaleTimeString() + " " + date.toLocaleDateString();
    }
    function gt(date) {
        var t = gDate(date);
        return t.toLocaleTimeString();
    }
    function gd(date) {
        var t = gDate(date);
        return t.toLocaleDateString();
    }

    function KToC(K, U) {
        if (U === "C") {
            return K - 272.15;
        }
        else if (U === "F") {
            return (K * 1.8) - 459.67;
        }


    }
    function FtoC(TF) {
        return ((TF - 32) / (9 / 5));
    }

    function CtoF(TC) {
        return ((TC * 9 / 5) + 32);
    }