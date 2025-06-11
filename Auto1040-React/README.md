# EZ1040 – Automated 1040 Tax Form Generator

**EZ1040** is a smart web application that automates the generation of IRS Form 1040 for U.S. citizens based on uploaded payslips. It leverages OCR and AI models to extract, analyze, and populate the form according to U.S. tax regulations.

## 🔗 Live Demo

🌐 [Visit the live site](https://react-client-1040.onrender.com/)

> For admin management: [https://angular-admin-1040.onrender.com](https://angular-admin-1040.onrender.com)

---

## ⚙️ Tech Stack

- **Backend**: ASP.NET Core 9 (Web API)
- **Frontend**: React 19
- **Admin Management**: Angular 17
- **AI Service**: Python microservice (OCR + LLM)
- **Storage**: AWS S3
- **Database**: MySql
- **Architecture**: Clean Architecture

---

## 🚀 Getting Started

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/)
- [Node.js 20+](https://nodejs.org/)
- Python 3.10+
- Docker (optional, for services)

### Setup Instructions

1. **Clone the repositories**:

```bash
git clone https://github.com/Auto-1040/Auto-Backend-1040
git clone https://github.com/Auto-1040/React-Client-1040
git clone https://github.com/Auto-1040/TaxOCR-AI

```
2. **Run the server**
```bash 
dotnet run
```
3. **Run the client** 
```bash
cd Auto1040-React
npm install
npm run dev
```

4. **Run the Python microservice (OCR/AI)**
```bash
docker build -t ez1040-ocr .
docker run -p 5000:5000 ez1040-ocr
```
