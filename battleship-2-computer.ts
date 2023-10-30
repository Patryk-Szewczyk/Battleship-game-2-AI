// Fabryka statków:
interface intf_CompShip {
    number: number,
    length: number,
    direction: string,
    coordinates: number,
    hits: boolean[],
    isSunken: boolean
};
class CompShipCor implements intf_CompShip {
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



// Komputer - akcje:
const computerRandShip: {
    compShips_AR: CompShipCor[],
    fullAreasBoard_AR: number[],
    fillFullAreasBoard_AR_Func: Function,
    onceShipArgs: (string | number | boolean)[],
    createLimit: number,
    createAvailableFields_Func: Function,
    addCompShip_Func: Function,
    direction_AR: string[],
    shipLength_AR: number[]
} = {
    compShips_AR: [],
    fullAreasBoard_AR: [],
    onceShipArgs: [3, 'B'],
    createLimit: 0,
    direction_AR: ['B', 'R'],
    shipLength_AR: [2, 2, 2, 3, 3, 4, 5],
    fillFullAreasBoard_AR_Func(): void {
        for (let i: number = 0; i < 100; i++) {
            this.fullAreasBoard_AR[i] = i;
        };
    },
    addCompShip_Func(): void {
        while (this.createLimit < this.shipLength_AR.length) {
            this.createLimit += 1;
            // Argumanty z buta wjeżdżające:
            let num: number = this.createLimit;
            let lgt: number = this.shipLength_AR[this.createLimit - 1];
            let dir: string = this.direction_AR[Math.floor(Math.random() * 2)];
            let avlFld: number[] = this.createAvailableFields_Func(lgt, dir);
            //console.log(availableFields.length);
            // Częśc argumentów sepecjalnie do buildCheckera:
            let firstCoor: number = 0;   // Random ustalane jest w builderCheckerze z powodu tego, iż współrzędne mogą się powtarzać i potrzeba ponownego wylosowania współrzędnej początkowej
            let fullIdxBrd = this.fullAreasBoard_AR;
            const infRcp: HTMLElement = document.querySelector('div.none');
            const isComp: boolean = true;
            // Jeżeli wartością współrzędnych danego statku będzie "undefined" - powtórz losowanie:
            let cor: number[] = shipColisions.checkShipColisions(firstCoor, lgt, dir, avlFld, fullIdxBrd, infRcp, isComp);
            while (cor == undefined) {
                cor = shipColisions.checkShipColisions(firstCoor, lgt, dir, avlFld, fullIdxBrd, infRcp, isComp);
            };
            // Tworzenie tablicy trafień dla statku:
            let hits: boolean[] = [];
            for (let i: number = 0; i < cor.length; i++) {
                hits[i] = false;
            };
            let ship: CompShipCor = new CompShipCor(num, lgt, dir, cor, hits);
            this.compShips_AR.push(ship);
        };
        console.log(this.compShips_AR);
    },
    createAvailableFields_Func(shipLength, shipDirection) {
        // Dostępne pola:
        let avlFldIdx: number = shipLength - 2;
        let selectedTable_dir_B: number[] = dangerousFields_Obj.dir_B[avlFldIdx];
        let selectedTable_dir_R: number[] = dangerousFields_Obj.dir_R[avlFldIdx];
        let newArr: number[] = [];
        // Tworzenie nowej tablicy:
        for (let i: number = 0; i < 100; i++) {
            newArr[i] = i;
        };
        // Czy wartość inputa "select" nie jest równa: "nie wybrano":
        // Kasowanie niedozwolonych indeksów w nowo-utworzonej tablicy, w zależności
        // od długości statku i jego położenia:
        if (shipDirection === 'B') {
            for (let i: number = 0; i < 100; i++) {
                for (let j: number = 0; j < selectedTable_dir_B.length; j++) {
                    if (newArr[i] == selectedTable_dir_B[j]) {
                        let elLoc: number = newArr.indexOf(selectedTable_dir_B[j]);
                        newArr.splice(elLoc, 1);
                    } else {}
                };
            };
        } else if (shipDirection === 'R') {
            for (let i: number = 0; i < 100; i++) {
                for (let j: number = 0; j < selectedTable_dir_R.length; j++) {
                    if (newArr[i] == selectedTable_dir_R[j]) {
                        let elLoc: number = newArr.indexOf(selectedTable_dir_R[j]);
                        newArr.splice(elLoc, 1);
                    } else {}
                };
            };
        }
        return newArr;
        //console.log(this.availableFields);    /*ARRAY_FIELDS CONSOLLOG*/
  },
};
computerRandShip.fillFullAreasBoard_AR_Func();
computerRandShip.addCompShip_Func();
