
(function () {
    const TOTAL_DAYS = 100; // Total projects
    const CHALLENGE_START_DATE = new Date("2025-08-01");// Change to your actual start date

    function getProgress() {
        const today = new Date();
        let completed = Math.floor((today - CHALLENGE_START_DATE) / (1000 * 60 * 60 * 24)) + 1;
        if (completed > TOTAL_DAYS) completed = TOTAL_DAYS;
        const remaining = TOTAL_DAYS - completed;
        const percentage = Math.round((completed / TOTAL_DAYS) * 100);
        return { completed, remaining, percentage };
    }

    function updateUI() {
        const { completed, remaining, percentage } = getProgress();

        document.getElementById('completed').textContent = completed;
        document.getElementById('remaining').textContent = remaining;
        document.getElementById('currentDay').textContent = completed;
        document.getElementById('percentage').textContent = percentage + '%';
        document.getElementById('progressBar').style.width = percentage + '%';

        const elMotivation = document.getElementById('motivationMessage');
        if (completed === 100) {
            elMotivation.textContent = '🎉 Challenge Complete! 100 projects accomplished — amazing!';
        } else if (completed >= 75) {
            elMotivation.textContent = `🚀 Momentum is unstoppable. Only ${remaining} projects left!`;
        } else if (completed >= 50) {
            elMotivation.textContent = '💡 Halfway there. Keep pushing — your portfolio is strong.';
        } else if (completed >= 25) {
            elMotivation.textContent = '💪 Building the portfolio. Every project adds value.';
        } else {
            elMotivation.textContent = '🎯 Kicking off strong. Each project is progress.';
        }

        // Optional: console log
        console.log(`Completed: ${completed}, Remaining: ${remaining}, ${percentage}%`);
    }

    // Set project links (optional)
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('live-link').href = "https://github.com/Tejesh-dev/100-Days-100-Projects-Challenge";
        document.getElementById('github-link').href = "https://github.com/Tejesh-dev/100-Days-100-Projects-Challenge";
        updateUI();
    });

})();
