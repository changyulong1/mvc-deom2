import $ from 'jquery'
import './app1.css'

//m model 负责操作数据的

const eventBus = $(window)

const m = {
    data: {
        n: parseInt(localStorage.getItem('n')) || 100
    },
    create() { },
    delete() { },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:update')
        localStorage.setItem('n', m.data.n)
    },
    get() { }
}

//v view 负责所有ui界面

const v = {
    el: null,
    html: `
    <div>
    <div class="output">
        <span id="number">{{n}}</span>
    </div>
    <div class="count">
        <button id="puls">+1</button>
        <button id="reduce">-1</button>
        <button id="ride">*2</button>
        <button id="except">/2</button>
    </div>
    </div>
    `,
    init(selector) {
        v.el = $(selector)
    },
    reader(n) {
        if (v.el.children().length !== 0) {
            v.el.empty()
        }
        $(v.html.replace('{{n}}', parseInt(n))).appendTo(v.el)
    }
}

//c 控制器 负责其他
const c = {
    init(selector) {
        v.init(selector)
        v.reader(m.data.n)
        c.addEventListeners()
        eventBus.on('m:update', () => {
            v.reader(m.data.n)
        })
    },
    events: {
        "click #puls": 'puls',
        "click #reduce": 'reduce',
        "click #ride": 'ride',
        "click #except": 'except'
    },
    puls(e) {

        m.update({ n: m.data.n + 1 })
    },
    reduce() {

        m.update({ n: m.data.n - 1 })

    },
    ride() {

        m.update({ n: m.data.n * 2 })

    },
    except() {

        m.update({ n: m.data.n / 2 })
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
// c.init('#app1')
export default c



