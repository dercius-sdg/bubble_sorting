require('../sass/data_form.scss');

class DataFormComponent
{
    constructor(SortingDataComponent){
        this.form=$("#data-form");
        this.sortingDataComponent=SortingDataComponent;
        this.form.find("#addButton").click(this,(e)=>
        {
            e.data.addItem();
        });
    }
    addItem() {
        let insertedItem = this.form.find('.data-form-number')[0];
        if (insertedItem && !Number.isFinite(insertedItem.valueAsNumber)) return;
        this.sortingDataComponent.insertElementIntoArray(insertedItem.valueAsNumber);
        this.enableRunButton(this.sortingDataComponent.getCount()>=2);
    }
    enableRunButton(state)
    {
        this.form.find('#runButton')[0].disabled = !state;
    }
}

export default DataFormComponent;
