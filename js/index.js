import { Games } from './display.js'
let getGames = new Games()

async function game(category = 'mmorpg'){
    let allData = await getGames.getGames(category)
    $('nav .navbar-nav .nav-item .nav-link').on('click',function(){
        $('nav .navbar-nav .nav-item .nav-link').removeClass('active')
        $(this).addClass('active')
        const category = $(this).data('category')
        $('.loading').removeClass('d-none')
        game(category)
    });
   
    $('.game-info').on('click',function(){
        let id = $(this).attr('data-id')
        location.href= `./details.html?id=${id}`
    })
   
    
    return allData
}

game()

$(document).ready(function(){
    
    $(window).scroll(function(){
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    
    
    $('#back-to-top').click(function(){
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });
});
