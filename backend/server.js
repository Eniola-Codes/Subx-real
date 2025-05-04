import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// In-memory storage (replace with database later)
let developers = [];
let investors = [];
let projects = [];

// Developer routes
app.post('/api/developers', upload.single('image'), (req, res) => {
  const { name, company, email, phone, website, bio, isSubscribed } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const developer = {
    id: Date.now().toString(),
    name,
    company,
    email,
    phone,
    website,
    bio,
    imageUrl,
    isSubscribed: isSubscribed === 'true',
    createdAt: new Date().toISOString(),
  };

  developers.push(developer);
  res.json(developer);
});

app.get('/api/developers', (req, res) => {
  res.json(developers);
});

// Project routes
app.post('/api/projects', upload.single('image'), (req, res) => {
  const { title, description, location, type, developerId } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const project = {
    id: Date.now().toString(),
    title,
    description,
    location,
    type,
    imageUrl,
    developerId,
    createdAt: new Date().toISOString(),
  };

  projects.push(project);
  res.json(project);
});

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/projects/:developerId', (req, res) => {
  const developerProjects = projects.filter(
    (project) => project.developerId === req.params.developerId
  );
  res.json(developerProjects);
});

// Investor routes
app.post('/api/investors', (req, res) => {
  const { name, email, phone, bio, investmentInterests } = req.body;

  const investor = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    bio,
    investmentInterests,
    createdAt: new Date().toISOString(),
  };

  investors.push(investor);
  res.json(investor);
});

app.get('/api/investors', (req, res) => {
  res.json(investors);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 