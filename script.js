
document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 14;

    // Select DOM elements
    const steps = document.querySelectorAll('.step');
    const progressBar = document.getElementById('quiz-progress');
    const progressBarContainer = document.getElementById('progress-container');

    // Initialize
    showStep(currentStep);

    // Global function to go to next step
    window.nextStep = function () {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    };

    // Global function for option clicks
    window.selectOption = function (element) {
        // Add visual feedback (selected state)
        const allOptions = element.parentElement.querySelectorAll('.selection-card');
        allOptions.forEach(opt => opt.style.borderColor = 'transparent');
        element.style.borderColor = 'var(--primary-pink)';
        element.style.background = '#fff0f6'; // Light pink feedback

        // Small delay before moving next for "nice click" feel
        setTimeout(() => {
            nextStep();
        }, 300);
    };

    function showStep(stepNumber) {
        // Hide all steps
        steps.forEach(step => {
            step.classList.remove('active');
            // Scroll to top when changing steps
            window.scrollTo(0, 0);
        });

        // Show current step
        const currentStepEl = document.getElementById(`step-${stepNumber}`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }

        // Update Progress Bar
        if (progressBar && progressBarContainer) {
            // Logic: Steps 2-10 are the quiz part (9 questions).
            // Step 1 is Landing (0%), Step 11+ is post-quiz (100% or hidden).

            if (stepNumber >= 2 && stepNumber <= 10) {
                progressBarContainer.style.display = 'block';
                // 9 questions. Step 2 is Q1 (1/9), Step 10 is Q9 (9/9).
                const quizProgress = ((stepNumber - 1) / 9) * 100;
                progressBar.style.width = `${quizProgress}%`;
            } else {
                progressBarContainer.style.display = 'none';
            }
        }

        // Special handlers for specific steps
        if (stepNumber === 14) {
            startCountdown();
        }
    }

    // Timer Logic for Sales Page
    function startCountdown() {
        const timerEl = document.getElementById('countdown-timer');
        if (!timerEl) return;

        let time = 14 * 60 + 57; // 14:57

        const interval = setInterval(() => {
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;

            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            timerEl.textContent = `${minutes}:${seconds}`;

            time--;

            if (time < 0) {
                clearInterval(interval);
                timerEl.textContent = "00:00";
            }
        }, 1000);
    }
});
