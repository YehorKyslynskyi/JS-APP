export function isValid(value) {
    return value.length >= 10 ;
}

export function isUser(user) {
    return user
}

export function showModal() {
    showCover();
    let modal = document.querySelector('#login-form-container');
    modal.style.display = 'block';
}

export function hideModal() {
    hideCover();
    let modal = document.querySelector('#login-form-container');
    modal.style.display = 'none';
}
function showCover() {
    let coverDiv = document.createElement('div');
    coverDiv.id = 'cover-div';

    // убираем возможность прокрутки страницы во время показа модального окна с формой
    document.body.style.overflowY = 'hidden';

    document.body.append(coverDiv);
}

export function hideCover() {
    document.getElementById('cover-div').remove();
    document.body.style.overflowY = '';
}