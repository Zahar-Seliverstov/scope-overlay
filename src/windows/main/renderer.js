currentScopeIndex = '';

document.addEventListener('DOMContentLoaded', async () => {
    const scopesContainer = document.getElementById('scopes-container');

    const scopes = await window.electron.getAvailableScopes();

    scopes.forEach((scoped, index) => {
        scopesContainer.innerHTML += `<div id="scope-${index}" class="scope"><img id="scope-${index}" class="scope-image" src="${scoped}"></div>`;
    });

    const scopesElements = document.querySelectorAll('.scope');

    scopesElements.forEach((scope) => {
        scope.addEventListener('click', () => {
            window.electron.changeScoped(scope.children[0].src);
            currentScopeIndex = scope.id;
            scope.style.backgroundColor = '#3C3F4B';
            document.querySelectorAll('.scope').forEach((scope) => {scope.id === currentScopeIndex ? scope.style.backgroundColor = '#4E7FCD' : scope.style.backgroundColor = '#2D313A'; });
            
        });
    });
});