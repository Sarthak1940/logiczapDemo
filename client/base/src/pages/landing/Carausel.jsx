import React, { useEffect } from 'react'

export default function Carausel() {

    useEffect(()=>{
        let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6
})

setInterval(() => {
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
}, 2500);
    },[])
  return (
    <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
         
        <div class="container">
    
            <div class="slide">
    
                
                <div class="item" style={{backgroundImage: 'url(https://i.ibb.co/qCkd9jS/img1.jpg)'}}>
                    {/* <div class="content">
                        <div class="name">Switzerland</div>
                        <div class="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div> */}
                </div>
                <div class="item" style={{backgroundImage: 'url(https://i.ibb.co/jrRb11q/img2.jpg)'}}>
                    {/* <div class="content">
                        <div class="name">Finland</div>
                        <div class="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div> */}
                </div>
                <div class="item" style={{backgroundImage: 'url(https://i.ibb.co/NSwVv8D/img3.jpg)'}}>
                    {/* <div class="content">
                        <div class="name">Iceland</div>
                        <div class="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div> */}
                </div>
                <div class="item" style={{backgroundImage: 'url(https://i.ibb.co/Bq4Q0M8/img4.jpg)'}}>
                    {/* <div class="content">
                        <div class="name">Australia</div>
                        <div class="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div> */}
                </div>
                <div class="item" style={{backgroundImage: 'url(https://i.ibb.co/jTQfmTq/img5.jpg)'}}>
                    {/* <div class="content">
                        <div class="name">Netherland</div>
                        <div class="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div> */}
                </div>
                <div class="item" style={{backgroundImage: 'url(https://i.ibb.co/RNkk6L0/img6.jpg)'}}>
                    {/* <div class="content">
                        <div class="name">Ireland</div>
                        <div class="des">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!</div>
                        <button>See More</button>
                    </div> */}
                </div>
    
            </div>
    
            <div class="button">
                <button class="prev"><i class="fa-solid fa-arrow-left"></i></button>
                <button class="next"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
    
        </div>
    </>
  )
}