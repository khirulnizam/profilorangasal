CREATE TABLE IF NOT EXISTS orangasal(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nokp TEXT, 
    nama TEXT,
    pendapatan REAL
);

INSERT or IGNORE INTO orangasal(id,nokp, nama,pendapatan) 
VALUES (1,'880101-01-3031', 'ALI ANAK ABU',800.00);
INSERT or IGNORE INTO orangasal(id,nokp, nama, pendapatan) 
VALUES (2,'900107-01-5880', 'MINAH ANAK RARA',400.00);
INSERT or IGNORE INTO orangasal(id,nokp, nama, pendapatan) 
VALUES (3,'000707-02-5811', 'JAMAL ANAK RARA',1000.00);