import { OPTIONS } from "./settings.js";

const fetchIP = (ip) => {
  return fetch(
    `https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/?ip=${ip}`,
    OPTIONS
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

const $form = document.getElementById("form");
const $input = document.getElementById("input");
const $submit = document.getElementById("submit");
const $results = document.getElementById("results");

$form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = $input.value;
  const pattern = new RegExp($input.getAttribute("pattern"));
  const regex = pattern.test(value);

  if (!value) return;
  if (regex) {
    $submit.setAttribute("disbaled", "");
    $submit.setAttribute("aria-busy", "true");

    const ipInfo = await fetchIP(value);
    if (ipInfo) $results.innerHTML = JSON.stringify(ipInfo, null, 2);

    $submit.removeAttribute("disbaled");
    $submit.removeAttribute("aria-busy");
  }
});
