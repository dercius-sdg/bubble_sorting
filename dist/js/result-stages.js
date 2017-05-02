require('../sass/results-stages.scss');

class ResultStagesComponent
{
    constructor()
    {
        this.list=$('.result-stages'); // получаем элемент DOM-дерева
    }
    clearComponent()
    {
        this.list.empty(); // очищаем родительский элемент
    }
    addElement(array)
    {
        let element=$(document.createElement('li')); // вставляем значение в список
        element.addClass('result-stages-item');
        element.text(array);
        element.appendTo(this.list);
        element.fadeIn(1000); // добавляем анимацию для плавного появления
    }
}

export default ResultStagesComponent;