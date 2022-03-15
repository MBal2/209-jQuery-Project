let carArray = [];
let selectedType = "";
let carYear = 0;

// define a constructor to create note objects
let carObject = function (pData, pType, pYear) {
    this.data = pData;
    this.type = pType;
    this.year = pYear;
}



document.addEventListener("DOMContentLoaded", function (event) {
    $.get("/getAllData", function (data, status) {
        carArray = data;

    });


    document.getElementById("buttonAdd").addEventListener("click", function () {
        let carNmae = document.getElementById("car").value;
        let myCarObj = new carObject(carNmae, selectedType, carYear);
        carArray.push(myCarObj);
        $.ajax({
            url: "/AddCar",
            type: "POST",
            data: JSON.stringify(myCarObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                console.log(result);
            }
        });
        console.log(carArray);
        document.getElementById("car").value = "";
        document.getElementById("year").value = "";
    });

    $(document).bind("change", "#select-type", function (event, ui) {
        selectedType = document.getElementById("select-type").value;
    });
    $(document).bind("change", "#year", function (event, ui) {
        carYear = document.getElementById("year").value;
    });

    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#list", function (event) {
        createList();
    });

    $(document).on("pagebeforeshow", "#sort", function (event) {
        showSortList();
    });
});



function createList() {
    // clear prior data
    var myul = document.getElementById("myList");
    myul.innerHTML = '';

    carArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        li.innerHTML = element.data + ":  " + element.type + "  (" + element.year + ")";
        myul.appendChild(li);
    });

};


function showSortList() {
    // clear prior data
    var myulDel = document.getElementById("myListSort");
    myulDel.innerHTML = '';

    carArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        li.innerHTML = element.data + ":  " + element.type + "  (" + element.year + ")";
        myulDel.appendChild(li);
    });
};

