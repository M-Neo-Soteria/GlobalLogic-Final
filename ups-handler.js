/**
 * UPS Checklist - Save Functionality
 * Add this script before closing </body> tag in UPS.html
 */

<script src="api-client.js"></script>
<script>
  // UPS specific save handler
  async function saveUPSChecklist() {
    try {
      disableSaveButton(true);

      // Get date
      const dateInput = document.querySelector('input[type="date"]');
      const date = dateInput?.value || new Date().toISOString().split('T')[0];

      // Get UPS unit
      const upsUnitSelect = document.querySelector('select[name="upsUnit"]');
      const upsUnit = upsUnitSelect?.value || 'UPS-1';

      // Collect readings from table
      const readings = [];
      const tableRows = document.querySelectorAll('table tbody tr');

      tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
          const timeInput = cells[0]?.querySelector('input');
          
          if (timeInput?.value) {
            const reading = {
              time: timeInput.value,
              inputVoltage: parseFloat(cells[1]?.querySelector('input')?.value) || null,
              inputFrequency: parseFloat(cells[2]?.querySelector('input')?.value) || null,
              batteryVoltage: parseFloat(cells[3]?.querySelector('input')?.value) || null,
              batteryCapacity: parseFloat(cells[4]?.querySelector('input')?.value) || null,
              outputVoltage: parseFloat(cells[5]?.querySelector('input')?.value) || null,
              outputFrequency: parseFloat(cells[6]?.querySelector('input')?.value) || null,
              outputPower: parseFloat(cells[7]?.querySelector('input')?.value) || null,
              temperature: parseFloat(cells[8]?.querySelector('input')?.value) || null,
              alarmStatus: cells[9]?.querySelector('input')?.value || '',
              notes: cells[10]?.querySelector('input')?.value || ''
            };
            readings.push(reading);
          }
        }
      });

      // Get signature fields
      const checkedBy = document.querySelector('input[name="checkedBy"]')?.value || '';
      const supervisorName = document.querySelector('input[name="supervisorName"]')?.value || '';
      const supervisorSignature = document.querySelector('input[name="supervisorSignature"]')?.value || '';

      // Prepare data
      const data = {
        date,
        upsUnit,
        readings,
        checkedBy,
        supervisorName,
        supervisorSignature
      };

      console.log('Sending UPS data:', data);

      // Save to backend
      const response = await UPSAPI.save(data);

      if (response.success) {
        showNotification(`✓ UPS checklist saved successfully! ID: ${response.id}`, 'success');
        console.log('Saved with ID:', response.id);
        sessionStorage.setItem('ups_id', response.id);
      } else {
        showNotification(`✗ Error: ${response.message}`, 'error');
        console.error('Save failed:', response.error);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      showNotification('✗ Unexpected error occurred', 'error');
    } finally {
      disableSaveButton(false);
    }
  }

  // Attach event listener when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.querySelector('.btn-save');
    if (saveBtn) {
      saveBtn.addEventListener('click', saveUPSChecklist);
      console.log('✓ UPS save button initialized');
    }
  });

  // Optional: Auto-save every 5 minutes
  let autoSaveInterval = null;

  function enableAutoSave(intervalMinutes = 5) {
    autoSaveInterval = setInterval(() => {
      console.log('Auto-saving UPS checklist...');
      saveUPSChecklist();
    }, intervalMinutes * 60 * 1000);
  }

  function disableAutoSave() {
    if (autoSaveInterval) {
      clearInterval(autoSaveInterval);
      autoSaveInterval = null;
    }
  }

  // Load previously saved data
  async function loadUPSData(id) {
    const response = await UPSAPI.getById(id);
    if (response.success) {
      populateUPSForm(response.data);
    }
  }

  function populateUPSForm(data) {
    // Set date
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput && data.date) {
      dateInput.value = data.date.split('T')[0];
    }

    // Set UPS unit
    const upsUnitSelect = document.querySelector('select[name="upsUnit"]');
    if (upsUnitSelect) upsUnitSelect.value = data.upsUnit || 'UPS-1';

    // Set signature fields
    const checkedByInput = document.querySelector('input[name="checkedBy"]');
    if (checkedByInput) checkedByInput.value = data.checkedBy || '';

    const supervisorNameInput = document.querySelector('input[name="supervisorName"]');
    if (supervisorNameInput) supervisorNameInput.value = data.supervisorName || '';

    const supervisorSignatureInput = document.querySelector('input[name="supervisorSignature"]');
    if (supervisorSignatureInput) supervisorSignatureInput.value = data.supervisorSignature || '';

    // Populate readings
    const tableRows = document.querySelectorAll('table tbody tr');
    data.readings.forEach((reading, index) => {
      if (tableRows[index]) {
        const inputs = tableRows[index].querySelectorAll('input');
        const fieldNames = ['time', 'inputVoltage', 'inputFrequency', 'batteryVoltage', 
                           'batteryCapacity', 'outputVoltage', 'outputFrequency', 'outputPower',
                           'temperature', 'alarmStatus', 'notes'];
        
        fieldNames.forEach((fieldName, i) => {
          if (inputs[i]) {
            inputs[i].value = reading[fieldName] || '';
          }
        });
      }
    });

    console.log('✓ Form data loaded');
  }
</script>
