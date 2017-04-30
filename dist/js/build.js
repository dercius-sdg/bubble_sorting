require('../sass/body.scss');
require('../sass/description.scss');
require('../sass/results-stages.scss');

import DataFormComponent from './data_form.js';
import SortingDataComponent from './sorting_array.js';

$().ready(()=>
{
    let sdComponent=new SortingDataComponent();
    let dfComponent= new DataFormComponent(sdComponent);
})

