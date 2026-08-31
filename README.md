# Staj Projesi

Spring Boot + PostgreSQL backend ve React + Vite frontend içeren full stack staj projesidir.

## Proje Hakkında

Bu projede frontend ve backend arasında REST API üzerinden iletişim sağlanmıştır.

Uygulama üzerinden:
- Projeler listelenebilir.
- Yeni proje oluşturulabilir.
- Projeler güncellenebilir.
- Projeler silinebilir.
- Haftalık staj raporları listelenebilir.
- Yeni haftalık rapor oluşturulabilir.
- Haftalık raporlar güncellenebilir.

## Kullanılan Teknolojiler

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- REST API

### Veritabanı
- PostgreSQL 17

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

## Gereksinimler

- Java 17
- PostgreSQL 17
- Node.js ve npm
- Maven Wrapper

## Proje Yapısı

```text
staj projem/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   ├── pom.xml
│   └── mvnw.cmd
│
└── frontend/
    ├── src/
    ├── package.json
    └── vite.config.js
```

## Backend'i Çalıştırma

Proje klasöründen:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Backend varsayılan olarak:

```text
http://localhost:8080
```

adresinde çalışır.

Backend bağlantısını kontrol etmek için:

```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/health" -Method Get
```

Beklenen sonuç:

```text
Backend is running
```

## Frontend'i Çalıştırma

Frontend klasörüne geç:

```powershell
cd frontend
npm install
npm run dev
```

Vite tarafından verilen localhost adresinden uygulamaya erişilebilir.

## API Endpointleri

### Projects

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/projects` | Tüm projeleri getirir |
| POST | `/api/projects` | Yeni proje oluşturur |
| PUT | `/api/projects/{id}` | Projeyi günceller |
| DELETE | `/api/projects/{id}` | Projeyi siler |

### Weekly Reports

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/weekly-reports` | Tüm haftalık raporları getirir |
| POST | `/api/weekly-reports` | Yeni haftalık rapor oluşturur |
| PUT | `/api/weekly-reports/{id}` | Haftalık raporu günceller |

## Veritabanı

Backend PostgreSQL veritabanı ile çalışmaktadır.

Veritabanı bağlantısı Spring Boot yapılandırması üzerinden sağlanmaktadır.

```text
Host: localhost
Port: 5432
Database: postgres
```

## Haftalık Geliştirme Süreci

### 1. Hafta

Backend altyapısı oluşturuldu. Spring Boot proje yapısı kuruldu, PostgreSQL veritabanı bağlantısı sağlandı ve JPA/Hibernate yapılandırıldı.

Projeler ve haftalık raporlar için model, repository, service ve controller katmanları geliştirildi. Backend API endpointleri oluşturularak temel veri akışı test edildi.

### 2. Hafta

Frontend ve backend API entegrasyonu tamamlandı.

React ve Vite tabanlı frontend uygulaması backend API ile bağlandı. Proje listeleme, oluşturma, güncelleme ve silme işlemleri frontend üzerinden gerçekleştirildi.

Haftalık rapor listeleme, oluşturma ve güncelleme işlemleri eklendi. Form doğrulamaları ve hata mesajları uygulandı. CORS ayarları yapılarak frontend-backend iletişimi sağlandı.

Temel CRUD işlemleri frontend üzerinden test edildi.

## Test

Projenin temel işlemleri test edilmiştir:

- Backend health kontrolü
- Proje listeleme
- Proje oluşturma
- Proje güncelleme
- Proje silme
- Haftalık rapor listeleme
- Haftalık rapor oluşturma
- Haftalık rapor güncelleme
- Frontend-backend API iletişimi
- PostgreSQL bağlantısı

## Durum

Projenin temel full stack geliştirme ve CRUD işlemleri tamamlanmıştır.