// setting default wardrobe for demo
let tops = ['images/tops/top1.png', 'images/tops/top2.png', 'images/tops/top3.png', 'images/tops/top4.png', 'images/tops/shirt5.png', 'images/tops/shirt7.png', 'images/tops/shirt8.png']; 
let bottoms = ['images/bottoms/bottom1.png', 'images/bottoms/bottom2.png', 'images/bottoms/bottom3.png', 'images/bottoms/bottom5.png', 'images/bottoms/bottom6.png', 'images/bottoms/bottom7.png', 'images/bottoms/bottom8.png', 'images/bottoms/bottom9.png']; 
let shoes = ['images/shoes/shoes1.png', 'images/shoes/shoes2.png', 'images/shoes/shoes3.png', 'images/shoes/shoes4.png', 'images/shoes/shoes6.png', 'images/shoes/shoes7.png', 'images/shoes/shoes8.png', 'images/shoes/shoes9.png']; 

// set variables
let currentSection = 'top'; 
let currentTopIndex = 0; 
let currentBottomIndex = 0; 
let currentShoesIndex = 0; 

// some functions placed outside DOMContentLoaded as i experienced bugs with the loading order, for real implementation, the code would not be ordered or structured this way

// loading saved wardrobe from local storage
function loadWardrobe() {
    try {
        tops = JSON.parse(localStorage.getItem('tops')) || ['images/tops/top1.png', 'images/tops/top2.png', 'images/tops/top3.png', 'images/tops/top4.png', 'images/tops/shirt5.png', 'images/tops/shirt7.png', 'images/tops/shirt8.png'];
        bottoms = JSON.parse(localStorage.getItem('bottoms')) || ['images/bottoms/bottom1.png', 'images/bottoms/bottom2.png', 'images/bottoms/bottom3.png', 'images/bottoms/bottom5.png', 'images/bottoms/bottom6.png', 'images/bottoms/bottom7.png', 'images/bottoms/bottom8.png', 'images/bottoms/bottom9.png'];
        shoes = JSON.parse(localStorage.getItem('shoes')) || ['images/shoes/shoes1.png', 'images/shoes/shoes2.png', 'images/shoes/shoes3.png', 'images/shoes/shoes4.png', 'images/shoes/shoes6.png', 'images/shoes/shoes7.png', 'images/shoes/shoes8.png', 'images/shoes/shoes9.png'];
        updateWardrobe();
    } catch (error) {
        console.error('Error loading wardrobe:', error);
        // Reset to defaults if there's an error
        tops = ['images/tops/top1.png', 'images/tops/top2.png', 'images/tops/top3.png', 'images/tops/top4.png', 'images/tops/shirt5.png', 'images/tops/shirt7.png', 'images/tops/shirt8.png']; 
        bottoms = ['images/bottoms/bottom1.png', 'images/bottoms/bottom2.png', 'images/bottoms/bottom3.png', 'images/bottoms/bottom5.png', 'images/bottoms/bottom6.png', 'images/bottoms/bottom7.png', 'images/bottoms/bottom8.png', 'images/bottoms/bottom9.png']; 
        shoes = ['images/shoes/shoes1.png', 'images/shoes/shoes2.png', 'images/shoes/shoes3.png', 'images/shoes/shoes4.png', 'images/shoes/shoes6.png', 'images/shoes/shoes7.png', 'images/shoes/shoes8.png', 'images/shoes/shoes9.png']; 
        updateWardrobe();
    }
}
 
// update wardrobe with each addition
function updateWardrobe() {
    const updateSection = (sectionId, items) => {
        const container = document.getElementById(sectionId);
        if (!container) return;

        if (items.length) {
            container.innerHTML = items.map((item, index) => `
                <div class="wardrobe-item-container">
                    <img src="${item}" class="wardrobe-item" alt="${sectionId} item">
                    <button class="delete-btn" data-section="${sectionId}" data-index="${index}">×</button>
                </div>
            `).join('');

            // add delete button event listeners for each item
            const deleteButtons = container.getElementsByClassName('delete-btn');
            Array.from(deleteButtons).forEach(button => {
                button.addEventListener('click', handleDelete);
            });
        } else {
            container.innerHTML = `<p>No ${sectionId} added yet.</p>`;
        }
    };

    updateSection('tops', tops);
    updateSection('bottoms', bottoms);
    updateSection('shoes', shoes);
}

// saving wardrobe data
function saveWardrobe() { 
    localStorage.setItem('tops', JSON.stringify(tops)); 
    localStorage.setItem('bottoms', JSON.stringify(bottoms)); 
    localStorage.setItem('shoes', JSON.stringify(shoes)); 
} 

// delete handler function
function handleDelete(event) {
    const section = event.target.dataset.section;
    const index = parseInt(event.target.dataset.index);
    
    // remove item from appropriate array
    switch(section) {
        case 'tops':
            tops.splice(index, 1);
            break;
        case 'bottoms':
            bottoms.splice(index, 1);
            break;
        case 'shoes':
            shoes.splice(index, 1);
            break;
    }

    // update localStorage
    saveWardrobe();
    // refresh display
    updateWardrobe();
}

// navigation 
document.getElementById('home-btn').addEventListener('click', () => { 
    document.getElementById('home-page').style.display = 'block'; 
    document.getElementById('wardrobe-page').style.display = 'none'; 
    updateNavButtons('home-btn'); 
}); 
document.getElementById('wardrobe-btn').addEventListener('click', () => { 
    document.getElementById('home-page').style.display = 'none'; 
    document.getElementById('wardrobe-page').style.display = 'block'; 
    updateNavButtons('wardrobe-btn'); 
}); 

// handling the switch between tabs
function updateNavButtons(activeButtonId) { 
    const navButtons = document.getElementsByClassName('nav-btn'); 
    for (let button of navButtons) { button.classList.remove('active'); } 
    document.getElementById(activeButtonId).classList.add('active'); 
} 
        
document.addEventListener('DOMContentLoaded', () => { 
    // page loading and display
    document.getElementById('home-page').style.display = 'block'; 
    document.getElementById('wardrobe-page').style.display = 'none'; 
    updateNavButtons('home-btn'); 

    // set first images to be displayed once loaded
    const topImage = document.getElementById('top-image'); 
    const bottomImage = document.getElementById('bottom-image'); 
    const shoesImage = document.getElementById('shoes-image'); 
   
    // initial load of wardrobe from local storage
    loadWardrobe();

    // added music, only one song for now, in the future, will be a short playlist
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.textContent = '🔈';
        } else {
            bgMusic.play();
            musicToggle.textContent = '🔊';
        }
        isPlaying = !isPlaying;
    }); 

    // help icon functionality, imported design from swal
    document.getElementById('help-btn').addEventListener('click', () => {
        Swal.fire({
            title: 'How to Upload Items',
            html: `
                <p>🎀 Place item on a blank background</p>
                <p>👚 Take a photo of the item laid out uniformly</p>
                <p>🌀 Long-press the item in the image until it's outlined</p>
                <p>🍭 Select "Share…" and then "Save as Image"</p>
                <p>🦄 Upload the outlined item here</p>
            `,
            imageUrl: 'images/uploading.gif',
            imageWidth: 100,
            imageHeight: 100,
            confirmButtonColor: '#ff69b4',
            confirmButtonText: ' Got it! ✨ ',
            customClass: {
                popup: 'swal-custom',
                title: 'swal-title',
                confirmButton: 'swal-confirm'
            }
        });
    });

    // upload fucntionality, design by swal
    document.getElementById('upload-btn-wardrobe').addEventListener('click', () => {
        Swal.fire({
            title: 'Add to Wardrobe',
            html: `
                <div class="cute-upload-form">
                    <div class="form-group">
                        <label for="upload-file" class="upload-label">Choose an image:</label>
                        <input type="file" id="upload-file" accept="image/*" class="file-input">
                    </div>
                    
                    <div class="form-group">
                        <label for="category-select">Category:</label>
                        <select id="category-select" class="category-select">
                            <option value="">Select a category</option>
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                            <option value="shoes">Shoes</option>
                        </select>
                    </div>
    
                    <div class="preview-container">
                        <img id="upload-preview" style="display: none;" alt="Upload preview">
                    </div>
                </div>
            `,
            imageUrl: 'images/heart2.gif',
            imageWidth: 100,
            imageHeight: 100,
            showCancelButton: true,
            confirmButtonText: 'Upload',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#ff69b4',
            cancelButtonColor: '#d33',
            background: '#fff',
            customClass: {
                popup: 'swal-custom',
                title: 'swal-title',
                confirmButton: 'swal-confirm',
                cancelButton: 'swal-cancel'
            },
            preConfirm: () => {
                // file and category select check
                const file = document.getElementById('upload-file').files[0];
                const category = document.getElementById('category-select').value;
                
                if (!file) {
                    Swal.showValidationMessage('Please select an image');
                    return false;
                }
                if (!category) {
                    Swal.showValidationMessage('Please select a category');
                    return false;
                }
                
                return { file, category };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const reader = new FileReader();
                reader.onload = () => {
                    addImage(reader.result, result.value.category);
                    
                    // success message
                    Swal.fire({
                        title: 'Uploaded!',
                        text: 'Your item has been added to the wardrobe!',
                        imageUrl: 'images/uploadedRibbon.gif',
                        imageWidth: 100,
                        imageHeight: 100,
                        confirmButtonColor: '#ff69b4',
                        confirmButtonText: ' OK 💗 ',
                        customClass: {
                            popup: 'swal-custom',
                            title: 'swal-title',
                            confirmButton: 'swal-confirm'
                        }
                    });
                };
                reader.readAsDataURL(result.value.file);
            }
        });
    
        // preview functionality
        document.getElementById('upload-file').addEventListener('change', function(e) {
            const preview = document.getElementById('upload-preview');
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // reset functionality, design by swal
    document.getElementById('reset-btn').addEventListener('click', () => {
        Swal.fire({
            title: 'Reset Wardrobe?',
            text: 'This will delete all your uploaded items!',
            showCancelButton: true,
            confirmButtonColor: '#ff69b4',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reset it!',
            cancelButtonText: 'No, keep my items!',
            imageUrl: 'images/caution.gif',
            imageWidth: 200,
            imageHeight: 200,
            background: '#fff',
            customClass: {
                popup: 'swal-custom',
                title: 'swal-title',
                confirmButton: 'swal-confirm',
                cancelButton: 'swal-cancel',
                image: 'swal-image'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // reset wardrobe to default
                tops = ['images/tops/top1.png', 'images/tops/top2.png', 'images/tops/top3.png', 'images/tops/top4.png', 'images/tops/shirt5.png', 'images/tops/shirt7.png', 'images/tops/shirt8.png']; 
                bottoms = ['images/bottoms/bottom1.png', 'images/bottoms/bottom2.png', 'images/bottoms/bottom3.png', 'images/bottoms/bottom5.png', 'images/bottoms/bottom6.png', 'images/bottoms/bottom7.png', 'images/bottoms/bottom8.png', 'images/bottoms/bottom9.png']; 
                shoes = ['images/shoes/shoes1.png', 'images/shoes/shoes2.png', 'images/shoes/shoes3.png', 'images/shoes/shoes4.png', 'images/shoes/shoes6.png', 'images/shoes/shoes7.png', 'images/shoes/shoes8.png', 'images/shoes/shoes9.png']; 
                currentTopIndex = 0;
                currentBottomIndex = 0;
                currentShoesIndex = 0;
                
                localStorage.removeItem('tops');
                localStorage.removeItem('bottoms');
                localStorage.removeItem('shoes');
                
                updateWardrobe();
                
                document.getElementById('top-image').src = tops[0];
                document.getElementById('bottom-image').src = bottoms[0];
                document.getElementById('shoes-image').src = shoes[0];

                // success message
                Swal.fire({
                    title: 'Wardrobe Reset!',
                    text: 'Your wardrobe has been reset to default items',
                    confirmButtonColor: '#ff69b4',
                    confirmButtonText: ' OK 💚 ',
                    imageUrl: 'images/greenCheck.gif',
                    imageWidth: 200,
                    imageHeight: 200,
                    background: '#fff',
                    customClass: {
                        popup: 'swal-custom',
                        title: 'swal-title',
                        confirmButton: 'swal-confirm',
                        image: 'swal-image'
                    }
                });
            }
        });
    });
    
    // accessibility for those who can only navigate with keyboard, will expand later
    document.addEventListener('keydown', (event) => { if (document.getElementById('home-page').style.display !== 'none') { 
        switch(event.key) { 
            case 'ArrowUp': 
                navigateImage(-1, getCurrentSection()); 
                break; 
            case 'ArrowDown': 
                navigateImage(1, getCurrentSection()); 
                break; 
            case 'Tab': 
                event.preventDefault(); 
                cycleSection(); 
                break;
        } 
    } 
    }); 

    // for keyboard navigation
    function cycleSection() { 
        const sections = ['top', 'bottom', 'shoes']; 
        const currentIndex = sections.indexOf(currentSection); 
        currentSection = sections[(currentIndex + 1) % sections.length]; 
    } 

    function getCurrentSection() { return currentSection; } 

    // upload image
    function addImage(imageData, category) {
        // store the image data directly instead of creating a file path
        // before I was just taking in the file name and wondering why my items weren't displaying
        switch(category) {
            case 'top':
                tops.push(imageData);
                break;
            case 'bottom':
                bottoms.push(imageData);
                break;
            case 'shoes':
                shoes.push(imageData);
                break;
        }
        updateWardrobe();
        saveWardrobe();
    }
    
    // moving to next image on home page
    function updateImage(imageObject, newSrc) { 
        const newImage = new Image(); 
        newImage.onload = () => { 
            imageObject.style.opacity = '0'; 
            setTimeout(() => { 
                imageObject.src = newSrc; 
                imageObject.style.opacity = '1'; 
            }, 300); 
        }; 
        newImage.onerror = () => { 
            const category = imageObject.id.split('-')[0]; 
            imageObject.src = `images/${category}s/${category}1.png`; 
            // default
            imageObject.style.opacity = '1'; 
        }; 
        newImage.src = newSrc; 
    }

    // moving through images on home page, creating carousel effect
    const navigateImage = (direction, category) => { 
        let currentIndex, imageArray, imageElement; 
        
        switch (category) { 
            case 'top': 
                currentIndex = currentTopIndex; 
                imageArray = tops; 
                imageElement = topImage; 
                break; 
            case 'bottom': 
                currentIndex = currentBottomIndex; 
                imageArray = bottoms; 
                imageElement = bottomImage; 
                break; 
            case 'shoes': 
                currentIndex = currentShoesIndex; 
                imageArray = shoes; 
                imageElement = shoesImage; 
                break; 
        } 

        // calc new index
        let newIndex = currentIndex + direction; 
        if (newIndex < 0) newIndex = imageArray.length - 1; // carouseltype beat
        if (newIndex >= imageArray.length) newIndex = 0; // ^
        
        // update current index 
        switch (category) { 
            case 'top': 
                currentTopIndex = newIndex; 
                break; 
            case 'bottom': 
                currentBottomIndex = newIndex; 
                break;
            case 'shoes': 
                currentShoesIndex = newIndex; 
                break; 
        } 

        const newSrc = imageArray[newIndex] || 'default.png'; 
        updateImage(imageElement, newSrc); 
    }; 

    // prev/next clothing buttons
    document.getElementById('prev-top').addEventListener('click', () => navigateImage(-1, 'top')); 
    document.getElementById('next-top').addEventListener('click', () => navigateImage(1, 'top'));
    document.getElementById('prev-bottom').addEventListener('click', () => navigateImage(-1, 'bottom')); 
    document.getElementById('next-bottom').addEventListener('click', () => navigateImage(1, 'bottom')); 
    document.getElementById('prev-shoes').addEventListener('click', () => navigateImage(-1, 'shoes')); 
    document.getElementById('next-shoes').addEventListener('click', () => navigateImage(1, 'shoes')); 
});