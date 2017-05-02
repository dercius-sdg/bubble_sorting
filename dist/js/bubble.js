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

export default BubbleSorting;
