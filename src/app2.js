import $ from 'jquery'
import './app2.css'
const $tab = $('#app2 .tab-bar')
const $text = $("#app2 .tab-content")
$tab.on('click', 'li', (e) => {
    const $li = $(e.currentTarget)
    $li.addClass('active').siblings().removeClass('active')
    const index = $li.index()
    $text.children().eq(index).addClass('active').siblings().removeClass('active')
    localStorage.setItem('index', index)
})

$tab.children().eq(0).trigger('click')