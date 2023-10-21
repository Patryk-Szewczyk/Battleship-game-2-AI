// Battleships 2
// Jest to gra w statki ze sztuczną inteligencją (AI).
// Zasady gry znajdują się bezpośrednio w grze.
// UWAGA! Kod jest zastrzeżony prawami autorskimi. W celu skorzystania z ów kodu
// należy skontaktować się z jego twórcą: Patryk Szewczyk | AHNS 1/INF | 2023
// Dangerous fields:
var dangerousFields_Obj = {
    dir_B: [[], [], [], []],
    dir_R: [[], [], [], []],
    setToBtmAR: function () {
        var startToIncValue = 89;
        for (var i = 0; i < 4; i++) {
            var ship_Value = 0;
            ship_Value = startToIncValue;
            for (var j = 0; j < 10; j++) {
                this.dir_B[i][j] = ship_Value += 1;
            }
            ;
            startToIncValue -= 10;
        }
        ;
        dangerousFields_Obj.setToRgtAR();
    },
    setToRgtAR: function () {
        var decrement = -1;
        // Create values:
        for (var i = 0; i < 4; i++) {
            var ship_Value = 0;
            ship_Value = decrement;
            for (var j = 0; j < 10; j++) {
                this.dir_R[i][j] = ship_Value += 10;
            }
            ;
            decrement -= 1;
        }
        ;
        // Create new Array:
        var new_R_Val_Array = [];
        for (var i = 1; i < this.dir_R.length; i++) {
            if (i <= 4) {
                new_R_Val_Array.push(this.dir_R[i - 1]);
            }
            else {
                break;
            }
        }
        ;
        dangerousFields_Obj.updateARS();
    },
    updateARS: function () {
        console.log(this.dir_B);
        console.log(this.dir_R);
    }
};
dangerousFields_Obj.setToBtmAR();
var userChooseShipCor = {
    userShipsAR: [],
    submitBut: document.querySelector('input.inpSub'),
    shipLgt: document.querySelector('input.inpLgt'),
    shipDir: document.querySelector('input.inpDir'),
    shipStartCor: document.querySelector('input.inpCor'),
    createLimit: 0,
    addUserShip: function () {
        var _this = this;
        var el = ['click', 'touchend'].forEach(function (ev) {
            _this.submitBut.addEventListener(ev, function () {
                if (_this.createLimit < 7) {
                    _this.createLimit += 1;
                    var num = _this.createLimit;
                    var lgt = _this.shipLgt.value;
                    var dir = _this.shipDir.value;
                    var cor = _this.shipStartCor.value;
                    var ship = new UserShipCor(num, lgt, dir, cor);
                    _this.userShipsAR.push(ship);
                    console.log(_this.createLimit);
                }
                else { }
                if (_this.createLimit === 7) {
                    console.log(_this.userShipsAR);
                }
                else { }
            }, false);
        });
    }
};
userChooseShipCor.addUserShip();
;
var UserShipCor = /** @class */ (function () {
    function UserShipCor(arg_1, arg_2, arg_3, arg_4) {
        this.shipNum = arg_1;
        this.shipLgt = arg_2;
        this.ship_Dir = arg_3;
        this.shipStartCor = arg_4;
    }
    ;
    return UserShipCor;
}());
;
