import $ from 'jquery'
import './app1.css'
const $bnt1 = $('#button1')
const $bnt2 = $('#button2')
const $bnt3 = $('#button3')
const $bnt4 = $('#button4')
const $number = $('#number')
let n = localStorage.getItem('n')
$number.text(n || 100)
$bnt1.on('click', () => {
    let n = parseInt($number.text())
    n += 1
    $number.text(n)
    localStorage.setItem("n", n)
})
$bnt2.on('click', () => {
    n = parseInt($number.text())
    n -= 1
    $number.text(n)
    localStorage.setItem("n", n)
})
$bnt3.on('click', () => {
    let n = parseInt($number.text())
    n *= 2
    $number.text(n)
    localStorage.setItem("n", n)
})
$bnt4.on('click', () => {
    let n = parseInt($number.text())
    n /= 2
    $number.text(n)
    localStorage.setItem("n", n)
})

