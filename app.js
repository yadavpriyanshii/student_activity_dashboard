/* =====================================================
   STUDENT PRODUCTIVITY DASHBOARD
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   LOCAL STORAGE
===================================================== */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let timetable = JSON.parse(localStorage.getItem("timetable")) || [];
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let goals = JSON.parse(localStorage.getItem("goals")) || [];
let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

let pomodoroSessions =
    JSON.parse(localStorage.getItem("pomodoroSessions")) || 0;

let totalFocusTime =
    JSON.parse(localStorage.getItem("totalFocusTime")) || 0;


/* =====================================================
   SAVE DATA
===================================================== */

function saveData() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

    localStorage.setItem(
        "timetable",
        JSON.stringify(timetable)
    );

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    localStorage.setItem(
        "goals",
        JSON.stringify(goals)
    );

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

    localStorage.setItem(
        "pomodoroSessions",
        JSON.stringify(pomodoroSessions)
    );

    localStorage.setItem(
        "totalFocusTime",
        JSON.stringify(totalFocusTime)
    );
}


/* =====================================================
   TASKS
===================================================== */

const taskForm = document.getElementById("taskForm");

if (taskForm) {

    taskForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const taskInput =
            document.getElementById("taskInput");

        const taskPriority =
            document.getElementById("taskPriority");

        const taskDate =
            document.getElementById("taskDate");


        const task = {

            id: Date.now(),

            title: taskInput.value.trim(),

            priority: taskPriority.value,

            date: taskDate.value,

            completed: false

        };


        if (task.title === "") {
            return;
        }


        tasks.push(task);

        saveData();

        taskInput.value = "";

        taskDate.value = "";

        displayTasks();

        updateTaskSummary();

    });

}


/* =====================================================
   DISPLAY TASKS
===================================================== */

function displayTasks(filter = "all") {

    const taskList =
        document.getElementById("taskList");

    if (!taskList) {
        return;
    }


    taskList.innerHTML = "";


    let filteredTasks = tasks;


    if (filter === "pending") {

        filteredTasks =
            tasks.filter(task => !task.completed);

    }


    if (filter === "completed") {

        filteredTasks =
            tasks.filter(task => task.completed);

    }


    if (filteredTasks.length === 0) {

        taskList.innerHTML =
            "<li>No tasks found.</li>";

        return;
    }


    filteredTasks.forEach(task => {

        const li =
            document.createElement("li");


        li.innerHTML = `

            <div>

                <strong>
                    ${task.title}
                </strong>

                <br>

                <small>
                    Priority: ${task.priority}
                    ${task.date ? " | Due: " + task.date : ""}
                </small>

            </div>


            <div>

                <button
                    onclick="toggleTask(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button
                    onclick="deleteTask(${task.id})"
                    style="background:#ef4444;">
                    Delete
                </button>

            </div>

        `;


        if (task.completed) {

            li.style.opacity = "0.6";

            li.style.textDecoration =
                "line-through";

        }


        taskList.appendChild(li);

    });

}


/* =====================================================
   COMPLETE TASK
===================================================== */

function toggleTask(id) {

    const task =
        tasks.find(task => task.id === id);

    if (!task) {
        return;
    }


    task.completed =
        !task.completed;


    saveData();

    displayTasks();

    updateTaskSummary();

}


/* =====================================================
   DELETE TASK
===================================================== */

function deleteTask(id) {

    tasks =
        tasks.filter(task => task.id !== id);

    saveData();

    displayTasks();

    updateTaskSummary();

}


/* =====================================================
   TASK FILTERS
===================================================== */

const allTasks =
    document.getElementById("allTasks");

const pendingTasks =
    document.getElementById("pendingTasks");

const completedTasksFilter =
    document.getElementById("completedTasksFilter");


if (allTasks) {

    allTasks.addEventListener(
        "click",
        () => displayTasks("all")
    );

}


if (pendingTasks) {

    pendingTasks.addEventListener(
        "click",
        () => displayTasks("pending")
    );

}


if (completedTasksFilter) {

    completedTasksFilter.addEventListener(
        "click",
        () => displayTasks("completed")
    );

}


/* =====================================================
   TASK SUMMARY
===================================================== */

function updateTaskSummary() {

    const total =
        tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending =
        total - completed;


    const totalElement =
        document.getElementById("totalTasks");

    const completedElement =
        document.getElementById("completedTasks");

    const pendingElement =
        document.getElementById("pendingTaskCount");


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (completedElement) {

        completedElement.textContent =
            completed;

    }


    if (pendingElement) {

        pendingElement.textContent =
            pending;

    }

}


/* =====================================================
   TIMETABLE
===================================================== */

const timetableForm =
    document.getElementById("timetableForm");


if (timetableForm) {

    timetableForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const day =
                document.getElementById("day").value;

            const time =
                document.getElementById("classTime").value;

            const subject =
                document.getElementById("subject").value;

            const room =
                document.getElementById("room").value;


            const newClass = {

                id: Date.now(),

                day: day,

                time: time,

                subject: subject,

                room: room

            };


            timetable.push(newClass);

            saveData();

            timetableForm.reset();

            displayTimetable();

        }
    );

}


/* =====================================================
   DISPLAY TIMETABLE
===================================================== */

function displayTimetable() {

    const timetableBody =
        document.getElementById("timetableBody");


    if (!timetableBody) {
        return;
    }


    timetableBody.innerHTML = "";


    if (timetable.length === 0) {

        timetableBody.innerHTML = `

            <tr>

                <td colspan="5">
                    No classes added yet.
                </td>

            </tr>

        `;

        return;
    }


    timetable.forEach(item => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${item.day}</td>

            <td>${item.time}</td>

            <td>${item.subject}</td>

            <td>${item.room || "-"}</td>

            <td>

                <button
                    onclick="deleteClass(${item.id})"
                    style="background:#ef4444;">
                    Delete
                </button>

            </td>

        `;


        timetableBody.appendChild(row);

    });

}


/* =====================================================
   DELETE CLASS
===================================================== */

function deleteClass(id) {

    timetable =
        timetable.filter(item => item.id !== id);

    saveData();

    displayTimetable();

}


/* =====================================================
   NOTES
===================================================== */

const noteForm =
    document.getElementById("noteForm");


if (noteForm) {

    noteForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                document.getElementById("noteTitle").value;

            const subject =
                document.getElementById("noteSubject").value;

            const content =
                document.getElementById("noteContent").value;


            const note = {

                id: Date.now(),

                title: title,

                subject: subject,

                content: content

            };


            notes.push(note);

            saveData();

            noteForm.reset();

            displayNotes();

        }
    );

}


/* =====================================================
   DISPLAY NOTES
===================================================== */

function displayNotes() {

    const container =
        document.getElementById("notesContainer");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (notes.length === 0) {

        container.innerHTML =
            "<p>No notes created yet.</p>";

        return;
    }


    notes.forEach(note => {

        const card =
            document.createElement("div");


        card.className =
            "note-card";


        card.innerHTML = `

            <h3>
                ${note.title}
            </h3>

            <span>
                ${note.subject || "General"}
            </span>

            <p>
                ${note.content}
            </p>

            <button
                class="delete-note"
                onclick="deleteNote(${note.id})">
                Delete
            </button>

        `;


        container.appendChild(card);

    });

}


/* =====================================================
   DELETE NOTE
===================================================== */

function deleteNote(id) {

    notes =
        notes.filter(note => note.id !== id);

    saveData();

    displayNotes();

}


/* =====================================================
   NOTE SEARCH
===================================================== */

const noteSearch =
    document.getElementById("noteSearch");


if (noteSearch) {

    noteSearch.addEventListener(
        "input",
        function () {

            const search =
                noteSearch.value.toLowerCase();


            const cards =
                document.querySelectorAll(".note-card");


            cards.forEach(card => {

                const text =
                    card.textContent.toLowerCase();


                card.style.display =
                    text.includes(search)
                        ? ""
                        : "none";

            });

        }
    );

}


/* =====================================================
   POMODORO TIMER
===================================================== */

let timerInterval = null;

let focusMinutes = 25;

let breakMinutes = 5;

let remainingSeconds =
    focusMinutes * 60;

let isFocusMode = true;

let isRunning = false;


const timerDisplay =
    document.getElementById("timerDisplay");

const timerMode =
    document.getElementById("timerMode");

const startTimer =
    document.getElementById("startTimer");

const pauseTimer =
    document.getElementById("pauseTimer");

const resetTimer =
    document.getElementById("resetTimer");


function updateTimerDisplay() {

    if (!timerDisplay) {
        return;
    }


    const minutes =
        Math.floor(remainingSeconds / 60);

    const seconds =
        remainingSeconds % 60;


    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


function startPomodoro() {

    if (isRunning) {
        return;
    }


    isRunning = true;


    timerInterval =
        setInterval(function () {

            remainingSeconds--;

            updateTimerDisplay();


            if (remainingSeconds <= 0) {

                clearInterval(timerInterval);

                isRunning = false;

                finishPomodoro();

            }

        }, 1000);

}


function pausePomodoro() {

    clearInterval(timerInterval);

    isRunning = false;

}


function resetPomodoro() {

    clearInterval(timerInterval);

    isRunning = false;

    isFocusMode = true;

    remainingSeconds =
        focusMinutes * 60;


    if (timerMode) {

        timerMode.textContent =
            "Focus Time";

    }


    updateTimerDisplay();

}


function finishPomodoro() {

    if (isFocusMode) {

        pomodoroSessions++;

        totalFocusTime += focusMinutes;

        saveData();

        updatePomodoroStats();


        isFocusMode = false;

        remainingSeconds =
            breakMinutes * 60;


        if (timerMode) {

            timerMode.textContent =
                "Break Time";

        }

    } else {

        isFocusMode = true;

        remainingSeconds =
            focusMinutes * 60;


        if (timerMode) {

            timerMode.textContent =
                "Focus Time";

        }

    }


    updateTimerDisplay();

}


/* =====================================================
   POMODORO BUTTONS
===================================================== */

if (startTimer) {

    startTimer.addEventListener(
        "click",
        startPomodoro
    );

}


if (pauseTimer) {

    pauseTimer.addEventListener(
        "click",
        pausePomodoro
    );

}


if (resetTimer) {

    resetTimer.addEventListener(
        "click",
        resetPomodoro
    );

}


/* =====================================================
   POMODORO SETTINGS
===================================================== */

const timerSettings =
    document.getElementById("timerSettings");


if (timerSettings) {

    timerSettings.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            focusMinutes =
                Number(
                    document.getElementById(
                        "focusDuration"
                    ).value
                );


            breakMinutes =
                Number(
                    document.getElementById(
                        "breakDuration"
                    ).value
                );


            resetPomodoro();

        }
    );

}


/* =====================================================
   POMODORO STATISTICS
===================================================== */

function updatePomodoroStats() {

    const sessionCount =
        document.getElementById("sessionCount");

    const focusTime =
        document.getElementById("focusTime");


    if (sessionCount) {

        sessionCount.textContent =
            pomodoroSessions;

    }


    if (focusTime) {

        focusTime.textContent =
            `${totalFocusTime} min`;

    }

}


/* =====================================================
   GOALS
===================================================== */

const goalForm =
    document.getElementById("goalForm");


if (goalForm) {

    goalForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                document.getElementById("goalTitle").value;

            const category =
                document.getElementById("goalCategory").value;

            const deadline =
                document.getElementById("goalDeadline").value;

            const target =
                Number(
                    document.getElementById("goalTarget").value
                );

            const unit =
                document.getElementById("goalUnit").value;


            const goal = {

                id: Date.now(),

                title: title,

                category: category,

                deadline: deadline,

                target: target,

                current: 0,

                unit: unit,

                completed: false

            };


            goals.push(goal);

            saveData();

            goalForm.reset();

            displayGoals();

            updateGoalSummary();

        }
    );

}


/* =====================================================
   DISPLAY GOALS
===================================================== */

function displayGoals() {

    const container =
        document.getElementById("goalsContainer");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const activeGoals =
        goals.filter(goal => !goal.completed);


    if (activeGoals.length === 0) {

        container.innerHTML =
            "<p>No active goals yet.</p>";

        return;
    }


    activeGoals.forEach(goal => {

        const percentage =
            Math.min(
                (goal.current / goal.target) * 100,
                100
            );


        const card =
            document.createElement("div");


        card.className =
            "goal-card";


        card.innerHTML = `

            <div class="goal-header">

                <h3>
                    ${goal.title}
                </h3>

                <span class="goal-category">
                    ${goal.category}
                </span>

            </div>


            <p>
                Deadline:
                <strong>
                    ${goal.deadline || "No deadline"}
                </strong>
            </p>


            <div class="progress-container">

                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="width:${percentage}%;">
                    </div>

                </div>

                <p>
                    ${goal.current} /
                    ${goal.target}
                    ${goal.unit}
                    (${Math.round(percentage)}%)
                </p>

            </div>


            <div class="goal-actions">

                <button
                    onclick="updateGoal(${goal.id})">
                    Update Progress
                </button>


                <button
                    onclick="completeGoal(${goal.id})">
                    Mark Complete
                </button>


                <button
                    onclick="deleteGoal(${goal.id})"
                    style="background:#ef4444;">
                    Delete
                </button>

            </div>

        `;


        container.appendChild(card);

    });


    displayCompletedGoals();

}


/* =====================================================
   UPDATE GOAL
===================================================== */

function updateGoal(id) {

    const goal =
        goals.find(goal => goal.id === id);


    if (!goal) {
        return;
    }


    const value =
        prompt(
            `Enter current progress (${goal.unit}):`,
            goal.current
        );


    if (value === null) {
        return;
    }


    const progress =
        Number(value);


    if (isNaN(progress) || progress < 0) {

        alert("Please enter a valid number.");

        return;
    }


    goal.current =
        Math.min(progress, goal.target);


    if (goal.current >= goal.target) {

        goal.completed = true;

    }


    saveData();

    displayGoals();

    updateGoalSummary();

}


/* =====================================================
   COMPLETE GOAL
===================================================== */

function completeGoal(id) {

    const goal =
        goals.find(goal => goal.id === id);


    if (!goal) {
        return;
    }


    goal.current =
        goal.target;

    goal.completed =
        true;


    saveData();

    displayGoals();

    updateGoalSummary();

}


/* =====================================================
   DELETE GOAL
===================================================== */

function deleteGoal(id) {

    goals =
        goals.filter(goal => goal.id !== id);

    saveData();

    displayGoals();

    updateGoalSummary();

}


/* =====================================================
   COMPLETED GOALS
===================================================== */

function displayCompletedGoals() {

    const container =
        document.getElementById(
            "completedGoalsContainer"
        );


    if (!container) {
        return;
    }


    const completed =
        goals.filter(goal => goal.completed);


    if (completed.length === 0) {

        container.innerHTML =
            "<p>No goals completed yet.</p>";

        return;
    }


    container.innerHTML = "";


    completed.forEach(goal => {

        const item =
            document.createElement("div");


        item.className =
            "achievement-card";


        item.innerHTML = `

            <h3>
                🏆 ${goal.title}
            </h3>

            <p>
                Completed successfully.
            </p>

        `;


        container.appendChild(item);

    });

}


/* =====================================================
   GOAL SUMMARY
===================================================== */

function updateGoalSummary() {

    const total =
        goals.length;

    const active =
        goals.filter(goal => !goal.completed).length;

    const completed =
        goals.filter(goal => goal.completed).length;


    const totalElement =
        document.getElementById("totalGoals");

    const activeElement =
        document.getElementById("activeGoals");

    const completedElement =
        document.getElementById("completedGoals");


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (activeElement) {

        activeElement.textContent =
            active;

    }


    if (completedElement) {

        completedElement.textContent =
            completed;

    }

}


/* =====================================================
   SUBJECTS
===================================================== */

const subjectForm =
    document.getElementById("subjectForm");


if (subjectForm) {

    subjectForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "subjectName"
                ).value;


            const teacher =
                document.getElementById(
                    "teacherName"
                ).value;


            const credits =
                Number(
                    document.getElementById(
                        "subjectCredits"
                    ).value
                );


            const semester =
                document.getElementById(
                    "subjectSemester"
                ).value;


            const color =
                document.getElementById(
                    "subjectColor"
                ).value;


            const subject = {

                id: Date.now(),

                name: name,

                teacher: teacher,

                credits: credits,

                semester: semester,

                color: color

            };


            subjects.push(subject);

            saveData();

            subjectForm.reset();

            displaySubjects();

            updateSubjectSummary();

        }
    );

}


/* =====================================================
   DISPLAY SUBJECTS
===================================================== */

function displaySubjects() {

    const container =
        document.getElementById(
            "subjectsContainer"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (subjects.length === 0) {

        container.innerHTML =
            "<p>No subjects added yet.</p>";

        return;
    }


    subjects.forEach(subject => {

        const card =
            document.createElement("div");


        card.className =
            "subject-card";


        card.innerHTML = `

            <div class="subject-header">

                <h3>
                    ${subject.name}
                </h3>

                <span>
                    ${subject.credits} Credits
                </span>

            </div>


            <p>
                👨‍🏫 Professor:
                ${subject.teacher || "Not specified"}
            </p>


            <p>
                📚 Semester:
                ${subject.semester}
            </p>


            <div class="subject-actions">

                <button
                    onclick="deleteSubject(${subject.id})"
                    style="background:#ef4444;">
                    Delete
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =====================================================
   DELETE SUBJECT
===================================================== */

function deleteSubject(id) {

    subjects =
        subjects.filter(
            subject => subject.id !== id
        );

    saveData();

    displaySubjects();

    updateSubjectSummary();

}


/* =====================================================
   SUBJECT SUMMARY
===================================================== */

function updateSubjectSummary() {

    const totalSubjects =
        subjects.length;


    const totalCredits =
        subjects.reduce(
            (sum, subject) =>
                sum + Number(subject.credits),
            0
        );


    const totalElement =
        document.getElementById(
            "totalSubjects"
        );

    const creditsElement =
        document.getElementById(
            "totalCredits"
        );


    if (totalElement) {

        totalElement.textContent =
            totalSubjects;

    }


    if (creditsElement) {

        creditsElement.textContent =
            totalCredits;

    }

}


/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard() {

    const totalTasks =
        document.getElementById(
            "totalTasks"
        );


    const completedTasks =
        document.getElementById(
            "completedTasks"
        );


    const studyTime =
        document.getElementById(
            "studyTime"
        );


    const totalGoals =
        document.getElementById(
            "totalGoals"
        );


    if (totalTasks) {

        totalTasks.textContent =
            tasks.length;

    }


    if (completedTasks) {

        completedTasks.textContent =
            tasks.filter(
                task => task.completed
            ).length;

    }


    if (studyTime) {

        studyTime.textContent =
            `${Math.floor(totalFocusTime / 60)}h`;

    }


    if (totalGoals) {

        totalGoals.textContent =
            goals.filter(
                goal => !goal.completed
            ).length;

    }


    const dashboardTaskList =
        document.getElementById(
            "dashboardTaskList"
        );


    if (dashboardTaskList) {

        dashboardTaskList.innerHTML = "";


        const pending =
            tasks
                .filter(task => !task.completed)
                .slice(0, 5);


        if (pending.length === 0) {

            dashboardTaskList.innerHTML =
                "<li>No pending tasks.</li>";

        } else {

            pending.forEach(task => {

                const li =
                    document.createElement("li");

                li.textContent =
                    task.title;

                dashboardTaskList.appendChild(li);

            });

        }

    }

}


/* =====================================================
   PROGRESS PAGE
===================================================== */

function updateProgressPage() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    const totalElement =
        document.getElementById(
            "progressTotalTasks"
        );


    const completedElement =
        document.getElementById(
            "progressCompletedTasks"
        );


    const studyTimeElement =
        document.getElementById(
            "progressStudyTime"
        );


    const sessionsElement =
        document.getElementById(
            "progressSessions"
        );


    const progressBar =
        document.getElementById(
            "taskProgress"
        );


    const progressText =
        document.getElementById(
            "taskProgressText"
        );


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (completedElement) {

        completedElement.textContent =
            completed;

    }


    if (studyTimeElement) {

        studyTimeElement.textContent =
            `${Math.floor(totalFocusTime / 60)} hrs`;

    }


    if (sessionsElement) {

        sessionsElement.textContent =
            pomodoroSessions;

    }


    if (progressBar) {

        progressBar.style.width =
            `${percentage}%`;

    }


    if (progressText) {

        progressText.textContent =
            `${percentage}% completed`;

    }

}


/* =====================================================
   SETTINGS
===================================================== */

const profileForm =
    document.getElementById("profileForm");


if (profileForm) {

    const savedName =
        localStorage.getItem("userName") || "";

    const savedCollege =
        localStorage.getItem("userCollege") || "";

    const savedCourse =
        localStorage.getItem("userCourse") || "";


    document.getElementById(
        "userName"
    ).value = savedName;


    document.getElementById(
        "userCollege"
    ).value = savedCollege;


    document.getElementById(
        "userCourse"
    ).value = savedCourse;


    profileForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            localStorage.setItem(
                "userName",
                document.getElementById(
                    "userName"
                ).value
            );


            localStorage.setItem(
                "userCollege",
                document.getElementById(
                    "userCollege"
                ).value
            );


            localStorage.setItem(
                "userCourse",
                document.getElementById(
                    "userCourse"
                ).value
            );


            alert("Profile saved!");

        }
    );

}


/* =====================================================
   THEME
===================================================== */




/* =====================================================
   CLEAR ALL DATA
===================================================== */

const clearData =
    document.getElementById(
        "clearData"
    );


if (clearData) {

    clearData.addEventListener(
        "click",
        function () {

            const confirmDelete =
                confirm(
                    "Are you sure you want to delete ALL your data?"
                );


            if (!confirmDelete) {
                return;
            }


            localStorage.clear();


            tasks = [];

            timetable = [];

            notes = [];

            goals = [];

            subjects = [];

            pomodoroSessions = 0;

            totalFocusTime = 0;


            alert(
                "All data has been cleared."
            );


            location.reload();

        }
    );

}


/* =====================================================
   INITIALIZE
===================================================== */

displayTasks();

updateTaskSummary();

displayTimetable();

displayNotes();

updatePomodoroStats();

displayGoals();

updateGoalSummary();

displaySubjects();

updateSubjectSummary();

updateDashboard();

updateProgressPage();

updateTimerDisplay();