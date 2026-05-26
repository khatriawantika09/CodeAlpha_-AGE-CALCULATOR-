// ─────────────────────────────────────────
//  Age Calculator — script.js
//  codealpha.tech
// ─────────────────────────────────────────
 
function calculate() {
  const dayVal   = document.getElementById('day').value.trim();
  const monthVal = document.getElementById('month').value;
  const yearVal  = document.getElementById('year').value.trim();
 
  const errEl  = document.getElementById('error-msg');
  const dayEl  = document.getElementById('day');
  const yearEl = document.getElementById('year');
 
  // ── Reset previous errors ──
  dayEl.classList.remove('error');
  yearEl.classList.remove('error');
  errEl.textContent = '';
 
  // ── Validation: empty fields ──
  if (!dayVal || !monthVal || !yearVal) {
    errEl.textContent = 'Please fill in all three fields.';
    if (!dayVal)  dayEl.classList.add('error');
    if (!yearVal) yearEl.classList.add('error');
    return;
  }
 
  const day   = parseInt(dayVal,   10);
  const month = parseInt(monthVal, 10);
  const year  = parseInt(yearVal,  10);
 
  // ── Validation: day range ──
  if (isNaN(day) || day < 1 || day > 31) {
    errEl.textContent = 'Day must be between 1 and 31.';
    dayEl.classList.add('error');
    return;
  }
 
  // ── Validation: year range ──
  if (isNaN(year) || year < 1900 || year > 2025) {
    errEl.textContent = 'Year must be between 1900 and 2025.';
    yearEl.classList.add('error');
    return;
  }
 
  // ── Validation: real calendar date (e.g. Feb 30 doesn't exist) ──
  const dob = new Date(year, month - 1, day);
  if (dob.getMonth() !== month - 1 || dob.getDate() !== day) {
    errEl.textContent = "That date doesn't exist. Please check day & month.";
    dayEl.classList.add('error');
    return;
  }
 
  // ── Validation: not in the future ──
  const today = new Date();
  today.setHours(0, 0, 0, 0);
 
  if (dob > today) {
    errEl.textContent = "Date of birth can't be in the future.";
    dayEl.classList.add('error');
    return;
  }
 
  // ─────────────────────────────────────
  //  Age Calculation
  // ─────────────────────────────────────
  let years  = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth()    - dob.getMonth();
  let days   = today.getDate()     - dob.getDate();
 
  // Borrow days from the previous month if days is negative
  if (days < 0) {
    months--;
    const lastDayOfPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastDayOfPrevMonth.getDate();
  }
 
  // Borrow months from the previous year if months is negative
  if (months < 0) {
    years--;
    months += 12;
  }
 
  // ── Fun fact totals ──
  const totalDays   = Math.floor((today - dob) / 86400000);
  const totalWeeks  = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours  = totalDays * 24;
 
  // ── Next birthday countdown ──
  const nextBday = new Date(today.getFullYear(), month - 1, day);
  if (nextBday <= today) {
    nextBday.setFullYear(today.getFullYear() + 1);
  }
  const daysToNext = Math.ceil((nextBday - today) / 86400000);
 
  // ─────────────────────────────────────
  //  Update the DOM
  // ─────────────────────────────────────
  document.getElementById('res-years').textContent  = years;
  document.getElementById('res-months').textContent = months;
  document.getElementById('res-days').textContent   = days;
 
  document.getElementById('ff-months').textContent     = totalMonths.toLocaleString();
  document.getElementById('ff-weeks').textContent      = totalWeeks.toLocaleString();
  document.getElementById('ff-total-days').textContent = totalDays.toLocaleString();
  document.getElementById('ff-hours').textContent      = totalHours.toLocaleString();
 
  if (daysToNext === 0) {
    document.getElementById('bday-label').textContent   = '🎂 Aaj tumhara birthday hai!';
    document.getElementById('ff-next-bday').textContent = '🎉';
  } else {
    document.getElementById('bday-label').textContent   = 'Days until next birthday';
    document.getElementById('ff-next-bday').textContent = daysToNext + ' days';
  }
 
  // ── Animate result into view ──
  const section = document.getElementById('result-section');
  section.classList.remove('visible');
  void section.offsetWidth; // force reflow to restart animation
  section.classList.add('visible');
}
 
// Enter key bhi kaam kare
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') calculate();
});
