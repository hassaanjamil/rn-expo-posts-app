// transformData.js

const originalData = [
  { "first_name": "Stepha", "last_name": "Quiddinton", "username": "squiddinton0", "power": "481", "gender": "Female", "birth_date": "07.10.1996" },
  { "first_name": "Niki", "last_name": "Benedick", "username": "nbenedick1", "power": "578", "gender": "Female", "birth_date": "24.09.1996" },
  { "first_name": "Kenneth", "username": "kbeavers2", "power": "463", "gender": "Male", "birth_date": "18.10.1990" },
  { "first_name": "Nissy", "last_name": "Juggins", "username": "njuggins3", "power": "436", "gender": "Female", "birth_date": "09.01.2000" },
  { "first_name": "Jaymee", "last_name": "Dotterill", "username": "jdotterill4", "power": "687", "gender": "Female", "birth_date": "13.02.2000" },
  { "first_name": "Shell", "last_name": "Shawe", "username": "sshawe5", "power": "631", "gender": "Female", "birth_date": "08.06.1999" },
  { "first_name": "Ham", "username": "hruslinge6", "power": "659", "gender": "Male", "birth_date": "01.03.1991" },
  { "first_name": "Gabriell", "last_name": "Lukins", "username": "glukins7", "power": "500", "gender": "Female", "birth_date": "25.11.1998" },
  { "first_name": "Roddy", "last_name": "Whates", "username": "rwhates8", "power": "609", "gender": "Male", "birth_date": "06.03.1993" },
  { "first_name": "Iris", "username": "ibolens9", "power": "418", "gender": "Female", "birth_date": "13.04.1993" }
];

// Utility function to convert DD.MM.YYYY to JS Date
function parseDate(dateStr) {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day); // month is 0-based
}

// 1. Transform the data
const transformedData = originalData.map(item => ({
  fullName: `${item.first_name} ${item.last_name || ''}`.trim(),
  username: item.username,
  power: parseInt(item.power, 10),
  birthDate: parseDate(item.birth_date)
}));

// 2. Calculate the arithmetic mean of powers
const totalPower = transformedData.reduce((sum, item) => sum + item.power, 0);
const meanPower = totalPower / transformedData.length;

// Output
console.log("Transformed Data:", transformedData);
console.log("Arithmetic Mean of Power:", meanPower.toFixed(2));