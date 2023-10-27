// Użytkownik - akcje:
const userChooseShipCor: {
    maxShipAmount: number,
    fullAreasBoardAR: number[],
    fillFullAreasBoardAR: Function,
    userShipsAR: UserShipCor[],
    onceShipArgs: (string | number | boolean)[],
    addUserShip_AEL: Function,
    submitBut: HTMLInputElement,
    createLimit: number,
    selectShip_AEL: Function,
    currentOptionID: number,
    delCurSelectOption: Function,
    rotateShip_AEL: Function,
    pointSwt: string,
    resetShipSetting: Function
    createAvailableFields: Function,
    moveShip_AEL: Function,
    mousemove_AEL: Function,
    placeShipSwitch: boolean,
    mouseXcor: number,
    mouseYcor: number,
    shpPlcPtBCR: number[],
    availableFields: number[],
    setShip_AEL: Function,
    isDisabled: boolean
} = {
    maxShipAmount: 7,
    fullAreasBoardAR: [],
    userShipsAR: [],
    onceShipArgs: [3, 'B'],   // [3, 'B', 42]
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
    fillFullAreasBoardAR(): void {
        for (let i: number = 0; i < 100; i++) {
            this.fullAreasBoardAR[i] = i;
        }
    },
    addUserShip_AEL(): void {
        if (this.createLimit < this.maxShipAmount) {
            this.createLimit += 1;
            // Pobieranie argumentów w celu przekazania ich do klasy:
            let num: number = this.createLimit;
            let lgt: number = this.onceShipArgs[0];
            let dir: string = this.onceShipArgs[1];
            const cor: number[] = this.onceShipArgs[2];
            const hits: boolean[] = [];
            // Tworzenie tablicy trafień dla statku:
            const shipHitsAR: boolean[] = [];
            for (let i: number = 0; i < cor.length; i++) {
                shipHitsAR[i] = false;
            };
            // Przypisanie tablicy trafień dla stadku do tablicy globalnej obiektu:
            this.onceShipArgs[3] = shipHitsAR;
            // Transportowanie argumantów do fabryki statków:
            let ship: UserShipCor = new UserShipCor(num, lgt, dir, cor, hits);
            this.userShipsAR.push(ship);
            // Utwórz graficznie statek na planszy:
            const userAreaAR: NodeListOf<HTMLDivElement> = document.querySelectorAll('div.areaContentType');
            userAreaAR[this.onceShipArgs[2][0]].removeAttribute('class');
            userAreaAR[this.onceShipArgs[2][0]].setAttribute('class', 'areaContentType act-ship-Dir' + dir + '-S' + lgt);
            // Kasowanie aktualnego "option" w "select":
            this.delCurSelectOption();
            // Pokazanie przycisku resetującego ustawianie statków:
            const butReset: HTMLDivElement = document.querySelector('div.im-reset');
            butReset.style.display = 'flex';
        } else {}
        if (this.createLimit === this.maxShipAmount) {
            this.isDisabled = true;   // WAŻNE: Wyłącz AEL ustawiania statku
            const startBut: HTMLDivElement = document.querySelector('div.button-start-game');
            const info: HTMLElement = document.getElementById('clientShow');
            startBut.style.display = 'flex';
            console.log(this.userShipsAR);
            info.textContent = 'Wszystkie statki zostały umieszczone! \r\n';
            info.textContent += 'Możesz rozpocząć grę! \r\n';
        } else {}
    },
    selectShip_AEL():void {
        const selectEL: any = document.querySelector('select.im-select-ship');
        selectEL.addEventListener('change', (e) => {
            const el: any = e.currentTarget;
            let val: string = el.value;
            // Pobranie pseudoID wybranego elementu "option":
            let id: number = Number(val.slice(1, 2));
            this.currentOptionID = id;
            // Pobranie długości statku:
            let lgt: number = Number(val.slice(4, 5));
            this.onceShipArgs[0] = lgt;
            // Graficzne wybranie statku:
            let shipPlaceEL: any = document.getElementById('im-ship-place-element');
            let shipGlobalEL: any = document.getElementById('im-ship-global-element');
            shipPlaceEL.removeAttribute('class');
            shipGlobalEL.removeAttribute('class');
            shipPlaceEL.setAttribute('class', 'im-ship-S' + lgt);
            shipGlobalEL.setAttribute('class', 'im-ship-S' + lgt);
            //console.log(shipPlaceEL);
            //console.log(this.onceShipArgs);
            this.createAvailableFields();
        }, false);
        this.rotateShip_AEL();
    },
    delCurSelectOption(): void {
        // Usuwanie elementu na liście "select":
        const currentOption: number = this.currentOptionID;   // - 1 (- bo rozpoczynamy od 1, a nie od 0, bo iterujemy od 0 kolekcję elementów)
        const selectChildren: NodeListOf<HTMLOptionElement> = document.querySelectorAll('option.opt');
        const selectEL: any = document.querySelector('select.im-select-ship');
        let currSelChildID_AR: number[] = [];
        for (let i: number = 0; i < selectChildren.length; i++) {
            let val: string = selectEL.options[i].value;
            let id: number = Number(val.slice(1, 2));
            currSelChildID_AR[i] = id;
        };
        for (let i: number = 0; i < selectChildren.length; i++) {
            if (currentOption == currSelChildID_AR[i]) {
                selectChildren[i].remove();
            } else {}
        };
        //alert(currentOption);
        // Ustawienie wskaźnika "select" na pierwszy "option":
        selectEL.options[0].setAttribute('selected', 'selected');
        // Zmiana pozycji i widoczności elementu "pseudo statku" (do ustawienia):
        if (this.placeShipSwitch === false) {
            this.placeShipSwitch = true;
            const shipLocalEL: any = document.getElementById('im-ship-place-element');
            shipLocalEL.style.display = 'flex';
            const shipGlobalEL: any = document.getElementById('im-ship-global-element');
            shipGlobalEL.style.display = 'none';   // MEGA WAŻNE!
            shipGlobalEL.style.left = 0 + 'px';
            shipGlobalEL.style.top = 0 + 'px';
            shipGlobalEL.style.transitionDuration = '0.0s';
            // Graficzne kasowanie statku:
            shipLocalEL.removeAttribute('class');
            shipGlobalEL.removeAttribute('class');
        } else {}
    },
    rotateShip_AEL(): void {
        const rotateLocalEL: HTMLDivElement = document.querySelector('div.im-rotate-ship');
        const rotateGlobalEL: any = document.getElementById('im-ship-global-element');
        const shipHanger: HTMLDivElement = document.querySelector('div.im-ship-place');
        let deg: number = 0;
        let dirSwitch: number = 0;
        let dir: string = 'B';
        //let pointSwt: string = 'top';
        ['click', 'touchend'].forEach((ev) => {
            rotateLocalEL.addEventListener(ev, () => {
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
                } else if (dirSwitch === 1) {
                    dirSwitch -= 1;
                    dir = 'B';
                }
                this.onceShipArgs[1] = dir;
                this.createAvailableFields();
                //console.log(this.availableFields);
                //console.log(this.onceShipArgs);
                // Ustawianie punktora:
                const point: any = document.getElementById('im-ship-place-point');
                if (this.pointSwt === 'top') {
                    this.pointSwt = 'right'
                    point.style.bottom = '0px';
                    point.style.top = 'auto';
                } else if (this.pointSwt === 'right') {
                    this.pointSwt = 'bottom'
                    point.style.bottom = '0px';
                    point.style.top = 'auto';
                } else if (this.pointSwt === 'bottom') {
                    this.pointSwt = 'left';
                    point.style.bottom = '0px !important';
                    point.style.top = '0px';
                } else if (this.pointSwt === 'left') {
                    this.pointSwt = 'top';
                    point.style.bottom = '0px !important';
                    point.style.top = '0px';
                }
            }, false);
        });
        this.moveShip_AEL();
    },
    resetShipSetting(): void {
        const butReset: HTMLDivElement = document.querySelector('div.im-reset');
        ['click', 'touchend'].forEach((ev) => {
            butReset.addEventListener(ev, () => {
                // Kasowanie i none-display'owanie tego co trzeba:
                butReset.style.display = 'none';
                const butStart: HTMLDivElement = document.querySelector('div.button-start-game');
                butStart.style.display = 'none';
                for (let i: number = 0; i < this.onceShipArgs.length; i++) {
                    this.onceShipArgs.pop();
                };
                for (let i: number = 0; i < this.maxShipAmount; i++) {
                    this.userShipsAR.pop();
                };
                const selectChildren: NodeListOf<HTMLOptionElement> = document.querySelectorAll('option.opt');
                const selectEL: any = document.querySelector('select.im-select-ship');
                for (let i: number = 0; i < selectChildren.length; i++) {   // UWAGA! MEGA WAŻNE! Zawsze używaj w tej sytuacji ".length" kolekcji elemnetów "NodeListOf<HTMLOptionElement>"
                    selectChildren[i].remove();
                };
                // Graficzne kasowanie statku na panelu ustawiania:
                const shipLocalEL: any = document.getElementById('im-ship-place-element');
                shipLocalEL.removeAttribute('class');
                // Kasowanie komunikatu na plaelu stawiania:
                const setShipInfo: HTMLElement = document.getElementById('clientShow');
                setShipInfo.textContent = '';
                // Graficzne kasowanie statków na planszy:
                const userAreaAR: NodeListOf<HTMLDivElement> = document.querySelectorAll('div.areaContentType');
                for (let i: number = 0; i < userAreaAR.length; i++) {
                    userAreaAR[i].removeAttribute('class');
                    userAreaAR[i].setAttribute('class', 'areaContentType');
                };
                // Ponowne zapełnianie tablicę ruchomą na współrzędne statków gracza: (kasować indeksów nie musisz, gdyż do ich uprzedniego tworzenia nie użyłeś metody "push()")
                for (let i: number = 0; i < 100; i++) {
                    this.fullAreasBoardAR[i] = i;
                };
                // Wyłączenie blokady ustawiania statków i wyzerowania liczby utworzonych statków:
                this.isDisabled = false;
                this.createLimit = 0;
                // Ponowne tworzenie wszystkich "option":
                const selectVALS: string[] = [   // NIE ZAPOMNIJ O MODYFIKACJI PRZY ZMIANIE LICZBY STATKÓW DO USTAWIENIA!
                    'O0_L0',
                    'O1_L2',
                    'O2_L2',
                    'O3_L2',
                    'O4_L3',
                    'O5_L3',
                    'O6_L4',
                    'O7_L5',
                ];
                const optionsTitle: string[] = [   // NIE ZAPOMNIJ O MODYFIKACJI PRZY ZMIANIE LICZBY STATKÓW DO USTAWIENIA!
                    'nie wybrano',
                    'łódź podwodna',
                    'łódź podwodna',
                    'łódź podwodna',
                    'niszczyciel',
                    'niszczyciel',
                    'pancernik',
                    'lotniskowiec',
                ];
                for (let i: number = 0; i < this.maxShipAmount + 1; i++) {   // (+ 1), bo to jest liczba statków, a nie wszystkich elementów "option" do utworzenia
                    const optEL = document.createElement('option');
                    optEL.setAttribute('class', 'opt');
                    optEL.setAttribute('value', selectVALS[i]);
                    const optTN = document.createTextNode(optionsTitle[i]);
                    optEL.appendChild(optTN);
                    selectEL.appendChild(optEL);
                };
                selectEL.options[0].setAttribute('selected', 'selected');
            }, false);
        });
    },
    createAvailableFields(): void {
        // Dostępne pola:
        let avlFldIdx: number = this.onceShipArgs[0] - 2;
        let selectedTable_dir_B: number[] = dangerousFields_Obj.dir_B[avlFldIdx];
        let selectedTable_dir_R: number[] = dangerousFields_Obj.dir_R[avlFldIdx];
        let newArr: number[] = [];
        // Tworzenie nowej tablicy:
        for (let i: number = 0; i < 100; i++) {
            newArr[i] = i;
        };
        // Czy wartość inputa "select" nie jest równa: "nie wybrano":
        if (this.onceShipArgs[0] !== 'nie wybrano') {
            // Kasowanie niedozwolonych indeksów w nowo-utworzonej tablicy, w zależności
            // od długości statku i jego położenia:
            if (this.onceShipArgs[1] === 'B') {
                for (let i: number = 0; i < 100; i++) {
                    for (let j: number = 0; j < selectedTable_dir_B.length; j++) {
                        if (newArr[i] == selectedTable_dir_B[j]) {
                            let elLoc: number = newArr.indexOf(selectedTable_dir_B[j]);
                            newArr.splice(elLoc, 1);
                        } else {}
                    };
                };
            } else if (this.onceShipArgs[1] === 'R') {
                for (let i: number = 0; i < 100; i++) {
                    for (let j: number = 0; j < selectedTable_dir_R.length; j++) {
                        if (newArr[i] == selectedTable_dir_R[j]) {
                            let elLoc: number = newArr.indexOf(selectedTable_dir_R[j]);
                            newArr.splice(elLoc, 1);
                        } else {}
                    };
                };
            }
        } else {}
        this.availableFields = newArr;
        //console.log(this.availableFields);    /*ARRAY_FIELDS CONSOLLOG*/
    },
    moveShip_AEL(): void {
        const place: HTMLDivElement = document.querySelector('div.im-ship-place');
        ['click', 'touchend'].forEach((ev) => {
            place.addEventListener(ev, () => {
                if (this.placeShipSwitch === true) {
                    this.placeShipSwitch = false;
                    const shipLocalEL: any = document.getElementById('im-ship-place-element');
                    shipLocalEL.style.display = 'none';
                    const shipGlobalEL: any = document.getElementById('im-ship-global-element');
                    shipGlobalEL.style.display = 'flex';   // MEGA WAŻNE!
                    let shipELDim: any = shipGlobalEL.getBoundingClientRect();
                    let shipELDim_wdt = shipELDim.width;
                    let shipELDim_hgt = shipELDim.height;
                    //document.getElementById('clientShow').textContent = this.mouseXcor + ' | ' + this.mouseYcor;
                    if (this.pointSwt === 'top' || this.pointSwt === 'bottom') {
                        this.mouseXcor = this.mouseXcor - (shipELDim_wdt / 2);
                        this.mouseYcor = this.mouseYcor - (shipELDim_hgt / 2);
                    } else if (this.pointSwt === 'right' || this.pointSwt === 'left') {
                        this.mouseXcor = this.mouseXcor - (shipELDim_hgt / 2);
                        this.mouseYcor = this.mouseYcor - (shipELDim_wdt / 2);
                    }
                    shipGlobalEL.style.left = this.mouseXcor + 'px';
                    shipGlobalEL.style.top = this.mouseYcor + 'px';
                    shipGlobalEL.style.transitionDuration = '0.0s';
                } else {}
            }, false);
        });
    },
    mousemove_AEL() {
        window.document.addEventListener('mousemove', (e) => {
            //console.log(this.placeShipSwitch);     //   P L A C E   S W I T C H   !
            // Pseudo-ruszanie statkiem:
            this.mouseXcor = e.clientX;
            this.mouseYcor = e.clientY;
            const shipEL: any = document.getElementById('im-ship-global-element');
            let shipELDim: any = shipEL.getBoundingClientRect();
            let shipELDim_wdt = shipELDim.width;
            let shipELDim_hgt = shipELDim.height;
            //document.getElementById('clientShow').textContent = this.mouseXcor + ' | ' + this.mouseYcor;
            if (this.pointSwt === 'top' || this.pointSwt === 'bottom') {
                this.mouseXcor = this.mouseXcor - (shipELDim_wdt / 2);
                this.mouseYcor = this.mouseYcor - (shipELDim_hgt / 2);
            } else if (this.pointSwt === 'right' || this.pointSwt === 'left') {
                this.mouseXcor = this.mouseXcor - (shipELDim_hgt / 2);
                this.mouseYcor = this.mouseYcor - (shipELDim_wdt / 2);
            }
            shipEL.style.left = this.mouseXcor + 'px';
            shipEL.style.top = this.mouseYcor + 'px';
            shipEL.style.transitionDuration = '0.0s';
            // Współżędne punktu początkowego położenia statku:
            const shipPlacePoint: any = document.getElementById('im-ship-place-point');
            this.shpPlcPtBCR = shipPlacePoint.getBoundingClientRect();
            let shpPlcPt_X = this.shpPlcPtBCR.x;
            let shpPlcPt_y = this.shpPlcPtBCR.y;
            //document.getElementById('clientShow').innerHTML = 'Pointer: x: ' + shpPlcPt_X + ' | y: ' + shpPlcPt_y;
        }, false);
    },
    setShip_AEL(): void {   // W PRODUKCJI: pełne skupienie
        ['click', 'touchstart'].forEach((ev) => {
            window.addEventListener(ev, () => {
                const userBoardEL = document.querySelectorAll('div.board-prp')[0];
                const userBoardEL_RECT: any = userBoardEL.getBoundingClientRect();
                let usrBrd_Top = userBoardEL_RECT.top;
                let usrBrd_Bottom = userBoardEL_RECT.bottom;
                let usrBrd_Left = userBoardEL_RECT.left;
                let usrBrd_Right = userBoardEL_RECT.right;
                let plcPnt_X = this.shpPlcPtBCR.x;
                let plcPnt_Y = this.shpPlcPtBCR.y;
                const setShipInfo: HTMLElement = document.getElementById('clientShow');
                //this.onceShipArgs[2] = [];
                //console.log(`usr_Top: ${usrBrd_Top} | usr_Bottom: ${usrBrd_Bottom} | usr_Left: ${usrBrd_Left} | usr_Right ${usrBrd_Right} | plc_X ${plcPnt_X} | plc_Y: ${plcPnt_Y}`);
                if (this.isDisabled === false) {
                    if ((plcPnt_X > usrBrd_Left && plcPnt_X < usrBrd_Right) && (plcPnt_Y > usrBrd_Top && plcPnt_Y < usrBrd_Bottom)) {
                        //setShipInfo.textContent = 'You can place ship here!';
                        for (let i: number = 0; i < fieldsPosition_Obj.fieldsPosARS.length; i++) {
                            if ((plcPnt_X > fieldsPosition_Obj.fieldsPosARS[i][2] && plcPnt_X < fieldsPosition_Obj.fieldsPosARS[i][3]) && (plcPnt_Y > fieldsPosition_Obj.fieldsPosARS[i][0] && plcPnt_Y < fieldsPosition_Obj.fieldsPosARS[i][1])) {
                                // Deklarowanie argumentów o tworzonym statku i informacjach zwrotnych:
                                let firstCoor: number = i;
                                let shipLength: number = Number(userChooseShipCor.onceShipArgs[0]);
                                const shipDirection: (number | string | boolean) = userChooseShipCor.onceShipArgs[1];
                                let availableFields: number[] = userChooseShipCor.availableFields;
                                let fullIndexBoard: number[] = userChooseShipCor.fullAreasBoardAR;
                                const infoRecipient: HTMLElement = setShipInfo;
                                // Wrzucanie argumentów do funkcji tworzącej statek i sprawdzającej jego bezkolizyjność na planszy:
                                this.onceShipArgs[2] = shipColisions.checkShipColisions(firstCoor, shipLength, shipDirection, availableFields, fullIndexBoard, infoRecipient);
                                if (this.onceShipArgs[2].length == shipLength) {
                                    this.addUserShip_AEL();   // Przenieś wszystkie dane o tworzonym statku do fabryki statków i utwórz obiekt tego statku
                                    setShipInfo.textContent = 'Statek został ustawiony!';
                                }
                            } else {}
                        };
                    } else if (((plcPnt_X < usrBrd_Left || plcPnt_X > usrBrd_Right) || (plcPnt_Y < usrBrd_Top || plcPnt_Y > usrBrd_Bottom)) && this.placeShipSwitch === false) {
                        setShipInfo.textContent = 'Statek nie może znajdować się poza planszą!';
                    }
                } else if (this.isDisabled === true) {
                    setShipInfo.textContent = 'Nie możesz ustawić statku,\r\n';
                    setShipInfo.textContent += 'gdyż nie posiadasz żadnego!';
                }
            }, false);
        });
    }
}
userChooseShipCor.fillFullAreasBoardAR();
userChooseShipCor.selectShip_AEL();
userChooseShipCor.resetShipSetting();
userChooseShipCor.mousemove_AEL();
userChooseShipCor.setShip_AEL();