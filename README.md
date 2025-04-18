<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
=======
>>>>>>> 1566e7fe46c94dcacab023598aebc510b480bfe4
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
