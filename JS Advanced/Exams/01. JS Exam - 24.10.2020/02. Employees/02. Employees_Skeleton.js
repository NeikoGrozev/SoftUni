function solveClasses() {

    class Developer {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.baseSalary = 1000;
            this.tasks = [];
            this.experience = 0;
        }

        addTask(id, taskName, priority) {
            const newTask = { id, taskName, priority };
            if (priority == 'high') {
                this.tasks.unshift(newTask);
            } else {
                this.tasks.push(newTask);
            }

            return `Task id ${id}, with ${priority} priority, has been added.`
        }

        doTask() {
            let currentTask = this.tasks.shift();

            if (currentTask) {
                return currentTask.taskName;
            }

            return `${this.firstName}, you have finished all your tasks. You can rest now.`
        }

        getSalary() {
            return `${this.firstName} ${this.lastName} has a salary of: ${this.baseSalary}`
        }

        reviewTasks() {
            let result = 'Tasks, that need to be completed:'

            for (const task of this.tasks) {
                result += '\n';
                result += `${task.id}: ${task.taskName} - ${task.priority}`
            }

            return result;
        }
    }

    class Junior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName);
            this.baseSalary = 1000 + bonus;
            this.tasks = [];
            this.experience = experience;
        }

        learn(years) {
            this.experience += years;
        }
    }

    class Senior extends Developer {
        constructor(firstName, lastName, bonus, experience) {
            super(firstName, lastName);
            this.baseSalary = 1000 + bonus;
            this.tasks = [];
            this.experience = experience + 5;
        }

        changeTaskPriority(taskId) {
            let index = this.tasks.findIndex(t => t.id == taskId);
            let currentTask = this.tasks.splice(index, 1)[0];
            currentTask.priority = currentTask.priority == 'high'
                ? currentTask.priority = 'low'
                : currentTask.priority = 'high';
            currentTask.priority === 'high'
                ? this.tasks.unshift(currentTask)
                : this.tasks.push(currentTask);

            return currentTask;
        }
    }

    return {
        Developer,
        Junior,
        Senior
    }
}

let classes = solveClasses();
const developer = new classes.Developer("George", "Joestar");
console.log(developer.addTask(1, "Inspect bug", "low"));
console.log(developer.addTask(2, "Update repository", "high"));
console.log(developer.reviewTasks());
console.log(developer.getSalary());

const junior = new classes.Junior("Jonathan", "Joestar", 200, 2);
console.log(junior.getSalary());

const senior = new classes.Senior("Joseph", "Joestar", 200, 2);
senior.addTask(1, "Create functionality", "low");
senior.addTask(2, "Update functionality", "high");
console.log(senior.changeTaskPriority(1)["priority"]);