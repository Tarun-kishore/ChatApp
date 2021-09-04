const socket = io()

// elements
const $container = document.querySelector('#container')
const $alert = document.querySelector('#alert-message')
const $messageForm = document.querySelector('#message')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('#sendMessage')
const $messages = document.querySelector('#messages')
const $locationButton = document.querySelector('#sendLocation')
const $sidebar = document.querySelector('#sidebar-div')

// templates
const messageTemplate = document.querySelector('#message-id').innerHTML
const infoTemplate = document.querySelector('#info-id').innerHTML
const locationTemplate = document.querySelector('#location-id').innerHTML
const alertTemplate = document.querySelector('#alert').innerHTML
const sidebarTemplate = document.querySelector('#sidebar').innerHTML

// Options 
const {username, room }= Qs.parse(location.search ,{ignoreQueryPrefix : true})

const myName = username

const autoscroll=()=>{
    //new message
    const $newMessage = $messages.lastElementChild
    //height of new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    //visible height
    const visibleHeight = $messages.offsetHeight

    //container height
    const containerHeight = $messages.scrollHeight

    //how much we have scrolled
    const scrolloffset = $messages.scrollTop + visibleHeight    
    
    //if we haven;t scrolled till end 
    if(containerHeight - newMessageHeight <= scrolloffset){
        $messages.scrollTop = $messages.scrollHeight
    }

}

socket.on('Message',({message,createdAt})=>{
    const html = Mustache.render(infoTemplate,{message,createdAt: moment(createdAt).format('h:mm a')})
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll();
})

socket.on('locationMessage',({username,message,createdAt})=>{
    if(username === myName)    username='You'
    const html = Mustache.render(locationTemplate,{username,url:message,createdAt: moment(createdAt).format('h:mm a')})
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll();
})

socket.on('receiveMessage',({username,message,createdAt})=>{
    if(username === myName)    username='You'
    const html = Mustache.render(messageTemplate,{username,message,createdAt: moment(createdAt).format('h:mm a')})
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll();
})

socket.on('roomData',({room,users})=>{
    const html = Mustache.render(sidebarTemplate,{room,users})
    $sidebar.innerHTML = html
})

$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(!$messageFormInput.value){
        alert('You cannot send empty message')
        return
    }
    $messageFormButton.setAttribute('disabled','disabled')
    
    const inputMessage = $messageFormInput
    socket.emit('sendMessage',inputMessage.value,(error)=>{
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value =''
        $messageFormInput.focus()
        if(error){
            const html = Mustache.render(alertTemplate,{message:'Your message has been acknowledged and successfuly ignored',reason: 'Message should not contain Profanity'})
            $alert.innerHTML = html
        }
    })
})

$locationButton.addEventListener('click',()=>{
    $locationButton.setAttribute('disabled','disabled')
    
    if(!navigator.geolocation){
        return alert('Your browser does not support this feature')
    }

    
    navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude,longitude} = position.coords
        socket.emit('sendLocation',{latitude, longitude},()=>{
            $locationButton.removeAttribute('disabled')
        })
    })
})

socket.emit('join',{username , room},(error)=>{
    if(error){
        alert(error)
        location.href ='/'
    }
})