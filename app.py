from flask import Flask, render_template, request, redirect, url_for
import gspread
import gunicorn
from oauth2client.service_account import ServiceAccountCredentials

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    email = request.form['email']
    course = request.form['course']
    semester = request.form['semester']
    subject = request.form['subject']
    phone = request.form['phone']
    
    # Write data to Google Sheet
    write_to_google_sheet(name, email, course, semester, subject, phone)

    # Redirect to notes page
    return redirect(url_for('notes', course=course, semester=semester, subject=subject))

@app.route('/notes')
def notes():
    course = request.args.get('course')
    semester = request.args.get('semester')
    subject = request.args.get('subject')
    return render_template('notes.html', course=course, semester=semester, subject=subject)

def write_to_google_sheet(name, email, course, semester, subject, phone):
    scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
    creds = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
    client = gspread.authorize(creds)

    sheet = client.open("Bhavy").sheet1  # Replace with your Google Sheet name

    # Append the data to the sheet
    sheet.append_row([name, email, course, semester, subject, phone])

if __name__ == '__main__':
    app.run(debug=True)
