// Battleships 2
// Jest to gra w statki ze sztuczną inteligencją (AI).
// Zasady gry znajdują się bezpośrednio w grze.
// UWAGA! Kod jest zastrzeżony prawami autorskimi. W celu skorzystania z ów kodu
// należy skontaktować się z jego twórcą: Patryk Szewczyk | AHNS 1/INF | 2023
// Page box:
var page_Obj = {
    pageEL: document.querySelector('div.page'),
    setPageHeight: function () {
        var _this = this;
        ['load', 'resize'].forEach(function (ev) {
            window.addEventListener(ev, function () {
                var hgt = String(window.innerHeight);
                _this.pageEL.style.height = hgt + 'px';
            }, false);
        });
    }
};
page_Obj.setPageHeight();
// Plansze:
var boards_Obj = {
    boardELS: document.querySelectorAll('div.board-prp'),
    boardType: ['U', 'C'],
    // Pola planszy:
    setAreaELS: function () {
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 100; j++) {
                var areaEL = document.createElement('div');
                areaEL.setAttribute('class', 'area-box');
                areaEL.setAttribute('id', this.boardType[i] + String(j));
                this.boardELS[i].appendChild(areaEL);
            }
        }
        ;
        this.setBoardCorT();
    },
    // Współrzędne numberowe:
    setBoardCorT: function () {
        var boardCorT_AR = document.querySelectorAll('div.board-cor-T');
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 10; j++) {
                var boardChildEL = document.createElement('div');
                boardChildEL.setAttribute('class', 'bc-T-child');
                var boardChildTN = document.createTextNode(String(j));
                boardChildEL.appendChild(boardChildTN);
                boardCorT_AR[i].appendChild(boardChildEL);
            }
        }
        ;
        this.setBoardCorL();
    },
    // Współrzędne stringowe:
    setBoardCorL: function () {
        var boardCorC_AR = document.querySelectorAll('div.board-cor-L');
        var boardCorC_Ltr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 10; j++) {
                var boardChildEL = document.createElement('div');
                boardChildEL.setAttribute('class', 'bc-L-child');
                var boardChildTN = document.createTextNode(boardCorC_Ltr[j]);
                boardChildEL.appendChild(boardChildTN);
                boardCorC_AR[i].appendChild(boardChildEL);
            }
        }
        ;
    }
};
boards_Obj.setAreaELS();
// Niebezpieczne pola:
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
        // Wypełnainie tablicy pól w prawym kierunku:
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
        // Wypełnainie tablicy pól w dolnym kierunku:
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
        // Tworzenie tablicy kolona - dół:
        var new_B_Val_Array = [];
        for (var i = 1; i < this.dir_B.length; i++) {
            if (i <= 4) {
                new_B_Val_Array.push(this.dir_B[i - 1]);
            }
            else {
                break;
            }
        }
        ;
        // Tworzenie tablicy kolona - prawo:
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
        // Aktualizowanie tabliy klona - prawo:
        new_R_Val_Array[0] = this.dir_R[1].concat(this.dir_R[0]);
        new_R_Val_Array[1] = this.dir_R[2].concat(this.dir_R[0], this.dir_R[1]);
        new_R_Val_Array[2] = this.dir_R[3].concat(this.dir_R[0], this.dir_R[1], this.dir_R[2]);
        for (var i = 1; i < this.dir_R.length; i++) {
            this.dir_R[i] = new_R_Val_Array[i - 1];
        }
        ;
        for (var i = 0; i < this.dir_R.length; i++) {
            this.dir_R[i].sort(function (a, b) {
                return a - b;
            });
        }
        ;
        // Aktualizowanie tabliy klona - dół:
        new_B_Val_Array[0] = this.dir_B[1].concat(this.dir_B[0]);
        new_B_Val_Array[1] = this.dir_B[2].concat(this.dir_B[0], this.dir_B[1]);
        new_B_Val_Array[2] = this.dir_B[3].concat(this.dir_B[0], this.dir_B[1], this.dir_B[2]);
        for (var i = 1; i < this.dir_B.length; i++) {
            this.dir_B[i] = new_B_Val_Array[i - 1];
        }
        ;
        for (var i = 0; i < this.dir_B.length; i++) {
            this.dir_B[i].sort(function (a, b) {
                return a - b;
            });
        }
        ;
        console.log(this.dir_R);
        console.log(this.dir_B);
    }
};
dangerousFields_Obj.setToBtmAR();
var fieldsPosition_Obj = {
    fieldsPosARS: [],
    getFieldsPos: function () {
        // Pobranie dzieci "pól" z planszy użytkownaika":
        var board = document.querySelectorAll('div.board-prp')[0];
        var onceBoardChilred = board.children;
        var boardsWithELS = [];
        for (var i = 1; i < board.childElementCount; i++) {
            boardsWithELS[i - 1] = onceBoardChilred[i];
        }
        ;
        //console.log(boardsWithELS);
        // - - - - - - - - - - - - - - - - - - - - - - -
        // Pobranie dzieci "pól" poszczególnych planszy
        /*const boards: NodeListOf<HTMLDivElement> = document.querySelectorAll('div.board-prp');
        const onceBoardChilred: any[] = [];
        const boardsWithELS: any[][] = [[]];
        for (let i: number = 0; i < 2; i++) {
            onceBoardChilred[i] = boards[i].children;
            boardsWithELS[i] = [];
            for (let j: number = 0; j < 100; j++) {
                boardsWithELS[i][j] = onceBoardChilred[i][j];
            };
        };
        boardsWithELS[0].shift();
        console.log(boardsWithELS);*/
        // - - - - - - - - - - - - - - - - - - - - - - -
        // Pobranie współrzędnych poszczególnych dzieci "pól" poszczególnych plansz:
        var areasCorAR = [[]];
        for (var i = 0; i < boardsWithELS.length; i++) {
            var rectOBJ = boardsWithELS[i].getBoundingClientRect();
            areasCorAR[i] = [];
            areasCorAR[i][0] = rectOBJ.top;
            areasCorAR[i][1] = rectOBJ.bottom;
            areasCorAR[i][2] = rectOBJ.left;
            areasCorAR[i][3] = rectOBJ.right;
            this.fieldsPosARS[i] = areasCorAR[i];
        }
        ;
        console.log(areasCorAR);
        console.log(this.fieldsPosARS);
    }
};
fieldsPosition_Obj.getFieldsPos();
// Użytkownik - akcje:
var userChooseShipCor = {
    userShipsAR: [],
    onceShipArgs: [3, 'B'],
    submitBut: document.querySelector('div.im-submit'),
    /*shipLgt: document.querySelector('input.inpLgt'),
    shipDir: document.querySelector('input.inpDir'),*/
    //shipStartCor: document.querySelector('input.inpCor'),
    createLimit: 0,
    pointSwt: 'top',
    placeShipSwitch: true,
    mouseXcor: 0,
    mouseYcor: 0,
    shpPlcPtBCR: [],
    availableFields: [],
    addUserShip_AEL: function (arg_1) {
        var _this = this;
        ['click', 'touchend'].forEach(function (ev) {
            _this.submitBut.addEventListener(ev, function () {
                if (_this.createLimit < 7) {
                    _this.createLimit += 1;
                    var num = _this.createLimit;
                    var lgt = _this.shipLgt.value; //this.shipLgt.value
                    var dir = _this.shipDir.value; //this.shipDir.value
                    var cor = arg_1; //this.shipStartCor.value
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
    },
    selectShip_AEL: function () {
        var _this = this;
        var selectEL = document.querySelector('select.im-select-ship');
        selectEL.addEventListener('change', function (e) {
            var el = e.currentTarget;
            var lgt = el.value;
            _this.onceShipArgs[0] = lgt;
            var shipPlaceEL = document.getElementById('im-ship-place-element');
            var shipGlobalEL = document.getElementById('im-ship-global-element');
            shipPlaceEL.removeAttribute('class');
            shipGlobalEL.removeAttribute('class');
            shipPlaceEL.setAttribute('class', 'im-ship-S' + lgt);
            shipGlobalEL.setAttribute('class', 'im-ship-S' + lgt);
            console.log(shipPlaceEL);
            //console.log(this.onceShipArgs);
            _this.createAvailableFields();
        }, false);
        this.rotateShip_AEL();
    },
    rotateShip_AEL: function () {
        var _this = this;
        var rotateLocalEL = document.querySelector('div.im-rotate-ship');
        var rotateGlobalEL = document.getElementById('im-ship-global-element');
        var shipHanger = document.querySelector('div.im-ship-place');
        var deg = 0;
        var dirSwitch = 0;
        var dir = 'B';
        //let pointSwt: string = 'top';
        ['click', 'touchend'].forEach(function (ev) {
            rotateLocalEL.addEventListener(ev, function () {
                // Słicz kierunkowy:
                deg += 90;
                rotateLocalEL.style.transform = 'rotate(' + deg + 'deg)';
                rotateLocalEL.style.transitionDuration = '0.5s';
                rotateGlobalEL.style.transform = 'rotate(' + deg + 'deg)';
                rotateGlobalEL.style.transitionDuration = '0.5s';
                shipHanger.style.transform = 'rotate(' + deg + 'deg)';
                shipHanger.style.transitionDuration = '0.5s';
                if (dirSwitch === 0) {
                    dirSwitch += 1;
                    dir = 'R';
                }
                else if (dirSwitch === 1) {
                    dirSwitch -= 1;
                    dir = 'B';
                }
                _this.onceShipArgs[1] = dir;
                _this.createAvailableFields();
                console.log(_this.onceShipArgs);
                // Ustawianie punktora:
                var point = document.getElementById('im-ship-place-point');
                if (_this.pointSwt === 'top') {
                    _this.pointSwt = 'right';
                    point.style.bottom = '0px';
                    point.style.top = 'auto';
                }
                else if (_this.pointSwt === 'right') {
                    _this.pointSwt = 'bottom';
                    point.style.bottom = '0px';
                    point.style.top = 'auto';
                }
                else if (_this.pointSwt === 'bottom') {
                    _this.pointSwt = 'left';
                    point.style.bottom = '0px !important';
                    point.style.top = '0px';
                }
                else if (_this.pointSwt === 'left') {
                    _this.pointSwt = 'top';
                    point.style.bottom = '0px !important';
                    point.style.top = '0px';
                }
            }, false);
        });
        this.moveShip_AEL();
    },
    createAvailableFields: function () {
        // Dostępne pola:
        var avlFldIdx = this.onceShipArgs[0] - 2;
        var selectedTable_dir_B = dangerousFields_Obj.dir_B[avlFldIdx];
        var selectedTable_dir_R = dangerousFields_Obj.dir_R[avlFldIdx];
        var newArr = [];
        // Tworzenie nowej tablicy:
        for (var i = 0; i < 100; i++) {
            newArr[i] = i;
        }
        ;
        // Czy wartość inputa "select" nie jest równa: "nie wybrano":
        if (this.onceShipArgs[0] !== 'nie wybrano') {
            // Kasowanie niedozwolonych indeksów w nowo-utworzonej tablicy, w zależności
            // od długości statku i jego położenia:
            if (this.onceShipArgs[1] === 'B') {
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
            else if (this.onceShipArgs[1] === 'R') {
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
        }
        else { }
        this.availableFields = newArr;
        console.log(this.availableFields); /*ARRAY_FIELDS CONSOLLOG*/
    },
    moveShip_AEL: function () {
        var _this = this;
        var place = document.querySelector('div.im-ship-place');
        ['click', 'touchend'].forEach(function (ev) {
            place.addEventListener(ev, function () {
                if (_this.placeShipSwitch === true) {
                    _this.placeShipSwitch = false;
                    var shipLocalEL = document.getElementById('im-ship-place-element');
                    shipLocalEL.style.display = 'none';
                    var shipGlobalEL = document.getElementById('im-ship-global-element');
                    shipGlobalEL.style.display = 'flex'; // MEGA WAŻNE!
                    var shipELDim = shipGlobalEL.getBoundingClientRect();
                    var shipELDim_wdt = shipELDim.width;
                    var shipELDim_hgt = shipELDim.height;
                    //document.getElementById('clientShow').textContent = this.mouseXcor + ' | ' + this.mouseYcor;
                    if (_this.pointSwt === 'top' || _this.pointSwt === 'bottom') {
                        _this.mouseXcor = _this.mouseXcor - (shipELDim_wdt / 2);
                        _this.mouseYcor = _this.mouseYcor - (shipELDim_hgt / 2);
                    }
                    else if (_this.pointSwt === 'right' || _this.pointSwt === 'left') {
                        _this.mouseXcor = _this.mouseXcor - (shipELDim_hgt / 2);
                        _this.mouseYcor = _this.mouseYcor - (shipELDim_wdt / 2);
                    }
                    shipGlobalEL.style.left = _this.mouseXcor + 'px';
                    shipGlobalEL.style.top = _this.mouseYcor + 'px';
                    shipGlobalEL.style.transitionDuration = '0.0s';
                }
                else { }
            }, false);
        });
    },
    mousemove_AEL: function () {
        var _this = this;
        window.document.addEventListener('mousemove', function (e) {
            console.log(_this.placeShipSwitch);
            // Pseudo-ruszanie statkiem:
            _this.mouseXcor = e.clientX;
            _this.mouseYcor = e.clientY;
            var shipEL = document.getElementById('im-ship-global-element');
            var shipELDim = shipEL.getBoundingClientRect();
            var shipELDim_wdt = shipELDim.width;
            var shipELDim_hgt = shipELDim.height;
            //document.getElementById('clientShow').textContent = this.mouseXcor + ' | ' + this.mouseYcor;
            if (_this.pointSwt === 'top' || _this.pointSwt === 'bottom') {
                _this.mouseXcor = _this.mouseXcor - (shipELDim_wdt / 2);
                _this.mouseYcor = _this.mouseYcor - (shipELDim_hgt / 2);
            }
            else if (_this.pointSwt === 'right' || _this.pointSwt === 'left') {
                _this.mouseXcor = _this.mouseXcor - (shipELDim_hgt / 2);
                _this.mouseYcor = _this.mouseYcor - (shipELDim_wdt / 2);
            }
            shipEL.style.left = _this.mouseXcor + 'px';
            shipEL.style.top = _this.mouseYcor + 'px';
            shipEL.style.transitionDuration = '0.0s';
            // Współżędne punktu początkowego położenia statku:
            var shipPlacePoint = document.getElementById('im-ship-place-point');
            _this.shpPlcPtBCR = shipPlacePoint.getBoundingClientRect();
            var shpPlcPt_X = _this.shpPlcPtBCR.x;
            var shpPlcPt_y = _this.shpPlcPtBCR.y;
            document.getElementById('clientShow').innerHTML = ' - Pointer: x: ' + shpPlcPt_X + ' | y: ' + shpPlcPt_y;
        }, false);
    },
    setShip_AEL: function () {
        var _this = this;
        ['click', 'touchstart'].forEach(function (ev) {
            window.addEventListener(ev, function () {
                var userBoardEL = document.querySelectorAll('div.board-prp')[0];
                var userBoardEL_RECT = userBoardEL.getBoundingClientRect();
                var usrBrd_Top = userBoardEL_RECT.top;
                var usrBrd_Bottom = userBoardEL_RECT.bottom;
                var usrBrd_Left = userBoardEL_RECT.left;
                var usrBrd_Right = userBoardEL_RECT.right;
                var plcPnt_X = _this.shpPlcPtBCR.x;
                var plcPnt_Y = _this.shpPlcPtBCR.y;
                //console.log(`usr_Top: ${usrBrd_Top} | usr_Bottom: ${usrBrd_Bottom} | usr_Left: ${usrBrd_Left} | usr_Right ${usrBrd_Right} | plc_X ${plcPnt_X} | plc_Y: ${plcPnt_Y}`);
                if ((plcPnt_X > usrBrd_Left && plcPnt_X < usrBrd_Right) && (plcPnt_Y > usrBrd_Top && plcPnt_Y < usrBrd_Bottom)) {
                    alert('Statek znajduje się na planszy!');
                }
                else if (((plcPnt_X < usrBrd_Left || plcPnt_X > usrBrd_Right) || (plcPnt_Y < usrBrd_Top || plcPnt_Y > usrBrd_Bottom)) && _this.placeShipSwitch === false) {
                    alert('Statek jest poza planszą!');
                }
            }, false);
        });
    }
};
userChooseShipCor.addUserShip_AEL();
userChooseShipCor.selectShip_AEL();
userChooseShipCor.mousemove_AEL();
userChooseShipCor.setShip_AEL();
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
var switch_Obj = {
    isStart: 'no',
    but: document.querySelector('div.click'),
    startGame: function () {
        var _this = this;
        ['click', 'touchend'].forEach(function (ev) {
            _this.but.addEventListener(ev, function () {
                _this.moveBoard();
            }, false);
        });
    },
    moveBoard: function () {
        var _this = this;
        var cntMenu = document.querySelector('div.inside-menu');
        var us = document.getElementById('bb-1');
        var com = document.getElementById('bb-2');
        if (this.isStart === 'no') {
            this.isStart = 'pause';
            cntMenu.style.bottom = '-500px';
            cntMenu.style.opacity = '0.0';
            cntMenu.style.transitionDuration = '0.5s';
            setTimeout(function () {
                us.style.right = '0px';
                us.style.transitionDuration = '0.5s';
                setTimeout(function () {
                    com.style.right = '0px';
                    com.style.opacity = '1.0';
                    com.style.transitionDuration = '0.5s';
                    setTimeout(function () {
                        _this.isStart = 'yes';
                    }, 600);
                }, 500);
            }, 500);
        }
        else if (this.isStart === 'yes') {
            this.isStart = 'pause';
            com.style.right = '-500px';
            com.style.opacity = '0.0';
            com.style.transitionDuration = '0.5s';
            setTimeout(function () {
                us.style.right = '-500px';
                us.style.transitionDuration = '0.5s';
                setTimeout(function () {
                    cntMenu.style.bottom = '0px';
                    cntMenu.style.opacity = '1.0';
                    cntMenu.style.transitionDuration = '0.5s';
                    setTimeout(function () {
                        _this.isStart = 'no';
                    }, 600);
                }, 500);
            }, 500);
        }
    }
};
switch_Obj.startGame();
