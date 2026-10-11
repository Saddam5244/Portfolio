import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

os.makedirs('assets', exist_ok=True)
os.makedirs('public', exist_ok=True)
os.makedirs('public/assets', exist_ok=True)

pdf_targets = [
    'assets/Saddam_Ahmad_Resume.pdf',
    'public/assets/Saddam_Ahmad_Resume.pdf',
    'public/Saddam_Ahmad_Resume.pdf'
]

styles = getSampleStyleSheet()

primary_color = colors.HexColor('#0f172a')
accent_color = colors.HexColor('#0284c7')
text_dark = colors.HexColor('#1e293b')
text_muted = colors.HexColor('#475569')
line_color = colors.HexColor('#cbd5e1')

title_style = ParagraphStyle(
    'DocTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=20,
    leading=24,
    textColor=primary_color,
    alignment=1
)

subtitle_style = ParagraphStyle(
    'DocSubtitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=14,
    textColor=accent_color,
    alignment=1
)

contact_style = ParagraphStyle(
    'DocContact',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=12,
    textColor=text_muted,
    alignment=1
)

heading_style = ParagraphStyle(
    'SectionHeading',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10.5,
    leading=14,
    textColor=primary_color,
    spaceBefore=5,
    spaceAfter=2
)

body_style = ParagraphStyle(
    'Body',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=12,
    textColor=text_dark
)

bold_body_style = ParagraphStyle(
    'BoldBody',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8.5,
    leading=12,
    textColor=text_dark
)

bullet_style = ParagraphStyle(
    'Bullet',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11.5,
    textColor=text_dark,
    leftIndent=10
)

for target in pdf_targets:
    doc = SimpleDocTemplate(
        target,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=32
    )

    story = []

    # Header
    story.append(Paragraph('SADDAM AHMAD', title_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph('MERN STACK DEVELOPER &bull; SOFTWARE ENGINEER', subtitle_style))
    story.append(Spacer(1, 3))
    contact_text = 'Azamgarh, UP, India &nbsp;|&nbsp; +91 9648905244 &nbsp;|&nbsp; ahmadsaddam443@gmail.com &nbsp;|&nbsp; github.com/Saddam5244 &nbsp;|&nbsp; linkedin.com/in/saddam-ahmad-020430323'
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width='100%', thickness=1.5, color=accent_color, spaceAfter=6))

    # Summary
    story.append(Paragraph('PROFESSIONAL SUMMARY', heading_style))
    story.append(HRFlowable(width='100%', thickness=0.5, color=line_color, spaceAfter=3))
    summary_text = 'B.Tech Computer Science &amp; Engineering student (3rd year) at Uttar Pradesh Textile Technology Institute (UPTTI), Kanpur. Skilled in full-stack web development with MongoDB, Express.js, React.js, Node.js, REST APIs, and database integration. Completed Front-End Developer internship at CodeAlpha, developed AI-based Phishing Detection System, and created WeatherGPT for agricultural forecasting. Solved 54+ problems on LeetCode with strong foundation in Data Structures and Algorithms in Java.'
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))

    # Education
    story.append(Paragraph('EDUCATION', heading_style))
    story.append(HRFlowable(width='100%', thickness=0.5, color=line_color, spaceAfter=3))
    edu_text1 = '<b>B.Tech in Computer Science &amp; Engineering</b> | <i>UPTTI, Kanpur</i> (2024 &ndash; 2028)<br/>&bull; YGPA: 8.41 (Year 1, 2024&ndash;2025) &nbsp;|&nbsp; YGPA: 9.40 (Year 2, 2025&ndash;2026)'
    story.append(Paragraph(edu_text1, body_style))
    story.append(Spacer(1, 2))
    edu_text2 = '<b>Intermediate (Class XII, Science)</b> &bull; Shibli National Inter College, Azamgarh &nbsp;|&nbsp; <b>80.0%</b> (2021 &ndash; 2022)<br/><b>High School (Class X)</b> &bull; Shibli National Inter College, Azamgarh &nbsp;|&nbsp; <b>83.33%</b> (2019 &ndash; 2020)'
    story.append(Paragraph(edu_text2, body_style))
    story.append(Spacer(1, 4))

    # Technical Skills
    story.append(Paragraph('TECHNICAL SKILLS', heading_style))
    story.append(HRFlowable(width='100%', thickness=0.5, color=line_color, spaceAfter=3))
    skills_text = '<b>Languages:</b> Java, C, JavaScript (ES6+), Python<br/>' \
                  '<b>Web Development:</b> HTML5, CSS3, Tailwind CSS, Bootstrap, React.js, Node.js, Express.js, REST APIs, EmailJS<br/>' \
                  '<b>Databases &amp; Cloud:</b> MongoDB, Firebase Hosting, Firebase Authentication<br/>' \
                  '<b>Developer Tools:</b> Git &amp; GitHub, Postman, VS Code, MS Office, Video Editing'
    story.append(Paragraph(skills_text, body_style))
    story.append(Spacer(1, 4))

    # Experience
    story.append(Paragraph('WORK EXPERIENCE', heading_style))
    story.append(HRFlowable(width='100%', thickness=0.5, color=line_color, spaceAfter=3))
    story.append(Paragraph('<b>Front-End Developer Intern</b> &mdash; <i>CodeAlpha</i> &nbsp;&nbsp;|&nbsp;&nbsp; Feb 2026 &ndash; Mar 2026', bold_body_style))
    story.append(Paragraph('&bull; Engineered responsive front-end web applications (Image Gallery, Portfolio, Music Player) utilizing semantic HTML5, CSS3, and JavaScript.', bullet_style))
    story.append(Paragraph('&bull; Applied mobile-first responsive architecture and modern interactive UI workflows across production projects.', bullet_style))
    story.append(Spacer(1, 4))

    # Projects
    story.append(Paragraph('KEY PROJECTS', heading_style))
    story.append(HRFlowable(width='100%', thickness=0.5, color=line_color, spaceAfter=3))

    story.append(Paragraph('<b>WeatherGPT: AI Agriculture &amp; Weather Advisor</b> &bull; <i>Python, OpenAI GPT, Weather APIs</i>', bold_body_style))
    story.append(Paragraph('&bull; Real-time climate forecasts and AI agronomy guidance tailored for farmers with automated crop protection tips.', bullet_style))
    story.append(Spacer(1, 2))

    story.append(Paragraph('<b>AI-Based Phishing Detection &amp; Prevention System</b> &bull; <i>MERN Stack (MongoDB, Express, React, Node)</i>', bold_body_style))
    story.append(Paragraph('&bull; Multi-channel cybersecurity platform inspecting emails, SMS, and WhatsApp for fraudulent links and spoofed domains.', bullet_style))
    story.append(Spacer(1, 2))

    story.append(Paragraph('<b>Student Placement Prediction System</b> &bull; <i>Python, Scikit-learn, Machine Learning</i>', bold_body_style))
    story.append(Paragraph('&bull; Analyzed 100,000 student academic records; benchmarked Random Forest, SVM, and Logistic Regression with 91.2% accuracy.', bullet_style))
    story.append(Spacer(1, 2))

    story.append(Paragraph('<b>Laundry Services Web Application</b> &bull; <i>HTML5, CSS3, JavaScript, EmailJS</i>', bold_body_style))
    story.append(Paragraph('&bull; Dynamic cart and booking management application with instant automated confirmation emails via EmailJS.', bullet_style))
    story.append(Spacer(1, 4))

    # Leadership
    story.append(Paragraph('LEADERSHIP &amp; CAMPUS ACTIVITIES', heading_style))
    story.append(HRFlowable(width='100%', thickness=0.5, color=line_color, spaceAfter=3))
    story.append(Paragraph('&bull; <b>Coordinator, Activity Club &ndash; UPTTI Kanpur:</b> Led planning and execution of campus technical &amp; cultural fests.', bullet_style))
    story.append(Paragraph('&bull; <b>Co-Coordinator, Social Service Club &ndash; UPTTI Kanpur:</b> Organized social awareness campaigns and community support drives.', bullet_style))

    doc.build(story)

print('Success: Generated resume PDF files!')
