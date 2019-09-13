<modul-preview>

```javascript
{
    data: {
        columns: [
                    { id: 'name', title: 'Name', dataProp: 'name', sortable: true},
                    { id: 'age', title: 'Age', dataProp: 'age' , sortable: true},
                    { id: 'username', title: 'Username', dataProp: 'username', sortable: true }
                ],
         rows: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' },
                    { id: '5', name: 'Manon', age: '28', username: 'manon.28' }
                ]

    },
    methods: {
        onSortApplied: function(columnTable) {
             this.$data.rows.sort((a, b) => {
                if (a[columnTable.dataProp] < b[columnTable.dataProp]) {
                    return -1 * columnTable.sortDirection;
                } else if (a[columnTable.dataProp] > b[columnTable.dataProp]) {
                    return 1 * columnTable.sortDirection;
                }
                return 0;
            });
        }
    }

}
```

```html
<m-table :columns="columns" :rows="rows" width="100%" @sort-applied="onSortApplied($event)"></m-table>
```

</modul-preview>
