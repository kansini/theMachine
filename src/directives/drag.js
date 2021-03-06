import { createApp } from 'vue'
const app = createApp({})

// app.directive('drag', (el, binding) => {
//     el.classList.add('modal-draggable')
//
//     function dragMove(handler, el) {
//         let handle = document.querySelector(handler)
//         let ele = document.querySelector(el)
//         setTimeout(() => {
//             if (handle) {
//                 handle.onmousedown = (e) => {
//                     e.preventDefault()
//                     let x = e.clientX - ele.offsetLeft
//                     let y = e.clientY - ele.offsetTop
//                     document.onmousemove = (e) => {
//                         e.preventDefault()
//                         ele.style.left = e.clientX - x + 'px'
//                         ele.style.top = e.clientY - y + 'px'
//                     }
//                     document.onmouseup = () => {
//                         document.onmousemove = document.onmouseup = null
//                     }
//                 }
//             }
//         })
//     }
//
//     dragMove(binding.value.handler, binding.value.el)
// })
app.directive('focus', {
    // When the bound element is mounted into the DOM...
    mounted(el) {
        // Focus the element
        console.log(el);
        el.focus()
    }
})
app.mount('#app')
