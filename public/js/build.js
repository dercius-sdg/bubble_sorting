/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bubble__ = __webpack_require__(5);
__webpack_require__(7);

 //импортируем модуль сортировки пузырьком

class DataFormComponent
{
    constructor(SortingDataComponent){
        this.form=$("#data-form"); // получаем объект формы
        this.sortingDataComponent=SortingDataComponent; //сохраняем элемент отвечающий за визуализацию массива
        this.bubbleSorting=new __WEBPACK_IMPORTED_MODULE_0__bubble__["a" /* default */](this.sortingDataComponent); // сохраняем модуль сортировки
        this.form.find("#addButton").click(this,(e)=> //добавляем обработчик на кнопку "Добавить"
        {
            e.data.addItem();
        });
        this.form.find('#runButton').click(this,(e)=> //добавялем обработчик на кнопку "Запустить сортировку"
        {
           e.data.runSort();
        });

    }
    addItem() { //метод добавляет значение из элемента input в массив
        let insertedItem = this.form.find('.data-form-number')[0]; //находим элемент
        if (insertedItem && !Number.isFinite(insertedItem.valueAsNumber)) return; //проверяем на существование элемента и на ввод не пустого значения
        this.sortingDataComponent.insertElementIntoArray(insertedItem.valueAsNumber); //добавляем значение в массив
        this.enableRunButton(this.sortingDataComponent.getCount()>=2); // при количестве элементов больше 2 в массиве активируем кнопку
    }
    runSort() // метод запускает сортировку пузырьком через модуль BubbleSorting
    {
        this.bubbleSorting.sortArray();
    }
    enableRunButton(state) //активируем кнопку в зависимости от переданного логического значения state
    {
        this.form.find('#runButton')[0].disabled = !state;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (DataFormComponent);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__(8);

class SortingArrayComponent
{
    constructor()
    {
        //сохраняем ссылку на DOM-элемент с массивом
        this._array=$('.sorting-array');
        this._numberArray=[]; // создаем свойство с хранимыми значениями элемента массива
    }
    insertElementIntoArray(value) // элемент для вставки нового элемента в массив
    {
        let element=$(document.createElement('li'))// создаем новый элемент списка
        element.addClass('sorting-array-item'); // присваиваем определенный класс
        element.text(value); // устанавливаем переданное значение
        element.attr('style',"top:"+this.getCount()*50+"px"); // устанавливаем положение в контейнере относительно вверха
        if(this.getCount()>=2) {
            this._array.height(this._array.height() + 50); // увеличиваем высоту родительского элемента
        }
        element.appendTo(this._array);// добавляем элемент в массив
        this._numberArray.push(value);
    }
    getNumberArray() //метод возвращает числовой массив сохраненных значений
    {
        return this._numberArray;
    }
    getCount() // метод возвращает количество всех элементов массива
    {
        return $('.sorting-array-item').length
    }
    getElementByIndex(index) //получаем элемент массива по индексу
    {
        return this._array.find('.sorting-array-item')[index]
    }
    animateMix(firstElementIndex,secondElementIndex) //метод заставляющий менять местами элементы массива с индексами переданными в качестве параметров
    {
        let firstElement=this.getElementByIndex(firstElementIndex); //получаем первый элемент
        let secondElement=this.getElementByIndex(secondElementIndex); //получаем второй элемент
        let animationProp= // данный объект является объектом с передаваемыми параметрами анимации которые передаются в метод animate
            {
                duration:600,
                easing:"ease-in",
                queue:"mix-animation"
            };
        firstElement.animate(
            {
                left:"+=50"
            },
            animationProp
        ).animate(
            {
                top:secondElement.css("top")
            },
            animationProp
        ).
        animate(
            {
                left:"-=50"
            },
            animationProp
        );
        secondElement.animate(
            {
                right:"+=50"
            },
            animationProp
        ).animate(
            {
                top:firstElement.css("top")
            },
            animationProp
        ).
        animate(
            {
                right:"-=50"
            },
            animationProp
        );
        firstElement.dequeue("mix-animation"); //запускаем анимацию для первого элемента
        secondElement.dequeue("mix-animation"); // запускаем анимацию для второго элемента
        [this._numberArray[firstElementIndex],this._numberArray[secondElementIndex]]=[this._numberArray[secondElementIndex],this._numberArray[firstElementIndex]];
        //меняем местами элементы числового массива
    }
}
/* harmony default export */ __webpack_exports__["a"] = (SortingArrayComponent);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BubbleSorting
{
    constructor(component)
    {
        this.component=component;
    }

    sortArray()
    {
        let markElements= function (options) {
            let color=(this.component.getNumberArray()[options.innerCounter-1] <this.component.getNumberArray()[options.innerCounter]) ?"#7fff00":"#dc143c";
            //получаем выделяемый цвет : "зеленый" если сортировочный порядок правильный и "красный" если он не правильный
            if(color=="#7fff00") // если порядок правильный то просто подсвечиваем элементы
            {
                $(this.component.getElementByIndex(options.innerCounter - 1))
                    .animate({color: color}, {
                        start: function () {
                            $(this.component.getElementByIndex(options.innerCounter))
                                .animate({color: color})
                        }.bind(this)
                    })
                    .delay(1000)
                    .animate({color: "black"}, animateProp);
            }
            else // если порядок неправильный то подсвечиваем и меняем местами
            {
                $(this.component.getElementByIndex(options.innerCounter - 1))
                    .animate({color: color}, {
                        start: function () {
                            $(this.component.getElementByIndex(options.innerCounter))
                                .animate({color: color})
                                .animate({color: "black"});
                        }.bind(this),
                        complete:shiffleElements(options.innerCounter) //перемешиваем элементы массива
                    })
                    .delay(2800)
                    .animate({color: "black"}, animateProp);
            }
        }.bind(this); // делаем привязку контекста

        let animateProp={ //объект описывающий поведение анимации в окончательном состоянии для каждой итерации
            start:function () {
                $(this.component.getElementByIndex(options.innerCounter))
                    .animate({color:"black"}); // одновременно затемняем цвет соседнего элемента массива
            }.bind(this),
            complete:function () { // рекурсивная функция для обхода по массиву
                setTimeout(()=>{ //добавляем задержку для плавного перехода
                    if (options.innerCounter>1) // если внутренний счетчик не дошел до конца массива то повторяем
                    {
                        options.innerCounter--; //уменьшаем индекс искомоего элемента в массива
                        markElements(options); //запускаем рекурсию
                    }
                    else
                    {
                        if(options.outerCounter<options.maxSize) // проверяем пройдена ли итерация по внешнему счетчику
                        {
                            //сюда вставляем код для записи лога обработки на страницу
                            options.outerCounter++; //увеличиваем внешний счетчик
                            options.innerCounter=options.maxSize-options.outerCounter-1; //заново присваем внутренний счетчик и запускаем по повторному кругу сортировки
                            markElements(options);
                        }
                    }
                },500)
            }
        };

        let shiffleElements=function (index) { //функция запускающая анимацию смены элементов местами
                this.component.animateMix(index-1,index);
        }.bind(this);

        const arrayLength=this.component.getNumberArray().length; // получаем количество элементов в массиве
        let options= // создаем объект с передаваемымм значениями для функции markElements
            {
                outerCounter:0, //внешний счетчик обхода массива
                innerCounter:arrayLength-1, //внутренний счетчик обхода массива
                maxSize:arrayLength // размер массива
            }
        markElements(options);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (BubbleSorting);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_form_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sorting_array_js__ = __webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);

 //импортируем компоненты


$().ready(()=>
{
    let sdComponent=new __WEBPACK_IMPORTED_MODULE_1__sorting_array_js__["a" /* default */](); // подключаем компонент отвественный за отображения массива
    let dfComponent= new __WEBPACK_IMPORTED_MODULE_0__data_form_js__["a" /* default */](sdComponent); // подключаем компонент отвечающий за элементы управления
})



/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);