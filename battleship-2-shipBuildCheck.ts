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
        const infoRecipient: HTMLElement = arg_6;
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        let shipCoordinates: number[] = [];
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
                                // Zwrócenie współrzędnych ustawionego statku do odbiorcy:
                                return shipCoordinates;
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