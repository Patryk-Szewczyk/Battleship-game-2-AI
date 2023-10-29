// Komputer
/*
const computerRandShip: {
    fullAreasBoard_AR: number[],
    fillFullAreasBoard_AR_Func: Function,
    compShips_AR: UserShipCor[],
    onceShipArgs: (string | number | boolean)[],
    createLimit: number,
    createAvailableFields_Func: Function,
    addCompShip_Func: Function,
    direction_AR: string[],
    shipLength_AR: number[]
} = {
    fullAreasBoard_AR: [],
    compShips_AR: [],
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
            let number: number = this.createLimit;
            let shipLength: number = this.shipLength_AR[this.createLimit - 1];
            const shipDirection: string = this.direction_AR[Math.floor(Math.random() * 2)];
            let availableFields: number[] = this.createAvailableFields_Func(shipLength, shipDirection);
            //console.log(availableFields.length);
            // Częśc argumentów sepecjalnie do buildCheckera:
            let firstCoor: number = Math.ceil(Math.random() * 99);
            let fullIndexBoard = this.fullAreasBoard_AR;
            const infoRecipient: HTMLElement = document.querySelector('div.none');
            const isComp: boolean = true;
            // Powrót: - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            let cor: number[] = shipColisions.checkShipColisions(firstCoor, shipLength, shipDirection, availableFields, fullIndexBoard, infoRecipient, isComp);
            //console.log(cor);
        };
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
  //  },
//};
/*
computerRandShip.fillFullAreasBoard_AR_Func();
computerRandShip.addCompShip_Func();


*/