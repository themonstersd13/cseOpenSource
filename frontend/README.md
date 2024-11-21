<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notes Adda - README</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
        }
        header {
            background-color: #4CAF50;
            color: white;
            padding: 20px 10px;
            text-align: center;
        }
        section {
            padding: 20px;
            margin: 10px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        h1, h2 {
            color: #4CAF50;
        }
        ul {
            list-style-type: square;
            padding-left: 20px;
        }
        .file-structure {
            font-family: monospace;
            background: #f9f9f9;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 10px;
            margin-top: 20px;
        }
        a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <header>
        <h1>Notes Adda</h1>
        <p>A MERN Stack Project for Sharing and Managing Study Materials</p>
    </header>
    
    <section>
        <h2>Introduction</h2>
        <p>Notes Adda is a platform that simplifies sharing and accessing study materials. Built using the MERN stack, it provides an efficient and user-friendly system for academic collaboration.</p>
    </section>

    <section>
        <h2>Features</h2>
        <ul>
            <li>User-friendly interface for uploading and accessing study notes.</li>
            <li>Advanced search functionality for quick retrieval.</li>
            <li>Secure login and authentication system.</li>
            <li>Supports multiple file formats for notes.</li>
        </ul>
    </section>

    <section>
        <h2>Working</h2>
        <h3>Frontend</h3>
        <p>Developed using React, the frontend ensures a dynamic and responsive user experience.</p>
        <h3>Backend</h3>
        <p>The backend, built with Node.js and Express, handles server-side operations and API integration.</p>
        <h3>Database</h3>
        <p>MongoDB is used to store user data and metadata of uploaded notes securely.</p>
        <h3>Workflow</h3>
        <ul>
            <li><strong>User Authentication:</strong> Secure sign-up and login system.</li>
            <li><strong>Upload Notes:</strong> Users can upload files with descriptions.</li>
            <li><strong>Search Notes:</strong> Advanced search filters by title, tags, or categories.</li>
            <li><strong>Download Notes:</strong> Download resources easily.</li>
        </ul>
    </section>

    <section>
        <h2>File Structure</h2>
        <pre class="file-structure">
cseOpenSource/
├── backend/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handling logic
│   ├── models/         # Mongoose schemas and models
│   ├── routes/         # API routes
│   ├── server.js       # Backend entry point
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main application pages
│   │   ├── App.js      # React entry point
│   │   ├── index.js    # React entry script
├── README.md           # Project documentation
├── package.json        # Dependencies and scripts
└── .gitignore          # Ignored files
        </pre>
    </section>

    <section>
        <h2>How to Run</h2>
        <ol>
            <li>Clone the repository:
                <pre class="file-structure">git clone https://github.com/themonstersd13/cseOpenSource.git</pre>
            </li>
            <li>Install dependencies:
                <ul>
                    <li><strong>Backend:</strong>
                        <pre class="file-structure">
cd backend
npm install
                        </pre>
                    </li>
                    <li><strong>Frontend:</strong>
                        <pre class="file-structure">
cd frontend
npm install
                        </pre>
                    </li>
                </ul>
            </li>
            <li>Run the project:
                <ul>
                    <li><strong>Backend:</strong>
                        <pre class="file-structure">npm start</pre>
                    </li>
                    <li><strong>Frontend:</strong>
                        <pre class="file-structure">npm start</pre>
                    </li>
                </ul>
            </li>
            <li>Open the application at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.</li>
        </ol>
    </section>

    <section>
        <h2>Contact</h2>
        <p><strong>Author:</strong> Saurabh Shantaram Doiphode</p>
        <p><strong>Email:</strong> <a href="mailto:saurabhdoiphode1335@gmail.com">saurabhdoiphode1335@gmail.com</a></p>
        <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/saurabh-doiphode-7b170b289/" target="_blank">Saurabh Doiphode</a></p>
    </section>

    <footer>
    <p>© 2024 All rights reserved by <a href="https://www.linkedin.com/in/saurabh-doiphode/" target="_blank">Saurabh Doiphode</a>.</p>
</footer>

</body>
</html>
