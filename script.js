// Default target date = today
document.getElementById("target").value = new Date().toISOString().split("T")[0];

document.getElementById("ageForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let dobInput = document.getElementById("dob").value;
  let targetInput = document.getElementById("target").value;

  if (!dobInput || !targetInput) {
    document.getElementById("output").innerHTML = "<b>Please enter both dates!</b>";
    return;
  }

  let dob = new Date(dobInput);
  let target = new Date(targetInput);

  if (dob > target) {
    document.getElementById("output").innerHTML = "<b>Date of Birth cannot be after Target Date!</b>";
    return;
  }

  // Age calculation
  let ageYears = target.getFullYear() - dob.getFullYear();
  let ageMonths = target.getMonth() - dob.getMonth();
  let ageDays = target.getDate() - dob.getDate();

  if (ageDays < 0) {
    ageMonths--;
    let prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    ageDays += prevMonth.getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  // Totals
  let diffMs = target - dob;
  let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  let diffWeeks = Math.floor(diffDays / 7);
  let extraDays = diffDays % 7;
  let diffHours = diffDays * 24;
  let diffMinutes = diffHours * 60;
  let diffSeconds = diffMinutes * 60;

  // Output
  document.getElementById("output").innerHTML = `
    <b>Calculated Age:</b><br>
    ${ageYears} Years, ${ageMonths} Months, ${ageDays} Days <br><br>
    <b>More Details:</b><br>
    ${ageYears * 12 + ageMonths} Months, ${ageDays} Days <br>
    ${diffWeeks} Weeks, ${extraDays} Days <br>
    ${diffDays} Days <br>
    ${diffHours} Hours <br>
    ${diffMinutes} Minutes <br>
    ${diffSeconds.toLocaleString()} Seconds
  `;

  // Render calendars
  renderCalendar(dob.getFullYear(), dob.getMonth(), "birthCalendar", dob.getDate());
  renderCalendar(target.getFullYear(), target.getMonth(), "targetCalendar", target.getDate());
});

function renderCalendar(year, month, elementId, highlightDay) {
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  let firstDay = new Date(year, month, 1).getDay();
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  let table = `<h4>${monthNames[month]} ${year}</h4>`;
  table += `<table>
    <tr>
      <th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th>
    </tr><tr>`;

  for (let i = 0; i < firstDay; i++) table += "<td></td>";

  for (let day = 1; day <= daysInMonth; day++) {
    if ((firstDay + day - 1) % 7 === 0) table += "</tr><tr>";
    table += day === highlightDay ? `<td class="highlight">${day}</td>` : `<td>${day}</td>`;
  }

  table += "</tr></table>";
  document.getElementById(elementId).innerHTML = table;
}

// Dark mode toggle with persistence
const darkModeToggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeToggle.checked = true;
}

darkModeToggle.addEventListener("change", function() {
  if (this.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  }
});
