@echo off
REM Simple script to download Maven and run Spring Boot
setlocal enabledelayedexpansion

set MAVEN_DIR=C:\apache-maven-3.9.6
set MAVEN_BIN=%MAVEN_DIR%\bin\mvn.bat

if not exist "%MAVEN_DIR%" (
    echo Downloading Maven 3.9.6...
    mkdir "%MAVEN_DIR%"
    cd /d "%MAVEN_DIR%"
    cd ..
    
    REM Use certutil to download (built-in on Windows)
    certutil -urlcache -split -f "https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip" apache-maven-3.9.6-bin.zip
    
    if not exist "apache-maven-3.9.6-bin.zip" (
        echo Failed to download Maven
        exit /b 1
    )
    
    REM Extract using PowerShell (more reliable)
    powershell -Command "Expand-Archive -Path 'apache-maven-3.9.6-bin.zip' -DestinationPath '.' -Force"
    del apache-maven-3.9.6-bin.zip
)

REM Run Maven
"%MAVEN_BIN%" %*
