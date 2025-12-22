@echo off
cd /d "C:\Users\kharu\tech-role-site\java-backend"
call mvnw.cmd spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
