// Application State
const state = {
    user: {
        name: '',
        vehicleNumber: '',
        mobileNumber: '',
        serviceType: '', // 'one-day' or 'normal'
        vehicleType: '',
        officerNotes: ''
    },
    stepsOneDay: [
        { 
            title: 'Step 1', 
            description: 'Front Office 01 - Check all documents',
            guidance: [
                'Go to Front Office 01',
                'Submit all your required documents',
                'Officer will verify if all documents are complete',
                'Wait for verification to complete',
                'Click "Complete This Step" when the officer returns your documents'
            ],
            minimumTime: 30,
            userPresent: true
        },
        { 
            title: 'Step 2', 
            description: 'Front Office 02 - Get documents displayed in their system',
            guidance: [
                'Proceed to Front Office 02',
                'Your documents will be entered into the system',
                'Wait while officer processes your information',
                'Confirm all details are correct',
                'Click "Complete This Step" when officer is done'
            ],
            minimumTime: 30,
            userPresent: true
        },
        { 
            title: 'Step 3', 
            description: 'Receive token number/Payment slip',
            guidance: [
                'Receive your token number or payment slip',
                'Keep this slip safe - you will need it',
                'Note down your token number',
                'Click "Complete This Step" when you have your slip'
            ],
            minimumTime: 10,
            userPresent: true
        },
        { 
            title: 'Step 4', 
            description: 'Bank - Payment',
            guidance: [
                'Go to the bank counter',
                'Submit your payment slip',
                'Pay the required transfer fee',
                'Collect the official payment receipt',
                'Click "Complete This Step" when payment is done'
            ],
            minimumTime: 30,
            userPresent: true
        },
        { 
            title: 'Step 5', 
            description: 'Front Office 03 - Get counter number for book collection',
            guidance: [
                'Return to Front Office 03',
                'Submit your payment receipt',
                'Receive your counter number for book collection',
                'Note down the counter number',
                'Click "Complete This Step" when you receive the counter number'
            ],
            minimumTime: 30,
            userPresent: true
        },
        { 
            title: 'Step 6', 
            description: 'Waiting Area - Wait for your counter number to be called',
            guidance: [
                'Go to the designated waiting area',
                'Watch the display board for your counter number',
                'Your documents are being processed by back office staff',
                'This includes: data entry, printing CR, examining officer review, and staff officer verification',
                'Click "Complete This Step" ONLY when your counter number is called on the display'
            ],
            minimumTime: 60,
            userPresent: true
        },
        { 
            title: 'Step 7', 
            description: 'Front Office 04 - Collect your registration book',
            guidance: [
                'When your number is called, go to Front Office 04',
                'Meet with the appointed officer',
                'Receive your new vehicle registration book',
                'Verify all details are correct',
                'Sign the acknowledgment',
                'Process complete!'
            ],
            minimumTime: 30,
            userPresent: true
        }
    ],
    stepsNormal: [
        { 
            title: 'Step 1', 
            description: 'Front Office 01 - Check all documents',
            guidance: [
                'Go to Front Office 01',
                'Submit all your required documents',
                'Officer will verify if all documents are complete',
                'Wait for verification to complete',
                'Click "Complete This Step" when the officer returns your documents'
            ],
            minimumTime: 30,
            userPresent: true
        },
        { 
            title: 'Step 2', 
            description: 'Front Office 02 - Get documents displayed in their system',
            guidance: [
                'Proceed to Front Office 02',
                'Your documents will be entered into the system',
                'Wait while officer processes your information',
                'Confirm all details are correct',
                'Click "Complete This Step" when officer is done'
            ],
            minimumTime: 30,
            userPresent: true
        },
        { 
            title: 'Step 3', 
            description: 'Receive token number/Payment slip',
            guidance: [
                'Receive your token number or payment slip',
                'Keep this slip safe - you will need it',
                'Note down your token number',
                'Click "Complete This Step" when you have your slip'
            ],
            minimumTime: 10,
            userPresent: true
        },
        { 
            title: 'Step 4', 
            description: 'Bank - Payment',
            guidance: [
                'Go to the bank counter',
                'Submit your payment slip',
                'Pay the required transfer fee',
                'Collect the official payment receipt',
                'Click "Complete This Step" when payment is done'
            ],
            minimumTime: 30,
            userPresent: true
        },
        { 
            title: 'Step 5', 
            description: 'Front Office 03 - Get counter number for book collection',
            guidance: [
                'Return to Front Office 03',
                'Submit your payment receipt',
                'Receive your counter number for book collection',
                'Note down the counter number',
                'Click "Complete This Step" when you receive the counter number'
            ],
            minimumTime: 30,
            userPresent: true
        },
        { 
            title: 'Step 6', 
            description: 'Waiting Area - Wait for your counter number to be called',
            guidance: [
                'Go to the designated waiting area',
                'Watch the display board for your counter number',
                'Your documents are being processed by back office staff',
                'This includes: data entry, printing CR, examining officer review, and staff officer verification',
                'Click "Complete This Step" ONLY when your counter number is called on the display'
            ],
            minimumTime: 60,
            userPresent: true
        },
        { 
            title: 'Step 7', 
            description: 'Front Office 04 - Collect Form 52',
            guidance: [
                'When your number is called, go to Front Office 04',
                'Meet with the appointed officer',
                'Receive Form 52 (temporary transfer acknowledgment)',
                'This form confirms your transfer application is being processed',
                'You will be notified when to collect your registration book',
                'Keep Form 52 safe - you need it to collect your book later',
                'Process complete!'
            ],
            minimumTime: 30,
            userPresent: true
        }
    ],
    steps: [], // Will be set based on service type
    currentStep: 0,
    stepTimes: [],
    stepIssues: [], // Store issues reported for each step
    stepStartTime: null,
    waitingStartTime: null,
    processingStartTime: null,
    currentWaitingTime: 0,
    currentProcessingTime: 0,
    timerInterval: null,
    buttonCheckInterval: null
};

// Format time in MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Start timer for current step
function startStepTimer() {
    state.stepStartTime = Date.now();
    state.currentWaitingTime = 0;
    state.currentProcessingTime = 0;
    
    // Show waiting phase first
    document.getElementById('waitingPhase').style.display = 'block';
    document.getElementById('processingPhase').style.display = 'none';
    document.getElementById('completionPhase').style.display = 'none';
    
    const stepConfirmation = document.getElementById('stepConfirmation');
    const stepIssue = document.getElementById('stepIssue');
    const nextStepBtn = document.getElementById('nextStepBtn');
    
    // Reset
    stepConfirmation.checked = false;
    stepIssue.value = '';
    nextStepBtn.disabled = true;
    nextStepBtn.classList.add('btn-disabled');
    
    // Start Waiting Timer
    document.getElementById('startWaitingBtn').onclick = function() {
        state.waitingStartTime = Date.now();
        document.getElementById('waitingPhase').style.display = 'none';
        document.getElementById('processingPhase').style.display = 'block';
    };
    
    // Start Processing Timer
    document.getElementById('startProcessingBtn').onclick = function() {
        // Calculate waiting time
        if (state.waitingStartTime) {
            state.currentWaitingTime = Math.floor((Date.now() - state.waitingStartTime) / 1000);
        }
        state.processingStartTime = Date.now();
        
        document.getElementById('processingPhase').style.display = 'none';
        document.getElementById('completionPhase').style.display = 'block';
    };
    
    // Enable complete button when checkbox is checked
    stepConfirmation.addEventListener('change', function() {
        if (this.checked) {
            nextStepBtn.disabled = false;
            nextStepBtn.classList.remove('btn-disabled');
        } else {
            nextStepBtn.disabled = true;
            nextStepBtn.classList.add('btn-disabled');
        }
    });
}

// Stop timer and record time
function stopStepTimer() {
    if (state.stepStartTime) {
        // Calculate processing time
        if (state.processingStartTime) {
            state.currentProcessingTime = Math.floor((Date.now() - state.processingStartTime) / 1000);
        }
        
        const totalTime = Math.floor((Date.now() - state.stepStartTime) / 1000);
        const stepIssue = document.getElementById('stepIssue').value.trim();
        
        state.stepTimes.push({
            step: state.steps[state.currentStep].title,
            description: state.steps[state.currentStep].description,
            waitingTime: state.currentWaitingTime,
            processingTime: state.currentProcessingTime,
            totalTime: totalTime
        });
        
        // Store issue if reported
        state.stepIssues.push({
            step: state.steps[state.currentStep].title,
            issue: stepIssue || 'No issues reported'
        });
        
        // Reset times
        state.waitingStartTime = null;
        state.processingStartTime = null;
    }
}

// Show specific screen
function showScreen(screenId) {
    document.querySelectorAll('.form-container').forEach(container => {
        container.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Update progress bar
function updateProgress() {
    const progress = ((state.currentStep + 1) / state.steps.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Update current step text
    const currentStepNum = state.currentStep + 1;
    const totalSteps = state.steps.length;
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    const currentLabel = translations[currentLang]?.current || 'Current';
    const stepLabel = translations[currentLang]?.step || 'Step';
    const ofLabel = translations[currentLang]?.of || 'of';
    document.getElementById('currentStepText').textContent = `${stepLabel} ${currentStepNum} ${ofLabel} ${totalSteps}`;
    
    // Update next step text
    const nextStepElement = document.getElementById('nextStepText');
    const nextLabel = translations[currentLang]?.next || 'Next';
    if (currentStepNum < totalSteps) {
        const nextStep = state.steps[state.currentStep + 1];
        const nextStepNum = currentStepNum + 1;
        // Get translated step description
        const stepKey = `step${nextStepNum}-desc`;
        const nextStepName = translations[currentLang]?.[stepKey] || nextStep.description;
        nextStepElement.textContent = `${stepLabel} ${nextStepNum} - ${nextStepName}`;
        nextStepElement.parentElement.style.display = 'flex';
    } else {
        const finalLabel = translations[currentLang]?.['final-step'] || 'Final Step - Almost Done!';
        nextStepElement.textContent = finalLabel;
        nextStepElement.parentElement.style.display = 'flex';
    }
}

// Display current step
function displayStep() {
    const step = state.steps[state.currentStep];
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    const currentStepNum = state.currentStep + 1;
    
    // Translate step title and description
    const stepKey = `step${currentStepNum}-desc`;
    document.getElementById('stepTitle').textContent = step.title;
    document.getElementById('stepDescription').textContent = translations[currentLang]?.[stepKey] || step.description;
    
    // Display guidance with translation
    const guidanceList = document.getElementById('guidanceList');
    guidanceList.innerHTML = '';
    const guidanceKey = `step${currentStepNum}-guidance`;
    const guidanceItems = translations[currentLang]?.[guidanceKey] || step.guidance;
    guidanceItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        guidanceList.appendChild(li);
    });
    
    updateProgress();
    startStepTimer();
}

// Validation functions
function validateName(name) {
    // Name should be at least 2 characters and contain only letters and spaces
    const namePattern = /^[a-zA-Z\s]{2,}$/;
    return namePattern.test(name.trim());
}

function validateVehicleNumber(vehicleNumber) {
    // Sri Lankan vehicle number format: ABC-1234 or ABC1234 or 12-1234
    const vehiclePattern = /^[A-Z]{2,3}[-\s]?\d{4}$|^\d{2}[-\s]?\d{4}$/i;
    return vehiclePattern.test(vehicleNumber.trim());
}

function validatePhoneNumber(phoneNumber) {
    // Sri Lankan phone number: 0771234567 or +94771234567 or 94771234567
    const phonePattern = /^(?:\+94|0)?[0-9]{9,10}$/;
    return phonePattern.test(phoneNumber.replace(/[\s-]/g, ''));
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const formGroup = input.parentElement;
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    input.style.borderColor = '#dc3545';
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const formGroup = input.parentElement;
    
    // Remove error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Remove error styling
    input.style.borderColor = '#e0e0e0';
}

// Handle user form submission
document.getElementById('userForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('userName').value;
    const vehicleNumber = document.getElementById('vehicleNumber').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    
    let isValid = true;
    
    // Validate name
    if (!validateName(name)) {
        showError('userName', 'Please enter a valid name (letters only, at least 2 characters)');
        isValid = false;
    } else {
        clearError('userName');
    }
    
    // Validate vehicle number
    if (!validateVehicleNumber(vehicleNumber)) {
        showError('vehicleNumber', 'Please enter a valid vehicle number (e.g., ABC-1234 or 12-1234)');
        isValid = false;
    } else {
        clearError('vehicleNumber');
    }
    
    // Validate phone number
    if (!validatePhoneNumber(mobileNumber)) {
        showError('mobileNumber', 'Please enter a valid Sri Lankan phone number (e.g., 0771234567)');
        isValid = false;
    } else {
        clearError('mobileNumber');
    }
    
    // Only proceed if all validations pass
    if (isValid) {
        state.user.name = name.trim();
        state.user.vehicleNumber = vehicleNumber.trim().toUpperCase();
        state.user.mobileNumber = mobileNumber.replace(/[\s-]/g, '');
        
        showScreen('serviceTypeSelection');
    }
});

// Handle service type selection (One Day or Normal)
document.querySelectorAll('.service-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        state.user.serviceType = btn.dataset.type;
        
        // Set the appropriate steps based on service type
        if (state.user.serviceType === 'one-day') {
            state.steps = state.stepsOneDay;
        } else {
            state.steps = state.stepsNormal;
        }
        
        showScreen('vehicleSelection');
    });
});

// Handle vehicle type selection
document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        state.user.vehicleType = btn.textContent.trim();
        
        // Display service on checklist
        document.getElementById('displayServiceChecklist').textContent = state.user.vehicleType;
        
        showScreen('documentChecklist');
    });
});

// Handle document checklist
const checkboxes = document.querySelectorAll('.doc-checkbox');
const proceedBtn = document.getElementById('proceedBtn');
const checklistWarning = document.getElementById('checklistWarning');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        proceedBtn.disabled = !allChecked;
        checklistWarning.style.display = allChecked ? 'none' : 'block';
    });
});

proceedBtn.addEventListener('click', () => {
    // Display user info
    document.getElementById('displayName').textContent = state.user.name;
    document.getElementById('displayVehicle').textContent = state.user.vehicleNumber;
    document.getElementById('displayServiceType').textContent = state.user.serviceType === 'one-day' ? 'One Day Service' : 'Normal Service';
    document.getElementById('displayService').textContent = state.user.vehicleType;
    
    showScreen('processSteps');
    displayStep();
});

// Handle missing documents button
document.getElementById('missingDocsBtn').addEventListener('click', () => {
    document.getElementById('displayServiceInfo').textContent = state.user.vehicleType;
    document.getElementById('displayServiceTypeInfo').textContent = state.user.serviceType === 'one-day' ? 'One Day Service → Normal Service' : 'Normal Service';
    
    // If user was on One Day service, show warning and switch to Normal
    if (state.user.serviceType === 'one-day') {
        document.getElementById('oneDayWarning').style.display = 'block';
        document.getElementById('missingDocsSubtitle').textContent = 'Switching to Normal Service';
        document.getElementById('continueNormalService').style.display = 'block';
        
        // Switch to normal service steps
        state.user.serviceType = 'normal';
        state.steps = state.stepsNormal;
    }
    
    showScreen('informationCounter');
    
    // Save officer notes when user types (optional)
    document.getElementById('officerNotes').addEventListener('input', (e) => {
        state.user.officerNotes = e.target.value;
    });
});

// Continue with Normal Service after missing documents
document.getElementById('continueNormalService').addEventListener('click', () => {
    // Display user info
    document.getElementById('displayName').textContent = state.user.name;
    document.getElementById('displayVehicle').textContent = state.user.vehicleNumber;
    document.getElementById('displayServiceType').textContent = 'Normal Service';
    document.getElementById('displayService').textContent = state.user.vehicleType;
    
    showScreen('processSteps');
    displayStep();
});

// Handle next step button
document.getElementById('nextStepBtn').addEventListener('click', () => {
    stopStepTimer();
    
    state.currentStep++;
    
    if (state.currentStep < state.steps.length) {
        displayStep();
    } else {
        showCompletionScreen();
    }
});

// Save data to your server/spreadsheet
async function saveToSpreadsheet(isEarlyExit = false, exitReason = '') {
    const timestamp = new Date().toLocaleString();
    const totalSeconds = state.stepTimes.reduce((sum, step) => sum + (step.totalTime || 0), 0);
    
    const data = {
        timestamp: timestamp,
        name: state.user.name,
        vehicleNumber: state.user.vehicleNumber,
        mobileNumber: state.user.mobileNumber,
        serviceType: state.user.serviceType === 'one-day' ? 'One Day Service' : 'Normal Service',
        vehicleType: state.user.vehicleType,
        officerNotes: state.user.officerNotes || 'N/A',
        step1WaitTime: state.stepTimes[0]?.waitingTime || 0,
        step1ProcessTime: state.stepTimes[0]?.processingTime || 0,
        step1TotalTime: state.stepTimes[0]?.totalTime || 0,
        step1Issue: state.stepIssues[0]?.issue || 'No issues reported',
        step2WaitTime: state.stepTimes[1]?.waitingTime || 0,
        step2ProcessTime: state.stepTimes[1]?.processingTime || 0,
        step2TotalTime: state.stepTimes[1]?.totalTime || 0,
        step2Issue: state.stepIssues[1]?.issue || 'No issues reported',
        step3WaitTime: state.stepTimes[2]?.waitingTime || 0,
        step3ProcessTime: state.stepTimes[2]?.processingTime || 0,
        step3TotalTime: state.stepTimes[2]?.totalTime || 0,
        step3Issue: state.stepIssues[2]?.issue || 'No issues reported',
        step4WaitTime: state.stepTimes[3]?.waitingTime || 0,
        step4ProcessTime: state.stepTimes[3]?.processingTime || 0,
        step4TotalTime: state.stepTimes[3]?.totalTime || 0,
        step4Issue: state.stepIssues[3]?.issue || 'No issues reported',
        step5WaitTime: state.stepTimes[4]?.waitingTime || 0,
        step5ProcessTime: state.stepTimes[4]?.processingTime || 0,
        step5TotalTime: state.stepTimes[4]?.totalTime || 0,
        step5Issue: state.stepIssues[4]?.issue || 'No issues reported',
        step6WaitTime: state.stepTimes[5]?.waitingTime || 0,
        step6ProcessTime: state.stepTimes[5]?.processingTime || 0,
        step6TotalTime: state.stepTimes[5]?.totalTime || 0,
        step6Issue: state.stepIssues[5]?.issue || 'No issues reported',
        step7WaitTime: state.stepTimes[6]?.waitingTime || 0,
        step7ProcessTime: state.stepTimes[6]?.processingTime || 0,
        step7TotalTime: state.stepTimes[6]?.totalTime || 0,
        step7Issue: state.stepIssues[6]?.issue || 'No issues reported',
        totalTime: totalSeconds,
        stepDetails: state.stepTimes,
        isEarlyExit: isEarlyExit,
        exitReason: exitReason,
        exitedAtStep: isEarlyExit ? (state.currentStep + 1) : 0
    };
    
    try {
        // Send data to Google Sheets via Google Apps Script Web App
        // PASTE YOUR WEB APP URL HERE (the one you get after deploying with "Anyone" access)
        const response = await fetch('https://script.google.com/macros/s/AKfycbxX9N4T4PTcoYG0PmXxz9UMA54LwfzcXO_tUxOvrAcDX_2WVGNTZHIzHmno9Yu02sHpmQ/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        console.log('Data sent successfully:', data);
        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        // Still show completion even if save fails
        return false;
    }
}

// Show completion screen with summary
function showCompletionScreen() {
    const summaryDiv = document.getElementById('timeSummary');
    summaryDiv.innerHTML = '';
    
    let totalSeconds = 0;
    
    state.stepTimes.forEach(stepTime => {
        totalSeconds += stepTime.time;
        
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step-summary';
        stepDiv.innerHTML = `
            <span>${stepTime.step}: ${stepTime.description}</span>
            <span style="font-weight: 600; color: #667eea;">${formatTime(stepTime.time)}</span>
        `;
        summaryDiv.appendChild(stepDiv);
    });
    
    document.getElementById('totalTime').textContent = formatTime(totalSeconds);
    
    // Save data to your server
    saveToSpreadsheet();
    
    showScreen('completionScreen');
}

// Initialize - show language selection
showScreen('languageSelection');

// Language Selection Handler
document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        setLanguage(lang);
        showScreen('registrationForm');
    });
});

// Exit Process Button Handler
document.getElementById('exitProcessBtn').addEventListener('click', () => {
    document.getElementById('exitModal').style.display = 'flex';
    document.getElementById('exitReason').value = '';
    document.getElementById('exitReasonError').textContent = '';
});

// Cancel Exit
document.getElementById('cancelExitBtn').addEventListener('click', () => {
    document.getElementById('exitModal').style.display = 'none';
});

// Confirm Exit
document.getElementById('confirmExitBtn').addEventListener('click', async () => {
    const exitReason = document.getElementById('exitReason').value.trim();
    const errorElement = document.getElementById('exitReasonError');
    
    if (!exitReason) {
        errorElement.textContent = 'Please provide a reason before exiting';
        return;
    }
    
    // Save partial data with exit reason
    await saveToSpreadsheet(true, exitReason);
    
    // Show a farewell message
    document.getElementById('exitModal').style.display = 'none';
    alert('Thank you for your feedback. We will use this information to improve our service.');
    location.reload();
});
