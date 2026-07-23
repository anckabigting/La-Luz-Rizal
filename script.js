document.addEventListener("DOMContentLoaded", () => {
    // 1. Smooth Back-to-Top Handler (Placed INSIDE DOMContentLoaded)
    const backToTopBtn = document.getElementById("back-to-top");

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Forces smooth scroll to top of window and document root
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            document.documentElement.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 2. Initialize AOS Scroll Animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // 3. Scroll Progress Bar Effect
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById("progress-bar");
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    });

    // 4. Fact Carousel Logic
    const factCards = document.querySelectorAll(".fact-card");
    const prevBtn = document.getElementById("prevFact");
    const nextBtn = document.getElementById("nextFact");
    let currentFactIndex = 0;

    function showFact(index) {
        factCards.forEach((card, i) => {
            card.classList.toggle("active", i === index);
        });
    }

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentFactIndex = (currentFactIndex + 1) % factCards.length;
            showFact(currentFactIndex);
        });

        prevBtn.addEventListener("click", () => {
            currentFactIndex = (currentFactIndex - 1 + factCards.length) % factCards.length;
            showFact(currentFactIndex);
        });
    }

    // 5. Interactive Rizal Quiz Engine
    const quizData = [
        {
            question: "What was the title of Jose Rizal's first patriotic novel?",
            options: ["El Filibusterismo", "Noli Me Tángere", "Mi Último Adiós"],
            correct: 1
        },
        {
            question: "In what year was Jose Rizal executed at Bagumbayan?",
            options: ["1892", "1896", "1898"],
            correct: 1
        },
        {
            question: "Which organization did Rizal establish upon returning to Manila in 1892?",
            options: ["La Liga Filipina", "Katipunan", "La Solidaridad"],
            correct: 0
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionEl = document.getElementById("quiz-question");
    const optionsEl = document.getElementById("quiz-options");
    const feedbackEl = document.getElementById("quiz-feedback");
    const nextBtnQuiz = document.getElementById("next-btn");
    const qNumEl = document.getElementById("question-number");

    function loadQuiz() {
        if (!questionEl) return;
        
        feedbackEl.innerText = "";
        nextBtnQuiz.classList.add("hidden");
        optionsEl.innerHTML = "";

        const currentData = quizData[currentQuestionIndex];
        qNumEl.innerText = `Question ${currentQuestionIndex + 1}`;
        questionEl.innerText = currentData.question;

        currentData.options.forEach((optionText, index) => {
            const btn = document.createElement("button");
            btn.classList.add("option-btn");
            btn.innerText = optionText;
            btn.addEventListener("click", () => selectOption(index, currentData.correct));
            optionsEl.appendChild(btn);
        });
    }

    function selectOption(selectedIndex, correctIndex) {
        const buttons = optionsEl.querySelectorAll(".option-btn");
        buttons.forEach((btn) => (btn.disabled = true));

        if (selectedIndex === correctIndex) {
            buttons[selectedIndex].classList.add("correct");
            feedbackEl.innerText = "✨ Correct Answer!";
            feedbackEl.style.color = "#81c784";
            score++;
        } else {
            buttons[selectedIndex].classList.add("incorrect");
            buttons[correctIndex].classList.add("correct");
            feedbackEl.innerText = "❌ Incorrect.";
            feedbackEl.style.color = "#e57373";
        }

        nextBtnQuiz.classList.remove("hidden");
    }

    if (nextBtnQuiz) {
        nextBtnQuiz.addEventListener("click", () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuiz();
            } else {
                showQuizResult();
            }
        });
    }

    function showQuizResult() {
        qNumEl.innerText = "Completed!";
        questionEl.innerText = `Quiz Complete! You scored ${score} out of ${quizData.length}.`;
        optionsEl.innerHTML = "";
        feedbackEl.innerText = score === quizData.length ? "🎉 Outstanding knowledge of Rizal!" : "Keep studying Rizal's life and works!";
        nextBtnQuiz.classList.add("hidden");
    }

    // Initialize Quiz
    loadQuiz();
});