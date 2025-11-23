// Google Apps Script code to connect your website to Google Sheets
// This code should be deployed as a Web App in Google Apps Script

// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com/
// 2. Create a new project
// 3. Paste this code
// 4. Click "Deploy" > "New deployment"
// 5. Select type: "Web app"
// 6. Set "Execute as": Me
// 7. Set "Who has access": Anyone
// 8. Click "Deploy" and copy the URL
// 9. Replace 'YOUR_SCRIPT_URL' in script.js with the URL you copied

function doPost(e) {
  try {
    // Get the active spreadsheet (or create one)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // If this is the first time, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Vehicle Number',
        'Mobile Number',
        'Service Type (One Day/Normal)',
        'Vehicle Type',
        'Officer Notes (Missing Docs)',
        'Step 1 Wait (sec)',
        'Step 1 Process (sec)',
        'Step 1 Total (sec)',
        'Step 1 Issues',
        'Step 2 Wait (sec)',
        'Step 2 Process (sec)',
        'Step 2 Total (sec)',
        'Step 2 Issues',
        'Step 3 Wait (sec)',
        'Step 3 Process (sec)',
        'Step 3 Total (sec)',
        'Step 3 Issues',
        'Step 4 Wait (sec)',
        'Step 4 Process (sec)',
        'Step 4 Total (sec)',
        'Step 4 Issues',
        'Step 5 Wait (sec)',
        'Step 5 Process (sec)',
        'Step 5 Total (sec)',
        'Step 5 Issues',
        'Step 6 Wait (sec)',
        'Step 6 Process (sec)',
        'Step 6 Total (sec)',
        'Step 6 Issues',
        'Step 7 Wait (sec)',
        'Step 7 Process (sec)',
        'Step 7 Total (sec)',
        'Step 7 Issues',
        'Grand Total Time (sec)',
        'Grand Total Time (min)',
        'Process Completed',
        'Exit Reason (If Abandoned)'
      ]);
    }
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Calculate total time in minutes
    var totalMinutes = (data.totalTime / 60).toFixed(2);
    
    // Add new row with data
    var row = [
      data.timestamp,
      data.name,
      data.vehicleNumber,
      data.mobileNumber,
      data.serviceType,
      data.vehicleType,
      data.officerNotes,
      data.step1WaitTime,
      data.step1ProcessTime,
      data.step1TotalTime,
      data.step1Issue,
      data.step2WaitTime,
      data.step2ProcessTime,
      data.step2TotalTime,
      data.step2Issue,
      data.step3WaitTime,
      data.step3ProcessTime,
      data.step3TotalTime,
      data.step3Issue,
      data.step4WaitTime,
      data.step4ProcessTime,
      data.step4TotalTime,
      data.step4Issue,
      data.step5WaitTime,
      data.step5ProcessTime,
      data.step5TotalTime,
      data.step5Issue,
      data.step6WaitTime,
      data.step6ProcessTime,
      data.step6TotalTime,
      data.step6Issue,
      data.step7WaitTime,
      data.step7ProcessTime,
      data.step7TotalTime,
      data.step7Issue,
      data.totalTime,
      (data.totalTime / 60).toFixed(2),
      data.isEarlyExit ? 'NO - Exited at Step ' + data.exitedAtStep : 'YES - Completed',
      data.isEarlyExit ? data.exitReason : ''
    ];
    
    sheet.appendRow(row);
    
    // If early exit, color the exit reason cell red
    if (data.isEarlyExit) {
      var lastRow = sheet.getLastRow();
      var exitReasonColumn = 39; // Column 39 is the Exit Reason column
      sheet.getRange(lastRow, exitReasonColumn).setBackground('#ffcccc').setFontWeight('bold');
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function doGet(e) {
  return ContentService.createTextOutput('Server is running! Use POST to submit data.');
}
