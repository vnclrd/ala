import express from 'express'
import cors from 'cors'
import axios from 'axios'
import { initializeApp } from 'firebase/app'
import { 
  getFirestore, doc, setDoc, getDoc, getDocs, collection, deleteDoc, Timestamp 
} from 'firebase/firestore'
import QRCode from 'qrcode'
import multer from 'multer'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import cron from 'node-cron'

const app = express()
app.use(cors())
app.use(express.json())

// ====================== FIREBASE ======================
const firebaseConfig = {
  apiKey: "AIzaSyDjK9ATgLA0UTgtfEHwpQSCkXX3hzT1IPA",
  authDomain: "ala-project-860de.firebaseapp.com",
  projectId: "ala-project-860de",
  storageBucket: "ala-project-860de.firebasestorage.app",
  messagingSenderId: "320287610654",
  appId: "1:320287610654:web:503062ed89337498fd5b0f",
  measurementId: "G-Z0VTPZTRT4"
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

const XENDIT_API_KEY = 'xnd_development_omNmxlBp1Vs2HmRko6Q8rxhkL8mVH0BogrAqD4RDVTsB9mFYZnabw2fNQkr'

// Ensure uploads folder exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads')
}

const upload = multer({ storage: multer.memoryStorage() })

// ====================== HELPERS ======================
function generateUniqueCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function generateGalleryId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

async function createGalleryDocument(galleryId, code, plan) {
  const galleryData = {
    galleryId,
    code,
    plan,
    createdAt: new Date(),
    expirationDate: null,
    photos: [],
    isActive: true,
    storage: plan === 'standard' ? '500MB' : '2GB',
    quality: plan === 'standard' ? 'Standard' : 'High',
    eventDate: null
  }
  await setDoc(doc(db, 'galleries', galleryId), galleryData)
  return galleryData
}

function formatDate(date) {
  if (!date) return null
  if (typeof date.toDate === 'function') {
    return date.toDate().toLocaleDateString()
  }
  return new Date(date).toLocaleDateString()
}

function generateGalleryHTML(galleryData) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ala Photo Gallery</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; }
      .header { margin-bottom: 30px; }
      .gallery-info { background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
      .photo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; }
      .photo-item { background: white; border-radius: 10px; padding: 10px; }
      .upload-area { border: 2px dashed #ccc; border-radius: 10px; padding: 20px; text-align: center; background: white; margin: 20px 0; }
      .btn { background: #ff6b6b; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
      .btn:hover { background: #e55555; }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Ala Photo Gallery</h1>
      <p>Plan: ${galleryData.plan} | Storage: ${galleryData.storage} | Quality: ${galleryData.quality}</p>
    </div>
    <div class="gallery-info">
      <h3>Gallery Code: ${galleryData.code}</h3>
      ${galleryData.expirationDate
        ? `<p>⚠️ Expires on ${formatDate(galleryData.expirationDate)}</p>`
        : `<p>⚠️ Please set your event date to activate expiration.</p>`}
    </div>
    <div class="upload-area">
      <h3>Upload Photos</h3>
      <input type="file" id="photoInput" multiple accept="image/*" style="display:none;">
      <button class="btn" onclick="document.getElementById('photoInput').click()">Choose Photos</button>
      <p>Drag and drop photos here or click to browse</p>
    </div>
    <div id="photoGrid" class="photo-grid"></div>
  </body>
  </html>`
}

// ====================== PAYMENT ======================
app.post('/create-invoice', async (req, res) => {
  try {
    const { plan } = req.body
    const amount = plan === 'standard' ? 1000 : 1500

    const response = await axios.post(
      'https://api.xendit.co/v2/invoices',
      { external_id: 'invoice-' + Date.now(), amount, description: `${plan} plan purchase`, currency: 'PHP', invoice_duration: 900 },
      { auth: { username: XENDIT_API_KEY, password: '' } }
    )
    res.json(response.data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create invoice' })
  }
})

app.get('/invoice/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { plan } = req.query

    const response = await axios.get(`https://api.xendit.co/v2/invoices/${id}`, { auth: { username: XENDIT_API_KEY, password: '' } })
    const invoiceData = response.data

    if (invoiceData.status === 'PAID' && plan) {
      const existingDoc = await getDoc(doc(db, 'invoices', id))
      if (!existingDoc.exists()) {
        const galleryId = generateGalleryId()
        const sixDigitCode = generateUniqueCode()
        const galleryUrl = `${req.protocol}://${req.get('host')}/gallery/${galleryId}`
        const qrCodeDataUrl = await QRCode.toDataURL(galleryUrl)

        await createGalleryDocument(galleryId, sixDigitCode, plan)

        await setDoc(doc(db, 'invoices', id), { galleryId, sixDigitCode, qrCodeDataUrl, galleryUrl, plan, createdAt: new Date() })

        res.json({ ...invoiceData, galleryId, sixDigitCode, qrCodeDataUrl, galleryUrl })
      } else {
        res.json({ ...invoiceData, ...existingDoc.data() })
      }
    } else {
      res.json(invoiceData)
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch invoice' })
  }
})

// ====================== GALLERIES ======================
app.get('/galleries', async (req, res) => {
  try {
    const { status, plan } = req.query
    const snapshot = await getDocs(collection(db, 'galleries'))

    let galleries = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }))

    if (status) {
      if (status === 'active') {
        galleries = galleries.filter(g => g.isActive && (!g.expirationDate || new Date() <= g.expirationDate.toDate()))
      } else if (status === 'expired') {
        galleries = galleries.filter(g => g.expirationDate && new Date() > g.expirationDate.toDate())
      }
    }

    if (plan) {
      galleries = galleries.filter(g => g.plan === plan)
    }

    res.json(galleries)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch galleries' })
  }
})

app.get('/gallery/:galleryId', async (req, res) => {
  try {
    const { galleryId } = req.params
    const galleryDoc = await getDoc(doc(db, 'galleries', galleryId))

    if (!galleryDoc.exists()) return res.status(404).send('Gallery not found')
    const galleryData = galleryDoc.data()

    if (!galleryData.isActive || (galleryData.expirationDate && new Date() > galleryData.expirationDate.toDate())) {
      return res.status(410).send('Gallery has expired')
    }

    res.send(generateGalleryHTML(galleryData))
  } catch (err) {
    res.status(500).send('Error loading gallery')
  }
})

app.get('/gallery/:galleryId/photos', async (req, res) => {
  try {
    const { galleryId } = req.params
    const galleryDoc = await getDoc(doc(db, 'galleries', galleryId))
    if (!galleryDoc.exists()) return res.status(404).json({ error: 'Not found' })
    res.json(galleryDoc.data().photos || [])
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch photos' })
  }
})

app.post('/set-event-date/:galleryId', async (req, res) => {
  try {
    const { galleryId } = req.params
    const { eventDate } = req.body
    const galleryDoc = await getDoc(doc(db, 'galleries', galleryId))
    if (!galleryDoc.exists()) return res.status(404).json({ error: 'Not found' })

    const gallery = galleryDoc.data()
    const days = gallery.plan === 'standard' ? 7 : 14

    const eventDateObj = new Date(eventDate)
    const expirationDateObj = new Date(eventDateObj)
    expirationDateObj.setDate(expirationDateObj.getDate() + days)

    await setDoc(doc(db, 'galleries', galleryId), {
      ...gallery,
      eventDate: Timestamp.fromDate(eventDateObj),
      expirationDate: Timestamp.fromDate(expirationDateObj),
    })

    res.json({ success: true, expirationDate: expirationDateObj })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to set event date' })
  }
})

app.post('/upload/:galleryId', upload.single('photo'), async (req, res) => {
  try {
    const { galleryId } = req.params
    const galleryDoc = await getDoc(doc(db, 'galleries', galleryId))
    if (!galleryDoc.exists()) return res.status(404).json({ error: 'Gallery not found' })

    const gallery = galleryDoc.data()
    if (!gallery.isActive) return res.status(400).json({ error: 'Gallery inactive' })

    const plan = gallery.plan
    const maxPerFile = plan === 'standard' ? 1 * 1024 * 1024 : 2 * 1024 * 1024
    const totalLimit = plan === 'standard' ? 500 * 1024 * 1024 : 2 * 1024 * 1024 * 1024

    const currentSize = gallery.photos.reduce((sum, p) => sum + p.size, 0)
    if (currentSize + req.file.size > totalLimit) {
      return res.status(400).json({ error: 'Storage limit exceeded' })
    }

    let buffer = req.file.buffer
    if (req.file.size > maxPerFile) {
      buffer = await sharp(req.file.buffer).jpeg({ quality: 80 }).toBuffer()
      if (buffer.length > maxPerFile) {
        return res.status(400).json({ error: 'Image too large after resize' })
      }
    }

    const filePath = path.join('uploads', `${Date.now()}-${req.file.originalname}`)
    fs.writeFileSync(filePath, buffer)

    const photoData = { name: req.file.originalname, size: buffer.length, uploadedAt: new Date(), path: filePath }
    await setDoc(doc(db, 'galleries', galleryId), { ...gallery, photos: [...gallery.photos, photoData] })

    res.json({ success: true, photo: photoData })
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' })
  }
})

app.delete('/delete-photo/:galleryId/:photoIndex', async (req, res) => {
  try {
    const { galleryId, photoIndex } = req.params
    const galleryDoc = await getDoc(doc(db, 'galleries', galleryId))
    if (!galleryDoc.exists()) return res.status(404).json({ error: 'Gallery not found' })

    const gallery = galleryDoc.data()
    const index = parseInt(photoIndex)
    if (isNaN(index) || index < 0 || index >= gallery.photos.length) {
      return res.status(400).json({ error: 'Invalid photo index' })
    }

    const photo = gallery.photos[index]
    if (fs.existsSync(photo.path)) fs.unlinkSync(photo.path)

    gallery.photos.splice(index, 1)
    await setDoc(doc(db, 'galleries', galleryId), gallery)

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Delete photo failed' })
  }
})

app.delete('/delete-gallery/:galleryId', async (req, res) => {
  try {
    const { galleryId } = req.params
    const galleryDoc = await getDoc(doc(db, 'galleries', galleryId))
    if (!galleryDoc.exists()) return res.status(404).json({ error: 'Gallery not found' })

    const gallery = galleryDoc.data()
    for (const photo of gallery.photos) {
      if (fs.existsSync(photo.path)) fs.unlinkSync(photo.path)
    }

    await deleteDoc(doc(db, 'galleries', galleryId))
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Delete gallery failed' })
  }
})

app.post('/verify-code', async (req, res) => {
  try {
    const { code } = req.body
    const galleries = await getDocs(collection(db, 'galleries'))
    let match = null

    galleries.forEach((docSnap) => {
      const data = docSnap.data()
      if (data.code === code && data.isActive) {
        match = { id: docSnap.id, ...data }
      }
    })

    if (!match) return res.status(404).json({ error: 'Invalid code' })
    if (match.expirationDate && new Date() > match.expirationDate.toDate()) {
      return res.status(410).json({ error: 'Code expired' })
    }

    res.json({ galleryId: match.id, galleryUrl: `/gallery/${match.id}` })
  } catch (err) {
    res.status(500).json({ error: 'Verification failed' })
  }
})

// ====================== CLEANUP ======================
cron.schedule('0 0 * * *', async () => {
  const galleries = await getDocs(collection(db, 'galleries'))
  const now = new Date()

  for (const g of galleries.docs) {
    const data = g.data()
    if (data.expirationDate && data.expirationDate.toDate() < now) {
      for (const photo of data.photos || []) {
        if (fs.existsSync(photo.path)) fs.unlinkSync(photo.path)
      }
      await deleteDoc(doc(db, 'galleries', g.id))
    }
  }
})

// ====================== START ======================
const PORT = 4000
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
