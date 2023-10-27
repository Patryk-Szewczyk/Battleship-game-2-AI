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
                var contentTypeEL = document.createElement('div');
                contentTypeEL.setAttribute('class', 'areaContentType');
                areaEL.appendChild(contentTypeEL);
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
        //console.log(this.dir_R);   // Tablica niedozwolonych współrzędnych dla kierunku "w prawo"
        //console.log(this.dir_B);   // Tablica niedozwolonych współrzędnych dla kierunku "w lewo"
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
        // Pobranie współrzędnych poszczególnych dzieci "pól" poszczególnych planszy gracza:
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
        //console.log(areasCorAR);
        //console.log(this.fieldsPosARS);
    }
};
fieldsPosition_Obj.getFieldsPos();
;
var UserShipCor = /** @class */ (function () {
    function UserShipCor(arg_1, arg_2, arg_3, arg_4, arg_5) {
        this.number = arg_1;
        this.length = arg_2;
        this.direction = arg_3;
        this.coordinates = arg_4;
        this.hits = arg_5;
        this.isSunken = false;
    }
    ;
    return UserShipCor;
}());
;
var switch_Obj = {
    isStart: 'no',
    but: document.querySelector('div.button-start-game'),
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
            cntMenu.style.bottom = '-420px';
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
            com.style.right = '-420px';
            com.style.opacity = '0.0';
            com.style.transitionDuration = '0.5s';
            setTimeout(function () {
                us.style.right = '-420px';
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
