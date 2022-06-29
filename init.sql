--psql -U postgres -f init.sql

create user administrator with encrypted password 'best_parts';
create database parts;
grant all privileges on database parts to administrator;