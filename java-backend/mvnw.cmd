@echo off
setlocal enabledelayedexpansion
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.1.8-hotspot"
set "PATH=%JAVA_HOME%\bin;%PATH%"
set "ROOT_DIR=%~dp0"
set "MVNW_DIR=%ROOT_DIR%.maven-wrapper"
set "MAVEN_VERSION=3.9.4"
set "MAVEN_DIR=%MVNW_DIR%\apache-maven-%MAVEN_VERSION%"
set "MAVEN_BIN=%MAVEN_DIR%\bin\mvn.cmd"

if not exist "%MAVEN_BIN%" (
  echo Downloading Maven %MAVEN_VERSION%...
  if not exist "%MVNW_DIR%" mkdir "%MVNW_DIR%"
  cd /d "%MVNW_DIR%"
  powershell -NoProfile -Command "try { (New-Object System.Net.WebClient).DownloadFile('https://archive.apache.org/dist/maven/maven-3/3.9.4/binaries/apache-maven-3.9.4-bin.zip', 'apache-maven-3.9.4-bin.zip') } catch { Write-Error $_ ; exit 1 }"
  powershell -NoProfile -Command "try { Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::ExtractToDirectory('apache-maven-3.9.4-bin.zip', '.') } catch { Write-Error $_; exit 1 }"
  del apache-maven-3.9.4-bin.zip
  cd /d "%ROOT_DIR%"
)

"%MAVEN_BIN%" %*
