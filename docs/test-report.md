# Test Report

## 1. Amaç

Bu doküman, Staj Takip Sistemi projesinde geliştirilen backend API'lerinin, frontend uygulamasının ve frontend-backend entegrasyonunun test sonuçlarını belgelemek amacıyla hazırlanmıştır.

Testler geliştirme süreci içerisinde manuel API testleri, frontend üzerinden CRUD işlemleri ve backend build/test kontrolleri ile gerçekleştirilmiştir.

---

## 2. Test Ortamı

| Bileşen | Kullanılan Teknoloji |
|---|---|
| İşletim Sistemi | Windows |
| Backend | Java 17 + Spring Boot 4.0.8 |
| Build Tool | Maven |
| Frontend | React + Vite |
| Veritabanı | PostgreSQL 17.11 |
| Backend Portu | 8080 |
| Frontend Portu | 5173 |
| Database | staj_db |

---

## 3. Backend Testleri

### 3.1 Backend Health Check

Backend uygulamasının çalışıp çalışmadığını kontrol etmek amacıyla health endpoint'i test edilmiştir.

**Request:**

```text
GET /api/health

Beklenen sonuç:

Backend uygulamasının çalıştığını belirten bir response dönmesi.

Gerçek sonuç:

Backend is running

Durum: PASS

4. Project API Testleri
4.1 Proje Listeleme

Request:

GET /api/projects

Beklenen sonuç:

Veritabanındaki projelerin JSON formatında listelenmesi.

Gerçek sonuç:

Proje kayıtları başarılı şekilde alınmıştır.

Durum: PASS

4.2 Proje Oluşturma

Request:

POST /api/projects

Beklenen sonuç:

Yeni projenin oluşturulması ve oluşturulan proje bilgilerinin response olarak dönmesi.

Gerçek sonuç:

Yeni proje başarılı şekilde oluşturulmuştur.

Durum: PASS

4.3 Proje Güncelleme

Request:

PUT /api/projects/{id}

Beklenen sonuç:

Belirtilen proje kaydının güncellenmesi.

Gerçek sonuç:

Proje bilgileri başarılı şekilde güncellenmiştir.

Durum: PASS

4.4 Frontend Üzerinden Proje İşlemleri

Frontend Project ekranı üzerinden aşağıdaki işlemler test edilmiştir:

Projelerin listelenmesi
Yeni proje oluşturulması
Proje bilgilerinin düzenlenmesi
Oluşturulan test projesinin silinmesi

Durum: PASS

5. Weekly Report API Testleri
5.1 Haftalık Rapor Listeleme

Request:

GET /api/weekly-reports

Beklenen sonuç:

Haftalık raporların listelenmesi.

Gerçek sonuç:

Raporlar başarılı şekilde alınmıştır.

Durum: PASS

5.2 Haftalık Rapor Oluşturma

Request:

POST /api/weekly-reports

Beklenen sonuç:

Yeni haftalık rapor oluşturulması.

Gerçek sonuç:

Yeni rapor başarılı şekilde oluşturulmuştur.

Durum: PASS

5.3 Haftalık Rapor Güncelleme

Request:

PUT /api/weekly-reports/{id}

Beklenen sonuç:

Seçilen haftalık raporun güncellenmesi.

Gerçek sonuç:

Rapor başarılı şekilde güncellenmiştir.

Durum: PASS

5.4 Haftalık Rapor Silme

Request:

DELETE /api/weekly-reports/{id}

Beklenen sonuç:

Seçilen haftalık raporun silinmesi.

Gerçek sonuç:

Test amacıyla oluşturulan rapor başarılı şekilde silinmiştir.

Durum: PASS

6. Work Item Testleri

Frontend Work Items ekranı üzerinden aşağıdaki işlemler test edilmiştir:

Work item listesinin görüntülenmesi
Yeni work item oluşturulması
Work item güncellenmesi
Test amacıyla oluşturulan work item'ın silinmesi

Durum: PASS

7. Risk Testleri

Frontend Risks ekranı üzerinden aşağıdaki işlemler test edilmiştir:

Risk listesinin görüntülenmesi
Yeni risk oluşturulması
Risk güncellenmesi
Test amacıyla oluşturulan riskin silinmesi

Durum: PASS

8. Dashboard Testi

Dashboard ekranının backend API'lerinden gerekli verileri alıp göstermesi test edilmiştir.

Kontrol edilen bilgiler:

Proje sayısı
Haftalık rapor sayısı
Work item sayısı
Risk sayısı

Frontend ile backend arasındaki veri iletişiminin başarılı olduğu gözlemlenmiştir.

Durum: PASS

9. Frontend - Backend Entegrasyon Testi

Frontend uygulamasının Spring Boot backend API'lerine istek göndermesi test edilmiştir.

Test edilen iletişim:

React Frontend
      |
      | HTTP Request
      v
Spring Boot REST API
      |
      v
PostgreSQL

Frontend tarafından API'lere gönderilen GET, POST ve PUT isteklerinin başarılı şekilde çalıştığı doğrulanmıştır.

CORS yapılandırması sonrasında frontend'in backend API'lerine localhost üzerinden erişimi sağlanmıştır.

Durum: PASS

10. Swagger API Testleri

Backend API endpoint'leri Swagger/OpenAPI arayüzü üzerinden kontrol edilmiştir.

Kontrol edilen API grupları:

Projects
Weekly Reports
Work Items
Risks

GET, POST, PUT ve ilgili DELETE endpoint'lerinin API dokümantasyonunda görüntülenebildiği ve test edilebildiği doğrulanmıştır.

Durum: PASS

11. Backend Build ve Automated Test

Backend projesinin Maven Wrapper kullanılarak build edilmesi test edilmiştir.

Kullanılan komut:

.\mvnw.cmd clean install

Build sonucu:

Tests run: 1
Failures: 0
Errors: 0
BUILD SUCCESS

Backend projesinin başarılı şekilde build edildiği ve mevcut otomatik testin başarılı olduğu doğrulanmıştır.

Durum: PASS

12. Genel Test Sonuçları
Test	Sonuç
Backend Health Check	PASS
Project GET	PASS
Project POST	PASS
Project PUT	PASS
Weekly Report GET	PASS
Weekly Report POST	PASS
Weekly Report PUT	PASS
Weekly Report DELETE	PASS
Work Item CRUD	PASS
Risk CRUD	PASS
Dashboard	PASS
Frontend-Backend Integration	PASS
Swagger API Check	PASS
Maven Build	PASS
Automated Test	PASS
13. Sonuç

Yapılan testler sonucunda Staj Takip Sistemi'nin mevcut MVP kapsamındaki temel fonksiyonlarının başarılı şekilde çalıştığı doğrulanmıştır.

Backend API'lerinin PostgreSQL veritabanı ile iletişim kurduğu, frontend uygulamasının REST API üzerinden backend ile haberleştiği ve temel CRUD işlemlerinin başarılı şekilde gerçekleştirilebildiği test edilmiştir.

Ayrıca backend projesinin Maven build sürecinden başarıyla geçtiği ve mevcut otomatik testlerin başarılı olduğu doğrulanmıştır.

Testler geliştirme süreci boyunca manuel olarak gerçekleştirilmiş ve başarılı sonuçlanan işlemler proje geliştirme sürecinin doğrulanmasında kullanılmıştır.

