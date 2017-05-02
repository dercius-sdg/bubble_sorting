require('../sass/results-stages.scss');

class ResultStagesComponent
{
    constructor()
    {
        this.list=$('.result-stages');
    }
    clearComponent()
    {
        this.list.empty();
    }
    addElement(array)
    {
        let element=$(document.createElement('li'));
        element.addClass('result-stages-item');
        element.text(array);
        element.appendTo(this.list);
        element.fadeIn(1000);
    }
}

export default ResultStagesComponent;