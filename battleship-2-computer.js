;
var CompShipCor = /** @class */ (function () {
    function CompShipCor(arg_1, arg_2, arg_3, arg_4, arg_5) {
        this.number = arg_1;
        this.length = arg_2;
        this.direction = arg_3;
        this.coordinates = arg_4;
        this.hits = arg_5;
        this.isSunken = false;
    }
    ;
    return CompShipCor;
}());
;
// Komputer - akcje:
var computerRandShip = {
    compShips_AR: [],
    fullAreasBoard_AR: [],
    onceShipArgs: [3, 'B'],
    createLimit: 0,
    direction_AR: ['B', 'R'],
    shipLength_AR: [2, 2, 2, 3, 3, 4, 5],
    fillFullAreasBoard_AR_Func: function () {
        for (var i = 0; i < 100; i++) {
            this.fullAreasBoard_AR[i] = i;
        }
        ;
    },
    addCompShip_Func: function () {
        while (this.createLimit < this.shipLength_AR.length) {
            this.createLimit += 1;
            // Argumanty z buta wjeżdżające:
            var num = this.createLimit;
            var lgt = this.shipLength_AR[this.createLimit - 1];
            var dir = this.direction_AR[Math.floor(Math.random() * 2)];
            var avlFld = this.createAvailableFields_Func(lgt, dir);
            //console.log(availableFields.length);
            // Częśc argumentów sepecjalnie do buildCheckera:
            var firstCoor = 0; // Random ustalane jest w builderCheckerze z powodu tego, iż współrzędne mogą się powtarzać i potrzeba ponownego wylosowania współrzędnej początkowej
            var fullIdxBrd = this.fullAreasBoard_AR;
            var infRcp = document.querySelector('div.none');
            var isComp = true;
            // Jeżeli wartością współrzędnych danego statku będzie "undefined" - powtórz losowanie:
            var cor = shipColisions.checkShipColisions(firstCoor, lgt, dir, avlFld, fullIdxBrd, infRcp, isComp);
            while (cor == undefined) {
                cor = shipColisions.checkShipColisions(firstCoor, lgt, dir, avlFld, fullIdxBrd, infRcp, isComp);
            }
            ;
            // Tworzenie tablicy trafień dla statku:
            var hits = [];
            for (var i = 0; i < cor.length; i++) {
                hits[i] = false;
            }
            ;
            // Tworzenie obiektu statku:
            var ship = new CompShipCor(num, lgt, dir, cor, hits);
            this.compShips_AR.push(ship);
            // Tworzenie statku na planszy: (niewidzialnego)
            var computerField = document.querySelectorAll('div.board-prp')[1];
            var compFieldChildren = computerField.children;
            //console.log(compFieldChildren[cor[0]].children[0]);
            compFieldChildren[ship.coordinates[0]].children[0].removeAttribute('class');
            compFieldChildren[ship.coordinates[0]].children[0].setAttribute('class', 'areaContentType act-ship-Dir' + dir + '-S' + String(lgt) + ' COMP_gphSphHid');
        }
        ;
        console.log(this.compShips_AR);
    },
    createAvailableFields_Func: function (shipLength, shipDirection) {
        // Dostępne pola:
        var avlFldIdx = shipLength - 2;
        var selectedTable_dir_B = dangerousFields_Obj.dir_B[avlFldIdx];
        var selectedTable_dir_R = dangerousFields_Obj.dir_R[avlFldIdx];
        var newArr = [];
        // Tworzenie nowej tablicy:
        for (var i = 0; i < 100; i++) {
            newArr[i] = i;
        }
        ;
        // Czy wartość inputa "select" nie jest równa: "nie wybrano":
        // Kasowanie niedozwolonych indeksów w nowo-utworzonej tablicy, w zależności
        // od długości statku i jego położenia:
        if (shipDirection === 'B') {
            for (var i = 0; i < 100; i++) {
                for (var j = 0; j < selectedTable_dir_B.length; j++) {
                    if (newArr[i] == selectedTable_dir_B[j]) {
                        var elLoc = newArr.indexOf(selectedTable_dir_B[j]);
                        newArr.splice(elLoc, 1);
                    }
                    else { }
                }
                ;
            }
            ;
        }
        else if (shipDirection === 'R') {
            for (var i = 0; i < 100; i++) {
                for (var j = 0; j < selectedTable_dir_R.length; j++) {
                    if (newArr[i] == selectedTable_dir_R[j]) {
                        var elLoc = newArr.indexOf(selectedTable_dir_R[j]);
                        newArr.splice(elLoc, 1);
                    }
                    else { }
                }
                ;
            }
            ;
        }
        return newArr;
        //console.log(this.availableFields);    /*ARRAY_FIELDS CONSOLLOG*/
    },
};
computerRandShip.fillFullAreasBoard_AR_Func();
computerRandShip.addCompShip_Func();
