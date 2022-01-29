import './app3.css'
import $ from 'jquery'
const eventBus = $(window)
const m = {
    data: {
        has: localStorage.getItem('class')
    },
    create() { },
    delete() { },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:update')
        localStorage.setItem('class', m.data.has)
    },
    get() { }
}

const v = {
    el: null,
    html(has) {
        return `
        <div>
            <div class="square ${has === "yes" ? "active" : ""}"></div>
        </div>
`
    },
    init(selector) {
        v.el = $(selector)
    },
    reader(has) {
        if (v.el.children().length !== 0) {
            v.el.empty()
        }
        $(v.html(has)).appendTo(v.el)
    }
}

const c = {
    init(selector) {
        v.init(selector)
        v.reader(m.data.has)
        c.addEventListeners()
        eventBus.on('m:update', () => {
            v.reader(m.data.has)
        })
    },
    events: {
        "click .square": 'fn'
    },
    fn() {
        m.update({ has: m.data.has === "yes" ? "no" : "yes" })
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

export default c
