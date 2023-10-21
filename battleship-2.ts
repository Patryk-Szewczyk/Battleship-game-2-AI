// Battleships 2
// Jest to gra w statki ze sztuczną inteligencją (AI).
// Zasady gry znajdują się bezpośrednio w grze.
// UWAGA! Kod jest zastrzeżony prawami autorskimi. W celu skorzystania z ów kodu
// należy skontaktować się z jego twórcą: Patryk Szewczyk | AHNS 1/INF | 2023


// Dangerous fields:
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
        // Create values:
        for (let i = 0; i < 4; i++) {
            let ship_Value = 0;
            ship_Value = decrement;
            for (let j = 0; j < 10; j++) {
                this.dir_R[i][j] = ship_Value += 10;
            };
            decrement -= 1;
        };
        // Create new Array:
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
        console.log(this.dir_B);
        console.log(this.dir_R);
    }
};
dangerousFields_Obj.setToBtmAR();



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