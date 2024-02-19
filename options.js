
// Saves options to chrome.storage
function save_options() {
	var smr1 = document.getElementById('smr1').checked;
	var smr2 = document.getElementById('smr2').checked;
	var smr3 = document.getElementById('smr3').checked;
	var smr4 = document.getElementById('smr4').checked;
	var champ1 = document.getElementById('champ1').checked;
	var champ2 = document.getElementById('champ2').checked;
	var champ3 = document.getElementById('champ3').checked;
	var champ4 = document.getElementById('champ4').checked;
  chrome.storage.sync.set({
	smr1: smr1,
	smr2: smr2,
	smr3: smr3,
	smr4: smr4,
	champ1: champ1,
	champ2: champ2,
	champ3: champ3,
	champ4: champ4
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default values
  chrome.storage.sync.get({
	smr1: true,
	smr2: true,
	smr3: true,
	smr4: true,
	champ1: true,
	champ2: true,
	champ3: true,
	champ4: true
  }, function(items) {
	document.getElementById('smr1').checked = items.smr1;
	document.getElementById('smr2').checked = items.smr2;
	document.getElementById('smr3').checked = items.smr3;
	document.getElementById('smr4').checked = items.smr4;
	document.getElementById('champ1').checked = items.champ1;
	document.getElementById('champ2').checked = items.champ2;
	document.getElementById('champ3').checked = items.champ3;
	document.getElementById('champ4').checked = items.champ4;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);