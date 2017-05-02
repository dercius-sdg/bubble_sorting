require('../sass/sorting_array.scss');

class SortingArrayComponent
{
    constructor(logComponent)
    {
        //сохраняем ссылку на DOM-элемент с массивом
        this._array=$('.sorting-array');
        this.logComponent=logComponent;
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
        element.appendTo(this._array);// добавляем элемент в массив, со сохранненым значением и элементом к которому это значение привязано
        this._numberArray.push({
            element:element,
            value:value
        });
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
        return this.getNumberArray()[index].element;
    }
    animateMix(firstElementIndex,secondElementIndex) //метод заставляющий менять местами элементы массива с индексами переданными в качестве параметров
    {
        let firstElement=$(this.getElementByIndex(firstElementIndex)); //получаем первый элемент
        let secondElement=$(this.getElementByIndex(secondElementIndex)); //получаем второй элемент
        let animationProp= // данный объект является объектом с передаваемыми параметрами анимации которые передаются в метод animate
            {
                duration:600,
                queue:"mix-animation"
            };
        firstElement
            .animate( //делаем элемент красным
                {
                    color:"#dc143c"
                },
                animationProp
            )
            .animate(
            {
                left:"+=50" // сдвигаем элемент влево
            },
            animationProp
            )
            .animate(
            {
                top:secondElement.css("top") // сдвигаем элемент вниз на позицию второго элемента
            },
            animationProp
        ).
        animate(
            {
                left:"-=50" // сдвигаем элемент вправо
            },
            animationProp
        )
            .animate(
            {
                color:"black" // затемняем элемент
            },
            animationProp
            );
        secondElement
            .animate(
            {
                color:"#dc143c" //делаем элемент красным
            },
            animationProp
            )
            .animate(
            {
                right:"+=50" // сдвигаем элемент вправо
            },
            animationProp
        ).animate(
            {
                top:firstElement.css("top") // сдвигаем элемент вверх
            },
            animationProp
        ).
        animate(
            {
                right:"-=50" //сдвигаем элемент обратно влево
            },
            animationProp
        ).animate(
            {
                color:"black" // делаем элемент черным
            },
            animationProp
        );
        firstElement.dequeue("mix-animation"); //запускаем анимацию для первого элемента
        secondElement.dequeue("mix-animation"); // запускаем анимацию для второго элемента
        [this._numberArray[firstElementIndex],this._numberArray[secondElementIndex]]=[this._numberArray[secondElementIndex],this._numberArray[firstElementIndex]];
        //меняем местами элементы числового массива
    }
}
export default SortingArrayComponent