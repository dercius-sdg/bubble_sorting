class BubbleSorting
{
    constructor(component)
    {
        this.component=component;
    }

    sortArray()
    {
        let markElements= function (options) {
            let color=(this.component.getNumberArray()[options.innerCounter-1].value <=this.component.getNumberArray()[options.innerCounter].value) ?"#7fff00":"#dc143c";
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
                    .animate({},{
                        done:function () {
                            $(this.component.getElementByIndex(options.innerCounter))
                                .animate({color:"black"}); // одновременно затемняем цвет соседнего элемента массива
                        }.bind(this),
                        complete:function()
                        {
                            setTimeout(()=>{shiffleElements(options.innerCounter);},700);
                             //перемешиваем элементы массива
                        }
                    })
                    .delay(4000)
                    .animate({color: "black"}, animateProp);
            }
        }.bind(this); // делаем привязку контекста

        let animateProp={//объект описывающий поведение анимации в окончательном состоянии для каждой итерации
            start:function () {
                $(this.component.getElementByIndex(options.innerCounter))
                    .animate({color:"black"}); // одновременно затемняем цвет соседнего элемента массива
            }.bind(this),
            complete:function () { // рекурсивная функция для обхода по массиву
                setTimeout(completeFunc,500);
            }.bind(this)
        };

        let completeFunc=function () { //добавляем задержку для плавного перехода
            if (options.innerCounter>1) // если внутренний счетчик не дошел до конца массива то повторяем
            {
                options.innerCounter--; //уменьшаем индекс искомоего элемента в массива
                markElements(options); //запускаем рекурсию
            }
            else
            {
                let array=this.component.getNumberArray().map((object)=>
                {
                    return object.value;
                });
                this.component.logComponent.addElement(array);
                if(options.outerCounter<options.maxSize-2) // проверяем пройдена ли итерация по внешнему счетчику
                {
                    options.outerCounter++; //увеличиваем внешний счетчик
                    options.innerCounter=options.maxSize-options.outerCounter-1; //заново присваем внутренний счетчик и запускаем по повторному кругу сортировки
                    markElements(options);
                }
            }
        }.bind(this);

        let shiffleElements=function (index) { //функция запускающая анимацию смены элементов местами
                this.component.animateMix(index-1,index);
        }.bind(this);

        this.component.logComponent.clearComponent();
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
