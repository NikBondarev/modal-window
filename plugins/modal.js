Element.prototype.appendAfter = function(element){
    element.parentNode.insertBefore(this, element.nextSibling);
}
function noop () {}
const _createFooterModal = (buttons =[]) =>{
    if(buttons.length === 0){
        return document.createElement('div');
    }
    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer');
    buttons.forEach((button) => {
        const $btn = document.createElement('button');
        $btn.textContent = button.text;
        $btn.classList.add('btn');
        $btn.classList.add(`btn-${button.type || 'secondary'}`);
        $btn.onclick = button.handler || noop;
        wrap.appendChild($btn);
    })

    return wrap
}


const _createModal = (options) =>{
    DEFAULT_WIDTH = '600px';
    const modal = document.createElement('div');
    modal.classList.add('N-Modal');
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window style ="width: ${options.width || DEFAULT_WIDTH}"">
            <div class="modal-header">
                <span class="modal-title">
                    ${options.title || 'Window'}
                </span>
                ${options.closable ? `<span class = "modal-close" data-close = "true"> &times;</span>` : ''}
            </div>
            <div class="modal-body" data-content>
                ${options.content || ''}
            </div>
        </div>
    </div>
    `)
    const footer = _createFooterModal(options.footerButtons);
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal);
    return modal
}

$.modal = function(options){
    const $modal = _createModal(options);
    const ANIMATION_SPEED = 200;
    let closing = false;
    let destroyed = false;
    const modal = {
        open() {
            if(destroyed){
                return console.log('Modal is destroyed')
            }
            !closing && $modal.classList.add('open'); 
        }, 
        close() {
            closing = true
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout(()=>{
                $modal.classList.remove('hide');
                closing = false;
                if(typeof options.onClose === 'function'){
                    options.onClose();
                }
            }, ANIMATION_SPEED)
        }
    }
    const listener = event =>{
        if(event.target.dataset.close){
            modal.close();
        }
    }
    $modal.addEventListener('click', listener)
    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', listener)
            destroyed = true;
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html;
        }
    })
}