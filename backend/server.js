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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// In-memory storage (replace with database later)
let developers = [];
let investors = [];
let projects = [];

// Developer routes
app.post('/api/developers', upload.single('logo'), (req, res) => {
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
  res.json({ message: 'Developer created successfully' });
});

app.get('/api/developers', (req, res) => {
  res.json(developers);
});

// Project routes
app.post('/api/projects', upload.array('images', 5), (req, res) => {
  const { title, description, location, type, developerId } = req.body;
  const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

  const project = {
    id: Date.now().toString(),
    title,
    description,
    location,
    type,
    imageUrls,
    developerId,
    createdAt: new Date().toISOString(),
  };

  projects.push(project);
  res.json({ message: 'Project created successfully' });
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
  res.json({ message: 'Investor created successfully' });
});

app.get('/api/investors', (req, res) => {
  res.json(investors);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 