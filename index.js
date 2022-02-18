let people = [
    {id: 1, title: 'Carl'},
    {id: 2, title: 'Bob'},
    {id: 3, title: 'Mike'},
    {id: 4, title: 'Cris'},
]

const peopleModal = $.modal({
    title: 'Price for people',
    closable: true,
    footerButtons: [
        {
            text: 'ok',
            type: 'primary',
            handler(){
                console.log('Primary');
                peopleModal.close()
            }
        }
    ]
});
// const confirmModal = $.modal({
//     title: 'Are You Sure?',
//     closable: true,
//     footerButtons: [
//         {
//             text: 'cancel',
//             type: 'secondary',
//             handler(){
//                 console.log('Primary');
//                 confirmModal.close()
//             }
//         },
//         {
//             text: 'delete',
//             type: 'danger',
//             handler(){
//                 console.log('Primary');
//                 confirmModal.close()
//             }
//         }
//     ]
// });
const toHTML = people => `
            <div class="col-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${people.title}</h5>
                        <p class="card-text">${people.id}</p>
                        <a href="#" class="btn btn-primary" data-btn = "modal" data-id = "${people.id}">Modal</a>
                        <a href="#" class="btn btn-danger" data-btn="remove" data-id = "${people.id}">Delete</a>
                    </div>
                </div>
            </div>
`
function render() {
    const html = people.map(toHTML).join('')
    document.querySelector('#people').innerHTML = html
}
render()

document.addEventListener('click', event =>{
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const men = people.find(f => f.id === id);
    event.preventDefault();
    if(btnType === 'modal'){
        peopleModal.open();
        peopleModal.setContent(
            `<p> Price for ${men.title} is :<strong>${id + 200}</strong>  </p>`
        )
    }else if(btnType === 'remove'){
       $.confirm({
            title: 'Are You sure',
            content: `<p>You remove human: <strong>${men.title}</strong><p>`
        }).then(()=>{
            people = people.filter(f => f.id !== id);
            render();
        }).catch(()=>{
            console.log('cancel')
        })

    }
})
