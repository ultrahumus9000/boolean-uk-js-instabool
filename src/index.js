// write your code here

function createpetcard(pet){
let sectionel = document.querySelector('.image-container')
let articleel = document.createElement('article')
articleel.setAttribute('class','image-card' )
let titleel = document.createElement('h2')
titleel.setAttribute('class','title')
titleel.innerText = pet.title
let imgel = document.createElement('img')
imgel.setAttribute('class','image')
//variable
imgel.setAttribute('src', pet.image)
let divlikes = document.createElement('div')
divlikes.setAttribute('class','likes-section')
let spanel = document.createElement('span')
spanel.setAttribute('class','likes')
spanel.innerText =`${pet.likes} likes`
let likebtn = document.createElement('button')
likebtn.setAttribute('class','like-button')
likebtn.innerText = '♥' 
likebtn.addEventListener('click', function (event){
    event.stopPropagation()
    let newpet = pet.likes + 1
    updatelikes(newpet)
})


divlikes.append(spanel,likebtn)
let ulel = document.createElement('ul')
ulel.setAttribute('class','comments')

for(const comment of pet.comments){
    let liel = document.createElement('li')
    liel.innerText = comment.content
    ulel.append(liel)
}

let formel = document.createElement('form')
formel.setAttribute('class','comment-form')
let inputel = document.createElement('input')
inputel.setAttribute('class','comment-input')
inputel.setAttribute('type','text')
inputel.setAttribute('name','comment')
inputel.setAttribute('placeholder','Add a comment...')
let postel = document.createElement('button')
postel.classList.add('comment-button')
postel.setAttribute('type','submit')
postel.innerText = 'post'
formel.append(inputel,postel)
formel.addEventListener('submit',function (event){
    event.preventDefault()
})
articleel.append(titleel,imgel,divlikes, ulel,formel )
sectionel.append(articleel)

}


function createcards(data){
    for(const element of data ){
        createpetcard(element)
    }
}

fetch("http://localhost:3000/images")
.then(function (response){
    return response.json()
})
.then(function(response){
    createcards(response)
    return response
}
)



function updatelikes(response){
    fetch('http://localhost:3000/images/1', {
    method:'PATCH',
    headers: {'Content-Type':"appliation/json"},
    body: JSON.stringify({likes:response})
    } 
    )
}