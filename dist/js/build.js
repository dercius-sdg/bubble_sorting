require('../sass/body.scss');
require('../sass/description.scss');
require('../sass/results-stages.scss');

import DataFormComponent from './data_form.js'; //импортируем компоненты
import SortingDataComponent from './sorting_array.js';

$().ready(()=>
{
    let sdComponent=new SortingDataComponent(); // подключаем компонент отвественный за отображения массива
    let dfComponent= new DataFormComponent(sdComponent); // подключаем компонент отвечающий за элементы управления
})

