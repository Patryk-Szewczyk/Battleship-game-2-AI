// Użytkownik - akcje:
var userChooseShipCor = {
    maxShipAmount: 7,
    fullAreasBoardAR: [],
    userShipsAR: [],
    onceShipArgs: [3, 'B'],
    submitBut: document.querySelector('div.im-submit'),
    createLimit: 0,
    pointSwt: 'top',
    placeShipSwitch: true,
    mouseXcor: 0,
    mouseYcor: 0,
    shpPlcPtBCR: [],
    availableFields: [],
    isDisabled: false,
    currentOptionID: 0,
    fillFullAreasBoardAR: function () {
        for (var i = 0; i < 100; i++) {
            this.fullAreasBoardAR[i] = i;
        }
    },
    addUserShip_AEL: function () {
        if (this.createLimit < this.maxShipAmount) {
            this.createLimit += 1;
            // Pobieranie argumentów w celu przekazania ich do klasy:
            var num = this.createLimit;
            var lgt = this.onceShipArgs[0];
            var dir = this.onceShipArgs[1];
            var cor = this.onceShipArgs[2];
            var hits = [];
            // Tworzenie tablicy trafień dla statku:
            var shipHitsAR = [];
            for (var i = 0; i < cor.length; i++) {
                shipHitsAR[i] = false;
            }
            ;
            // Przypisanie tablicy trafień dla stadku do tablicy globalnej obiektu:
            this.onceShipArgs[3] = shipHitsAR;
            // Transportowanie argumantów do fabryki statków:
            var ship = new UserShipCor(num, lgt, dir, cor, hits);
            this.userShipsAR.push(ship);
            // Utwórz graficznie statek na planszy:
            var userAreaAR = document.querySelectorAll('div.areaContentType');
            userAreaAR[this.onceShipArgs[2][0]].removeAttribute('class');
            userAreaAR[this.onceShipArgs[2][0]].setAttribute('class', 'areaContentType act-ship-Dir' + dir + '-S' + lgt);
            // Kasowanie aktualnego "option" w "select":
            this.delCurSelectOption();
            // Pokazanie przycisku resetującego ustawianie statków:
            var butReset = document.querySelector('div.im-reset');
            butReset.style.display = 'flex';
        }
        else { }
        if (this.createLimit === this.maxShipAmount) {
            this.isDisabled = true; // WAŻNE: Wyłącz AEL ustawiania statku
            var startBut = document.querySelector('div.button-start-game');
            var info = document.getElementById('clientShow');
            startBut.style.display = 'flex';
            console.log(this.userShipsAR);
            info.textContent = 'Wszystkie statki zostały umieszczone! \r\n';
            info.textContent += 'Możesz rozpocząć grę! \r\n';
        }
        else { }
    },
    selectShip_AEL: function () {
        var _this = this;
        var selectEL = document.querySelector('select.im-select-ship');
        selectEL.addEventListener('change', function (e) {
            var el = e.currentTarget;
            var val = el.value;
            // Pobranie pseudoID wybranego elementu "option":
            var id = Number(val.slice(1, 2));
            _this.currentOptionID = id;
            // Pobranie długości statku:
            var lgt = Number(val.slice(4, 5));
            _this.onceShipArgs[0] = lgt;
            // Graficzne wybranie statku:
            var shipPlaceEL = document.getElementById('im-ship-place-element');
            var shipGlobalEL = document.getElementById('im-ship-global-element');
            shipPlaceEL.removeAttribute('class');
            shipGlobalEL.removeAttribute('class');
            shipPlaceEL.setAttribute('class', 'im-ship-S' + lgt);
            shipGlobalEL.setAttribute('class', 'im-ship-S' + lgt);
            //console.log(shipPlaceEL);
            //console.log(this.onceShipArgs);
            _this.createAvailableFields();
        }, false);
        this.rotateShip_AEL();
    },
    delCurSelectOption: function () {
        // Usuwanie elementu na liście "select":
        var currentOption = this.currentOptionID; // - 1 (- bo rozpoczynamy od 1, a nie od 0, bo iterujemy od 0 kolekcję elementów)
        var selectChildren = document.querySelectorAll('option.opt');
        var selectEL = document.querySelector('select.im-select-ship');
        var currSelChildID_AR = [];
        for (var i = 0; i < selectChildren.length; i++) {
            var val = selectEL.options[i].value;
            var id = Number(val.slice(1, 2));
            currSelChildID_AR[i] = id;
        }
        ;
        for (var i = 0; i < selectChildren.length; i++) {
            if (currentOption == currSelChildID_AR[i]) {
                selectChildren[i].remove();
            }
            else { }
        }
        ;
        //alert(currentOption);
        // Ustawienie wskaźnika "select" na pierwszy "option":
        selectEL.options[0].setAttribute('selected', 'selected');
        // Zmiana pozycji i widoczności elementu "pseudo statku" (do ustawienia):
        if (this.placeShipSwitch === false) {
            this.placeShipSwitch = true;
            var shipLocalEL = document.getElementById('im-ship-place-element');
            shipLocalEL.style.display = 'flex';
            var shipGlobalEL = document.getElementById('im-ship-global-element');
            shipGlobalEL.style.display = 'none'; // MEGA WAŻNE!
            shipGlobalEL.style.left = 0 + 'px';
            shipGlobalEL.style.top = 0 + 'px';
            shipGlobalEL.style.transitionDuration = '0.0s';
            // Graficzne kasowanie statku:
            shipLocalEL.removeAttribute('class');
            shipGlobalEL.removeAttribute('class');
        }
        else { }
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
                //console.log(this.availableFields);
                //console.log(this.onceShipArgs);
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
    resetShipSetting: function () {
        var _this = this;
        var butReset = document.querySelector('div.im-reset');
        ['click', 'touchend'].forEach(function (ev) {
            butReset.addEventListener(ev, function () {
                // Kasowanie i none-display'owanie tego co trzeba:
                butReset.style.display = 'none';
                var butStart = document.querySelector('div.button-start-game');
                butStart.style.display = 'none';
                for (var i = 0; i < _this.onceShipArgs.length; i++) {
                    _this.onceShipArgs.pop();
                }
                ;
                for (var i = 0; i < _this.maxShipAmount; i++) {
                    _this.userShipsAR.pop();
                }
                ;
                var selectChildren = document.querySelectorAll('option.opt');
                var selectEL = document.querySelector('select.im-select-ship');
                for (var i = 0; i < selectChildren.length; i++) { // UWAGA! MEGA WAŻNE! Zawsze używaj w tej sytuacji ".length" kolekcji elemnetów "NodeListOf<HTMLOptionElement>"
                    selectChildren[i].remove();
                }
                ;
                // Graficzne kasowanie statku na panelu ustawiania:
                var shipLocalEL = document.getElementById('im-ship-place-element');
                shipLocalEL.removeAttribute('class');
                // Kasowanie komunikatu na plaelu stawiania:
                var setShipInfo = document.getElementById('clientShow');
                setShipInfo.textContent = '';
                // Graficzne kasowanie statków na planszy:
                var userAreaAR = document.querySelectorAll('div.areaContentType');
                for (var i = 0; i < userAreaAR.length; i++) {
                    userAreaAR[i].removeAttribute('class');
                    userAreaAR[i].setAttribute('class', 'areaContentType');
                }
                ;
                // Ponowne zapełnianie tablicę ruchomą na współrzędne statków gracza: (kasować indeksów nie musisz, gdyż do ich uprzedniego tworzenia nie użyłeś metody "push()")
                for (var i = 0; i < 100; i++) {
                    _this.fullAreasBoardAR[i] = i;
                }
                ;
                // Wyłączenie blokady ustawiania statków i wyzerowania liczby utworzonych statków:
                _this.isDisabled = false;
                _this.createLimit = 0;
                // Ponowne tworzenie wszystkich "option":
                var selectVALS = [
                    'O0_L0',
                    'O1_L2',
                    'O2_L2',
                    'O3_L2',
                    'O4_L3',
                    'O5_L3',
                    'O6_L4',
                    'O7_L5',
                ];
                var optionsTitle = [
                    'nie wybrano',
                    'łódź podwodna',
                    'łódź podwodna',
                    'łódź podwodna',
                    'niszczyciel',
                    'niszczyciel',
                    'pancernik',
                    'lotniskowiec',
                ];
                for (var i = 0; i < _this.maxShipAmount + 1; i++) { // (+ 1), bo to jest liczba statków, a nie wszystkich elementów "option" do utworzenia
                    var optEL = document.createElement('option');
                    optEL.setAttribute('class', 'opt');
                    optEL.setAttribute('value', selectVALS[i]);
                    var optTN = document.createTextNode(optionsTitle[i]);
                    optEL.appendChild(optTN);
                    selectEL.appendChild(optEL);
                }
                ;
                selectEL.options[0].setAttribute('selected', 'selected');
            }, false);
        });
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
        //console.log(this.availableFields);    /*ARRAY_FIELDS CONSOLLOG*/
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
            //console.log(this.placeShipSwitch);     //   P L A C E   S W I T C H   !
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
            //document.getElementById('clientShow').innerHTML = 'Pointer: x: ' + shpPlcPt_X + ' | y: ' + shpPlcPt_y;
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
                var setShipInfo = document.getElementById('clientShow');
                //this.onceShipArgs[2] = [];
                //console.log(`usr_Top: ${usrBrd_Top} | usr_Bottom: ${usrBrd_Bottom} | usr_Left: ${usrBrd_Left} | usr_Right ${usrBrd_Right} | plc_X ${plcPnt_X} | plc_Y: ${plcPnt_Y}`);
                if (_this.isDisabled === false) {
                    if ((plcPnt_X > usrBrd_Left && plcPnt_X < usrBrd_Right) && (plcPnt_Y > usrBrd_Top && plcPnt_Y < usrBrd_Bottom)) {
                        //setShipInfo.textContent = 'You can place ship here!';
                        for (var i = 0; i < fieldsPosition_Obj.fieldsPosARS.length; i++) {
                            if ((plcPnt_X > fieldsPosition_Obj.fieldsPosARS[i][2] && plcPnt_X < fieldsPosition_Obj.fieldsPosARS[i][3]) && (plcPnt_Y > fieldsPosition_Obj.fieldsPosARS[i][0] && plcPnt_Y < fieldsPosition_Obj.fieldsPosARS[i][1])) {
                                // Deklarowanie argumentów o tworzonym statku i informacjach zwrotnych:
                                var firstCoor = i;
                                var shipLength = Number(userChooseShipCor.onceShipArgs[0]);
                                var shipDirection = userChooseShipCor.onceShipArgs[1];
                                var availableFields = userChooseShipCor.availableFields;
                                var fullIndexBoard = userChooseShipCor.fullAreasBoardAR;
                                var infoRecipient = setShipInfo;
                                // Wrzucanie argumentów do funkcji tworzącej statek i sprawdzającej jego bezkolizyjność na planszy:
                                _this.onceShipArgs[2] = shipColisions.checkShipColisions(firstCoor, shipLength, shipDirection, availableFields, fullIndexBoard, infoRecipient);
                                if (_this.onceShipArgs[2].length == shipLength) {
                                    _this.addUserShip_AEL(); // Przenieś wszystkie dane o tworzonym statku do fabryki statków i utwórz obiekt tego statku
                                    setShipInfo.textContent = 'Statek został ustawiony!';
                                }
                            }
                            else { }
                        }
                        ;
                    }
                    else if (((plcPnt_X < usrBrd_Left || plcPnt_X > usrBrd_Right) || (plcPnt_Y < usrBrd_Top || plcPnt_Y > usrBrd_Bottom)) && _this.placeShipSwitch === false) {
                        setShipInfo.textContent = 'Statek nie może znajdować się poza planszą!';
                    }
                }
                else if (_this.isDisabled === true) {
                    setShipInfo.textContent = 'Nie możesz ustawić statku,\r\n';
                    setShipInfo.textContent += 'gdyż nie posiadasz żadnego!';
                }
            }, false);
        });
    }
};
userChooseShipCor.fillFullAreasBoardAR();
userChooseShipCor.selectShip_AEL();
userChooseShipCor.resetShipSetting();
userChooseShipCor.mousemove_AEL();
userChooseShipCor.setShip_AEL();
