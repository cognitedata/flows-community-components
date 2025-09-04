// --- Seed data for the list view ---
const dataProducts = [
    { id: "Data_product_1", status: "Draft",      lastEdited: "Dec 17, 2024", created: "Aug 29, 2018" },
    { id: "Data_product_2", status: "Published",  lastEdited: "Dec 17, 2024", created: "Aug 29, 2018" },
    { id: "Data_product_3", status: "Archived",   lastEdited: "Dec 17, 2024", created: "Aug 29, 2018" },
  ];
  
  // ---- DOM helpers ----
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  
  // Views
  const listView   = $('[data-view="list"]');
  const detailView = $('[data-view="detail"]');
  const tbody      = $('#dp-tbody');
  
  // Detail targets
  const tTitle    = $('[data-detail-title]');
  const tId       = $('[data-detail-id]');
  const tStatus   = $('[data-detail-status]');
  const tOwners   = $('[data-detail-owners]');      // optional
  const tAvail    = $('[data-detail-availability]'); // optional
  const tFresh    = $('[data-detail-freshness]');    // optional
  
  // Render the table rows
  function renderTable(items = dataProducts) {
    if (!tbody) return;
    tbody.innerHTML = items.map(dp => `
      <tr data-id="${dp.id}" class="row">
        <td><input type="checkbox" aria-label="Select ${dp.id}"></td>
        <td class="name"><button class="linklike" data-open-detail="${dp.id}">${dp.id}</button></td>
        <td class="status">
          <span class="badge badge--${dp.status.toLowerCase()}">${dp.status}</span>
        </td>
        <td class="last-edited">${dp.lastEdited}</td>
        <td class="created">${dp.created}</td>
        <td class="actions"><button class="icon-btn" aria-label="Row actions">⋯</button></td>
      </tr>
    `).join('');
  }
  renderTable();
  
  // Navigation between views
  function showList()  { listView.hidden = false; detailView.hidden = true;  window.scrollTo(0,0); }
  function showDetail(id) {
    const dp = dataProducts.find(d => d.id === id);
    if (!dp) return;
    tTitle.textContent  = dp.id.replaceAll('_',' ');
    tId.textContent     = dp.id;
    tStatus.textContent = dp.status;
    if (tAvail)  tAvail.textContent  = dp.status === "Published" ? "99.95%" : "—";
    if (tFresh)  tFresh.textContent  = dp.status === "Published" ? "real-time" : "—";
    if (tOwners) tOwners.textContent = "John Smith (Data Engineer), Sarah Johnson (Domain Owner)";
    listView.hidden = true;
    detailView.hidden = false;
    window.scrollTo(0,0);
  }
  
  // Event delegation (one listener handles all row clicks & back)
  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-open-detail]');
    if (openBtn) {
      e.preventDefault();
      showDetail(openBtn.getAttribute('data-open-detail'));
      return;
    }
    if (e.target.matches('[data-action="back"]')) {
      e.preventDefault();
      showList();
    }
  });import { Card, Button, Input, Dropzone } from "./src/cogs.js";

  const mount = document.getElementById("app"); // ensure you have <div id="app"></div> in index.html
  
  const ui = Card(`
    <h1 style="margin:0 0 12px 0;">Hello Cogs</h1>
  `);
  const input = Input({ placeholder: "Type something…" });
  const button = Button("Click me", { onclick: () => alert("Hi!") });
  const drop = Dropzone((files) => console.log("CSV files:", files));
  
  ui.appendChild(input);
  ui.appendChild(button);
  ui.appendChild(document.createElement("div")).style.height = "12px";
  ui.appendChild(drop);
  
  mount.appendChild(ui);