import './app3.css'
import $ from 'jquery'
const $square = $('#app3 .square')
$square.on('click', () => {
    console.log(66)
    $square.toggleClass('active')
})
