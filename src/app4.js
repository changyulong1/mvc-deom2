import './app4.css'
import $ from 'jquery'


const v = {
    el: null,
    html: `
    <div>
        <div class="circle"></div>
    </div>
    `,
    init(selector) {
        v.el = $(selector)
    },
    reader(n) {
        if (v.el.children().length !== 0) {
            v.el.empty()
        }
        $(v.html).appendTo(v.el)
    }
}

const c = {
    init(selector) {
        v.init(selector)
        v.reader()
        c.addEventListeners()

    },
    events: {
        "mouseenter .circle": 'fn1',
        "mouseleave .circle": 'fn2',
    },
    fn1() {
        $(this).addClass('active')
    },
    fn2() {
        $(this).removeClass('active')

    },
    addEventListeners() {
        for (let key in c.events) {
            const fn = c[c.events[key]]
            const spanIndex = key.indexOf(' ')
            const event = key.slice(0, spanIndex)
            const node = key.slice(spanIndex + 1)

            v.el.on(event, node, fn)
        }
    }
}

c.init('#app4')