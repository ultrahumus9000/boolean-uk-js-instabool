// write your code here

function createpetcard(dataid,j){
let sectionel = document.querySelector('.image-container')
let articleel = document.createElement('article')
articleel.setAttribute('class','image-card' )
let titleel = document.createElement('h2')
titleel.setAttribute('class','title')
titleel.innerText = dataid.title
let imgel = document.createElement('img')
imgel.setAttribute('class','image')
//variable
imgel.setAttribute('src', dataid.image)
let divlikes = document.createElement('div')
divlikes.setAttribute('class','likes-section')
let spanel = document.createElement('span')
spanel.setAttribute('class','likes')
spanel.innerText =`${dataid.likes} likes`
let likebtn = document.createElement('button')
likebtn.setAttribute('class','like-button')
likebtn.innerText = '♥' 
let newpet = dataid.likes
likebtn.addEventListener('click', function (){
    newpet++
    console.log(newpet)
    updatelikes(newpet, spanel,j)
})

divlikes.append(spanel,likebtn)
let ulel = document.createElement('ul')
ulel.setAttribute('class','comments')

for(const comment of dataid.comments){
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
addcomment(formel,ulel,j)
articleel.append(titleel,imgel,divlikes, ulel,formel )
sectionel.append(articleel)

}


function addcomment(formel,ulel,j){
    formel.addEventListener('submit',function (event){
        event.preventDefault() 
        fetch(`http://localhost:3000/comments`,{
            method:'POST',
            headers: {'Content-Type':"application/json"},
            body: JSON.stringify({
                content: formel.comment.value,
                imageId: j 
            })
        })
        .then(function(){
         let liel = document.createElement('li')
           liel.innerText = formel.comment.value
            ulel.prepend(liel)  
            formel.reset()       
        })
        
    })
}



function createcards(data){
    for(let i = 0; i< data.length; i++ ){
        let dataid = data[i]
        let j= i+1
        createpetcard(dataid,j)
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


function updatelikes(newlikes, spanel,j){
    console.log(newlikes)
    fetch(`http://localhost:3000/images/${j}`, {
    method:'PATCH',
    headers: {'Content-Type':"application/json"},
    body: JSON.stringify({likes:newlikes})
    })
    .then(function(response){
        return response.json()
    }
    ).then(function(response){
        spanel.innerText = `${response.likes} likes`
    })
}

