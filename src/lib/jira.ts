declare global {
  interface Window {
    chrome: any;
  }
}

window.chrome = window.chrome || {};
var chrome = window.chrome;

export async function executeCode(func, args) {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  if (!tab) return;
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func,
    args,
  });
  return result;
}

function _getSprints() {
  const sprintsDom = Array.from(
    document.querySelectorAll(".ghx-backlog-container"),
  );
  const sprints = sprintsDom.map((sprintDom) => {
    const span = sprintDom.querySelector(".field-value");
    if (!span) return null;

    return {
      name: span.innerText,
      isHidden: sprintDom.style.display === "none",
    };
  });
  return sprints.filter(Boolean);
}
export async function getSprints() {
  return executeCode(_getSprints);
}

function _hideAllSprints() {
  const sprintsDom = Array.from(
    document.querySelectorAll(".ghx-backlog-container"),
  );
  const sprints = sprintsDom.forEach((sprintDom) => {
    const span = sprintDom.querySelector(".field-value");
    if (!span) return null;

    sprintDom.style.display = "none";
  });
}
export async function hideAllSprints() {
  return executeCode(_hideAllSprints);
}

function _toggleSprint(name) {
  console.log(name);
  const sprintsDom = Array.from(
    document.querySelectorAll(".ghx-backlog-container"),
  );
  const sprints = sprintsDom.forEach((sprintDom) => {
    const span = sprintDom.querySelector(".field-value");
    if (!span) return;
    if (span.innerText !== name) return;

    const isHidden = sprintDom.style.display === "none";
    if (isHidden) {
      sprintDom.style.display = "block";
    } else {
      sprintDom.style.display = "none";
    }
  });
}
export async function toggleSprint(name) {
  return executeCode(_toggleSprint, [name]);
}

function _collapseAll() {
  var buttonSelector = "button.ghx-expander";
  var buttons = Array.from(document.querySelectorAll(buttonSelector));
  var buttonsFiltered = buttons.filter((button) => {
    return button.ariaExpanded === "true";
  });
  for (let button of buttonsFiltered) {
    button.click();
  }
}
export async function collapseAll() {
  return executeCode(_collapseAll);
}

function _expandAll() {
  var buttonSelector = "button.ghx-expander";
  var buttons = Array.from(document.querySelectorAll(buttonSelector));
  var buttonsFiltered = buttons.filter((button) => {
    return button.ariaExpanded === "false";
  });
  for (let button of buttonsFiltered) {
    button.click();
  }
}
export async function expandAll() {
  return executeCode(_expandAll);
}
