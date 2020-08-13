<m-responsive-table
    :columns="[
        {
            name: 'id',
            value: 'Identifiant',
            width: '90px',
            textAlign: 'center'
        },
        {
            name: 'name',
            value: 'Nom'
        },
        {
            name: 'lastName',
            value: 'Prénom'
        },
        {
            name: 'userName',
            value: 'Pseudonyme'
        },
        {
            name: 'email',
            value: 'Adresse courriel'
        }
    ]"
    :rows="[
        {
            cells : {
                id: {
                    value: '1943',
                    isHeader: true
                },
                name: {
                    value: 'Maxime'
                },
                lastName: {
                    value: 'Roy'
                },
                userName: {
                    value: 'maxRoy90'
                },
                email: {
                    value: 'maxime.roy@gmail.com'
                }
            }
        },
        {
            cells : {
                id: {
                    value: '2306',
                    isHeader: true
                },
                name: {
                    value: 'Philippe'
                },
                lastName: {
                    value: 'Verreault'
                },
                userName: {
                    value: 'phil_v'
                },
                email: {
                    value: 'philippe_verreault@outlook.com'
                }
            }
        },
        {
            cells : {
                id: {
                    value: '2492',
                    isHeader: true
                },
                name: {
                    value: 'Samuel'
                },
                lastName: {
                    value: 'Tremblay'
                },
                userName: {
                    value: 'sam.tremblay'
                },
                email: {
                    value: 'sam.tremblay@gmail.com'
                }
            }
        }
    ]"
    :first-column-fixed-active="true"
    table-min-width="900px"
    style="background: #fff;" />
