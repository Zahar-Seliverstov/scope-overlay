document.addEventListener('DOMContentLoaded', () => {
    const scoped = document.querySelector('.selected-scope');

    const scopedW = scoped.offsetWidth;
    const scopedH = scoped.offsetHeight;

    scoped.style.top = (window.innerHeight - scopedH / 2) / 2 + 'px';
    scoped.style.left = (window.innerWidth - scopedW / 2) / 2 + 'px';
})

window.electron.onScopedUpdate((pathToScoped) => {
    const scoped = document.querySelector('.selected-scope');    
    scoped.src = pathToScoped;
});
