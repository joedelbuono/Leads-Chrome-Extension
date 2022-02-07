
// defining array to store leads, calling html elements
let myLeads = [];
const inputEl = document.getElementById("input-el");
const saveLead = document.getElementById("save-lead-btn");
const saveTab = document.getElementById("save-tab-btn");
const ulEL = document.getElementById("ul-el");
const deleteLeads = document.getElementById("delete-btn");

// pulling the leads already stored in local storage
const leadsReturn = JSON.parse(localStorage.getItem("myLeads"));

// checking if there is anything in local storage and 
// displaying it (this is basically our save game)
if (leadsReturn) {
    myLeads = leadsReturn
    render(myLeads)
};

// rendering the leads in the list
// made the function variable by defining a variable input "leads"
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i ++) {
        listItems += `
            <li>
                <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
            </li>`
    }
    ulEL.innerHTML = listItems
};

// function to save inputted leads
saveLead.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    inputEl.value = ""
});

// function to save current tab using chrome API
saveTab.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    });
});

// function to delete our leads
deleteLeads.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
});

