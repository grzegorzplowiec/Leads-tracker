let myLeads = [];
const inputEl = document.querySelector("#input-el");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (JSON.parse(localStorage.getItem("myLeads"))) {
  myLeads = leadsFromLocalStorage;
}

document.querySelector("#show-btn").addEventListener("click", render(myLeads));

document.querySelector("#tab-btn").addEventListener("click", function () {
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //  });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (i = 0; i < leads.length; i++) {
    // listItems += "<li><a href='"+myLeads[i]+"' target='_blank'>"+myLeads[i]+"</a></li>";
    listItems += `<li>
          <a href="${leads[i]}" target="_blank">${leads[i]}</a>
          </li>`;
  }
  document.querySelector("#ul-el").innerHTML = listItems;
}

document.querySelector("#input-btn").addEventListener("click", function () {
  if (inputEl.value) {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  }
});

document.querySelector("#delete-btn").addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
