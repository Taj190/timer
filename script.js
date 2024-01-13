function startNewTimer() {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;
  const audioPlayer = document.getElementById('audioPlayer');
  
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds > 0) {
    let remainingSeconds = totalSeconds;
    let intervalId;

    const display = document.getElementById('activeTimers');
     display.style.display ='flex'
    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timer-container');
    
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timerDisplay';

    const stopButton = document.createElement('button');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    stopButton.textContent = 'Stop';
    stopButton.classList.add('btn');
    deleteBtn.classList.add('btn');
    stopButton.id = 'stopBtn';
    deleteBtn.id = 'deleteBtn';

    stopButton.onclick = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = undefined;
        stopButton.textContent = 'Resume';
      } else {
        intervalId = setInterval(updateTimer, 1000);
        stopButton.textContent = 'Stop';
      }
    };

    deleteBtn.onclick = () => {
      display.removeChild(timerContainer);
      timerContainer.style.display ='none';
      clearInterval(intervalId);

    }

    timerContainer.appendChild(timerDisplay);
    timerContainer.appendChild(stopButton);
    timerContainer.appendChild(deleteBtn);

    display.appendChild(timerContainer);

    intervalId = setInterval(updateTimer, 1000);

    
    function updateTimer() {
      const hoursRemaining = Math.floor(remainingSeconds / 3600);
      const minutesRemaining = Math.floor((remainingSeconds % 3600) / 60);
      const secondsRemaining = remainingSeconds % 60;

      timerDisplay.textContent = `Time left : ${hoursRemaining}h  ${minutesRemaining}m   ${secondsRemaining}s`;

      if (remainingSeconds === 0) {
        clearInterval(intervalId);
        timerDisplay.textContent = 'Timer complete!';
        playAudio(); 
        timerContainer.style.background = 'yellow'
        timerContainer.removeChild(stopButton);
        timerContainer.removeChild(deleteBtn);
        
        setTimeout(() => {
          display.removeChild(timerContainer);
          timerContainer.style.display ='none';
          audioPlayer.pause();
        }, 5000);
      }

      remainingSeconds -= 1;
    }
  }
}

function playAudio() {
  if (audioPlayer) {
    audioPlayer.play();
  }
}
