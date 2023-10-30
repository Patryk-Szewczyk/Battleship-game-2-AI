// Funkcja ta tworzy statek i jednocześnie sprawdza czy sttek ten można umieścić na planszy (granice planszy i bezkolizyjność).
// Funkcja ta przyjmuje 6 argumentów.
var shipColisions = {
    checkShipColisions: function (arg_1, arg_2, arg_3, arg_4, arg_5, arg_6, arg_7) {
        // Deklaracja głównych zmiennych:
        var firstCoor = arg_1;
        var shipLength = arg_2;
        var shipDirection = arg_3;
        var availableFields = arg_4;
        var fullIndexBoard = arg_5;
        var infoRecipient = arg_6;
        var isComp = arg_7;
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // Współrzedna początkowa dla komputera: (przełączenie na losową)
        if (isComp === true) {
            firstCoor = Math.ceil(Math.random() * 99);
        }
        else { }
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        var shipCoordinates = [];
        var notIsIn_availableFields = 0;
        // Sprawdzenie czy punkt początkowy statku jest dostępny w "availableFields": (dostepne pola na długośc i kierunek, tablica stała)
        for (var j = 0; j < availableFields.length; j++) {
            var notIsIn_fullAreasBoardAR = 0;
            if (firstCoor === availableFields[j]) {
                var IS_In_fullAreasBoardAR_nextCoor = 0;
                var OVERLOOP_fullAreasBoardAR_nextCoor = 0;
                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                // Sprawdzenie czy punkt początkowy statku jest dostępny w "fullIndexBoard": (tablica dostępnych pól, tablica ruchoma)
                for (var k = 0; k < fullIndexBoard.length; k++) {
                    if (firstCoor === fullIndexBoard[k]) {
                        shipCoordinates[0] = firstCoor; // Włożenie gotowej pierwszej współrzędnej do lokalnej tablicy współrzędnych
                        //alert('To miejsce jest wolne!');
                        //setShipInfo.textContent = 'To miejsce jest wolne!';
                    }
                    else if (firstCoor !== fullIndexBoard[k]) {
                        notIsIn_fullAreasBoardAR += 1;
                        if (notIsIn_fullAreasBoardAR === fullIndexBoard.length) {
                            //alert('Miejsce to jest zajęte przez inny statek!');
                            infoRecipient.textContent = 'Statki nie mogą nakładać się na siebie!';
                            // MEGA WAŻNA ULTRA RZECZ!!!
                            return; // Zakończ wykonywanie funkcji dla GRACZA, uniemożliwiając tworzenie współrzędnych dla dalszej część statku
                        }
                        else { }
                    }
                }
                ;
                // - - - - - - - - - - - - - - - - - - - - // Dla jasności: Do sprawdzania limitu pól potrzebujemy jedynie współrzędnej punktu początkowego statku.
                // Tworzenie dalszych współrzędnych statku w zależnośći od jego długości i kierunku:
                // Ustawianie wartości zmiennnej inkrementującej dalse współrzędne statku, w zależności od kireunku jego położenia:
                var incrVal = firstCoor;
                if (shipDirection === 'R') {
                    incrVal = 1;
                }
                else if (shipDirection === 'B') {
                    incrVal = 10;
                }
                //alert(incrVal);
                // Tworzenie dalszych współrzędnych:
                var nextCoor = firstCoor; // Utworzenie zmiennej przechowującej nową aktualną współrzędną (później w FORze)
                for (var m = 1; m < shipLength; m++) {
                    nextCoor += incrVal;
                    shipCoordinates[m] = nextCoor;
                }
                ;
                //alert(shipCoordinates);
                // Sprawdzenie czy aktualnie utworzone współrzędne istnieją już w tablicy dostępnych pól "fullIndexBoard":
                for (var m = 0; m < shipCoordinates.length; m++) { // Wziąłem sprawdzanie od pierwszego dla bezpieczeństwa
                    for (var n = 0; n < fullIndexBoard.length; n++) {
                        if (shipCoordinates[m] === fullIndexBoard[n]) {
                            IS_In_fullAreasBoardAR_nextCoor += 1;
                            if (IS_In_fullAreasBoardAR_nextCoor === shipCoordinates.length) {
                                //alert('Współrzędne istnieją w tablicy! Można ustawić statek!');
                                // Splicowanie tablicy dostępnych pól (ruchomej):
                                for (var n_1 = 0; n_1 < shipCoordinates.length; n_1++) {
                                    var elLoc = fullIndexBoard.indexOf(shipCoordinates[n_1]);
                                    fullIndexBoard.splice(elLoc, 1);
                                }
                                ;
                                //alert(shipCoordinates);
                                //console.log(fullIndexBoard);
                                // Zwrócenie współrzędnych ustawionego statku do odbiorcy:
                                return shipCoordinates;
                            }
                            else { }
                        }
                        else if (shipCoordinates[m] !== fullIndexBoard[n]) {
                            // Tu mi nie działa komunikat sprawdzania nienakładania się statków... bo zakres nie pozwala...
                        }
                    }
                    ;
                }
                ;
                for (var k = 0; k < fullIndexBoard.length; k++) {
                    OVERLOOP_fullAreasBoardAR_nextCoor += 1;
                    var target = fullIndexBoard.length;
                    for (var l = 0; l < shipCoordinates.length; l++) {
                        if (OVERLOOP_fullAreasBoardAR_nextCoor === target) {
                            if (IS_In_fullAreasBoardAR_nextCoor < shipLength) {
                                infoRecipient.textContent = 'Statki nie mogą nakładać się na siebie!';
                            }
                            else { }
                        }
                        else { }
                    }
                    ;
                }
                ;
                // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            }
            else if (firstCoor !== availableFields[j]) {
                notIsIn_availableFields += 1;
                // Sytuacja: Statek znajduje się poza planszą.
                // Jeżeli w każdym z indeksów tablicy "ograniczonych pól" (stałej) nie ma współrzędej, równej tej z położeniem punktu początkowego statku => Nie twórz współrzędnych statku:
                if (notIsIn_availableFields === availableFields.length) {
                    //alert('Statek nie może znajdować się poza planszą!');
                    infoRecipient.textContent = 'Statek nie może znajdować się poza planszą!';
                }
                else { }
            }
        }
        ;
    }
};
