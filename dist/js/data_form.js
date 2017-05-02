require('../sass/data_form.scss');

import BubbleSorting from './bubble'; //импортируем модуль сортировки пузырьком

class DataFormComponent
{
    constructor(SortingDataComponent){
        this.form=$("#data-form"); // получаем объект формы
        this.sortingDataComponent=SortingDataComponent; //сохраняем элемент отвечающий за визуализацию массива
        this.bubbleSorting=new BubbleSorting(this.sortingDataComponent); // сохраняем модуль сортировки
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

export default DataFormComponent;
