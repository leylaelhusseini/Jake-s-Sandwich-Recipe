function goToMap() {
    const overlay = document.getElementById('fade-overlay');
    if (overlay) overlay.classList.add('active');

    setTimeout(() => {
        document.getElementById('home-screen').classList.remove('active');
        document.getElementById('map-screen').classList.add('active');
        
        setTimeout(() => {
            if (overlay) overlay.classList.remove('active');
        }, 400);
    }, 400);
}

function enterTreehouse() {
    const overlay = document.getElementById('fade-overlay');
    if (overlay) overlay.classList.add('active');

    setTimeout(() => {
        window.location.href = 'livingroom.html';
    }, 400);
}

function goToPage(pageUrl) {
    const overlay = document.getElementById('fade-overlay');
    if (overlay) overlay.classList.add('active');

    setTimeout(() => {
        window.location.href = pageUrl;
    }, 400);
}