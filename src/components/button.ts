/**
 * Button 按钮
 * 
 * @prop {string} color 按钮颜色
 * @prop {string} disabled 是否禁用
 */

const template = `
    <style>
        .sp-button-wrapper {
            height: 32px;
            border-radius: 8px;
            background-color: #ff6699;
            color: #fff;
            font-size: 14px;
            line-height: 32px;
            padding: 4px 15px;
        }
        .sp-button-wrapper:hover {
            opacity: 0.8;
            cursor: pointer;
        }
        .sp-button-wrapper.disabled {
            background-color: #f0f0f0 !important;
            color: #ccc !important;
        }
    </style>
    <div class="sp-button-wrapper">
        <slot name="text">My Button</slot>
    </div>
`

class Button extends HTMLElement {
    static observedAttributes = ['color', 'disabled']

    constructor() {
        super()

        // create shadow root
        const shadowRoot = this.attachShadow({ mode: 'open' })

        // insert template
        const templateDom = document.createElement('template')
        templateDom.id = 'spark-ui-button-template'
        templateDom.innerHTML = template
        document.body.appendChild(templateDom)

        shadowRoot.appendChild(templateDom.content.cloneNode(true))
    }

    connectedCallback() {
        console.log('button added to page.')
        this.render()
    }

    disconnectedCallback() {
        console.log('button removed from page.')
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log('button attribute changed.', name, oldValue, newValue)
        this.render()
    }

    

    render() {
        let shadowRoot = this.shadowRoot
        console.log('this', this)
        if (!shadowRoot) {
            shadowRoot = this.attachShadow({ mode: 'closed' })
            const templateDom = document.getElementById('spark-ui-button-template') as HTMLTemplateElement
            shadowRoot.appendChild(templateDom.content.cloneNode(true))
        }

        const wrap = shadowRoot.querySelector('.sp-button-wrapper') as HTMLDivElement
        const color = this.getAttribute('color')
        const disabled = this.getAttribute('disabled')

        if (wrap && color) {
            wrap.style.backgroundColor = color
        }

        if (wrap && disabled) {
            wrap.classList.add('disabled')
        }
    }
}

customElements.define('sp-button', Button)


