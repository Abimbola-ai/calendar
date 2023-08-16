document.addEventListener("DOMContentLoaded", function () {
// Get a reference to the calendar container
const calendarContainer = document.getElementById("calendarContainer");

// Initialize current date
let currentDate = new Date();

// Function to generate the calendar
function generateCalendar(year, month) {
    // Clear the previous calendar content
    calendarContainer.innerHTML = "";

    // Create a new date for the first day of the specified month and year
    const firstDay = new Date(year, month, 1);
    
    
    // Get the number of days in the specified month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Calculate the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const startingDay = firstDay.getDay();
    
    // Create the calendar header with previous year, current month and next year
    const calendarHeader = document.createElement("div");
    calendarHeader.classList.add("px-4", "flex", "items-center", "justify-between",  "space-x-10")
   
    const previousYearSpan = document.createElement("p");
    previousYearSpan.classList.add("text-l", "text-[#858989]", "previous_year", "cursor-pointer");
    previousYearSpan.textContent = year - 1;
    calendarHeader.appendChild(previousYearSpan);

    const currentYearSpan = document.createElement("p");
    currentYearSpan.classList.add("text-l", "text-[#c6c5c5]");
    currentYearSpan.textContent = `${firstDay.toLocaleString("default", { month: "short" })}. ${year}`;
    calendarHeader.appendChild(currentYearSpan);

    const nextYearSpan = document.createElement("p");
    nextYearSpan.classList.add("text-l", "text-[#858989]", "next_year", "cursor-pointer");
    nextYearSpan.textContent = year + 1;
    calendarHeader.appendChild(nextYearSpan);

    calendarContainer.appendChild(calendarHeader);

    // Create the table structure for the calendar
    const table = document.createElement("table");
    table.classList.add("w-full", "justify-center");
    
    // Create the table header with day labels
    const tableHeader = document.createElement("thead");
    tableHeader.innerHTML = `
        <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
        </tr>
    `;
    tableHeader.classList.add("text-xs", "text-center", "uppercase", "text-[#9e9842]", "my-4")
    table.appendChild(tableHeader);

    // Create the table body with calendar days
    const tableBody = document.createElement("tbody");
    let day = 1;
    let previousMonthDays = new Date(year, month, 0).getDate();
    console.log(previousMonthDays);
    let previousMonthStartDay = (startingDay - 1 + 7) % 7; // Calculate the day of the week for the first day of the previous month
    console.log(previousMonthStartDay);
    console.log(startingDay);
    // Calculate the number of days to show from the previous month
    let daysToShowFromPreviousMonth = previousMonthStartDay > 0 ? previousMonthStartDay : 7;
    console.log(daysToShowFromPreviousMonth);

    for (let i = 0; i < 5; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (daysToShowFromPreviousMonth > 0){
                const cell = document.createElement("td");
                cell.classList.add("text-center");
                // Calculate the date from the previous month to display in the cell
                const previousMonthDate = previousMonthDays - daysToShowFromPreviousMonth + 1;
                cell.textContent = previousMonthDate;
                cell.classList.add("text-[#858989]"); // Apply styling for previous month's dates
                row.appendChild(cell);
                daysToShowFromPreviousMonth--;
            } else if (day <= daysInMonth) {
                const cell = document.createElement("td");
                cell.classList.add("text-center","text-[#c6c5c5]");
                cell.textContent = day;
                row.appendChild(cell);
                day++;
            } else {
                const cell = document.createElement("td");
                cell.classList.add("text-center");
                // Calculate the date from the next month to display in the cell
                const nextMonthDate = day - daysInMonth;
                cell.textContent = nextMonthDate;
                cell.classList.add("text-[#858989]"); // Apply styling for next month's dates
                row.appendChild(cell);
                day++;
            }
        }
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);

    // Append the table to the calendar container
    calendarContainer.appendChild(table);
}

function generateMonthNavigation(year, month) {
    // Clear the previous month navigation content
    monthNavigation.innerHTML = "";

    const monthList = [];
    for (let i = -2; i <= 2; i++) {
        const targetMonth = new Date(year, month + i, 1);
        const monthName = targetMonth.toLocaleString("default", { month: "short" });

        const monthLink = document.createElement("a");
        monthLink.classList.add("text-l", "text-[#c6c5c5]", "cursor-pointer", "uppercase");
        monthLink.textContent = monthName;
        monthLink.addEventListener("click", () => {
            currentDate = targetMonth;
            generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
            generateMonthNavigation(currentDate.getFullYear(), currentDate.getMonth());
        });

        monthList.push(monthLink);
    }

    monthNavigation.append(...monthList);
}

// Initial generation of the calendar and month navigation
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
generateMonthNavigation(currentDate.getFullYear(), currentDate.getMonth());

// Function to toggle to the previous month
function togglePreviousMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    generateMonthNavigation(currentDate.getFullYear(), currentDate.getMonth());
}

// Function to toggle to the next month
function toggleNextMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    generateMonthNavigation(currentDate.getFullYear(), currentDate.getMonth());
}

// Function to switch to the previous year
function previousYear() {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

// Function to switch to the next year
function nextYear() {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}



// Attach click event handlers to the year navigation buttons
const prevYearButton = document.querySelector(".previous_year");
const nextYearButton = document.querySelector(".next_year");
prevYearButton.addEventListener("click", previousYear);
nextYearButton.addEventListener("click", nextYear);

// Attach click event handlers to the month  navigation buttons
const prevMonthButton = document.querySelector(".arrow_backward");
const nextMonthButton = document.querySelector(".arrow_forward");
prevMonthButton.addEventListener("click", previousMonth);
nextMonthButton.addEventListener("click", nextMonth);

});