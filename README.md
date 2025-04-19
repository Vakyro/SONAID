**SONAID** is an AI-powered diagnostic platform designed to assist healthcare professionals in detecting embryological malformations through advanced analysis of ultrasound imaging. Leveraging **Geometric Semantic Genetic Programming (GSGP-CUDA)** and modern full-stack technologies, SONAID provides fast, accurate, and interpretable predictions while adhering to medical compliance standards (HIPAA/GDPR).  

✨ **Features**:  
- **DICOM Imaging Support**: Seamless integration with medical ultrasound formats.  
- **Dual Interface**:  
  - **Desktop App** (Tauri + React): For lab technicians to upload/process studies.  
  - **Web Dashboard** (Next.js): For physicians to visualize results and patient histories.  
- **Secure & Scalable**: Built with Supabase (PostgreSQL), FastAPI, and GPU-accelerated inference.  

🛠️ **Tech Stack**: React · Tauri · Next.js · FastAPI · Supabase · CUDA · Orthanc (DICOM)  

🔍 **Use Case**: Early detection of fetal anomalies, reducing diagnostic delays in prenatal care.  

📜 **License**: GPLv3 (Open Science, Collaborative Healthcare).  

---

### 🌐 **Live Demo**  
Experience SONAID online: [https://sonaid.vercel.app](https://sonaid.vercel.app)  

### 🚀 **Next.js Web App Installation**  
1. **Clone the repository**:  
   ```bash
   git clone https://github.com/yourusername/SONAID.git
   cd SONAID

2. **Install dependencies:**:  
   ```bash
   npm install  # or yarn install

3. **Configure environment variables:**:
   Create a .env.local file with your Supabase and API keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_KEY=your-anon-key
   NEXT_PUBLIC_API_URL=https://your-fastapi-endpoint

4. **Run the development server:**:  
   ```bash
   npm run dev  # or yarn dev

5. **Build for production:**:  
   ```bash
   npm run build && npm start

---

*Empowering clinicians with AI-driven insights—because every life deserves a healthy start.* 🌟
