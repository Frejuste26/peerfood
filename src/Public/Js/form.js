window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const mainContent = document.querySelector('.container');

    // Cache le loader après 1 seconde et montre le contenu
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none'; // Cache définitivement le loader
            mainContent.style.display = 'block'; // Affiche le contenu
        }, 500); // Temps de transition
    }, 1000); // Délai d'attente avant de cacher le loader
});