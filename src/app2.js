import $ from 'jquery'
import './app2.css'

const eventBus = $(window)
//m 负责数据
const m = {
    data: {
        index: parseInt(localStorage.getItem('index') || 0)
    },
    create() { },
    delete() { },
    update(data) {
        Object.assign(m.data, data)
        v.reader(m.data.index)
        localStorage.setItem('index', m.data.index)
    },
    get() { }

}
//v负责ui界面
const v = {
    el: null,
    html(index) {
        return `
        <div>
        <ol class="tab-bar">
            <li class="${index === 0 ? 'active' : ''}" data-index="0"><span>111</span></li>
            <li class="${index === 1 ? 'active' : ''}" data-index="1"><span>222</span></li>
        </ol>
        <ol class="tab-content">
            <li class="${index === 0 ? "active" : ""}">内容1</li>
            <li class="${index === 1 ? "active" : ""}">内容2</li>
        </ol>
        </div> 
        `
    },
    init(selector) {
        v.el = $(selector)
    },
    reader(index) {
        if (v.el.children().length !== 0) {
            v.el.empty()
        }
        $(v.html(index)).appendTo(v.el)
    }

}
//c负责其他
const c = {
    init(selector) {
        v.init(selector)
        v.reader(m.data.index)
        c.addEventListeners()
        eventBus.on('m:update', () => {
            v.reader(m.data.index)
        })
    },
    events: {
        "click .tab-bar>li ": 'puls',
    },
    puls(e) {
        const index = parseInt(e.currentTarget.dataset.index)
        m.update({ index: index })
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


