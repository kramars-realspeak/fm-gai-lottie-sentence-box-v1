document.addEventListener('DOMContentLoaded', () => {
    const wordBoxes = document.querySelectorAll('.word-box');
    const dropBoxes = document.querySelectorAll('.drop-box');
    const submitBtn = document.getElementById('submit-btn');
    const correctOrder = ['Word1', 'Word2', 'Word3', 'Word4']; // Correct order for the example
  
    let draggedWord = null;
  
    // Add event listeners for drag events on word boxes
    wordBoxes.forEach(wordBox => {
      wordBox.addEventListener('dragstart', (event) => {
        draggedWord = event.target;
        setTimeout(() => event.target.classList.add('hidden'), 0); // Hide the dragged element temporarily
      });
  
      wordBox.addEventListener('dragend', (event) => {
        setTimeout(() => event.target.classList.remove('hidden'), 0); // Make the dragged element visible again
        draggedWord = null;
      });
    });

    // Add event listeners for drop areas
    dropBoxes.forEach(dropBox => {
      dropBox.addEventListener('dragover', (event) => {
        event.preventDefault(); // Prevent default to allow drop
        dropBox.classList.add('hovered'); // Optional visual feedback
      });

      dropBox.addEventListener('dragleave', () => {
        dropBox.classList.remove('hovered'); // Remove visual feedback
      });

      dropBox.addEventListener('drop', (event) => {
        event.preventDefault();
        dropBox.classList.remove('hovered');

        // Move the dragged word to the drop box if empty
        if (draggedWord && dropBox.children.length === 0) {
          dropBox.appendChild(draggedWord);
          draggedWord.classList.remove('hidden'); // Ensure it is visible
        }
      });
    });
  
    // Make the original word container a valid drop target to reset words
    const wordContainer = document.getElementById('word-container');
    wordContainer.addEventListener('dragover', (event) => {
      event.preventDefault(); // Prevent default to allow drop
    });
  
    wordContainer.addEventListener('drop', (event) => {
      event.preventDefault();
      if (draggedWord) {
        wordContainer.appendChild(draggedWord); // Return the word back to the word container
        draggedWord.classList.remove('hidden'); // Ensure it is visible
      }
    });
  
    // Submit button logic to check the order
    submitBtn.addEventListener('click', () => {
      let userAnswer = [];
      dropBoxes.forEach(box => {
        if (box.children.length > 0) {
          userAnswer.push(box.children[0].dataset.word);
        } else {
          userAnswer.push(null); // If a drop box is empty
        }
      });
  
      // Check if userAnswer matches the correctOrder
      if (userAnswer.length === correctOrder.length && userAnswer.every((val, index) => val === correctOrder[index])) {
        alert('Correct!');
      } else {
        alert('Incorrect! Please try again.');
      }
    });
  });