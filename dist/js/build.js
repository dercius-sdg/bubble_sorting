require('../sass/body.scss');
require('../sass/description.scss');

import DataFormComponent from './data_form.js'; //импортируем компоненты
import SortingDataComponent from './sorting_array.js';
import ResultStagesComponent from './result-stages';

$().ready(()=>
{
    let rsComponent= new ResultStagesComponent();
    let sdComponent=new SortingDataComponent(rsComponent); // подключаем компонент отвественный за отображения массива
    let dfComponent= new DataFormComponent(sdComponent); // подключаем компонент отвечающий за элементы управления
})

