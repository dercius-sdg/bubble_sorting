require('../sass/sorting_array.scss');

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
export default SortingArrayComponent