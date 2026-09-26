# Role-Based Screen & Action Matrix

## 1. Proje Yöneticisi

| Ekran | Görüntüleme | Oluşturma | Güncelleme | Silme |
|---|---|---|---|---|
| Dashboard | ✅ | - | - | - |
| Projelerim | ✅ | - | - | - |
| Proje Detayı | ✅ | - | - | - |
| Weekly Report | ✅ | ✅ | ✅ | - |
| Work Items | ✅ | ✅ | ✅ | - |
| Riskler | ✅ | ✅ | ✅ | - |

## 2. CTO

| Ekran | Görüntüleme | Oluşturma | Güncelleme | Silme |
|---|---|---|---|---|
| Dashboard | ✅ | - | - | - |
| Proje Listesi | ✅ | - | - | - |
| Proje Detayı | ✅ | - | - | - |
| Weekly Report History | ✅ | - | - | - |
| Work Items | ✅ | - | - | - |
| Riskler | ✅ | - | - | - |

## 3. Ekip Lideri

| Ekran | Görüntüleme | Oluşturma | Güncelleme | Silme |
|---|---|---|---|---|
| Dashboard | ✅ | - | - | - |
| Proje Detayı | ✅ | - | - | - |
| Weekly Report | ✅ | ✅ | ✅ | - |
| Work Items | ✅ | ✅ | ✅ | - |
| Riskler | ✅ | ✅ | ✅ | - |

## 4. Admin

| Ekran | Görüntüleme | Oluşturma | Güncelleme | Silme |
|---|---|---|---|---|
| Dashboard | ✅ | - | - | - |
| User Management | ✅ | ✅ | ✅ | ✅ |
| Project Management | ✅ | ✅ | ✅ | ✅ |
| Project Assignment | ✅ | ✅ | ✅ | - |
| Work Items | ✅ | ✅ | ✅ | ✅ |
| Riskler | ✅ | ✅ | ✅ | ✅ |

## Common Rules

- Login ekranı tüm roller için ortaktır.
- Kullanıcı yalnızca yetkili olduğu ekranlara erişebilmelidir.
- Yetkisiz bir işlemde backend 403 döndürür.
- Oturum geçersiz olduğunda backend 401 döndürür.
- UI'da yetkisiz aksiyonlar görünmemelidir.