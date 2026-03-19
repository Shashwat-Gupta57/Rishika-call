// js/album.js - Scrapbook pagination Logic

document.addEventListener('DOMContentLoaded', () => {
  const TOTAL_PHOTOS = 18; // We need ~18-20 photos here (using 12 to 30)
  const START_PHOTO_INDEX = 12; // Reserving 1-11 for other pages
  
  const spreadCount = 3; // 18 photos / 6 photos per spread (3 on left, 3 on right)
  let currentSpread = 1;

  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const indicator = document.getElementById('page-indicator');
  const pageLeft = document.getElementById('page-left');
  const pageRight = document.getElementById('page-right');
  const notebook = document.getElementById('notebook');

  const funnyCaptions = [
    "Best memories ✨", "Math > Call?", "Looking beautiful! ✨", "Lucknow vibe", 
    "Waiting forever", "Why no call", "you loook really cute tho", "Rishika pls"
  ];

  function getRandVal() {
    return Math.random();
  }

  function getRandCaption() {
    return funnyCaptions[Math.floor(Math.random() * funnyCaptions.length)];
  }

  function renderSpread(spreadNum) {
    // Basic flip animation classes reset
    pageLeft.style.opacity = 0;
    pageRight.style.opacity = 0;

    setTimeout(() => {
      let leftHtml = `<div class="page-title handwritten">Memories Part ${spreadNum}</div>`;
      let rightHtml = ``;

      const startIdx = START_PHOTO_INDEX + ((spreadNum - 1) * 6);
      
      // Left Page (3 photos)
      for(let i=0; i<3; i++) {
        let photoNum = startIdx + i;
        if(photoNum < START_PHOTO_INDEX + TOTAL_PHOTOS) {
          leftHtml += `
            <div class="polaroid album-photo" style="--rand-tilt: ${getRandVal()}; margin-top: 30px;">
              <div class="tape"></div>
              <img src="res/photo-${photoNum}.png" alt="Scrapbook photo" ${[16, 18, 19].includes(photoNum) ? 'style="object-position: top;"' : ''}>
              <div class="caption">${getRandCaption()}</div>
            </div>`;
        }
      }

      // Right Page (3 photos)
      for(let i=3; i<6; i++) {
        let photoNum = startIdx + i;
        if(photoNum < START_PHOTO_INDEX + TOTAL_PHOTOS) {
          rightHtml += `
            <div class="polaroid album-photo" style="--rand-tilt: ${getRandVal()}; margin-top: 20px;">
              <div class="tape"></div>
              <img src="res/photo-${photoNum}.png" alt="Scrapbook photo" ${[16, 18, 19].includes(photoNum) ? 'style="object-position: top;"' : ''}>
              <div class="caption">${getRandCaption()}</div>
            </div>`;
        }
      }

      pageLeft.innerHTML = leftHtml;
      pageRight.innerHTML = rightHtml;

      pageLeft.style.opacity = 1;
      pageRight.style.opacity = 1;

      indicator.innerText = `Spread ${currentSpread} / ${spreadCount}`;
      btnPrev.disabled = currentSpread === 1;
      btnNext.disabled = currentSpread === spreadCount;
    }, 200);
  }

  btnNext.addEventListener('click', () => {
    if(currentSpread < spreadCount) {
      notebook.style.transform = "scale(0.98)";
      setTimeout(()=>{ notebook.style.transform = "scale(1)"; }, 150);
      currentSpread++;
      renderSpread(currentSpread);
    }
  });

  btnPrev.addEventListener('click', () => {
    if(currentSpread > 1) {
      notebook.style.transform = "scale(0.98)";
      setTimeout(()=>{ notebook.style.transform = "scale(1)"; }, 150);
      currentSpread--;
      renderSpread(currentSpread);
    }
  });

  // Initial render
  setTimeout(() => renderSpread(currentSpread), 100);
});
