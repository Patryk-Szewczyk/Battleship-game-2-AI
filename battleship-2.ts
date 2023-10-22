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
                let areaEL = document.createElement('div');
                areaEL.setAttribute('class', 'area-box');
                areaEL.setAttribute('id', this.boardType[i] + String(j));
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
        console.log(this.dir_R);
        console.log(this.dir_B);
    }
};
dangerousFields_Obj.setToBtmAR();



// Użytkownik - akcje:
const userChooseShipCor: {
    userShipsAR: UserShipCor[],
    addUserShip: Function,
    submitBut: HTMLInputElement,
    shipLgt: HTMLInputElement,
    shipDir: HTMLInputElement,
    shipStartCor: HTMLInputElement,
    createLimit: number
} = {
    userShipsAR: [],
    submitBut: document.querySelector('input.inpSub'),
    shipLgt: document.querySelector('input.inpLgt'),
    shipDir: document.querySelector('input.inpDir'),
    shipStartCor: document.querySelector('input.inpCor'),
    createLimit: 0,
    addUserShip():void {
        const el = 
        ['click', 'touchend'].forEach((ev) => {
            this.submitBut.addEventListener(ev, () => {
                if (this.createLimit < 7) {
                    this.createLimit += 1;
                    let num: number = this.createLimit;
                    let lgt: number = this.shipLgt.value;
                    let dir: string = this.shipDir.value;
                    let cor: number = this.shipStartCor.value;
                    let ship: UserShipCor = new UserShipCor(num, lgt, dir, cor);
                    this.userShipsAR.push(ship);
                    console.log(this.createLimit);
                } else {}
                if (this.createLimit === 7) {
                    console.log(this.userShipsAR);
                } else {}
            }, false);
        });
    }
}
userChooseShipCor.addUserShip();



// Fabryka statków:
interface intf_UserShip {
    shipNum: number,
    shipLgt: number,
    ship_Dir: string,
    shipHits: boolean[],
    shipStartCor: number,
    isSunken: boolean
};
class UserShipCor implements intf_UserShip {
    shipNum: number;
    shipLgt: number;
    ship_Dir: string;
    shipStartCor: number;
    constructor(arg_1, arg_2, arg_3, arg_4) {
        this.shipNum = arg_1;
        this.shipLgt = arg_2;
        this.ship_Dir = arg_3;
        this.shipStartCor = arg_4;
    };
    shipHits: [];
    isSunken: false;
};



const switch_Obj: {
    but: HTMLDivElement,
    startGame: Function,
    isStart: boolean
} = {
    isStart: false,
    but: document.querySelector('div.click'),
    startGame(): void {
        let us: any = document.getElementById('bb-1');
        let com: any = document.getElementById('bb-2');
        ['click', 'touchend'].forEach((ev) => {
            this.but.addEventListener(ev, () => {
                if (this.isStart === false) {
                    us.style.right = '0px';
                    us.style.transitionDuration = '0.5s';
                    setTimeout(() => {
                        com.style.right = '0px';
                        com.style.opacity = '1';
                        com.style.transitionDuration = '0.5s';
                        setTimeout(() => {
                            this.isStart = true;
                        }, 600);
                    }, 500);
                } else if (this.isStart === true) {
                    com.style.right = '-500px';
                    com.style.opacity = '0.0';
                    com.style.transitionDuration = '0.5s';
                    setTimeout(() => {
                        us.style.right = '-500px';
                        us.style.transitionDuration = '0.5s';
                        setTimeout(() => {
                            this.isStart = false;
                        }, 600);
                    }, 500);
                }
            }, false);
        });
    }
};
switch_Obj.startGame();
