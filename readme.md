(function () {
    /* ====== Configuration ====== */
    const DEFAULT_COMPLETED = 49;          // the number you want to show by default
    const LOCAL_KEY = 'challengeProgress'; // localStorage key
    const PASSKEY = 'pankajbhagat';        // admin passkey

    /* Wait until DOM ready */
    document.addEventListener('DOMContentLoaded', () => {
        // Elements (look up after DOM loaded)
        const elCompleted = document.getElementById('completed');
        const elRemaining = document.getElementById('remaining');
        const elCurrentDay = document.getElementById('currentDay');
        const elPercentage = document.getElementById('percentage');
        const elProgressBar = document.getElementById('progressBar');
        const elMotivation = document.getElementById('motivationMessage');
        const completedStatBox = document.getElementById('completedStatBox');

        const adminPanel = document.getElementById('adminPanel');
        const passkeyInput = document.getElementById('passkeyInput');
        const adminApplyBtn = document.getElementById('adminApplyBtn');
        const adminCancelBtn = document.getElementById('adminCancelBtn');

        // Links (set to whatever you want)
        const projectLiveLink = 'https://github.com/Tejesh-dev/100-Days-100-Projects-Challenge';
        const projectGithubLink = 'https://github.com/Tejesh-dev/100-Days-100-Projects-Challenge';

        document.getElementById('live-link').href = projectLiveLink;
        document.getElementById('github-link').href = projectGithubLink;

        // Read saved progress if present; otherwise use default
        let saved = localStorage.getItem(LOCAL_KEY);
        let completed = (saved !== null && saved !== '') ? parseInt(saved, 10) : DEFAULT_COMPLETED;

        // clamp utility
        function clamp(n) { return Math.max(0, Math.min(100, Math.round(n))); }

        function updateUI() {
            completed = clamp(completed);
            const remaining = 100 - completed;
            const percentage = Math.round((completed / 100) * 100);

            elCompleted.textContent = completed;
            elRemaining.textContent = remaining;
            elCurrentDay.textContent = completed;
            elPercentage.textContent = percentage + '%';
            elProgressBar.style.width = percentage + '%';
            elProgressBar.parentElement.setAttribute('aria-valuenow', percentage);

            // motivation messages
            if (completed === 100) {
                elMotivation.textContent = '🎉 Challenge Complete! 100 projects accomplished — great work.';
            } else if (completed >= 75) {
                elMotivation.textContent = `🚀 Momentum is unstoppable. Only ${remaining} projects left!`;
            } else if (completed >= 50) {
                elMotivation.textContent = '💡 Halfway there. Keep pushing — your portfolio is strong.';
            } else if (completed >= 25) {
                elMotivation.textContent = '💪 Building the portfolio. Every project adds value.';
            } else {
                elMotivation.textContent = '🎯 Kicking off strong. Each project is progress.';
            }

            // persist
            localStorage.setItem(LOCAL_KEY, String(completed));
            console.log(`Progress updated: completed=${completed}, remaining=${remaining}, percentage=${percentage}%`);
        }

        // Triple-click handler to show admin
        let clickCount = 0;
        completedStatBox.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 3) {
                adminPanel.classList.add('active');
                adminPanel.setAttribute('aria-hidden', 'false');
                passkeyInput.value = '';
                passkeyInput.focus();
                clickCount = 0;
            }
            setTimeout(() => { clickCount = 0; }, 900);
        });

        // Admin apply button: check passkey then prompt for new value (or increment)
        adminApplyBtn.addEventListener('click', () => {
            const key = passkeyInput.value.trim();
            if (key !== PASSKEY) {
                alert('Incorrect passkey. Try again.');
                passkeyInput.focus();
                return;
            }

            // ask user for new number (or leave blank to increment)
            let input = prompt('Enter new completed number (0-100). Leave blank to increment by 1:', String(completed));
            if (input === null) { // user cancelled
                closeAdmin();
                return;
            }

            input = input.trim();
            if (input === '') {
                completed = clamp(completed + 1);
            } else {
                const n = parseInt(input, 10);
                if (Number.isNaN(n)) {
                    alert('Invalid number. Please enter an integer 0–100.');
                    return;
                }
                completed = clamp(n);
            }

            updateUI();
            closeAdmin();
        });

        adminCancelBtn.addEventListener('click', closeAdmin);

        function closeAdmin() {
            adminPanel.classList.remove('active');
            adminPanel.setAttribute('aria-hidden', 'true');
            passkeyInput.value = '';
        }

        // initialize UI
        updateUI();

        // debug helper: click Completed box while holding Shift to clear localStorage and reset default
        completedStatBox.addEventListener('dblclick', (ev) => {
            if (ev.shiftKey) {
                if (confirm('Clear saved progress and reset to default?')) {
                    localStorage.removeItem(LOCAL_KEY);
                    completed = DEFAULT_COMPLETED;
                    updateUI();
                    alert('Reset done.');
                }
            }
        });

        // expose updateUI for console testing
        window.__challenge = { updateUI, setCompleted: (n) => { completed = clamp(n); updateUI(); } };

    }); // DOMContentLoaded end
})();
