# 操作

## 1. 建库

```sql
CREATE DATABASE `mydb` CHARACTER SET utf8 COLLATE utf8_general_ci;
```

## 2. 查询数据库表结构

```sql
-- 'mydb' 数据库名；'organ' 表名
SELECT column_name, column_comment, is_nullable, data_type, column_key
FROM information_schema.columns AS cols
WHERE table_schema ='mydb' AND table_name = 'organ' ;
```

## 3. mysql2