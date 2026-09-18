let playerInventory = JSON.parse(localStorage.getItem('sandwichInventory')) || [];

const allIngredients = {
    'eggs': 'Diced boiled egg *2',
    'bird': 'Bird from tr mehe window',
    'creamcheese': 'Cream cheese',
    'pickles': 'Dill pickles from Prismo',
    'dill': 'Dill',
    'cucumber': 'Common cucumber',
    'tomato': 'Sliced Roma tomato',
    'onion': 'Organic yellow onion',
    'tears': 'Tears for salt',
    'sousvide': 'Meat from the sous-vide (rosemary & thyme)',
    'bacon': 'Bacon',
    'lobster': 'Lobster soul'
};

window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('fade-overlay');
    if (overlay) {
        overlay.classList.add('active');
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 50);
    }

    playerInventory.forEach(itemName => {
        if (itemName === 'eggs') {
            let egg1 = document.getElementById('item-egg1');
            let egg2 = document.getElementById('item-egg2');
            if (egg1) egg1.style.display = 'none';
            if (egg2) egg2.style.display = 'none';
        } else {
            let itemEl = document.getElementById(`item-${itemName}`);
            if (itemEl) {
                itemEl.style.display = 'none';
            }
        }
    });

    document.querySelectorAll('[onclick*="collectItem"]').forEach(el => {
        const match = el.getAttribute('onclick').match(/collectItem\(['"]([^'"]+)['"]\s*,\s*this\)/);
        if (match && playerInventory.includes(match[1])) {
            el.style.display = 'none';
        }
    });

    buildChecklist();
});

function collectItem(itemName, element) {
    if (!playerInventory.includes(itemName)) {
        playerInventory.push(itemName);
        localStorage.setItem('sandwichInventory', JSON.stringify(playerInventory));
    }
    element.style.transform = 'translate(-50%, -50%) scale(1.5)';
    element.style.opacity = '0';
    setTimeout(() => {
        element.style.display = 'none';
    }, 300);

    buildChecklist();
}

function toggleMenu() {
    const modal = document.getElementById('checklist-modal');
    if (modal) {
        modal.classList.toggle('active');
        buildChecklist();
    }
}

function buildChecklist() {
    const listContainer = document.getElementById('ingredient-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    for (let key in allIngredients) {
        let li = document.createElement('li');
        let isCollected = playerInventory.includes(key);
        
        li.textContent = `${isCollected ? '✔' : '✖'} ${allIngredients[key]}`;
        li.className = isCollected ? 'item-collected' : 'item-missing';
        
        listContainer.appendChild(li);
    }
}

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
        window.location.href = 'treehouse.html';
    }, 400);
}

function enterLivingRoom() {
    const overlay = document.getElementById('fade-overlay');
    if (overlay) overlay.classList.add('active');
    setTimeout(() => {
        window.location.href = 'livingroom.html';
    }, 400);
}

function goToPage(url) {
    const overlay = document.getElementById('fade-overlay');
    if (overlay) {
        overlay.classList.add('active');
        setTimeout(() => {
            window.location.href = url;
        }, 400);
    } else {
        window.location.href = url;
    }
}

const correctSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let currentStep = 0;

function handleRockClick(rockId) {
    const clickedBtn = document.getElementById(`rock-${rockId}`);

    if (rockId === correctSequence[currentStep]) {
        clickedBtn.classList.add('glow');
        currentStep++;

        if (currentStep === correctSequence.length) {
            setTimeout(() => {
                const modal = document.getElementById('puzzle-modal');
                if (modal) modal.classList.add('active');
            }, 300);
        }
    } else {
        resetPuzzle();
        clickedBtn.classList.add('wrong');
        setTimeout(() => {
            clickedBtn.classList.remove('wrong');
        }, 300);
    }
}

function resetPuzzle() {
    currentStep = 0;
    correctSequence.forEach(id => {
        const btn = document.getElementById(`rock-${id}`);
        if (btn) btn.classList.remove('glow');
    });
}
function checkAllItemsCollected() {
    const allKeys = Object.keys(allIngredients);
    const hasAll = allKeys.every(key => playerInventory.includes(key));
    
    if (hasAll) {
        const victoryModal = document.getElementById('victory-prompt-modal');
        if (victoryModal) {
            victoryModal.classList.add('active');
        }
    }
}