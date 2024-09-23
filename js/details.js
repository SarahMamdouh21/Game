import { Details } from './display.js';
let getDetails = new Details()
const searchParam = location.search
const params = new URLSearchParams(searchParam)
const id = params.get('id')

async function details(){
    let allDetails = await getDetails.detailsInfo(id)
    
    $(document).on('keydown',function(e){
        if(e.key == "Escape"){
            location.href = './index.html'
        }
    })
    
    $('.head i').on('click', function(){
        location.href = './index.html'
    })
    return allDetails
}
details()