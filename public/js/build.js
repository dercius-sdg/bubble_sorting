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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__(6);

class DataFormComponent
{
    constructor(SortingDataComponent){
        this.form=$("#data-form");
        this.sortingDataComponent=SortingDataComponent;
        this.form.find("#addButton").click(this,(e)=>
        {
            e.data.addItem();
        });
    }
    addItem() {
        let insertedItem = this.form.find('.data-form-number')[0];
        if (insertedItem && !Number.isFinite(insertedItem.valueAsNumber)) return;
        this.sortingDataComponent.insertElementIntoArray(insertedItem.valueAsNumber);
        this.enableRunButton(this.sortingDataComponent.getCount()>=2);
    }
    enableRunButton(state)
    {
        this.form.find('#runButton')[0].disabled = !state;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (DataFormComponent);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__(7);

class SortingArrayComponent
{
    constructor()
    {
        //сохраняем ссылку на DOM-элемент с массивом
        this.array=$('.sorting-array');
    }
    insertElementIntoArray(value) // элемент для вставки нового элемента в массив
    {
        let element=$(document.createElement('li'))// создаем новый элемент списка
        element.addClass('sorting-array-item'); // присваиваем определенный класс
        element.text(value); // устанавливаем переданное значение
        element.attr('style',"top:"+this.getCount()*50+"px"); // устанавливаем положение в контейнере относительно вверха
        if(this.getCount()>=2) {
            this.array.height(this.array.height() + 50); // увеличиваем высоту родительского элемента
        }
        element.appendTo(this.array); // добавляем элемент в массив
    }
    getCount() // метод возвращает количество всех элементов массива
    {
        return $('.sorting-array-item').length
    }
    getElementByIndex(index) //получаем элемент массива по индексу
    {
        return this.array.find('.sorting-array-item')[index]
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
    }
    toggleAsCorrect(index) // метод переключает отображение элемент массива как правильно отсортированного
    {
        this.getElementByIndex(index).toggleClass('.sorting-array-item_correct');
    }
    toggleAsIncorrect(index) // метод переключает отображение элемент массива как неправильно отсортированного
    {
        this.getElementByIndex(index).toggleClass('.sorting-array-item_incorrect');
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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_form_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sorting_array_js__ = __webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);




$().ready(()=>
{
    let sdComponent=new __WEBPACK_IMPORTED_MODULE_1__sorting_array_js__["a" /* default */]();
    let dfComponent= new __WEBPACK_IMPORTED_MODULE_0__data_form_js__["a" /* default */](sdComponent);
})



/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);