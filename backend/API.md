# Work Items API Documentation

## Base URL

http://localhost:8080

---

# 1. Work Items

## GET /api/work-items

Tüm work item kayıtlarını getirir.

### Query Parameters

| Parametre | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| projectId | Integer | Hayır | Projeye göre filtreler |
| reportId | Integer | Hayır | Haftalık rapora göre filtreler |
| status | String | Hayır | Duruma göre filtreler |
| responsible | String | Hayır | Sorumlu kişiye göre filtreler |
| overdue | Boolean | Hayır | Gecikmiş işlere göre filtreler |
| risk | Boolean | Hayır | Risk durumuna göre filtreler |


## Örnek
```http
GET /api/work-items?status=IN_PROGRESS
```

# 2. Paginated Work Items

## GET /api/work-items/paged

Work item kayıtlarını sayfalama ve sıralama ile getirir.

### Query Parameters

| Parametre | Tip | Varsayılan | Açıklama |
|---|---|---|---|
| projectId | Integer | - | Projeye göre filtreler |
| reportId | Integer | - | Haftalık rapora göre filtreler |
| status | String | - | Duruma göre filtreler |
| responsible | String | - | Sorumlu kişiye göre filtreler |
| overdue | Boolean | - | Gecikmiş işlere göre filtreler |
| risk | Boolean | - | Risk durumuna göre filtreler |
| page | Integer | 0 | Sayfa numarası |
| size | Integer | 10 | Sayfa başına kayıt sayısı |
| sortBy | String | id | Sıralama yapılacak alan |
| direction | String | asc | asc veya desc |

### Örnek

```http
GET /api/work-items/paged?page=0&size=10

GET /api/work-items/paged?page=0&size=10&status=IN_PROGRESS&sortBy=dueDate&direction=desc
```
---

# 3. Work Items by Project

## GET /api/work-items/project/{projectId}

Belirli bir projeye ait work item kayıtlarını getirir.

### Path Parameter

| Parametre | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| projectId | Integer | Evet | Work item'ların ait olduğu proje ID'si |

### Örnek

```http
GET /api/work-items/project/1
```
---

# 4. Work Items by Report

## GET /api/work-items/report/{reportId}

Belirli bir haftalık rapora ait work item kayıtlarını getirir.

### Path Parameter

| Parametre | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| reportId | Integer | Evet | Work item'ların ait olduğu haftalık rapor ID'si |

### Örnek

```http
GET /api/work-items/report/1
```
---

# 5. Create Work Item

## POST /api/work-items

Yeni bir work item oluşturur.

### Request Body

| Alan | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| projectId | Integer | Evet | Work item'ın ait olduğu proje ID'si |
| reportId | Integer | Hayır | Haftalık rapor ID'si |
| title | String | Evet | İş başlığı |
| description | String | Hayır | İş açıklaması |
| responsible | String | Hayır | Sorumlu kişi |
| status | String | Evet | İş durumu |
| dueDate | Date | Hayır | Son teslim tarihi |

### Örnek Request

```json
{
  "projectId": 1,
  "reportId": 1,
  "title": "Yeni iş",
  "description": "Yeni oluşturulan work item",
  "responsible": "Berrin",
  "status": "TODO",
  "dueDate": "2026-11-10"
}
```
---

# 6. Update Work Item

## PUT /api/work-items/{id}

Mevcut bir work item kaydını günceller.

### Path Parameter

| Parametre | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| id | Integer | Evet | Güncellenecek work item ID'si |

### Request Body

| Alan | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| projectId | Integer | Evet | Work item'ın ait olduğu proje ID'si |
| reportId | Integer | Hayır | Haftalık rapor ID'si |
| title | String | Evet | İş başlığı |
| description | String | Hayır | İş açıklaması |
| responsible | String | Hayır | Sorumlu kişi |
| status | String | Evet | İş durumu |
| dueDate | Date | Hayır | Son teslim tarihi |

### Örnek Request

```json
{
  "projectId": 1,
  "reportId": 1,
  "title": "Güncellenmiş iş",
  "description": "Work item güncellendi.",
  "responsible": "Berrin",
  "status": "IN_PROGRESS",
  "dueDate": "2026-11-15"
}

```
---

# 7. Delete Work Item

## DELETE /api/work-items/{id}

Belirli bir work item kaydını siler.

### Path Parameter

| Parametre | Tip | Zorunlu | Açıklama |
|---|---|---|---|
| id | Integer | Evet | Silinecek work item ID'si |

### Örnek

```http
DELETE /api/work-items/2
```
```