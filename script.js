document.addEventListener('DOMContentLoaded', () => {

  const data =  {
    "image_src": "/Users/samuelgibson/Documents/GitHub/fm-gai-lottie-sentence-box-v1/media/img/18-09-2024-20-05-20.png",
    "sentence": "She is wearing orange trousers and a red hat.",
    "boxes": [
      "She",
      "is wearing",
      "orange trousers",
      "and",
      "a red hat"
    ],
    "cefr_level": "a2",
    "target_vocabulary": [
      "orange trousers",
      "red hat",
      "gloves",
      "big shoes"
    ],
    "target_grammar": [
      "is wearing",
      "are wearing"
    ],
    "user_choice": [],
    "submitted": false
  }
  
  function allDropTargetsPopulated() {
    const dropTargets = document.querySelectorAll('.droptarget');
    return Array.from(dropTargets).every(target => target.textContent !== 'drop here');
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  document.querySelector('.image').innerHTML = `<img src="${data.image_src}" alt="Image">`;
  const dropTargetContainer = document.getElementById('dropTargetContainer');
  const boxesContainer = document.getElementById('boxesContainer');
  dropTargetContainer.innerHTML = ''; 
  boxesContainer.innerHTML = '';
  
  shuffleArray(data.boxes);
  
  data.boxes.forEach((box, index) => {
    const droptarget = document.createElement('div');
    droptarget.classList.add('droptarget');
    droptarget.textContent = 'drop here';
    dropTargetContainer.appendChild(droptarget);
  });

  data.boxes.forEach((box, index) => {
    const draggable = document.createElement('div');
    draggable.classList.add('draggable', `box-${index}`);
    draggable.setAttribute('draggable', 'true');
    draggable.textContent = box;
    boxesContainer.appendChild(draggable);
  });

  document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', item.textContent);
    });
  });

  function evaluateSentence() {
    const dropTargets = document.querySelectorAll('.droptarget');
    const userSentence = Array.from(dropTargets).map(target => target.textContent).join(' ');
    if (data.sentence.endsWith('.')) {
      data.sentence = data.sentence.slice(0, -1);
    }
    if (userSentence === data.sentence) {
      document.querySelectorAll('.droptarget').forEach(item => {
        item.classList.add('correct');});
    } else {
      document.querySelectorAll('.droptarget').forEach(item => {
        item.classList.add('incorrect');
      });
      // sleep for 2 seconds
      setTimeout(() => {
        document.querySelectorAll('.droptarget').forEach(item => {
          item.classList.remove('incorrect');
          dropTargets.forEach(target => {
            target.textContent = 'drop here';
            target.classList.remove('incorrect');
            target.classList.remove('accepted');
          });
        });
      }, 2000);
    }
  }

  document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', item.textContent);
    });
  });

  document.querySelectorAll('.droptarget').forEach(item => {
    item.addEventListener('dragover', event => {
      event.preventDefault();
    });
    item.addEventListener('dragleave', event => {
      item.classList.remove('hover');
    });
    item.addEventListener('dragenter', event => {
      item.classList.add('hover');
    });
    item.addEventListener('drop', event => {
      item.classList.remove('hover');
      item.textContent = event.dataTransfer.getData('text/plain');
      item.classList.add('accepted');

      if (allDropTargetsPopulated()) {
        evaluateSentence();
      }

    });
  });
});