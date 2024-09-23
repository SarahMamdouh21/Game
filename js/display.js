export class Games{
    constructor(title,thumbnail,short_description,genre,platform){
        this.title = title
        this.thumbnail = thumbnail
        this.short_description = short_description
        this.genre = genre
        this.platform = platform
    }

    async getGames(categoryName){
        $('.loading').removeClass('d-none')
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'cd8006dfeamsh8e775283c0e337dp1393ecjsn71d4c9cf2743',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        
    
        try {
            const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`, options);
            const response = await api.json()
            let box = '';
            for (let i = 0; i < response.length; i++) {
                box += `
                    <div class="col-lg-4 col-md-6 ">
                        <div data-id='${response[i].id}' class="game-info text-center text-white rounded-3 overflow-hidden">
                            <div class="overlay position-absolute top-0 w-100 h-100 d-flex justify-content-start align-items-center fw-bold flex-column gap-5">
                                <div class="image-content text-center w-100">
                                    <img class="w-100 rounded-3" src="${response[i].thumbnail}" alt="${response[i].title}">
                                </div> 
                                <div class="overlay-content text-center d-flex justify-content-between align-items-center flex-column text-white">
                                    <h1 class="m-0 ">${response[i].title}</h1>
                                </div>
                                <div class='d-flex justify-content-center align-items-start w-100 gap-2'>
                                    <span class='desc'>Free</span>
                                    <span class='desc'>${response[i].genre} </span>
                                    <span class='desc'>${response[i].platform}</span>
                                </div>
                            </div>
                            <div class="text h-100">
                                <div class="image-info">
                                    <img class='w-100 rounded-3' src="${response[i].thumbnail}" alt="${response[i].title}" />
                                </div>
                                <div class='info py-3 px-1'>
                                    <h1 class="m-0 ">${response[i].title}</h1>
                                    <p class='m-0 py-3'>${response[i].short_description}</p>
                                    <div class='d-flex justify-content-center align-items-start w-100 gap-3'>
                                        <span class='desc'>${response[i].genre}</span>
                                        <span class='desc'>${response[i].platform}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            $('#rowData').html(box);
            $('.loading').addClass('d-none');
        } catch (error) {
            console.error(error);
        }
    }
}

/*########### Class Details Page ###########*/
export class Details extends Games{
    constructor(title,thumbnail,short_description,genre,platform,status,description,game_url){
        super(title,thumbnail,short_description,genre,platform)
        this.status = status
        this.description = description
        this.game_url = game_url
    }

    async detailsInfo(ids) {
        $('.loading').removeClass('d-none')
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '30907946d1msh67b34aa960c8ffbp19486fjsn129127cab9bf',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        
        try {
            const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${ids}`, options);
            const response = await api.json();
            let boxDetails = `
                <div class="col-lg-4 ">
                    <div class="image-Details rounded-3">
                        <img class="w-100 rounded-3" src="${response.thumbnail}" alt="">
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="details mx-lg-4">
                        
                        <h1>Title: ${response.title}</h1>
                        <h5>Category: <span>${response.genre}</span></h5>
                        <h5>Platform: <span>${response.platform}</span></h5>
                        <h5>Status: <span>${response.status}</span></h5>
                        <p class="description ">
                            ${response.description}
                        </p>
                        <div>
                            <button class='show-game'><a href="${response.game_url}" target='_blank'>Show Game</a></button>
                        </div>
                    </div>
                </div>
            `
        $('#detailsData').html(boxDetails);

        const bgImg = response.thumbnail.replace('thumbnail','background');
        $('body').css({
            'background-image': `linear-gradient(to right, rgba(0,0,0,.8) 50%,rgba(0,0,0,.8) 100%), url('${bgImg}')`,
            'background-size': `cover`,
            'background-position': `center center`,
        });
        $('.loading').addClass('d-none');

        } catch (error) {
            console.error(error);
        }
    }
}