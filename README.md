# Department of Motor Traffic - Time Tracking Research Website

This website is designed to track the time users spend at each step when processing vehicle transfers at the Department of Motor Traffic, Sri Lanka.

## Features
- User registration (Name, Vehicle Number, Mobile Number)
- Service selection (Car Transfer, Motorcycle Transfer, General Vehicle Transfer)
- Step-by-step process tracking with timers
- Automatic data collection to Google Sheets

## Setup Instructions

### 1. Set Up Google Sheets for Data Collection

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "DMT Time Tracking Research" or any name you prefer
3. Open the spreadsheet and click on **Extensions** > **Apps Script**
4. Delete any existing code and paste the code from `server-setup.gs`
5. Click **Deploy** > **New deployment**
6. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
7. Configure:
   - Description: "DMT Research Data Collector"
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Click **Deploy**
9. **Authorize** the app when prompted
10. **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/ABC123.../exec`)

### 2. Update the Website Code

1. Open `script.js`
2. Find the line: `const response = await fetch('YOUR_SCRIPT_URL', {`
3. Replace `'YOUR_SCRIPT_URL'` with the URL you copied from step 10
4. Save the file

### 3. Deploy Your Website

**Option A: Host on GitHub Pages (Free)**
1. Create a GitHub account if you don't have one
2. Create a new repository
3. Upload `index.html`, `script.js`, and `styles.css`
4. Go to Settings > Pages
5. Enable GitHub Pages
6. Your website URL will be: `https://yourusername.github.io/repositoryname`

**Option B: Host on Netlify (Free)**
1. Go to [Netlify](https://www.netlify.com/)
2. Drag and drop your folder with the three files
3. Get your website URL

**Option C: Local Testing**
1. Simply open `index.html` in a web browser
2. Note: You'll need to deploy online for QR code access from mobile devices

### 4. Create QR Code

1. Go to any QR code generator (e.g., [qr-code-generator.com](https://www.qr-code-generator.com/))
2. Enter your website URL
3. Download and print the QR code
4. Place it at the Department of Motor Traffic location

## Data Collected

The Google Sheet will automatically collect:
- **Timestamp**: When the user completed the process
- **Name**: User's full name
- **Vehicle Number**: Vehicle registration number
- **Mobile Number**: User's contact number
- **Service**: Type of service selected
- **Step 1 Time**: Time spent at document check counter (seconds)
- **Step 2 Time**: Time spent paying fees at bank (seconds)
- **Step 3 Time**: Time spent getting counter number (seconds)
- **Step 4 Time**: Time spent getting transfer book (seconds)
- **Total Time**: Complete process duration (seconds and minutes)

## Research Use

This data will help analyze:
- Average time per step
- Bottlenecks in the process
- Service efficiency comparisons
- Peak time patterns
- Process improvement opportunities

## Privacy Note

All data collected is for research purposes to improve service efficiency at the Department of Motor Traffic.
