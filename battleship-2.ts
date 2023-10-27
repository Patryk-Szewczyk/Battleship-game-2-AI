// Battleships 2
// Jest to gra w statki ze sztuczną inteligencją (AI).
// Zasady gry znajdują się bezpośrednio w grze.
// UWAGA! Kod jest zastrzeżony prawami autorskimi. W celu skorzystania z ów kodu
// należy skontaktować się z jego twórcą: Patryk Szewczyk | AHNS 1/INF | 2023



// Page box:
const page_Obj: {
    pageEL: HTMLDivElement,
    setPageHeight: Function
} = {
    pageEL: document.querySelector('div.page'),
    setPageHeight(): void {
        ['load', 'resize'].forEach((ev) => {
            window.addEventListener(ev, () => {
                let hgt: string = String(window.innerHeight);
                this.pageEL.style.height = hgt + 'px';
            }, false);
        });
    }
};
page_Obj.setPageHeight();



// Plansze:
const boards_Obj: {
    boardELS: NodeListOf<HTMLDivElement>,
    boardType: string[],
    setAreaELS: Function,
    setBoardCorT: Function,
    setBoardCorL: Function
} = {
    boardELS: document.querySelectorAll('div.board-prp'),
    boardType: ['U', 'C'],
    // Pola planszy:
    setAreaELS(): void {
       for (let i: number = 0; i < 2; i++) {
             for (let j: number = 0; j < 100; j++) {
                const areaEL = document.createElement('div');
                areaEL.setAttribute('class', 'area-box');
                areaEL.setAttribute('id', this.boardType[i] + String(j));
                const contentTypeEL = document.createElement('div');
                contentTypeEL.setAttribute('class', 'areaContentType');
                areaEL.appendChild(contentTypeEL);
                this.boardELS[i].appendChild(areaEL);
            }
        };
        this.setBoardCorT();
    },
    // Współrzędne numberowe:
    setBoardCorT(): void {
        let boardCorT_AR: NodeListOf<HTMLDivElement> = document.querySelectorAll('div.board-cor-T');
        for (let i: number = 0; i < 2; i++) {
            for (let j: number = 0; j < 10; j++) {
                let boardChildEL = document.createElement('div');
                boardChildEL.setAttribute('class', 'bc-T-child');
                let boardChildTN = document.createTextNode(String(j));
                boardChildEL.appendChild(boardChildTN);
                boardCorT_AR[i].appendChild(boardChildEL);
            }
        };
        this.setBoardCorL();
    },
    // Współrzędne stringowe:
    setBoardCorL(): void {
        let boardCorC_AR: NodeListOf<HTMLDivElement> = document.querySelectorAll('div.board-cor-L');
        let boardCorC_Ltr: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        for (let i: number = 0; i < 2; i++) {
            for (let j: number = 0; j < 10; j++) {
                let boardChildEL = document.createElement('div');
                boardChildEL.setAttribute('class', 'bc-L-child');
                let boardChildTN = document.createTextNode(boardCorC_Ltr[j]);
                boardChildEL.appendChild(boardChildTN);
                boardCorC_AR[i].appendChild(boardChildEL);
            }
        };
    }
};
boards_Obj.setAreaELS();



// Niebezpieczne pola:
const dangerousFields_Obj: {
    dir_B: number[][],
    dir_R: number[][],
    setToBtmAR: Function,
    setToRgtAR: Function,
    updateARS: Function
} = {
    dir_B: [[], [], [], []],   // B2, B3, B4, B5
    dir_R: [[], [], [], []],   // R2, R3, R4, R5
    setToBtmAR(): void {
        let startToIncValue: number = 89;
        for (let i: number = 0; i < 4; i++) {
            let ship_Value: number = 0;
            ship_Value = startToIncValue;
            for (let j = 0; j < 10; j++) {
                this.dir_B[i][j] = ship_Value += 1;
            };
            startToIncValue -= 10;
        };
        dangerousFields_Obj.setToRgtAR();
    },
    setToRgtAR(): void {
        let decrement = -1;
        // Wypełnainie tablicy pól w prawym kierunku:
        for (let i = 0; i < 4; i++) {
            let ship_Value = 0;
            ship_Value = decrement;
            for (let j = 0; j < 10; j++) {
                this.dir_R[i][j] = ship_Value += 10;
            };
            decrement -= 1;
        };
        // Wypełnainie tablicy pól w dolnym kierunku:
        let new_R_Val_Array = [];
        for (let i = 1; i < this.dir_R.length; i++) {
            if (i <= 4) {
                new_R_Val_Array.push(this.dir_R[i - 1]);
            } else {
                break;
            }
        };
        dangerousFields_Obj.updateARS();
    },
    updateARS(): void {
        // Tworzenie tablicy kolona - dół:
        let new_B_Val_Array = [];
        for (let i = 1; i < this.dir_B.length; i++) {
            if (i <= 4) {
                new_B_Val_Array.push(this.dir_B[i - 1]);
            } else {
                break;
            }
        };
        // Tworzenie tablicy kolona - prawo:
        let new_R_Val_Array = [];
        for (let i = 1; i < this.dir_R.length; i++) {
            if (i <= 4) {
                new_R_Val_Array.push(this.dir_R[i - 1]);
            } else {
                break;
            }
        };
        // Aktualizowanie tabliy klona - prawo:
        new_R_Val_Array[0] = this.dir_R[1].concat(this.dir_R[0]);
        new_R_Val_Array[1] = this.dir_R[2].concat(this.dir_R[0], this.dir_R[1]);
        new_R_Val_Array[2] = this.dir_R[3].concat(this.dir_R[0], this.dir_R[1], this.dir_R[2]);
        for (let i = 1; i < this.dir_R.length; i++) {
            this.dir_R[i] = new_R_Val_Array[i - 1];
        };
        for (let i = 0; i < this.dir_R.length; i++) {
            this.dir_R[i].sort((a, b) => {
                return a - b;
            });
        };
        // Aktualizowanie tabliy klona - dół:
        new_B_Val_Array[0] = this.dir_B[1].concat(this.dir_B[0]);
        new_B_Val_Array[1] = this.dir_B[2].concat(this.dir_B[0], this.dir_B[1]);
        new_B_Val_Array[2] = this.dir_B[3].concat(this.dir_B[0], this.dir_B[1], this.dir_B[2]);
        for (let i = 1; i < this.dir_B.length; i++) {
            this.dir_B[i] = new_B_Val_Array[i - 1];
        };
        for (let i = 0; i < this.dir_B.length; i++) {
            this.dir_B[i].sort((a, b) => {
                return a - b;
            });
        };
        //console.log(this.dir_R);   // Tablica niedozwolonych współrzędnych dla kierunku "w prawo"
        //console.log(this.dir_B);   // Tablica niedozwolonych współrzędnych dla kierunku "w lewo"
    }
};
dangerousFields_Obj.setToBtmAR();



const fieldsPosition_Obj: {
    fieldsPosARS: number[];   //{[index: string]: number[]}
    getFieldsPos: Function
} = {
    fieldsPosARS: [],   //{}
    getFieldsPos(): void {
        // Pobranie dzieci "pól" z planszy użytkownaika":
        const board: any = document.querySelectorAll('div.board-prp')[0];
        const onceBoardChilred: HTMLCollection = board.children;
        const boardsWithELS: any[] = [];
        for (let i: number = 1; i < board.childElementCount; i++) {
            boardsWithELS[i - 1] = onceBoardChilred[i];
        };
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
        const areasCorAR: number[][] = [[]];
        for (let i: number = 0; i < boardsWithELS.length; i++) {
            let rectOBJ: {[index: string]: number} = boardsWithELS[i].getBoundingClientRect();
            areasCorAR[i] = [];
            areasCorAR[i][0] = rectOBJ.top;
            areasCorAR[i][1] = rectOBJ.bottom;
            areasCorAR[i][2] = rectOBJ.left;
            areasCorAR[i][3] = rectOBJ.right;
            this.fieldsPosARS[i] = areasCorAR[i];
        };
        //console.log(areasCorAR);
        //console.log(this.fieldsPosARS);
    }
};
fieldsPosition_Obj.getFieldsPos();



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
    addUserShip_AEL():void {
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
                                const infoRecipient: HTMLDivElement = document.querySelector('div.clientShow');
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



// Funkcja ta tworzy statek i jednocześnie sprawdza czy sttek ten można umieścić na planszy (granice planszy i bezkolizyjność).
// Funkcja ta przyjmuje 6 argumentów.
const shipColisions: {
    checkShipColisions: Function
} = {
    checkShipColisions(arg_1, arg_2, arg_3, arg_4, arg_5, arg_6) {
        // Deklaracja głównych zmiennych:
        let firstCoor: number = arg_1;
        let shipLength: number = arg_2;
        const shipDirection: (number | string | boolean) = arg_3;
        let availableFields: number[] = arg_4;
        let fullIndexBoard: number[] = arg_5;
        const infoRecipient: HTMLDivElement = arg_6;
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        let shipCoordinates: number[] = arg_6;
        let notIsIn_availableFields: number = 0;
        // Sprawdzenie czy punkt początkowy statku jest dostępny w "availableFields": (dostepne pola na długośc i kierunek, tablica stała)
        for (let j: number = 0; j < availableFields.length; j++) {
            let notIsIn_fullAreasBoardAR: number = 0; 
            if (firstCoor === availableFields[j]) {
                let IS_In_fullAreasBoardAR_nextCoor: number = 0;
                let OVERLOOP_fullAreasBoardAR_nextCoor: number = 0;
                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                // Sprawdzenie czy punkt początkowy statku jest dostępny w "fullIndexBoard": (tablica dostępnych pól, tablica ruchoma)
                for (let k: number = 0; k < fullIndexBoard.length; k++) {
                    if (firstCoor === fullIndexBoard[k]) {
                        shipCoordinates[0] = firstCoor   // Włożenie gotowej pierwszej współrzędnej do lokalnej tablicy współrzędnych
                        //alert('To miejsce jest wolne!');
                        //setShipInfo.textContent = 'To miejsce jest wolne!';
                    } else if (firstCoor !== fullIndexBoard[k]) {
                        notIsIn_fullAreasBoardAR += 1;
                        if (notIsIn_fullAreasBoardAR === fullIndexBoard.length) {
                            //alert('Miejsce to jest zajęte przez inny statek!');
                            infoRecipient.textContent = 'Statki nie mogą nakładać się na siebie!';
                            // MEGA WAŻNA ULTRA RZECZ!!!
                            return;   // Zakończ wykonywanie funkcji, uniemożliwiając tworzenie współrzędnych dla dalszej część statku
                        } else {}
                    }
                };
                // - - - - - - - - - - - - - - - - - - - - // Dla jasności: Do sprawdzania limitu pól potrzebujemy jedynie współrzędnej punktu początkowego statku.
                // Tworzenie dalszych współrzędnych statku w zależnośći od jego długości i kierunku:
                // Ustawianie wartości zmiennnej inkrementującej dalse współrzędne statku, w zależności od kireunku jego położenia:
                let incrVal = firstCoor;
                if (shipDirection === 'R') {
                    incrVal = 1;
                } else if (shipDirection === 'B') {
                    incrVal = 10;
                }
                //alert(incrVal);
                // Tworzenie dalszych współrzędnych:
                let nextCoor = firstCoor;   // Utworzenie zmiennej przechowującej nową aktualną współrzędną (później w FORze)
                for (let m: number = 1; m < shipLength; m++) {
                    nextCoor += incrVal;
                    shipCoordinates[m] = nextCoor;
                };
                //alert(shipCoordinates);
                // Sprawdzenie czy aktualnie utworzone współrzędne istnieją już w tablicy dostępnych pól "fullIndexBoard":
                for (let m: number = 0; m < shipCoordinates.length; m++) {   // Wziąłem sprawdzanie od pierwszego dla bezpieczeństwa
                    for (let n: number = 0; n < fullIndexBoard.length; n++) {
                        if (shipCoordinates[m] === fullIndexBoard[n]) {
                            IS_In_fullAreasBoardAR_nextCoor += 1;
                            if (IS_In_fullAreasBoardAR_nextCoor === shipCoordinates.length) {
                                //alert('Współrzędne istnieją w tablicy! Można ustawić statek!');
                                // Splicowanie tablicy dostępnych pól (ruchomej):
                                for (let n: number = 0; n < shipCoordinates.length; n++) {
                                    let elLoc: number = fullIndexBoard.indexOf(shipCoordinates[n]);
                                    fullIndexBoard.splice(elLoc, 1);
                                };
                                //alert(shipCoordinates);
                                //console.log(fullIndexBoard);
                                // Przypisanie współrzędnych statku tablicy lokalne do tablicy globalnej obiektu:
                                return shipCoordinates;   // Zwróć współrzędne do odbiorcy
                            } else {}
                        } else if (shipCoordinates[m] !== fullIndexBoard[n]) {
                            // Tu mi nie działa komunikat sprawdzania nienakładania się statków... bo zakres nie pozwala...
                        }
                    };
                };
                for (let k: number = 0; k < fullIndexBoard.length; k++) {
                    OVERLOOP_fullAreasBoardAR_nextCoor += 1;
                    let target: number = fullIndexBoard.length;
                    for (let l: number = 0; l < shipCoordinates.length; l++) {
                        if (OVERLOOP_fullAreasBoardAR_nextCoor === target) {
                            if (IS_In_fullAreasBoardAR_nextCoor < shipLength) {
                                infoRecipient.textContent = 'Statki nie mogą nakładać się na siebie!';
                            } else {}
                        } else {}
                    };
                };
                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            } else if (firstCoor !== availableFields[j]) {
                notIsIn_availableFields += 1;
                // Sytuacja: Statek znajduje się poza planszą.
                // Jeżeli w każdym z indeksów tablicy "ograniczonych pól" (stałej) nie ma współrzędej, równej tej z położeniem punktu początkowego statku => Nie twórz współrzędnych statku:
                if (notIsIn_availableFields === availableFields.length) {
                    //alert('Statek nie może znajdować się poza planszą!');
                    infoRecipient.textContent = 'Statek nie może znajdować się poza planszą!';
                } else {}
            }
        };
    }
};



// Fabryka statków:
interface intf_UserShip {
    number: number,
    length: number,
    direction: string,
    coordinates: number,
    hits: boolean[],
    isSunken: boolean
};
class UserShipCor implements intf_UserShip {
    number: number;
    length: number;
    direction: string;
    coordinates: number;
    hits: boolean[];
    isSunken: boolean;
    constructor(arg_1, arg_2, arg_3, arg_4, arg_5) {
        this.number = arg_1;
        this.length = arg_2;
        this.direction = arg_3;
        this.coordinates = arg_4;
        this.hits = arg_5;
        this.isSunken = false;
    };
};



const switch_Obj: {
    but: HTMLDivElement,
    startGame: Function,
    isStart: string,
    moveBoard: Function
} = {
    isStart: 'no',
    but: document.querySelector('div.button-start-game'),
    startGame(): void {
        ['click', 'touchend'].forEach((ev) => {
            this.but.addEventListener(ev, () => {
                this.moveBoard();
            }, false);
        });
    },
    moveBoard(): void {
        let cntMenu: HTMLDivElement = document.querySelector('div.inside-menu');
        let us: any = document.getElementById('bb-1');
        let com: any = document.getElementById('bb-2');
        if (this.isStart === 'no') {
            this.isStart = 'pause';
            cntMenu.style.bottom = '-420px';
            cntMenu.style.opacity = '0.0';
            cntMenu.style.transitionDuration = '0.5s';
            setTimeout(() => {
                us.style.right = '0px';
                us.style.transitionDuration = '0.5s';
                setTimeout(() => {
                    com.style.right = '0px';
                    com.style.opacity = '1.0';
                    com.style.transitionDuration = '0.5s';
                    setTimeout(() => {
                        this.isStart = 'yes';
                    }, 600);
                }, 500);
            }, 500);
        } else if (this.isStart === 'yes') {
            this.isStart = 'pause';
            com.style.right = '-420px';
            com.style.opacity = '0.0';
            com.style.transitionDuration = '0.5s';
            setTimeout(() => {
                us.style.right = '-420px';
                us.style.transitionDuration = '0.5s';
                setTimeout(() => {
                    cntMenu.style.bottom = '0px';
                    cntMenu.style.opacity = '1.0';
                    cntMenu.style.transitionDuration = '0.5s';
                    setTimeout(() => {
                        this.isStart = 'no';
                    }, 600);
                }, 500);
            }, 500);
        }
    }
};
switch_Obj.startGame();
